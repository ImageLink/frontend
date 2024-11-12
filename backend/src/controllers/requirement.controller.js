const { supabase } = require('../config/supabase');
const { sendEmail } = require('../services/email');

exports.createRequirement = async (req, res) => {
  try {
    const {
      category_id,
      description,
      min_da,
      min_traffic,
      budget,
      turnaround
    } = req.body;

    const { data: requirement, error } = await supabase
      .from('requirements')
      .insert({
        user_id: req.user.id,
        category_id,
        description,
        min_da,
        min_traffic,
        budget,
        turnaround
      })
      .select()
      .single();

    if (error) throw error;

    // Notify relevant publishers
    const { data: publishers } = await supabase
      .from('websites')
      .select('user_id')
      .eq('category_id', category_id)
      .gte('da', min_da)
      .eq('status', 'active');

    if (publishers) {
      const uniquePublishers = [...new Set(publishers.map(p => p.user_id))];
      
      for (const publisherId of uniquePublishers) {
        await supabase
          .from('notifications')
          .insert({
            user_id: publisherId,
            title: 'New Requirement Posted',
            content: `A new requirement matching your website has been posted.`
          });
      }
    }

    res.status(201).json(requirement);
  } catch (error) {
    console.error('Create requirement error:', error);
    res.status(500).json({
      error: 'Failed to create requirement'
    });
  }
};

exports.updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Verify ownership
    const { data: requirement } = await supabase
      .from('requirements')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!requirement || requirement.user_id !== req.user.id) {
      return res.status(403).json({
        error: 'Not authorized to update this requirement'
      });
    }

    const { data: updatedRequirement, error } = await supabase
      .from('requirements')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(updatedRequirement);
  } catch (error) {
    console.error('Update requirement error:', error);
    res.status(500).json({
      error: 'Failed to update requirement'
    });
  }
};

exports.deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const { data: requirement } = await supabase
      .from('requirements')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!requirement || requirement.user_id !== req.user.id) {
      return res.status(403).json({
        error: 'Not authorized to delete this requirement'
      });
    }

    const { error } = await supabase
      .from('requirements')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({
      message: 'Requirement deleted successfully'
    });
  } catch (error) {
    console.error('Delete requirement error:', error);
    res.status(500).json({
      error: 'Failed to delete requirement'
    });
  }
};

exports.getRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: requirement, error } = await supabase
      .from('requirements')
      .select(`
        *,
        category:categories(name),
        owner:profiles(username, email)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!requirement) {
      return res.status(404).json({
        error: 'Requirement not found'
      });
    }

    res.status(200).json(requirement);
  } catch (error) {
    console.error('Get requirement error:', error);
    res.status(500).json({
      error: 'Failed to fetch requirement'
    });
  }
};

exports.getRequirements = async (req, res) => {
  try {
    const {
      category,
      min_budget,
      max_budget,
      min_da,
      sort = 'created_at',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    let query = supabase
      .from('requirements')
      .select(`
        *,
        category:categories(name),
        owner:profiles(username)
      `, { count: 'exact' })
      .eq('status', 'open');

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }
    if (min_budget) {
      query = query.gte('budget', min_budget);
    }
    if (max_budget) {
      query = query.lte('budget', max_budget);
    }
    if (min_da) {
      query = query.gte('min_da', min_da);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: requirements, count, error } = await query
      .order(sort, { ascending: order === 'asc' })
      .range(from, to);

    if (error) throw error;

    res.status(200).json({
      requirements,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get requirements error:', error);
    res.status(500).json({
      error: 'Failed to fetch requirements'
    });
  }
};

exports.assignRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: requirement, error } = await supabase
      .from('requirements')
      .update({
        status: 'in_progress',
        assigned_to: req.user.id,
        updated_at: new Date()
      })
      .eq('id', id)
      .select('*, owner:profiles(email)')
      .single();

    if (error) throw error;

    // Notify owner
    await sendEmail({
      to: requirement.owner.email,
      subject: 'Requirement Assigned',
      html: `Your requirement has been assigned and is now in progress.`
    });

    res.status(200).json(requirement);
  } catch (error) {
    console.error('Assign requirement error:', error);
    res.status(500).json({
      error: 'Failed to assign requirement'
    });
  }
};

exports.completeRequirement = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify assignment
    const { data: requirement } = await supabase
      .from('requirements')
      .select('assigned_to, owner:profiles(email)')
      .eq('id', id)
      .single();

    if (!requirement || requirement.assigned_to !== req.user.id) {
      return res.status(403).json({
        error: 'Not authorized to complete this requirement'
      });
    }

    const { data: updatedRequirement, error } = await supabase
      .from('requirements')
      .update({
        status: 'completed',
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Notify owner
    await sendEmail({
      to: requirement.owner.email,
      subject: 'Requirement Completed',
      html: `Your requirement has been marked as completed.`
    });

    res.status(200).json(updatedRequirement);
  } catch (error) {
    console.error('Complete requirement error:', error);
    res.status(500).json({
      error: 'Failed to complete requirement'
    });
  }
};
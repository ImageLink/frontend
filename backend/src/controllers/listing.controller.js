const { supabase } = require('../config/supabase');
const { sendEmail } = require('../services/email');

exports.createListing = async (req, res) => {
  try {
    const {
      url,
      title,
      description,
      category_id,
      da,
      traffic,
      price,
      show_price,
      link_type,
      turnaround,
      guidelines
    } = req.body;

    // Validate minimum price
    if (price < 20) {
      return res.status(400).json({
        error: 'Minimum price must be $20 USD'
      });
    }

    // Create listing
    const { data: listing, error } = await supabase
      .from('websites')
      .insert({
        user_id: req.user.id,
        url,
        title,
        description,
        category_id,
        da,
        traffic,
        price,
        show_price,
        link_type,
        turnaround,
        guidelines
      })
      .select()
      .single();

    if (error) throw error;

    // Notify admins
    const { data: admins } = await supabase
      .from('profiles')
      .select('email')
      .eq('role', 'admin');

    if (admins) {
      admins.forEach(admin => {
        sendEmail({
          to: admin.email,
          subject: 'New Listing Submission',
          html: `A new listing "${title}" has been submitted for review.`
        });
      });
    }

    res.status(201).json(listing);
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({
      error: 'Failed to create listing'
    });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Verify ownership
    const { data: listing } = await supabase
      .from('websites')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!listing || listing.user_id !== req.user.id) {
      return res.status(403).json({
        error: 'Not authorized to update this listing'
      });
    }

    // Update listing
    const { data: updatedListing, error } = await supabase
      .from('websites')
      .update({
        ...updates,
        updated_at: new Date()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({
      error: 'Failed to update listing'
    });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    // Verify ownership
    const { data: listing } = await supabase
      .from('websites')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!listing || listing.user_id !== req.user.id) {
      return res.status(403).json({
        error: 'Not authorized to delete this listing'
      });
    }

    // Delete listing
    const { error } = await supabase
      .from('websites')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({
      message: 'Listing deleted successfully'
    });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({
      error: 'Failed to delete listing'
    });
  }
};

exports.getListing = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: listing, error } = await supabase
      .from('websites')
      .select(`
        *,
        category:categories(name),
        owner:profiles(username, email)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!listing) {
      return res.status(404).json({
        error: 'Listing not found'
      });
    }

    res.status(200).json(listing);
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({
      error: 'Failed to fetch listing'
    });
  }
};

exports.getListings = async (req, res) => {
  try {
    const {
      category,
      min_da,
      max_da,
      min_price,
      max_price,
      sort = 'created_at',
      order = 'desc',
      page = 1,
      limit = 10
    } = req.query;

    let query = supabase
      .from('websites')
      .select(`
        *,
        category:categories(name),
        owner:profiles(username)
      `, { count: 'exact' })
      .eq('status', 'active');

    // Apply filters
    if (category) {
      query = query.eq('category_id', category);
    }
    if (min_da) {
      query = query.gte('da', min_da);
    }
    if (max_da) {
      query = query.lte('da', max_da);
    }
    if (min_price) {
      query = query.gte('price', min_price);
    }
    if (max_price) {
      query = query.lte('price', max_price);
    }

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: listings, count, error } = await query
      .order(sort, { ascending: order === 'asc' })
      .range(from, to);

    if (error) throw error;

    res.status(200).json({
      listings,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({
      error: 'Failed to fetch listings'
    });
  }
};

exports.approveListing = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: listing, error } = await supabase
      .from('websites')
      .update({
        status: 'active',
        updated_at: new Date()
      })
      .eq('id', id)
      .select('*, owner:profiles(email)')
      .single();

    if (error) throw error;

    // Notify owner
    await sendEmail({
      to: listing.owner.email,
      subject: 'Listing Approved',
      html: `Your listing "${listing.title}" has been approved and is now live.`
    });

    res.status(200).json(listing);
  } catch (error) {
    console.error('Approve listing error:', error);
    res.status(500).json({
      error: 'Failed to approve listing'
    });
  }
};

exports.rejectListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const { data: listing, error } = await supabase
      .from('websites')
      .update({
        status: 'rejected',
        updated_at: new Date()
      })
      .eq('id', id)
      .select('*, owner:profiles(email)')
      .single();

    if (error) throw error;

    // Notify owner
    await sendEmail({
      to: listing.owner.email,
      subject: 'Listing Rejected',
      html: `Your listing "${listing.title}" has been rejected.\n\nReason: ${reason}`
    });

    res.status(200).json(listing);
  } catch (error) {
    console.error('Reject listing error:', error);
    res.status(500).json({
      error: 'Failed to reject listing'
    });
  }
};
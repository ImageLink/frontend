const { supabase } = require('../config/supabase');
const { sendEmail } = require('../services/email');

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      { count: totalUsers },
      { count: activeUsers },
      { count: suspendedUsers },
      { count: totalListings },
      { count: activeListings },
      { count: pendingListings },
      { count: totalReports },
      { count: openReports },
      { count: resolvedReports },
      { count: totalMessages },
      { count: unreadMessages },
      { count: repliedMessages }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact' }),
      supabase.from('profiles').select('*', { count: 'exact' }).eq('status', 'active'),
      supabase.from('profiles').select('*', { count: 'exact' }).eq('status', 'suspended'),
      supabase.from('websites').select('*', { count: 'exact' }),
      supabase.from('websites').select('*', { count: 'exact' }).eq('status', 'active'),
      supabase.from('websites').select('*', { count: 'exact' }).eq('status', 'pending'),
      supabase.from('reports').select('*', { count: 'exact' }),
      supabase.from('reports').select('*', { count: 'exact' }).eq('status', 'open'),
      supabase.from('reports').select('*', { count: 'exact' }).eq('status', 'resolved'),
      supabase.from('messages').select('*', { count: 'exact' }),
      supabase.from('messages').select('*', { count: 'exact' }).eq('status', 'unread'),
      supabase.from('messages').select('*', { count: 'exact' }).eq('status', 'replied')
    ]);

    // Calculate growth (in a real app, compare with previous period)
    const growth = {
      users: '+12%',
      listings: '+8%',
      revenue: '+15%'
    };

    res.status(200).json({
      stats: {
        users: { total: totalUsers, active: activeUsers, suspended: suspendedUsers },
        listings: { total: totalListings, active: activeListings, pending: pendingListings },
        reports: { total: totalReports, open: openReports, resolved: resolvedReports },
        messages: { total: totalMessages, unread: unreadMessages, replied: repliedMessages },
        growth
      }
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard stats'
    });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { search } = req.query;

    let query = supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (search) {
      query = query.or(`username.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const { data: users, error } = await query;

    if (error) throw error;

    res.status(200).json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      error: 'Failed to fetch users'
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: user, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Notify user of changes
    await sendEmail({
      to: user.email,
      subject: 'Account Updated',
      html: `Your account details have been updated by an administrator.`
    });

    res.status(200).json({ user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      error: 'Failed to update user'
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.auth.admin.deleteUser(id);

    if (error) throw error;

    res.status(200).json({
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      error: 'Failed to delete user'
    });
  }
};

// Additional admin controller methods for listings, reports, categories, and messages
// Follow similar pattern with proper error handling and notifications

exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const { data: report, error } = await supabase
      .from('reports')
      .update({
        status,
        notes,
        resolved_at: status === 'resolved' ? new Date() : null
      })
      .eq('id', id)
      .select('*, reporter:profiles(email)')
      .single();

    if (error) throw error;

    // Notify reporter
    await sendEmail({
      to: report.reporter.email,
      subject: 'Report Status Updated',
      html: `Your report has been updated to status: ${status}`
    });

    res.status(200).json({ report });
  } catch (error) {
    console.error('Update report error:', error);
    res.status(500).json({
      error: 'Failed to update report'
    });
  }
};

exports.replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const { data: message, error } = await supabase
      .from('messages')
      .update({
        status: 'replied',
        admin_reply: content,
        replied_at: new Date()
      })
      .eq('id', id)
      .select('*, sender:profiles(email)')
      .single();

    if (error) throw error;

    // Notify sender
    await sendEmail({
      to: message.sender.email,
      subject: 'Admin Reply to Your Message',
      html: `An administrator has replied to your message: ${content}`
    });

    res.status(200).json({ message });
  } catch (error) {
    console.error('Reply to message error:', error);
    res.status(500).json({
      error: 'Failed to reply to message'
    });
  }
};
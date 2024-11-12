const { supabase } = require('../config/supabase');
const { cacheService } = require('../services/cache');
const { logger } = require('../services/logger');
const { metrics } = require('../services/metrics');

exports.getProfile = async (req, res) => {
  try {
    const cacheKey = `profile:${req.user.id}`;
    const cachedProfile = await cacheService.get(cacheKey);

    if (cachedProfile) {
      return res.status(200).json(cachedProfile);
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select(`
        *,
        websites:websites(count),
        messages:messages(count)
      `)
      .eq('id', req.user.id)
      .single();

    if (error) throw error;

    await cacheService.set(cacheKey, profile);
    
    res.status(200).json(profile);
  } catch (error) {
    logger.error('Get profile error:', error);
    res.status(500).json({
      error: 'Failed to fetch profile'
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { username, whatsapp, telegram } = req.body;

    const { data: profile, error } = await supabase
      .from('profiles')
      .update({
        username,
        whatsapp,
        telegram,
        updated_at: new Date()
      })
      .eq('id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    // Invalidate cache
    await cacheService.del(`profile:${req.user.id}`);

    res.status(200).json(profile);
  } catch (error) {
    logger.error('Update profile error:', error);
    res.status(500).json({
      error: 'Failed to update profile'
    });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const [
      { data: listings },
      { data: messages },
      { data: requirements }
    ] = await Promise.all([
      // Get user's listings
      supabase
        .from('websites')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false })
        .limit(5),

      // Get user's messages
      supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!sender_id(username),
          receiver:profiles!receiver_id(username)
        `)
        .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`)
        .order('created_at', { ascending: false })
        .limit(5),

      // Get user's requirements
      supabase
        .from('requirements')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false })
        .limit(5)
    ]);

    // Update metrics
    metrics.activeUsers.inc();

    res.status(200).json({
      listings,
      messages,
      requirements
    });
  } catch (error) {
    logger.error('Get dashboard error:', error);
    res.status(500).json({
      error: 'Failed to fetch dashboard data'
    });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const { data: notifications, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(notifications);
  } catch (error) {
    logger.error('Get notifications error:', error);
    res.status(500).json({
      error: 'Failed to fetch notifications'
    });
  }
};

exports.markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: notification, error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json(notification);
  } catch (error) {
    logger.error('Mark notification read error:', error);
    res.status(500).json({
      error: 'Failed to update notification'
    });
  }
};

exports.getStats = async (req, res) => {
  try {
    const [
      { count: totalListings },
      { count: activeListings },
      { count: totalMessages },
      { count: unreadMessages },
      { count: totalRequirements }
    ] = await Promise.all([
      // Total listings
      supabase
        .from('websites')
        .select('*', { count: 'exact' })
        .eq('user_id', req.user.id),

      // Active listings
      supabase
        .from('websites')
        .select('*', { count: 'exact' })
        .eq('user_id', req.user.id)
        .eq('status', 'active'),

      // Total messages
      supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`),

      // Unread messages
      supabase
        .from('messages')
        .select('*', { count: 'exact' })
        .eq('receiver_id', req.user.id)
        .eq('status', 'unread'),

      // Total requirements
      supabase
        .from('requirements')
        .select('*', { count: 'exact' })
        .eq('user_id', req.user.id)
    ]);

    res.status(200).json({
      listings: {
        total: totalListings,
        active: activeListings
      },
      messages: {
        total: totalMessages,
        unread: unreadMessages
      },
      requirements: {
        total: totalRequirements
      }
    });
  } catch (error) {
    logger.error('Get stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch user stats'
    });
  }
};
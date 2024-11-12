const { supabase } = require('../config/supabase');
const { sendEmail } = require('../services/email');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver_id, website_id, subject, content } = req.body;

    const { data: message, error } = await supabase
      .from('messages')
      .insert({
        sender_id: req.user.id,
        receiver_id,
        website_id,
        subject,
        content
      })
      .select('*, sender:profiles(username), receiver:profiles(username, email)')
      .single();

    if (error) throw error;

    // Notify receiver
    await sendEmail({
      to: message.receiver.email,
      subject: `New Message: ${subject}`,
      html: `You have received a new message from ${message.sender.username}.\n\nMessage: ${content}`
    });

    res.status(201).json(message);
  } catch (error) {
    console.error('Send message error:', error);
    res.status(500).json({
      error: 'Failed to send message'
    });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles(username),
        receiver:profiles(username)
      `)
      .or(`sender_id.eq.${req.user.id},receiver_id.eq.${req.user.id}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(messages);
  } catch (error) {
    console.error('Get messages error:', error);
    res.status(500).json({
      error: 'Failed to fetch messages'
    });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data: messages, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles(username),
        receiver:profiles(username)
      `)
      .or(
        `and(sender_id.eq.${req.user.id},receiver_id.eq.${userId}),
         and(sender_id.eq.${userId},receiver_id.eq.${req.user.id})`
      )
      .order('created_at');

    if (error) throw error;

    res.status(200).json(messages);
  } catch (error) {
    console.error('Get conversation error:', error);
    res.status(500).json({
      error: 'Failed to fetch conversation'
    });
  }
};

exports.reportMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const { data: message } = await supabase
      .from('messages')
      .select('*')
      .eq('id', id)
      .single();

    if (!message) {
      return res.status(404).json({
        error: 'Message not found'
      });
    }

    const { data: report, error } = await supabase
      .from('reports')
      .insert({
        reporter_id: req.user.id,
        reported_id: message.sender_id,
        message_id: id,
        reason
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
          subject: 'New Message Report',
          html: `A message has been reported.\n\nReason: ${reason}`
        });
      });
    }

    res.status(201).json(report);
  } catch (error) {
    console.error('Report message error:', error);
    res.status(500).json({
      error: 'Failed to report message'
    });
  }
};

exports.getMessageReports = async (req, res) => {
  try {
    const { data: reports, error } = await supabase
      .from('reports')
      .select(`
        *,
        reporter:profiles(username),
        reported:profiles(username),
        message:messages(*)
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json(reports);
  } catch (error) {
    console.error('Get message reports error:', error);
    res.status(500).json({
      error: 'Failed to fetch message reports'
    });
  }
};
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { data: user } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', decoded.id)
      .single();

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

const adminAuth = async (req, res, next) => {
  try {
    await auth(req, res, () => {});
    
    if (req.user.role !== 'admin') {
      throw new Error();
    }
    
    next();
  } catch (error) {
    res.status(403).send({ error: 'Access denied.' });
  }
};

module.exports = { auth, adminAuth };
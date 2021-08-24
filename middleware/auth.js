const { User } = require('../models/User');
let auth = (req, res, next) => {
  
  // 인증 처리 하는곳
  // client cookie 에서 token을 가져온다.
  let token = req.cookies.x_auth;

  // token을 복호화 한후 유저를 찾는다.
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true })
    
    req.token = token;
    req.user = user;
    next();
  })
  // user가 있으면 인증 Okay
  // 유저가 없으면 인증 No!
}

module.exports = {auth}
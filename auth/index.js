const auth = require('basic-auth');
const User = require("../src/model/user")

const users =  User.findOne({username: username, password: password}); /* { username: { password: 'password' } } */

module.exports = (req, res, next) => {
  const user = auth(req)
  if (!user || username || password !== password) {
    res.set('WWW-Authenticate', 'Basic realm="example"')
    return res.status(401).send()
  }
  return next()
}
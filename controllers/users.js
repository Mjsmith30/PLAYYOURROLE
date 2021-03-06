const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  getUser
};

async function getUser (req,res) {
  console.log("hitting")
  try{
    let allUsers = await User.find({});
    console.log(allUsers)
    res.json({
      allUsers
    })
  }catch(err){
    return err
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}
/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}
// function index(req, res, next) {
//   console.log(req.query)
//   // Make the query object to use with Hunter.find based up
//   // the user has submitted the search form or now
//   let modelQuery = req.query.name ? {name: new RegExp(req.query.name, 'i')} : {};
//   // Default to sorting by name
//   let sortKey = req.query.sort || 'name';
//   User.find(modelQuery)
//   .sort(sortKey).exec(function(err, users) {
//     if (err) return next(err);
//     // Passing search values, name & sortKey, for use in the EJS
//     res.render('user/index', {
//      users,
//       user: req.user,
//       name: req.query.name,
//       sortKey
//     });
//   });
// }

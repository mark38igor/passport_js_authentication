const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../model/UserModel");
const passwordUtils = require("../utiils/password");
const userController = require("../controller/UserController");
module.exports = (passport) => {
  let signUpCallBack = (req, email, password, done) => {
    userController.checkUserExist(email, async (exists) => {
      try {
        if (exists instanceof Error)
          return done(null, false, { message: error.message });
        if (exists)
          return done(null, false, {
            message: "401 -- Email already Exists",
          });
        let hashPassword = await passwordUtils.encryptPassword(password);
        let userData = {
          email: email,
          password: hashPassword,
          name: req.body.name,
        };
        let result = await userModel.createUser(userData);
        done(null, { id: result.insertId, name: req.body.nmae, email: email });
      } catch (error) {
        done(null, false, { message: error.message });
      }
    });
  };

  let signInCallBack = (req, email, password, done) => {
    // console.log("Request", req.body.email, req.body.password);
    userController.checkValidUser(email, password, async (error) => {
      try {
        if (error instanceof Error)
          return done(null, false, {
            message: `${error.status}--${error.message}`,
          });
        // if (error instanceof Error) return done(error);
        let result = await userModel.getInfo(email);
        let userData = {
          email: result[0].email,
          name: result[0].name,
          id: result[0].id,
        };
        return done(null, userData);
      } catch (error) {
        done(null, false, { message: error.message });
      }
    });
  };

  let options = {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true, // allows us to pass back the entire request to the callback
  };

  let signInStrategy = new LocalStrategy(options, signInCallBack);

  let signUpStrategy = new LocalStrategy(options, signUpCallBack);

  // store id in session when its a first valid visit to server using searlizser

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let result = await userModel.getInfoById(id);
      let userData = {
        email: result[0].email,
        name: result[0].name,
        id: result[0].id,
      };
      done(null, userData);
    } catch (error) {
      done(null, { message: error.message });
    }
  });
  passport.use("local-signin", signInStrategy);
  passport.use("local-signup", signUpStrategy);
};

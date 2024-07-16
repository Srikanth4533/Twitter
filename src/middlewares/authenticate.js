import passport from "passport";

export const authenticate = (req, res, next) => {
  console.log("inside authenticate");
  passport.authenticate("jwt", (err, user) => {
    if (err) next(err);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorised access no token",
      });
    }
    console.log(user);
    req.user = user;
    next();
  })(req, res, next);
};

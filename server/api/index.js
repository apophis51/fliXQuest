const router = require("express").Router();
module.exports = router;

// o: some code for setting req.user
// function authorize(req, res, next) {
//   const user = await User.findByToken(req.headers.authorization);
// 
//   if(user) {
//     req.user = user;
//     next()
//   } else {
//     next(new Error("..."))
//   }
// }
// router.use(authorize)

router.use("/users", require("./users"));
router.use("/movies", require("./movies"));
router.use("/tvshows", require("./TVSHOWS"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

const Router = require("express").Router();
const control = require("../controller/control");

Router.get("/", (req, res) => {
  res.status(200).json({ message: "from server" });
});
Router.post("/create", control.signdata);
Router.post("/inside", control.loginuser);
Router.post("/forpass",control.forpass);
Router.post('/changepass',control.changepass)



module.exports = Router;

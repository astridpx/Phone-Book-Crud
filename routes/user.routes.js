const router = require("express").Router();
const User = require("../model/user.model");

router.get("/", async (req, res) => {
  await User.find()
    .then((user) => {
      res.json(user);
    })
    .catch((err) => res.status(400).json(err));
});

router.post("/add/user", async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const contact = req.body.contact;

  const newUser = new User({
    name,
    address,
    contact,
  });

  await newUser
    .save()
    .then((result) => res.json("New user added."))
    .catch((err) => res.status(400).json(err));
});

router.put("/update/:id", async (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const contact = req.body.contact;

  await User.findByIdAndUpdate(req.params.id).then((user) => {
    user.name = req.body.name ? req.body.name : user.name;
    user.address = req.body.address ? req.body.address : user.address;
    user.contact = req.body.contact ? req.body.contact : user.contact;

    user
      .save()
      .then((result) => res.json("Update Done."))
      .catch((err) => res.status(400).json(err));
  });
});

router.delete("/deleteuser/:id", async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((result) => res.json("Delete user success"))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;

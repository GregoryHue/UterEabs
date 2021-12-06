const Menu = require("../models/MenuModel");

const CreateMenus = (req, res, next) => {
  console.log(req.body);
  delete req.body._id;
  const menu = new Menu({
    ...req.body,
  });
  menu
    .save()
    .then(() => res.status(201).json({ message: "Menu created !" }))
    .catch((error) => res.status(400).json({ error }));
};

const GetMenus = (req, res, next) => {
  console.log(req.body);

  Menu.find({
    $or: [{ owner_id: req.body.owner_id }, { _id: req.body._id }],
  }).then(function (menus) {
    res.send(menus);
  });
};

const ModifyMenus = (req, res, next) => {
  console.log(req.body);
  Menu.findByIdAndUpdate(
    { _id: req.body._id },
    req.body,
    function (error, menu) {
      if (error) return console.log(error);
      if (!menu)
        return res.status(404).json({ message: "Menu can't be found." });
      res.json({ message: "Menu modified !" });
    }
  );
};

const DeleteMenus = (req, res, next) => {
  console.log(req.body);
  Menu.deleteOne({ _id: req.body._id }).then(function (menus) {
    res.json({ message: "Menu deleted !" });
  });
};

module.exports = {
  CreateMenus,
  GetMenus,
  ModifyMenus,
  DeleteMenus,
};

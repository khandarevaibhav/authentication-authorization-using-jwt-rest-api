const express = require("express");
const { getMenu,createMenu, updateMenu, deleteMenu } = require("../controllers/menuController");
const auth = require("../middlewares/auth")
const menusRouter = express.Router();

menusRouter.get('/get', auth, getMenu);
menusRouter.post('/add',auth, createMenu);
menusRouter.put('/:id',auth, updateMenu);
menusRouter.delete('/:id',auth, deleteMenu);


module.exports=menusRouter;


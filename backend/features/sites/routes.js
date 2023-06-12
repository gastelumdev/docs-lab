var express = require("express"),
  router = express.Router(),
  verifyToken = require('../../middleware/authJWT');
const { config } = require("./config")
const { getData, createData, updateData, deleteData } = require("./controllers");

router.get(`/${config.name}`, verifyToken, getData);

router.post(`/${config.name}`, verifyToken, createData);

router.post(`/${config.name}/update/:id`, verifyToken, updateData)

router.post(`/${config.name}/delete/:id`, verifyToken, deleteData)

module.exports = router;
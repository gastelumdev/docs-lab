var express = require("express"),
  router = express.Router(),
  verifyToken = require('../middleware/authJWT');
const { default: mongoose } = require("mongoose");
const siteModel = require("../models/Site");

router.get("/sites", verifyToken, async (request, response) => {
    if (request.user) {
        console.log("Owner:", request.user)
        const sites = await siteModel.find({owner: request.user._id});

        console.log("sites: ", sites)

        try {
            response.send(sites);
        } catch (error) {
            response.status(500).send(error);
        }
    } else {
        response.status(403).send({message: "Not Authorized"});
    }
    
});

router.post("/sites", verifyToken, async (request, response) => {
    console.log("Try to create", request);
    if (request.user) {
        const site = new siteModel(request.body);

        try {
            await site.save();
            response.send(site);
        } catch (error) {
            response.status(500).send(error);
        }
    } else {
        response.status(403).send({message: "Not Authorized"});
    }
});

router.post("/sites/update/:id", verifyToken, async (request, response) => {
    if (request.user) {
        console.log("Try to edit", request.params.id);

        try {
            const res = await siteModel.findByIdAndUpdate(request.params.id, request.body)
            console.log("Update res:", res);
            response.send(res);
        } catch (error) {
            response.status(500).send(error);
        }
    }
})

router.post("/sites/delete/:id", verifyToken, async (request, response) => {
    if (request.user) {
        console.log("Try to delete", request.params.id);

        try {
            const res = await siteModel.findByIdAndDelete(request.params.id);
            console.log("Delete res:", res)
            response.send(res);
        } catch (error) {
            response.status(500).send(error);
        }
    } else {
        response.status(403).send({message: "Not Authorized"});
    }
})

module.exports = router;
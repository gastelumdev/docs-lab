let Model = require("./model");
const config = require("./config")

exports.getData = async (request, response) => {
    if (request.user) {
        const data = await Model.find({site: request.params.dataId});

        try {
            response.send(data);
        } catch (error) {
            response.status(500).send(error);
        }
    } else {
        response.status(403).send({message: "Not Authorized"});
    }
};

exports.createData = async (request, response) => {
    if (request.user) {
        const data = new Model(request.body);

        try {
            await data.save();
            response.send(data);
        } catch (error) {
            response.status(500).send(error);
        }
    } else {
        response.status(403).send({message: "Not Authorized"});
    }
};

exports.getOneData = async (request, response) => {
    console.log("Making a call")
    const res = await Model.findById(request.params.id);
    try {
        response.send(res);
    } catch (error) {
        response.status(500).send(error);
    }
}

exports.updateData = async (request, response) => {
    if (request.user) {

        try {
            const res = await Model.findByIdAndUpdate(request.params.id, request.body);
            response.send(res);
        } catch (error) {
            response.status(500).send(error);
        }
    }
};

exports.deleteData = async (request, response) => {
    if (request.user) {
        try {
            const res = await Model.findByIdAndDelete(request.params.id);
            response.send(res);
        } catch (error) {
            response.status(500).send(error);
        }
    } else {
        response.status(403).send({message: "Not Authorized"});
    }
};
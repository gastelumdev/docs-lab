const mongoose = require("mongoose");

exports.config = {
    name: "sites",
    altName: "site",
    schemaName: "Site",
    schema: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
};
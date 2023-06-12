const mongoose = require("mongoose");

exports.config = {
    name: "sections",
    altName: "section",
    schemaName: "Section",
    schema: {
        header: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        page: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Page"
        }
    }
};
const mongoose = require("mongoose");

exports.config = {
    name: "pages",
    altName: "page",
    schemaName: "Page",
    schema: {
        header: {
            type: String,
            required: true,
        },
        site: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Site"
        }
    }
};
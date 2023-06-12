const mongoose = require("mongoose");

const SiteSchema = new mongoose.Schema({
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
});

const Site = mongoose.model("Site", SiteSchema);

module.exports = Site;
const mongoose = require("mongoose");
const {isValidById} = require("../helpers/isValidId");

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKeys: false});

contactSchema.post("save", isValidById);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

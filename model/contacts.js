const mongoose = require("mongoose");
const {isValidById} = require("../helpers/isValidId");
const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
}, {versionKeys: false});

contactSchema.post("save", isValidById);

const Contact = model("Contact", contactSchema);

module.exports = Contact;

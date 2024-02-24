const mongoose = require("mongoose");
const {isValidById} = require("../helpers/isValidId");
const {Schema, model} = require("mongoose");
// const { Users } = require("../model/users");

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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  token: {
    type: String,
    default: "",
  },

}, {versionKeys: false});

contactSchema.post("save", isValidById);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
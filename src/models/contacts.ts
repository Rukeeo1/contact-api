const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  //create a schema: the structure of the data you want to save
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    minlength: 8
  },
  mobile: {
    type: String,
    minlength: 5,
    maxlength: 15
  },
  company: {
    type: String,
    minlength: 5,
    maxlength: 50
  },
  isBlocked: {
    type: Boolean,
    default: false
  }
});

const ContactModel = mongoose.model('Contact', contactSchema); //compress that into a model

function validateContact(contact: any) {
  //joi validation....we use both for double check...
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string().email(),
    company: Joi.string(),
    mobile: Joi.string().regex(/^\d{4}-\d{3}-\d{4}$/),
    isBlocked: Joi.boolean()
  };

  return Joi.validate(contact, schema);
}

exports.Contact = ContactModel;
exports.validate = validateContact;

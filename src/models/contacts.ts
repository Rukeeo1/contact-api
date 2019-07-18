// import { string } from '@hapi/joi';

const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

/*
const contacts = [
    {
      id: '1',
      name: 'Valeri Obi',
      email: 'obichiz@gmail.com',
      mobile: '0818-384-0096',
      company: 'okon and sons',
      isBlocked: 'false'
    },
    {
      id: '2',
      name: 'Anita Obi',
      email: 'anitachiz@gmail.com',
      mobile: '0818-000-0000',
      company: 'anita and sons',
      isBlocked: 'false'
    },
    {
      id: '3',
      name: 'Johnson Okoro',
      email: 'okorojohnson@gmail.com',
      mobile: '0818-001-0001',
      company: 'okoro and sons',
      isBlocked: 'false'
    },
    {
      id: '59492983-246d-4808-af0f-9be014a4ce62',
      name: 'xxxxxxn',
      email: 'xxxxxx@gmail.com',
      mobile: '0818-384-0096',
      isBlocked: 'false'
    }
  ];
*/

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

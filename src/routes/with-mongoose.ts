//import mongoose from 'mongoose';
import express from 'express';
//const express = require('express');
const router = express.Router();
const { Contact, validate } = require('../models/contacts');
/*

id: '1',
      name: 'Valeri Obi',
      email: 'obichiz@gmail.com',
      mobile: '0818-384-0096',
      company: 'okon and sons',
      isBlocked: 'false'
*/

router.get('/', async (_req: Request, res: any) => {
  const contacts = await Contact.find().sort('name');
  res.send(contacts);
});

router.post('/', async (req: any, res: any) => {
  const { error } = validate(req.body); //joi validates the body
  if (error) return res.status(400).send(error.details[0].message); //sends an error if there's any

  let contact = new Contact({
    //this is contact schema you defined.
    name: req.body.name,
    email: req.body.email,
    mobile: req.body.mobile,
    company: req.body.company,
    isBlocked: req.body.isBlocked
  });
  try {
    contact = await contact.save(); //save the contact wait for a response
    res.send(contact); // send the response back to the client
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put('/:id', async (req: any, res: any) => {
  const { error } = validate(req.body); //if wrong details are passed in...it throws an erro
  if (error) return res.status(400).send(error.details[0].message);
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.send(contact); //returns the contact...after update
  } catch (error) {
    return res.status(404).send("there's no contact with that id");
  }
});

router.delete('/:id', async (req: any, res: any) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (!contact)
      return res.status(404).send('The contact you serach for doesnt exist');
    res.send(contact);
  } catch (error) {
    return res.status(404).send('The contact you serach for doesnt exist');
  }
});
module.exports = router;

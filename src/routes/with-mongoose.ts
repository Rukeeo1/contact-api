import mongoose from 'mongoose';
const express = require('express');
const router = express.Router();
const {Contact, validate} = require('../models/contacts')
/*



*/

router.get('/', async (_req:Request, res:any) => {
  const contacts = await Contact.find().sort('name');
  res.send(contacts)
});

module.exports = router;
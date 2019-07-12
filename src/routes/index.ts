import { Router } from 'express';
import uuid from 'uuid';
import joi, { any } from '@hapi/joi';
import fs from 'fs';
// import { func } from '@hapi/joi';

// import  contact from '../../data/contact'
const contacts = require('../../data/contact');

const router = Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

//get everyone in the contact list...
// router.get('/api/contacts', (_req, res: any) => {
//   console.log('hello');
//   res.json(contact);
// });

router.get('/api/contacts', (_req, res: any) => {
  fs.readFile('./src/routes/index.json', 'utf8', function(err, data) {
    if (err) throw err;
    let contacts = JSON.parse(data);
    res.send(contacts);
  });
});

router.get('/api/contacts/:id', (req, res) => {
  fs.readFile('./src/routes/index.json', 'utf8', function(err, data) {
    if (err) throw err;
    let contacts = JSON.parse(data);

    const found = contacts.some(
      (contact: { id: number }) => contact.id === Number(req.params.id)
    );

    if (found) {
      res.json(
        contacts.filter(
          (contact: { id: number }) => contact.id === Number(req.params.id)
        )
      );
    } else {
      res.status(400).json({ msg: 'Member not Found' });
    }
  });
});
//my scheman validates name...
//address...
const schema = {
  name: joi
    .string()
    .min(3)
    .required(),
  mobile: joi
    .string()
    .min(11)
    .required(),
  address: joi
    .string()
    .min(10)
    .optional(),
  email: joi
    .string()
    .email()
    .required()
    .lowercase()
};

interface Home {
  name: string;
  mobile: string;
  home: string;
  address?: string;
  email?: string;
  company?: string;
  isBlocked: false;
}
let rukee
router.post('/api/contacts', (req, res) => {
  const { error, value } = joi.validate<Home>(req.body, schema, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    res.status(404).json(error);
    return;
  }

  const newContact = {
    id: uuid.v4(),
    ...value,
    isBlocked: false
  };

   contacts.push(newContact)


  res.status(200).json({ data: contacts });

 
  //let updatedContactList = JSON.stringify([...contacts, newContact]);
  let updatedContactList = JSON.stringify(contacts)
  //console.log(updatedContactList);

  console.log(updatedContactList)
  fs.writeFile('./src/routes/index.json', updatedContactList, 'utf8', function(
    err: Error,
    data: object[]
  ): any {
    if (err) throw err;
    // res.json(data);
  console.log(data)
  });
  //at this point before we send a response, we want to add the item to the
  //array
  
/*
  // res.status(200).json({ data: `Welcome home ${newContact}` });

  */
});



export default router;

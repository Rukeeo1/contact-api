import { Router } from 'express';
import uuid from 'uuid';
import joi from '@hapi/joi';
import fs from 'fs';

// import  contact from '../../data/contact'
const contacts = require('../../data/contact');

const router = Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

/*
function writeToJson(parameter:object[]){
  fs.writeFile('./src/routes/index.json', parameter, 'utf8', function(
    err: Error,
    data: object[]
  ): any {
    if (err) throw err;

    console.log(data);
  });
}

*/

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
    console.log(contacts);
    const found = contacts.some(
      (contact: { id: string }) => contact.id === req.params.id
    );

    if (found) {
      res.json(
        contacts.filter(
          (contact: { id: string }) => contact.id === req.params.id
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

  contacts.push(newContact);

  res.status(200).json({ data: contacts });

  //let updatedContactList = JSON.stringify([...contacts, newContact]);
  let updatedContactList = JSON.stringify(contacts);

  fs.writeFile('./src/routes/index.json', updatedContactList, 'utf8', function(
    err: Error,
    data: object[]
  ): any {
    if (err) throw err;

    console.log(data);
  });
});

router.put('/api/contacts/:id', (req, res) => {
  fs.readFile('./src/routes/index.json', 'utf8', function(err, data) {
    if (err) throw err;
    let contacts = JSON.parse(data);

    const found = contacts.some(
      (contact: { id: string }) => contact.id === req.params.id
    ); //check to see if the nmember exist

    if (found) {
      const updatedMember = req.body;

      contacts.forEach((contact )=> {
        if (contact.id === req.params.id) {
          contact.name = updatedMember.name ? updatedMember.name : contact.name;
          contact.email = updatedMember.email
            ? updatedMember.email
            : contact.email;
          contact.phone = updatedMember.phone
            ? updatedMember.phone
            : contact.phone;
          contact.company = updatedMember.company
            ? updatedMember.company
            : contact.company;
          contact.isBlocked = updatedMember.isBlocked
            ? updatedMember.isBlocked
            : contact.isBlocked;

          res.json({ msg: 'contact was updated', contact });

          fs.writeFile('./src/routes/index.json', contacts, 'utf8', function(
            err: Error,
            data: object[]
          ): any {
            if (err) throw err;

            console.log(data);
          });
        }
      });
    } else {
      res.status(400).json({ msg: 'Member not Found' });
    }
  });
});

//i see a put request,
//but i dont' see a delete request...
//how do i get a

console.log(contacts);

export default router;

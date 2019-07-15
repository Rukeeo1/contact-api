import { Router } from 'express';
import uuid from 'uuid';
import joi from '@hapi/joi';
import fs from 'fs';

const router = Router();

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

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Contact Api' });
});

//returns an array of the contact object
router.get('/api/contacts', (_req, res: any) => {
  // fs.readFile(
  //   '/Users/rukeeo1/Downloads/Compressed/express-starter/data/contact.json',
  //   'utf8',
  //   function(err, data) {
  //     if (err) throw err;
  //     let contacts = JSON.parse(data);
      res.send(contacts);
    // }
  // );
});

//returns a single contact
router.get('/api/contacts/:id', (req, res) => {
  const found = contacts.some(
    (contact: { id: string }) => contact.id === req.params.id
  );

  if (found) {
    res.json(
      contacts.filter((contact: { id: string }) => contact.id === req.params.id)
    );
  } else {
    res.status(400).json({ msg: 'Member not Found' });
  }
});

//my scheman validates name...
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
    res.status(404).json(error['details']);
    return;
  }

  const newContact: any = {
    id: uuid.v4(),
    ...value,
    isBlocked: 'false'
  };
  contacts.push(newContact);

  res.status(200).json(contacts);
});

router.put('/api/contacts/:id', (req, res) => {
  const found = contacts.some(
    (contact: { id: string }) => contact.id === req.params.id
  );

  if (found) {
    const updatedMember = req.body;

    contacts.forEach((contact: any) => {
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
      }
    });
  } else {
    res.status(400).json({ msg: 'Member not Found' });
  }
});

router.delete('/api/contacts/:id', (req, res) => {
  fs.readFile(
    '/Users/rukeeo1/Downloads/Compressed/express-starter/data/contact.json',
    'utf8',
    function(err, data) {
      if (err) throw err;
      let contacts = JSON.parse(data);

      const found = contacts.some(
        (contact: { id: string }) => contact.id === req.params.id
      );

      if (found) {
        const contactListAfterDelete = contacts.filter(
          (contact: { id: string }) => contact.id !== req.params.id
        );
        res.json(contactListAfterDelete);
      } else {
        res.status(400).json({ msg: 'Member not Found' });
      }
    }
  );
});

router.get('/api/blocked', (_req, res) => {
  const blockedContacts = contacts.filter(
    contact => contact.isBlocked === 'true'
  );
  res.send(blockedContacts);
});

module.exports = router;

import { Router } from 'express';
import fs from 'fs';
// import { func } from '@hapi/joi';

// import  contact from '../../data/contact'
const contact = require('../../data/contact');

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
    console.log(found);
    if (found) {
      res.json(
        contact.filter(
          (contact: { id: number }) => contact.id === Number(req.params.id)
        )
      );
    } else {
      res.status(400).json({ msg: 'Member not Found' });
    }
  });
});

router.post('/api/contacts', (req, res) => {

})

export default router;

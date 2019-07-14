import { Router } from 'express';
import joi from '@hapi/joi';

const router = Router();

/* GET home page. */
router.get('/', function(_req, res) {
  res.render('index', { title: 'Express' });
});

const schema = {
  fullName: joi
    .string()
    .min(3)
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
  fullName: string;
  address?: string;
  email?: string;
}

router.post('/home', (req, res) => {
  const { error, value } = joi.validate<Home>(req.body, schema, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    res.status(404).json(error);
    return;
  }

  res.status(200).json({ data: `Welcome home ${value.fullName}` });
});

//export default router;

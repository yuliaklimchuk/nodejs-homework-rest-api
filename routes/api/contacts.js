const express = require('express');
const Joi = require('joi');
const contacts = require('../../models/contacts');
const createError = require('../../helpers/createError');

const router = express.Router();

const contactShema = Joi.object({
  name: Joi.string()
        .min(2)
        .max(30)
        .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string().required(),
})


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) { 
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) { 
      throw createError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) { 
      throw createError(404);
    }
    res.json({ message: 'Contact deleted' })
  } catch (error) {
    next(error);
  }
  
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactShema.validate(req.body);
    if (error) { 
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) { 
      throw createError(404);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }

})

module.exports = router

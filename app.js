import express from 'express'
import bodyParser from 'body-parser'
import { check, validationResult } from 'express-validator'

import {
  createHoliday,
  deleteHoliday,
  getHolidays,
  getHoliday,
  updateHoliday,
  createLocation,
  deleteLocation,
  getLocations,
  getLocation,
  updateLocation,
  createReservation,
  deleteReservation,
  getReservations,
  getReservation,
  updateReservation,
} from './controllers.js'

const app = express()
const port = 8080

app.use(bodyParser.json())

function handleValidationResult(req, res, controllerMethod) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  controllerMethod(req, res)
}

// Holiday routes
app.post(
  '/holidays',
  [
    check('location')
      .optional()
      .isObject()
      .withMessage('Location must be an integer'),
    check('title').optional().isString().withMessage('Title must be a string'),
    check('startDate')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Invalid date format'),
    check('duration')
      .optional()
      .isInt()
      .withMessage('Duration must be an integer'),
    check('price').optional().isInt().withMessage('Price must be a number'),
    check('freeSlots')
      .optional()
      .isInt()
      .withMessage('Free slots must be an integer'),
  ],
  (req, res) => {
    handleValidationResult(req, res, createHoliday)
  }
)
app.put(
  '/holidays',
  [
    check('location')
      .optional()
      .isObject()
      .withMessage('Location must be an integer'),
    check('title').optional().isString().withMessage('Title must be a string'),
    check('startDate')
      .optional()
      .isDate()
      .toDate()
      .withMessage('Invalid date format'),
    check('duration')
      .optional()
      .isInt()
      .withMessage('Duration must be an integer'),
    check('price').optional().isInt().withMessage('Price must be a number'),
    check('freeSlots')
      .optional()
      .isInt()
      .withMessage('Free slots must be an integer'),
  ],
  (req, res) => {
    handleValidationResult(req, res, updateHoliday)
  }
)
app.delete('/holidays/:id', deleteHoliday)
app.get('/holidays', getHolidays)
app.get('/holidays/:id', getHoliday)

// Location routes
app.post(
  '/locations',
  [
    check('street')
      .optional()
      .isString()
      .withMessage('Street must be a string'),
    check('number')
      .optional()
      .isInt()
      .withMessage('Number must be a string'),
    check('city').optional().isString().withMessage('City must be a string'),
    check('country')
      .optional()
      .isString()
      .withMessage('Country must be a string'),
  ],
  (req, res) => {
    handleValidationResult(req, res, createLocation)
  }
)
app.put(
  '/locations',
  [
    check('street')
      .optional()
      .isString()
      .withMessage('Street must be a string'),
      check('number')
      .optional()
      .isInt()
      .withMessage('Number must be a string'),
      check('city').optional().isString().withMessage('City must be a string'),
    check('country')
    .optional()
    .isString()
    .withMessage('Country must be a string'),
  ],
  (req, res) => {
    handleValidationResult(req, res, updateLocation)
  }
  )
  app.delete('/locations/:id', deleteLocation)
  app.get('/locations', getLocations)
  app.get('/locations/:id', getLocation)
  
  // Reservation routes
app.post(
  '/reservations',
  [
    check('contactName')
      .optional()
      .isString()
      .withMessage('Contact name must be a string'),
    check('phoneNumber')
      .optional()
      .isMobilePhone()
      .withMessage('Phone number must be a string'),
  ],
  (req, res) => {
    handleValidationResult(req, res, createReservation)
  }
)
app.put(
  '/reservations',
  [
    check('id').optional().isInt().withMessage('ID must be an integer'),
    check('contactName')
      .optional()
      .isString()
      .withMessage('Contact name must be a string'),
    check('phoneNumber')
      .optional()
      .isMobilePhone()
      .withMessage('Phone number must be a string'),
  ],
  (req, res) => {
    handleValidationResult(req, res, updateReservation)
  }
)
app.delete('/reservations/:id',deleteReservation)
app.get('/reservations', getReservations)
app.get('/reservations/:id',getReservation)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

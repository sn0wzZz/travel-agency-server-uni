import { nanoid } from 'nanoid'


// Holidays
const holidays = []

export const createHoliday = (req, res) => {
  try {
    const newHoliday = { ...req.body, id: nanoid(10) }

    holidays.push(newHoliday)
    console.log('holidays ', holidays)

    res.status(201).json({ holidays })
  } catch (error) {
    console.error('Error creating location:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteHoliday = (req, res) => {
  const { id } = req.params

  try {
    const index = holidays.findIndex((holiday) => holiday.id === id)

    if (index !== -1) {
      holidays.splice(index, 1)
      res.json({ success: true, message: 'Holiday deleted successfully' })
    } else {
      res.status(404).json({ error: 'Holiday not found' })
    }
  } catch (error) {
    console.error('Error deleting holiday:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getHolidays = (req, res) => {
  try {
    const { location, startDate, duration } = req.query

    console.log(req.query)

    let filteredHolidays = [...holidays]

    if (location) {
      filteredHolidays = filteredHolidays.filter(
        (holiday) =>
          holiday.location.city.toLowerCase() === location.toLowerCase() ||
          holiday.location.country.toLowerCase() === location.toLowerCase()
      )
    }

    if (startDate) {
      filteredHolidays = filteredHolidays.filter(
        (holiday) => holiday.startDate.toLowerCase() === startDate.toLowerCase()
      )
    }

    if (duration) {
      filteredHolidays = filteredHolidays.filter(
        (holiday) =>
          holiday.duration.toString().toLowerCase() === duration.toLowerCase()
      )
    }

    console.log(filteredHolidays)

    res.json({ ...filteredHolidays })
  } catch (error) {
    console.error('Error fetching holidays:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getHoliday = (req, res) => {
  const { id } = req.params

  try {
    const holiday = holidays.find((holiday) => holiday.id === id)

    if (holiday) {
      res.json({ ...holiday })
    } else {
      res.status(404).json({ error: 'Holiday not found' })
    }
  } catch (error) {
    console.error('Error getting holiday:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateHoliday = (req, res) => {
  const { id, title, startDate, duration, price, freeSlots, location } =
    req.body

  try {
    const holidayToUpdate = holidays.find((holiday) => holiday.id === id)

    if (holidayToUpdate) {
      holidayToUpdate.title = title
      holidayToUpdate.startDate = startDate
      holidayToUpdate.duration = duration
      holidayToUpdate.price = price
      holidayToUpdate.freeSlots = freeSlots
      holidayToUpdate.location = location

      res.json({ success: true, message: 'Holiday updated successfully' })
    } else {
      res.status(404).json({ error: 'Holiday not found' })
    }
  } catch (error) {
    console.error('Error updating holiday:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}


// Locations
const locations = []

export const createLocation = (req, res) => {
  try {
    const newLocation = { ...req.body, id: nanoid(10) }

    locations.push(newLocation)
    console.log('locations ', locations)

    // Send a JSON response to the front-end
    res.status(201).json({ locations })
  } catch (error) {
    console.error('Error creating location:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteLocation = (req, res) => {
  const { id } = req.params

  try {
    // Find the index of the location with the specified ID
    const index = locations.findIndex((location) => location.id === id)

    // If the location is found, remove it from the array
    if (index !== -1) {
      locations.splice(index, 1)
      res.json({ success: true, message: 'Location deleted successfully' })
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (error) {
    console.error('Error deleting location:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getLocations = (req, res) => {
  try {
    // Send a JSON response with the locations array
    res.json({ ...locations })
  } catch (error) {
    console.error('Error fetching locations:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getLocation = (req, res) => {
  const { id } = req.params

  try {
    // Find the location with the specified ID
    const location = locations.find((location) => location.id === id)

    // If the location is found, send it in the response
    if (location) {
      res.json({ ...location })
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (error) {
    console.error('Error getting location:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const updateLocation = (req, res) => {
  const { id, street, number, city, country } = req.body

  try {
    const locationToUpdate = locations.find((location) => location.id === id)

    if (locationToUpdate) {
      locationToUpdate.street = street
      locationToUpdate.number = number
      locationToUpdate.city = city
      locationToUpdate.country = country

      res.json({ success: true, message: 'Location updated successfully' })
    } else {
      res.status(404).json({ error: 'Location not found' })
    }
  } catch (error) {
    console.error('Error updating location:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// Reservations
const reservations = []

export const createReservation = async (req, res) => {
  try {
    const newReservation = { ...req.body, id: nanoid(10) }
    reservations.push(newReservation)
    console.log('reservations ', reservations)
    res.status(201).json(newReservation)
  } catch (error) {
    console.error('Error creating reservation:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteReservation = (req, res) => {
  const { id } = req.params
  const index = reservations.findIndex((r) => r.id === id)

  if (index !== -1) {
    reservations.splice(index, 1)
    console.log('reservations ', reservations)
    res.status(204).end()
  } else {
    res.status(404).json({ error: 'Reservation not found' })
  }
}

export const getReservations = (req, res) => {
  res.json(reservations)
}

export const getReservation = (req, res) => {
  const { id } = req.params
  const reservation = reservations.find((r) => r.id === id)

  if (reservation) {
    res.json(reservation)
  } else {
    res.status(404).json({ error: 'Reservation not found' })
  }
}

export const updateReservation = (req, res) => {
  const { id, contactName, phoneNumber } = req.body
  const reservation = reservations.find((r) => r.id === id)

  if (reservation) {
    reservation.contactName = contactName
    reservation.phoneNumber = phoneNumber
    console.log('reservations ', reservations)
    res.json(reservation)
  } else {
    res.status(404).json({ error: 'Reservation not found' })
  }
}

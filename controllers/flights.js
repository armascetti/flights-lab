//Importing Flight Model 
import { Flight } from '../models/flight.js'
//Importing the Destination model 
import { Destination } from '../models/destination.js'
import { flightsApi, googleMapsApi } from '../config/apis'

function newFlight(req, res) {
  res.render('flights/new', {
    title: "Add Flight",
  })
}

function index(req, res) {
  let dateTime = new Date()
  let date = ""
  Flight.find({}, function (error, flight) {
    res.render('flights/index', {
      flight,
      error,
      title: "All Flights",
      time: date.concat(dateTime.getMonth(), "/", dateTime.getDate(), '/', dateTime.getFullYear())
    })
  })
}

function show(req, res) {
  Flight.findById(req.params.id)
    .populate('destinations')
    .exec(function (err, flight) {
      Destination.find({ _id: { $nin: flight.destinations}}, function (err, destinations) {
        res.render('flights/show', {
          title: `${flight.airline} Airline Details`,
          flight,
          destinations: destinations,
        })
      })
    })
}

function create(req, res) {
  console.log("This is the body", req.body)
  for (let key in req.body) {
    if (req.body[key] === "") {
      delete req.body[key]
    }
  }

  // TODO: Use the new FlightsAPI instead of accessing
  //  the Mongo DB directly:
  // Flight.create(req.body, function (error, flight) {
  //   if (error) {
  //     return res.redirect('flights/new')
  //   }

  // NOTE: This is a POST request, so you can send the request
  //  info in 3 parts:
  //  path params (req.params): maybe a 'flight ID'?
  //  query params (req.query): maybe 'from from DFW to SEA on Mondays at 3:38pm'?
  //  body (req.body): All the guts you see below (should be similar to the Mongo schema for 'flights'):
    return flightsApi.post('/flight', {
      airline: {},
      airport: {},
      flightNumber: //...
    })


    .then(function (response) {
      const result = response.data.whateverMemeGeneratorSentYou;
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })



    res.redirect('/flights')
  })
}

function createTicket(req, res) {
  Flight.findById(req.params.id, function (error, flight) {
    console.log("here is the id:", req.params.id)
    flight.tickets.push(req.body)
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

function deleteFlight(req, res) {
  Flight.findByIdAndDelete(req.params.id, function (err, flight) {
    res.redirect('/flights')
  })
}

function addToDestinations(req, res) {
  Flight.find(req, params.id, function (err, flight) {
    flight.destinations.push(req.body.destinationId)
    flight.save(function (err) {
      res.redirect(`/flights/${flight._id}`)
    })
  })
}

export {
  newFlight as new,
  index,
  create,
  show,
  createTicket,
  deleteFlight as delete,
  addToDestinations,
}
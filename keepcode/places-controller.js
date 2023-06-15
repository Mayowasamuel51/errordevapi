const HttpError = require('../Models/https-error')
const {validationResult} = require('express-validator')
// const uuid = require('uuidv4')
const DUMMY_PLACES = [
    {
      id: 'p1', title: 'Mayowa', description: 'Done with lagos road', location: {
        lat: 40.221311,
        lng: 23.2324222
      },
      address: 'ofada road',
      creator: 'ui1'
    },
    {
      id: 'p2', title: 'Base road', description: 'Done with lagos road', location: {
        lat: 10.221311,
        lng: 23.2324222
      },
      address: 'ofada road',
      creator: 'ui2'
    }
  ]

const getPlaceById =( (req, res, next) => {
    console.log('GET Request in Places');
    const placeid = req.params.pid;
    const place = DUMMY_PLACES.find(p => {
      return p.id === placeid
    })
    
    if (!place) {
      throw new HttpError('Could not find a place for the provided  place id');
    }
  
    res.json({ place })
    res.json({ message: place });
})
  

const getPlaceByUserId = ( (req, res, next) => {
    const usersId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
      return p.creator === usersId
    })
    if (!place) {
      return  next( new HttpError('Could not find a place for the provided id.'))
    }
    res.json({ message: place });
})


const createPlace = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors)
    res.status(422)
    return next(new HttpError('empty input check your data',422))
  }
    const { title, description, coordinates, address, creator } = req.body;
    // if (!title || !description ) {
    //     return next(new HttpError('empty input'))
    // }
    const newPlace = {
        // id:uuid(),
        title,
        description,
        creator,
        location: coordinates,
        address, 
    }
    DUMMY_PLACES.push(newPlace)
    res.status(200).json({message:'created ', data:newPlace})
}

const updatePlacebyId = (req, res, next) => {
    
}
  

const deletePlacebyId = (req, res, next) => {
    
}
  


module.exports = {
    getPlaceById,
    deletePlacebyId,
    updatePlacebyId,
    createPlace,
    getPlaceByUserId
}
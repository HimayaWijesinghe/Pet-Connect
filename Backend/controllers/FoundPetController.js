const FoundPet = require('../models/FoundPet');
const LostPet = require('../models/LostPets');

//Get all FoundPet Details
const getFoundPets = (req, res, next) => {
    FoundPet.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const getSelectedFoundPet = (req, res, next) => {
    const { fId } = req.params;

    if (fId) {
        // If fId is provided, find the specific FoundPet
        FoundPet.findOne({ fId: fId })
            .then(response => {
                if (response) {
                    res.json({ response });
                } else {
                    res.status(404).json({ message: 'FoundPet not found' });
                }
            })
            .catch(error => {
                console.error('Error fetching FoundPet data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        // If no fId is provided, return all FoundPets
        FoundPet.find()
            .then(response => {
                res.json({ response });
            })
            .catch(error => {
                console.error('Error fetching FoundPet data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};


const getSelectedEmailFoundPet = async (req, res, next) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const foundPets = await FoundPet.find({ email });

    if (!foundPets || foundPets.length === 0) {
      return res.status(404).json({ message: 'No FoundPet found with this email' });
    }

    res.json({ foundPets });
  } catch (error) {
    console.error('Error fetching FoundPet data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Create new FoundPet
const addFoundPet = async (req, res, next) => {
  try {
    const { email, phone, location, color, breed, gender, type, description, image } = req.body;

    // Get the maximum fId
    const maxFoundPet = await FoundPet.findOne({}, { fId: 1 }).sort({ fId: -1 }).limit(1);
    let newfId = 0;
    if (maxFoundPet) {
      newfId = maxFoundPet.fId + 1;
    } else {
      newfId = 1001; // Or a suitable default
    }

    const foundPet = new FoundPet({
      fId: newfId,
      email: email,
      phone: phone,
      location: location,
      color: color,
      breed: breed,
      gender: gender,
      type: type,
      description: description,
      image: image,
    });

    const savedPet = await foundPet.save();
    res.status(201).json({ savedPet }); // Use 201 for successful creation

  } catch (error) {
    console.error('Error adding FoundPet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update existing FoundPet Details
const updateFoundPet = (req, res, next) => {
    const { fId } = req.params;
    const { email, phone, location, color, breed, gender, type, description, image } = req.body;
    
    FoundPet.updateOne({ fId: fId }, { $set: { email: email, phone: phone, location: location, color: color, breed: breed, gender: gender, type: type, description: description, image: image } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Delete existing FoundPet
const deleteFoundPet = (req, res, next) => {
    const { fId } = req.params;
    FoundPet.deleteOne({fId: fId})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};



const getSuggestedFoundPets = async (req, res, next) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find lost pet details of the user using their email
    const lostPets = await LostPet.find({ email });

    if (!lostPets || lostPets.length === 0) {
      return res.status(404).json({ message: 'No lost pet details found for this email' });
    }

    // Search for matching found pets in the FoundPet collection
    let suggestedPets = [];
    for (let i = 0; i < lostPets.length; i++) {
      const pets = await FoundPet.find({
        location: lostPets[i].location,
        color: lostPets[i].color,
        breed: lostPets[i].breed,
        gender: lostPets[i].gender
      });
      suggestedPets = suggestedPets.concat(pets);
    }

    if (suggestedPets.length === 0) {
      return res.status(404).json({ message: 'No matching found pets available' });
    }

    res.json({ suggestedPets });
  } catch (error) {
    console.error('Error fetching suggested found pets:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Export all

exports.getFoundPets = getFoundPets;
exports.addFoundPet = addFoundPet;
exports.updateFoundPet = updateFoundPet;
exports.deleteFoundPet = deleteFoundPet;
exports.getSelectedFoundPet = getSelectedFoundPet;
exports.getSelectedEmailFoundPet = getSelectedEmailFoundPet;
exports.getSuggestedFoundPets = getSuggestedFoundPets
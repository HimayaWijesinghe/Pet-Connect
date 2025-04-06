const LostPet = require('../models/LostPets');

//Get all LostPet Details
const getLostPets = (req, res, next) => {
    LostPet.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const getSelectedLostPet = (req, res, next) => {
    const { pId } = req.params;

    if (pId) {
        // If pId is provided, find the specific LostPet
        LostPet.findOne({ pId: pId })
            .then(response => {
                if (response) {
                    res.json({ response });
                } else {
                    res.status(404).json({ message: 'LostPet not found' });
                }
            })
            .catch(error => {
                console.error('Error fetching LostPet data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        // If no pId is provided, return all LostPets
        LostPet.find()
            .then(response => {
                res.json({ response });
            })
            .catch(error => {
                console.error('Error fetching LostPet data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};


const getSelectedEmailLostPet = async (req, res, next) => {
  console.log('dd')
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const lostPets = await LostPet.find({ email });

    if (!lostPets || lostPets.length === 0) {
      return res.status(404).json({ message: 'No LostPet found with this email' });
    }

    res.json({ lostPets });
  } catch (error) {
    console.error('Error fetching LostPet data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Create new LostPet
const addLostPet = async (req, res, next) => {
  try {
    const { name, email, location, age, color, breed, gender, type, story, image, date, likes } = req.body;

    // Get the maximum pId
    const maxLostPet = await LostPet.findOne({}, { pId: 1 }).sort({ pId: -1 }).limit(1);
    let newpId = 0;
    if (maxLostPet) {
      newpId = maxLostPet.pId + 1;
    } else {
      newpId = 101;
    }

    const lostPet = new LostPet({
      pId: newpId,
      name: name,
      email: email,
      location: location,
      age: age,
      color: color,
      breed: breed,
      type: type,
      gender: gender,
      story: story,
      image: image,
      date: date,
      likes: likes
    });

    const savedPet = await lostPet.save();
    res.status(201).json({ savedPet }); // Use 201 for successful creation

  } catch (error) {
    console.error('Error adding LostPet:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update existing LostPet Details
const updateLostPet = (req, res, next) => {
    const { pId } = req.params;
    const { name, email, location, age, color, breed, gender, type, story, image, date, likes } = req.body;
    
    LostPet.updateOne({ pId: pId }, { $set: { name: name, email: email, location: location, age: age, color: color, breed: breed, gender: gender, type: type, story: story, image: image, date: date, likes: likes} })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Delete existing LostPet
const deleteLostPet = (req, res, next) => {
    const { pId } = req.params;
    LostPet.deleteOne({pId: pId})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Increment likes
const incrementLikes = async (req, res, next) => {
  try {
    const { pId } = req.params;
    const lostPet = await LostPet.findOne({pId: pId});
    if (!lostPet) {
      return res.status(404).json({ message: 'LostPet not found' });
    }
    lostPet.likes++;
    await lostPet.save();
    res.json({ message: 'Likes incremented', lostPet });
  } catch (error) {
    console.error('Error incrementing likes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Export all

exports.getLostPets = getLostPets;
exports.addLostPet = addLostPet;
exports.updateLostPet = updateLostPet;
exports.deleteLostPet = deleteLostPet;
exports.getSelectedLostPet = getSelectedLostPet;
exports.getSelectedEmailLostPet = getSelectedEmailLostPet;
exports.incrementLikes = incrementLikes;
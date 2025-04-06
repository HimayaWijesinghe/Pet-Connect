const SponserData = require('../models/SponserData');

//Get all SponserData Details
const getSponserData = (req, res, next) => {
    SponserData.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const getSelectedSponserData = (req, res, next) => {
    const { sdId } = req.params;

    if (sdId) {
        // If sId is provided, find the specific SponserData
        SponserData.findOne({ sdId: sdId })
            .then(response => {
                if (response) {
                    res.json({ response });
                } else {
                    res.status(404).json({ message: 'SponserData not found' });
                }
            })
            .catch(error => {
                console.error('Error fetching SponserData data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        // If no sId is provided, return all SponserData
        SponserData.find()
            .then(response => {
                res.json({ response });
            })
            .catch(error => {
                console.error('Error fetching SponserData data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};


//Create new SponserData
const addSponserData = async (req, res, next) => {
  try {
    const { name, age, color, breed, gender, type, amount, image, description, status } = req.body;

    // Get the maximum sId
    const maxSponserData = await SponserData.findOne({}, { sdId: 1 }).sort({ sdId: -1 }).limit(1);
    let newsId = 0;
    if (maxSponserData) {
      newsId = maxSponserData.sdId + 1;
    } else {
      newsId = 1001; // Or a suitable default
    }

    const sponserData = new SponserData({
      sdId: newsId,
      name: name,
      age: age,
      color: color,
      breed: breed,
      gender: gender,
      type: type,
      amount: amount,
      image: image,
      description: description,
      status: status,
    });

    const savedData = await sponserData.save();
    res.status(201).json({ savedData }); // Use 201 for successful creation

  } catch (error) {
    console.error('Error adding SponserData:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update existing SponserData Details
const updateSponserData = (req, res, next) => {
    const { sdId } = req.params;
    const { name, age, color, breed, gender, type, amount, image, description, status } = req.body;
    
    SponserData.updateOne({ sdId: sdId }, { $set: { name: name, age: age, color: color, breed: breed, gender: gender, type: type, amount: amount, image: image, description: description, status: status } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Update Status Details
const updateSponserStatus = (req, res, next) => {
  const { sdId } = req.params;
  const { status } = req.body;
  
  SponserData.updateOne({ sdId: sdId }, { $set: { status: status } })
      .then(response => {
          res.json({ response })
      })
      .catch(error => {
          res.json({ error })
      });
};

//Delete existing SponserData
const deleteSponserData = (req, res, next) => {
    const { sdId } = req.params;
    SponserData.deleteOne({sdId: sdId})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


//Export all

exports.getSponserData = getSponserData;
exports.addSponserData = addSponserData;
exports.updateSponserData = updateSponserData;
exports.deleteSponserData = deleteSponserData;
exports.getSelectedSponserData = getSelectedSponserData;
exports.updateSponserStatus = updateSponserStatus;
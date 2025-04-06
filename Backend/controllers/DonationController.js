const Donation = require('../models/Donation');

//Get all LostPet Details
const getLostPets = (req, res, next) => {
    Donation.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const getSelectedLostPet = (req, res, next) => {
    const { dId } = req.params; // Changed pId to dId

    if (dId) {
        // If dId is provided, find the specific LostPet
        Donation.findOne({ dId: dId }) // Changed pId to dId
            .then(response => {
                if (response) {
                    res.json({ response });
                } else {
                    res.status(404).json({ message: 'Donation not found' }); // Changed LostPet to Donation
                }
            })
            .catch(error => {
                console.error('Error fetching Donation data:', error); // Changed LostPet to Donation
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        // If no dId is provided, return all Donations
        Donation.find()
            .then(response => {
                res.json({ response });
            })
            .catch(error => {
                console.error('Error fetching Donation data:', error); // Changed LostPet to Donation
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};


const getSelectedEmailLostPet = async (req, res, next) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const donations = await Donation.find({ donorEmail: email }); // Changed LostPet to Donation and email field

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No Donation found with this email' }); // Changed LostPet to Donation
    }

    res.json({ donations });
  } catch (error) {
    console.error('Error fetching Donation data:', error); // Changed LostPet to Donation
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Create new Donation
const addDonation = async (req, res, next) => {
  try {
    const { donorName, donorEmail, amount, category, message } = req.body; // Changed variable names to match Donation model

    // Get the maximum dId
    const maxDonation = await Donation.findOne({}, { dId: 1 }).sort({ dId: -1 }).limit(1);
    let newdId = 0;
    if (maxDonation) {
      newdId = maxDonation.dId + 1;
    } else {
      newdId = 1001;
    }

    const donation = new Donation({
      dId: newdId,
      donorName: donorName,
      donorEmail: donorEmail,
      amount: amount,
      category: category,
      message: message
    });

    const savedDonation = await donation.save();
    res.status(201).json({ savedDonation });

  } catch (error) {
    console.error('Error adding Donation:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update existing Donation Details
const updateDonation = (req, res, next) => {
    const { dId } = req.params; // Changed pId to dId
    const { donorName, donorEmail, amount, category, message } = req.body; // Changed variable names to match Donation model

    Donation.updateOne({ dId: dId }, { $set: { donorName: donorName, donorEmail: donorEmail, amount: amount, category: category, message: message } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Delete existing Donation
const deleteDonation = (req, res, next) => {
    const { dId } = req.params; // Changed pId to dId
    Donation.deleteOne({dId: dId})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


//Export all

exports.getLostPets = getLostPets;
exports.addDonation = addDonation;
exports.updateDonation = updateDonation;
exports.deleteDonation = deleteDonation;
exports.getSelectedLostPet = getSelectedLostPet;
exports.getSelectedEmailLostPet = getSelectedEmailLostPet;
const Sponser = require('../models/Sponser');

//Get all Sponser Details
const getSponsers = (req, res, next) => {
    Sponser.find()
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};


const getSelectedSponser = (req, res, next) => {
    const { sId } = req.params;

    if (sId) {
        // If sId is provided, find the specific Sponser
        Sponser.findOne({ sId: sId })
            .then(response => {
                if (response) {
                    res.json({ response });
                } else {
                    res.status(404).json({ message: 'Sponser not found' });
                }
            })
            .catch(error => {
                console.error('Error fetching Sponser data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    } else {
        // If no sId is provided, return all Sponsers
        Sponser.find()
            .then(response => {
                res.json({ response });
            })
            .catch(error => {
                console.error('Error fetching Sponser data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }
};


const getSelectedEmailSponser = async (req, res, next) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    const sponsors = await Sponser.find({ sponserEmail: email });

    if (!sponsors || sponsors.length === 0) {
      return res.status(404).json({ message: 'No Sponser found with this email' });
    }

    res.json({ sponsors });
  } catch (error) {
    console.error('Error fetching Sponser data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Create new Sponser
const addSponser = async (req, res, next) => {
  try {
    const { sId, pId, sponserEmail, sponserName, amount, message } = req.body;

    // Get the maximum sId
    const maxSponser = await Sponser.findOne({}, { sId: 1 }).sort({ sId: -1 }).limit(1);
    let newSId = 0;
    if (maxSponser) {
      newSId = maxSponser.sId + 1;
    } else {
      newSId = 1001;
    }

    const sponser = new Sponser({
      sId: newSId,
      pId: pId,
      sponserEmail: sponserEmail,
      sponserName: sponserName,
      amount: amount,
      message: message
    });

    const savedSponser = await sponser.save();
    res.status(201).json({ savedSponser });

  } catch (error) {
    console.error('Error adding Sponser:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Update existing Sponser Details
const updateSponser = (req, res, next) => {
    const { sId } = req.params;
    const { pId, sponserEmail, sponserName, amount, message } = req.body;
    
    Sponser.updateOne({ sId: sId }, { $set: { sId: sId, pId: pId, sponserEmail: sponserEmail, sponserName: sponserName, amount: amount, message: message } })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Delete existing Sponser
const deleteSponser = (req, res, next) => {
    const { sId } = req.params;
    Sponser.deleteOne({sId: sId})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Export all

exports.getSponsers = getSponsers;
exports.addSponser = addSponser;
exports.updateSponser = updateSponser;
exports.deleteSponser = deleteSponser;
exports.getSelectedSponser = getSelectedSponser;
exports.getSelectedEmailSponser = getSelectedEmailSponser;
const LostPetCom = require('../models/LostPetComments');

//Get all LostPet Comments
const getAllLostPetComments = async (req, res, next) => {
    try {
        const comments = await LostPetCom.find();
        res.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getLostPetCommentsByPetId = async (req, res, next) => {
    const { petId } = req.params;

    try {
        if (!petId) {
            return res.status(400).json({ error: 'Pet ID is required' });
        }

        const comments = await LostPetCom.find({ petId: parseInt(petId) }); // Parse petId to number

        if (!comments || comments.length === 0) {
            return res.status(404).json({ message: 'No comments found for this pet ID' });
        }

        res.json({ comments });
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Create new LostPet Comment
const addLostPetComment = async (req, res, next) => {
    try {
        const { petId, email, description } = req.body;

        if (!petId || !email || !description) {
            return res.status(400).json({ error: 'Pet ID, email, and description are required' });
        }

        const maxComment = await LostPetCom.findOne({}, { comId: 1 }).sort({ comId: -1 }).limit(1);
        let newComId = 0;
        if (maxComment) {
            newComId = maxComment.comId + 1;
        } else {
            newComId = 1001;
        }

        const newComment = new LostPetCom({
            comId: newComId,
            petId: parseInt(petId), // Parse petId to number
            email: email,
            description: description,
        });

        const savedComment = await newComment.save();
        res.status(201).json({ savedComment });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Update existing LostPet Comment
const updateLostPetComment = (req, res, next) => {
    const { comId } = req.params;
    const { email, description } = req.body;
    
    LostPetCom.updateOne({ comId: comId }, { $set: { email: email, description: description} })
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Delete existing LostPet Comment
const deleteLostPetComment = async (req, res, next) => {
    const { comId } = req.params;
    LostPetCom.deleteOne({comId: comId})
        .then(response => {
            res.json({ response })
        })
        .catch(error => {
            res.json({ error })
        });
};

//Export all
exports.getAllLostPetComments = getAllLostPetComments;
exports.getLostPetCommentsByPetId = getLostPetCommentsByPetId;
exports.addLostPetComment = addLostPetComment;
exports.updateLostPetComment = updateLostPetComment;
exports.deleteLostPetComment = deleteLostPetComment;
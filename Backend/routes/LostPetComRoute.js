const express = require('express');
const router = express.Router();
const controller = require('../controllers/LostPetComController');

//Create router links
router.get('/all-comments', controller.getAllLostPetComments);
router.get('/selected-comments/:petId', controller.getLostPetCommentsByPetId);
router.post('/create-comment', controller.addLostPetComment);
router.put('/update-comment/:comId', controller.updateLostPetComment);
router.delete('/delete-comment/:comId', controller.deleteLostPetComment);


module.exports = router;

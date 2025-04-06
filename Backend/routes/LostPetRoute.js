const express = require('express');
const router = express.Router();
const controller = require('../controllers/LostPetController');

//Create router links
router.get('/all-lostpets', controller.getLostPets);
router.get('/selected-lostpet/:pId', controller.getSelectedLostPet);
router.get('/selected-email-lostpet/:email', controller.getSelectedEmailLostPet);
router.post('/create-lostpet', controller.addLostPet);
router.put('/update-lostpet/:pId', controller.updateLostPet);
router.delete('/delete-lostpet/:pId', controller.deleteLostPet);
router.put('/increment-likes/:pId', controller.incrementLikes);





module.exports = router;

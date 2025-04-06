const express = require('express');
const router = express.Router();
const controller = require('../controllers/FoundPetController');

//Create router links
router.get('/all-foundpets', controller.getFoundPets);
router.get('/selected-foundpet/:fId', controller.getSelectedFoundPet);
router.get('/selected-email-foundpet/:email', controller.getSelectedEmailFoundPet);
router.post('/create-foundpet', controller.addFoundPet);
router.put('/update-foundpet/:fId', controller.updateFoundPet);
router.delete('/delete-foundpet/:fId', controller.deleteFoundPet);
router.get('/get-Suggested-FoundPets/:email', controller.getSuggestedFoundPets);


module.exports = router;

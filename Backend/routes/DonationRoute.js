const express = require('express');
const router = express.Router();
const controller = require('../controllers/DonationController');

//Create router links
router.get('/all-donations', controller.getLostPets); // Changed 'all-lostpets' to 'all-donations'
router.get('/selected-donation/:dId', controller.getSelectedLostPet); // Changed 'selected-lostpet' to 'selected-donation' and pId to dId
router.get('/selected-email-donation/:email', controller.getSelectedEmailLostPet); // Changed 'selected-email-lostpet' to 'selected-email-donation'
router.post('/create-donation', controller.addDonation); // Changed 'create-lostpet' to 'create-donation'
router.put('/update-donation/:dId', controller.updateDonation); // Changed 'update-lostpet' to 'update-donation' and pId to dId
router.delete('/delete-donation/:dId', controller.deleteDonation); // Changed 'delete-lostpet' to 'delete-donation' and pId to dId


module.exports = router;

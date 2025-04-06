const express = require('express');
const router = express.Router();
const controller = require('../controllers/SponserController');

//Create router links
router.get('/all-sponsors', controller.getSponsers);
router.get('/selected-sponsor/:sId', controller.getSelectedSponser);
router.get('/selected-email-sponsor/:email', controller.getSelectedEmailSponser);
router.post('/create-sponsor', controller.addSponser);
router.put('/update-sponsor/:sId', controller.updateSponser);
router.delete('/delete-sponsor/:sId', controller.deleteSponser);


module.exports = router;

const express = require('express');
const router = express.Router();
const controller = require('../controllers/SponserDataController');

//Create router links
router.get('/all-sponserdata', controller.getSponserData);
router.get('/selected-sponserdata/:sdId', controller.getSelectedSponserData);
router.post('/create-sponserdata', controller.addSponserData);
router.put('/update-sponserdata/:sdId', controller.updateSponserData);
router.delete('/delete-sponserdata/:sdId', controller.deleteSponserData);
router.put('/update-sponser-status/:sdId', controller.updateSponserStatus);



module.exports = router;

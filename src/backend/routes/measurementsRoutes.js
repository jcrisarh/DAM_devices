const express = require('express');
const router = express.Router();
const measuresController = require('../controllers/measuresController.js');

router.get('/:deviceId', measuresController.getAllMeasurementsForDevice);
router.get('/:deviceId/last_measurement', measuresController.getLastMeasurementForDevice);
router.post('/:deviceId/new_measurement', measuresController.updateMeasurementTable);
module.exports = router;
const express = require('express');
const router = express.Router();
const irrigationLogsController = require('../controllers/irrigationLogsController');

router.get('/:valveId', irrigationLogsController.getIrrigationLogsByValveId);
router.post('/:valveId/new_log', irrigationLogsController.updateIrrigationTable)

module.exports = router;
const mysql = require('mysql');
const dbConfig = require('../utils/dbConfig');

const getAllMeasurementsForDevice = (req, res) => {
    const deviceId = req.params.deviceId;
    const connection = mysql.createConnection(dbConfig);
        
    connection.connect();
        
    connection.query('SELECT * FROM Mediciones WHERE dispositivoId = ?', [deviceId], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
        
    connection.end();
    };

const getLastMeasurementForDevice = (req, res) => {
    const deviceId = req.params.deviceId;
    const connection = mysql.createConnection(dbConfig);
        
    connection.connect();
        
    connection.query('SELECT * FROM Mediciones WHERE dispositivoId = ? ORDER BY fecha DESC LIMIT 1', [deviceId], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: "No measurements found for the device" });
            } else {
                res.json(results[0]);
            }
        }
    });
        
        connection.end();
    };

const updateMeasurementTable = (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const deviceId = req.params.deviceId;
    const receivedData = req.body;
    console.log(receivedData)
    
    const {fecha, value} = receivedData;
    console.log("fecha", fecha)
    console.log("dispositivoId" , deviceId)
    console.log("medida", value)
    
    connection.query('INSERT INTO Mediciones SET dispositivoId =?, fecha =?, valor =?', [deviceId, fecha, value], (error, results) => {
        console.log(connection)
        connection.end();
        if (error) {
            res.status(500).json({ error });
            details: error.message
        } else {
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
    
    }

module.exports = { getAllMeasurementsForDevice, getLastMeasurementForDevice, updateMeasurementTable };
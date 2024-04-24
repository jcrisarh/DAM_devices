const mysql = require('mysql');
const dbConfig = require('../utils/dbConfig');

const getAllDevices = (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    
    connection.connect();
    
    connection.query('SELECT * FROM Dispositivos', (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
    
    connection.end();
};

const getDeviceById = (req, res) => {
    const deviceId = req.params.deviceId;
    const connection = mysql.createConnection(dbConfig);
    
    connection.connect();
    
    connection.query('SELECT * FROM Dispositivos WHERE dispositivoId = ?', [deviceId], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: "Device not found" });
            } else {
                res.json(results[0]);
            }
        }
    });
    
    connection.end();


};

module.exports = { getAllDevices, getDeviceById };
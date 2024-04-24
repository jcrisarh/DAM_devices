const mysql = require('mysql');
const dbConfig = require('../utils/dbConfig');

const getIrrigationLogsByValveId = (req, res) => {
    const valveId = req.params.valveId;
    const connection = mysql.createConnection(dbConfig);
    
    connection.connect();
    
    connection.query('SELECT * FROM Log_Riegos WHERE electrovalvulaId = ?', [valveId], (error, results) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json(results);
        }
    });
    
    connection.end();
};

const updateIrrigationTable = (req, res) => {
    const connection = mysql.createConnection(dbConfig);
    const receivedData = req.body;
    console.log(receivedData)

    const { electrovalveId, fecha, apertura} = receivedData;
    console.log("electrovalve Id" , electrovalveId)
    console.log("fecha" , fecha)
    console.log("apertura", apertura)

    connection.query('INSERT INTO Log_Riegos SET apertura =?, fecha =?, electrovalvulaId =?', [apertura, fecha, electrovalveId], (error, results) => {
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

module.exports = { getIrrigationLogsByValveId, updateIrrigationTable };

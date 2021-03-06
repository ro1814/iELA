const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

 const db = mysql.createPool({
     host: '192.168.64.2',
     user: 'username',
     password:'password',
     database: 'CRUDDatabase',
 });

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM sport_review";
    db.query(sqlSelect, (err, result ) =>{
        res.send(result)
    })
})

app.post("/api/insert", (req, res) => {

    const sportName = req.body.sportName
    const sportReview = req.body.sportReview

    const sqlInsert = "INSERT INTO sport_review (sportName, sportReview) VALUES (?,?)"
    db.query(sqlInsert, [sportName, sportReview], (err, result ) =>{
        console.log(result)
    })
})

app.delete('/api/delete/:sportName', (req, res ) => {
    const name = req.params.sportName;
    const sqlDelete = "DELETE FROM sport_review WHERE sportName = ?";
    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    })
})
app.put('/api/update', (req, res ) => {
    const name = req.body.sportName;
    const review = req.body.sportReview;
    const sqlUpdate = "UPDATE sport_review SET sportReview = ? WHERE sportName = ?";
    db.query(sqlUpdate, [review, name], (err, result) => {
        if (err) console.log(err);
    })
    
})


app.listen(3001, () => {
    console.log('Running on port 3001')
});
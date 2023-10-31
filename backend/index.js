import express from "express";
import mysql from 'mysql';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();
const app = express(); 
app.use(cors());

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DABA,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS
});

console.log(db.config.password);

app.get("/", (req, res) => {
    res.json("hello this is backend");
});

app.get("/totalPoints", (req, res) => {
    const q = "select * from vw_totalpoints";
    db.query(q, (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.get("/roundsWinners", (req, res) => {
    const q = "select * from vw_roundswinners";
    db.query(q, (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.get("/roundsWinnersByTimes", (req, res) => {
    const q = "select name, count(name) as won from vw_roundswinners group by name order by won desc";
    db.query(q, (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.get("/listOfPlayers", (req, res) => {
    const q = "select id, name, username from players order by id";
    db.query(q, (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.get("/playerRounds/:player", (req, res) => {
    const q = "select number, points from rounds where playerid = ?";
    db.query(q, [req.params.player], (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.get("/players/:player", (req, res) => {
    const q = "select name from players where id = ?";
    db.query(q, [req.params.player], (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.get("/allRounds/:round", (req, res) => {
    const q = "select p.NAME, p.USERNAME, r.points from rounds r, players p where r.playerid = p.id and r.number = ? order by r.points desc;";
    db.query(q, [req.params.round], (err,data) => { if(err) return res.json(err); else return res.json(data); })
});

app.listen(8800, () => {
    console.log("connected to backend");
});
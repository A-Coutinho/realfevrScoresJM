import express from "express";
import cors from 'cors';
import dotenv, { config } from "dotenv";
import sql from "mssql";
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
app.use(cors());

var sqlConfig = {
    server: process.env.MYSQL_HOST,
    database: process.env.MYSQL_DABA,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    port: 65500,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
};


const request = new sql.Request();
app.get("/", (req, res) => {
    res.json("hello this is backend");
});

app.get("/totalPoints", (req, res) => {
    const q = "select * from vw_totalpoints order by total desc";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});

app.get("/roundsWinners", (req, res) => {
    const q = "select * from vw_roundswinners";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});

app.get("/roundsWinnersByTimes", (req, res) => {
    const q = "select name, count(name) as won from vw_roundswinners group by name order by won desc";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});

app.get("/listOfPlayers", (req, res) => {
    const q = "select id, name, username from players order by id";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});

app.get("/numberOfRounds", (req, res) => {
    const q = "select max(number) as numberofrounds from rounds";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset[0]);
        });
    });
});

app.get("/playerRounds/:player", (req, res) => {
    const q = "select number, points from rounds where playerid = @playerparam";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('playerparam', sql.VarChar, req.params.player).query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});

app.get("/players/:player", (req, res) => {
    const q = "select name from players where id = @playerparam";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('playerparam', sql.VarChar, req.params.player).query(q, function (err, recordset) {
            if (err) console.log(err)
            res.send(recordset.recordset);
        });
    });
});

app.get("/allRounds/:round", (req, res) => {
    const q = "select p.NAME, p.USERNAME, r.points from rounds r, players p where r.playerid = p.id and r.number = @roundparam order by r.points desc;";
    sql.connect(sqlConfig, function (err) {
        if (err) console.log(err);
        var request = new sql.Request();
        request.input('roundparam', sql.VarChar, req.params.round).query(q, function (err, recordset) {
            if (err) console.log(err)

            res.send(recordset.recordset);
        });
    });
});

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.post("/rounds", (req, res) => {
    sql.connect(sqlConfig)
        .then(() => {
            console.log('connected');

            const table = new sql.Table('roundstemp');
            table.create = true;
            
            table.columns.add('NUMBER', sql.Int, { nullable: false });
            table.columns.add('PLAYERID', sql.Int, { nullable: false });
            table.columns.add('POINTS', sql.Int, { nullable: false });

            var roundNUM = req.body.round['number'];
            for (var key in req.body.roundInfo) {
                table.rows.add(roundNUM, key, req.body.roundInfo[key]);
            }

            const request = new sql.Request();
            return request.bulk(table);
        })
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.log(err);
        });
});

app.listen(8800, () => {
    console.log("connected to backend");
});
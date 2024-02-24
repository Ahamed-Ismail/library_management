const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

var con = null;
try {
    con = mysql.createPool({
        host: "librarydb.cu4aa78nopao.us-east-1.rds.amazonaws.com",
        port: 3306,
        user: "root",
        password: "5252864Mi",
        database: "library_db",
    }).promise();
    console.log('db connected');
}
catch (err) {
    console.log(err);
}

const getData = async(req, res) => {
    try {
        const[ data] = await con.query(`select * from library`);
        console.log(data);
        res.json({ data });
    }
    catch (err) {
        console.log(err);
        console.log( "error occured at getData()" );
        res.json({ result: "error occured at getData()" });
    }
}

const addData = async (req, res) => {
    try {
        const { booktitle, authorname, subject, publisher, publishdate, type, link } = req.body;
        const query = `insert into library values(?,?,?,?,?,?,?)`;
        await con.query(query, [ booktitle, authorname, subject, publisher, publishdate, type, link]);
        res.json({ result: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log('error occured at addData');
        res.json({ result: "error occured at addData" });
    }
}

const deleteData = async (req, res) => {
    try {
        const booktitle = req.body.booktitle;
        const query = `delete  from library where booktitle=(?)`;
        await con.query(query, [booktitle]);
        res.json({ result: "book deleted successfully" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at deleteData");
        res.json({ result: "error occured at deleteData" });
    }
}

// const getBorrowed = async (req, res) => {
//     try {
//         const username = req.body.username;
//         const[ data] = await con.query(`select * from borrowed where username=(?)`,[username]);
//         console.log(data);
//         res.json({ data });
//     }
//     catch (err) {
//         console.log(err);
//         console.log( "error occured at getBorrowed()" );
//         res.json({ result: "error occured at getBorrowed()" });
//     }
// }

// const getReq = async (req, res) => {
//     try {
//         const username = req.body.username;

//         const[ data] = await con.query(`select * from request where username=(?)`,[username]);
//         console.log(data);
//         res.json({ data });
//     }
//     catch (err) {
//         console.log(err);
//         console.log( "error occured at getReq()" );
//         res.json({ result: "error occured at getReq()" });
//     }
// }

// const addRequest = async(req, res) => {
//     try {
//         const { booktitle, authorname, subject, publisher, publishdate, type, link } = req.body;
//         await con.query(`insert into request values(?,?,?,?,?,?,?,?)`, [username, booktitle, authorname, subject, publisher, publishdate, type, link]);
//     }
//     catch (err) {
//         console.log(err);
//         console.log( "error occured at addRequest()" );
//         res.json({ result: "error occured at addRequest()" });
//     }
// }

module.exports = { getData, addData, deleteData};
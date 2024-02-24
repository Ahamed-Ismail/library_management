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

// create table bookinuse (booktitle varchar(50), authorname varchar(50), subject varchar(50), publisher varchar(50), publishdate varchar(50), type varchar(50), bookid int primary key, username varchar(50));
// create table userlogin(username varchar(50), name varchar(50), password varchar(70), phoneno varchar(10), aadhar varchar(12));

const userlogin = async(req, res) => {
    try {
        const { username, password } = req.body;
        const [data] = await con.query('select * from userlogin where username=(?)', [username]);

        if (data.length == 0) {
            res.json({result:"user doesnt exists"})
        }
        else if (password === data[0].password) {
            res.json({ result: "ok" });
            return;
        }
        else {
            res.json({ result: "wrong credentials" });
        }
    }
    catch (err) {
        console.log(err);
        console.log('error occured at loginuser');
        res.json({ result: "error occured at loginuser" });
    }

}

const adminlogin = async(req, res) => {
    try {
        const { username, password } = req.body;
        const [data] = await con.query('select * from adminlogin where username=(?)', [username]);

        if (data.length == 0) {
            res.json({result:"user doesnt exists"})
        }
        else if (password === data[0].password) {
            res.json({ result: "ok" });
            return;
        }
        else {
            res.json({ result: "wrong credentials" });
        }
    }
    catch (err) {
        console.log(err);
        console.log('error occured at loginuser');
        res.json({ result: "error occured at loginuser" });
    }

}

// const hashpassword = async (password) => {
//     try {
//         const hashed = await bcrypt.hash(password, 10);
//         return hashed;
//     }
//     catch (err) {
//         console.log(err);
//         console.log("error occured at hashpassword");
//     }
// }

const signup = async (req, res) => {
    try {
        const { username, password} = req.body;
        const [data] = await con.query('select * from userlogin where username=(?)', [username]);
        console.log(data);
        if (data.length > 0) {
            res.json({ result: "username already taken" });
            return;
        }
        // const hashed = await hashpassword(password);
        await con.query('insert into userlogin values(?,?)', [username, password]);
        res.json({ result: "ok" });
    }
    catch (err) {
        console.log(err);
        console.log("error occured at signup");
        res.json({ result: "error occured at signup" });
    }
}

module.exports = { userlogin, signup , adminlogin};
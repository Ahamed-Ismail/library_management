const mysql = require("mysql2");

var con = null;
try {
  con = mysql
    .createPool({
      host: "librarydb.cu4aa78nopao.us-east-1.rds.amazonaws.com",
      port: 3306,
      user: "root",
      password: "5252864Mi",
      database: "library_db",
    })
    .promise();
  console.log("db connected");
} catch (err) {
  console.log(err);
}

async function q() {
  try {
    await con.query(`insert into adminlogin values("admin123","12345") `);
    await con.query(`insert into userlogin values("user123","12345") `);
    console.log("done");
  } catch (err) {
    console.log(err);
  }
}

q();

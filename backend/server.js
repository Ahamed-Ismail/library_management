const express=require('express');
const cors = require('cors');
const router = require('./Routes/dbroutes');
const authrouter = require('./Routes/authRoutes');

const app = express();

try {
    app.listen(8000, () => {
        console.log('listening at port 8000');
    })
}
catch (err) {
    console.log(err);
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("home page")
})

app.use('/auth', authrouter);
app.use('/db', router);
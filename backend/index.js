const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
 
connectToMongo();
 
const app = express();
const port = 8000;
 
app.use(cors())
app.use(express.json());
 
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/role',require('./routes/role'))
app.use('/api/user',require('./routes/user'))
 
app.listen(port, () => {
    console.log(`example running on port ${port}`)
})

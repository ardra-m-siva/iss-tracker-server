const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTION_STRING
const dbName = process.env.DBNAME

mongoose.connect(connectionString, {
    dbName
}).catch((err) => {
    console.error("Initial database connection failed:", err);
});

const connection = mongoose.connection
connection.once('open', async () => {
    console.log("Database connected succefully ", connection.host);
})
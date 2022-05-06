const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const app = express();
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');
dotenv.config();
connectDB()
const PORT = process.env.PORT || 5000;

app.use(express.json()); // to accept json data

app.get("/", (req,res) =>{
    res.send("API is running successfully");
});


app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, console.log(`Server started on PORT ${PORT}`.blue.bold));
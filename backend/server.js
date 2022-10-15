const app = require("express")();
const server = require("http").createServer(app);
const mongoose = require("mongoose")
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

const dbUri = "mongodb+srv://MathewLaws:DqLFZgMS3BlZiOlx@cluster.xpvtf.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => server.listen(5000, "192.168.1.193"))
    .catch((err) => console.error(err));

const chatSchema = new mongoose.Schema({
    name: String,
    message: String
}, { timestamps: true })

const chatLog = mongoose.model("chatlogs", chatSchema)

io.on("connection", socket => {
    socket.on("chatLog", () => {
        chatLog.find()
            .then((res) => io.emit("chatLog", (res)))
            .catch((err) => console.error(err));
    })
        
    socket.on("chat", (payload) => {
        io.emit("chat", payload);
        const newMsg = new chatLog({
            name: payload.name,
            message: payload.message
        })
        newMsg.save()
    });
})

//server.listen(5000, "192.168.1.193");
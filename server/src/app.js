import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import socketio from "socket.io";
import http from "http";

// Routers
import { UserRoutes } from "./routes/UserRoutes";

// Init App
const app = express();
const server = http.createServer(app);
const io = socketio(server);
dotenv.config();

// Connect Database
(async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected...");
    } catch (error) {
        console.log(error);
    }
})();

// socket.io
io.on("connection", (socket) => {
    console.log("User connected...");

    socket.on("disconnect", () => {
        console.log("User left...");
    });
});

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

// Route Middlewares
app.use("/api/user", UserRoutes);

// Server Start
server.listen(process.env.LISTEN_PORT || 5000, () =>
    console.log(
        `Server started at port ${process.env.LISTEN_PORT ? process.env.LISTEN_PORT : 5000}...`
    )
);

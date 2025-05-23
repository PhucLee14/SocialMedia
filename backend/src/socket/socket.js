import { Server } from "socket.io";

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ["http://localhost:3001"],
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket) => {
        console.log("User connected:", socket.id);

        // Join chat room
        socket.on("join_chat", (roomId) => {
            socket.join(roomId);
            console.log(`User ${socket.id} joined room: ${roomId}`);
        });

        // Handle new message
        socket.on("send_message", (data) => {
            console.log("Message received:", data);
            io.to(data.roomId).emit("receive_message", data);
        });

        // Disconnect
        socket.on("disconnect", () => {
            console.log("User disconnected:", socket.id);
        });
    });
};

export default initializeSocket;

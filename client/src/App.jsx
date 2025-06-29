import { useEffect, useState, useMemo } from 'react';
import { io } from "socket.io-client";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const socket = useMemo(() => io(import.meta.env.VITE_SERVER_URL, { withCredentials: true }), []);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketID, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const time = new Date().toLocaleTimeString();
    socket.emit("message", { message, room, time, sender: socketID });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("joined-room", roomName);
    setRoomName("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 200 }} />
      <Typography variant="h6" component="div" gutterBottom>
        {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          id="outlined-basic"
          label="Room Name"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Join
        </Button>
      </form>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />

        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>

      <Stack>
        {messages.map((m, i) => (
          <Box
            key={i}
            sx={{
              display: "flex",
              justifyContent: m.sender === socketID ? "flex-end" : "flex-start",
              marginBottom: 1,
            }}
          >
            <Box
              sx={{
                backgroundColor: m.sender === socketID ? "#e1f5fe" : "#f1f1f1",
                padding: 1,
                borderRadius: 2,
                maxWidth: "70%",
              }}
            >
              <Typography variant="body1">{m.message}</Typography>
              <Typography variant="caption" color="textSecondary">{m.time}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default App;

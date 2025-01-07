import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [socketID, setSocketId] = useState("");

  useEffect(() => {
    setSocketId(Math.random().toString(36).substring(2, 9)); // Generate random user ID
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/messages", { room, message, sender: socketID });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    setRoom(roomName);
    setRoomName("");
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      if (room) {
        const { data } = await axios.get(`/api/messages?room=${room}`);
        setMessages(data);
      }
    }, 1000); // Poll every second
    return () => clearInterval(interval);
  }, [room]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ height: 200 }} />
      <Typography variant="h6" component="div" gutterBottom>
        Your ID: {socketID}
      </Typography>

      <form onSubmit={joinRoomHandler}>
        <h5>Join Room</h5>
        <TextField
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
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
          label="Message"
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
              <Typography variant="caption" color="textSecondary">
                {m.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default App;
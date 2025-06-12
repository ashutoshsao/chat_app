# Real-Time Chat Application

This repository contains a real-time chat application built with a Node.js + Socket.IO backend and a React.js + Material UI frontend.

## Tech Stack

- Backend: Node.js, Express, Socket.IO, JWT, CORS
- Frontend: React.js, Material UI, Socket.IO Client

---

## Project Structure

```bash
.
├── backend/              # Node.js + Socket.IO server
│   └── app.js
└── frontend/             # React client app
    └── App.jsx
```

---

## Live URLs

- Client: https://chat-app-client-f43b.onrender.com
- Server: https://chat-app-server-ks9m.onrender.com

---

## Features

### 1. Real-Time Messaging
- Users can join chat rooms and send messages in real time.
- All messages are broadcast to users within the same room.
- Messages are timestamped and tagged with sender ID.

### 2. Authentication (Dummy)
- Basic login route using JWT.
- Token stored as an HTTP-only cookie.
- No real user database (for demo purposes).

---

## Getting Started

### Backend

```bash
cd backend
npm install
node app.js
```

- Runs on http://localhost:3000
- Routes:
  - `/`: Health check — returns "Backend is up !!!"
  - `/login`: Issues dummy JWT and sets cookie

### Frontend

```bash
cd frontend
npm install
npm start
```

- Connects to backend via https://chat-app-server-ks9m.onrender.com
- Message state, socket events, and UI handled via React + Material UI

---

## Core Concepts

- Socket.IO Events:
  - `connection`: Logs when a user connects
  - `joined-room`: Adds user to a room
  - `message`: Broadcasts messages to room members
  - `receive-message`: Received by all room clients
  - `disconnect`: Logs and handles client disconnection

- React Socket Events:
  - `connect`: Save socket ID
  - `receive-message`: Add to chat history
  - `disconnect`: Cleanup on unmount

---

## Example Use Case

1. Run the backend and frontend for real-time messaging.
2. Users can join rooms and chat seamlessly.
3. Observe message flow between users in real time.

---

## Dependencies

### Backend

- express
- socket.io
- cors
- cookie-parser
- jsonwebtoken

### Frontend

- react
- @mui/material
- socket.io-client

---

## License

This project is open-source and available under the MIT License.

---

## Contributing

Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## Author

- Ashutosh Sao

Feel free to reach out for improvements or collaborations.
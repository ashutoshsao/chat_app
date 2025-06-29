# Real-Time Chat Application

This repository contains a real-time chat application built with a Node.js + Socket.IO backend and a React.js + Material UI frontend.

## Tech Stack

- Server: Node.js, Express, Socket.IO, JWT, CORS
- Frontend: React.js, Material UI, Socket.IO Client

---

## Project Structure

```bash
.
├── server/              # Node.js + Socket.IO server
│   └── app.js
└── client/             # React client app
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

## Environment Variables

To run the server, create a `.env` file in the `server` directory with the following variables:

```
SECRET_KEY_JWT=your_secret_key_for_jwt
PORT=3000 # Only needed for local development, Render provides its own PORT
CORS_ORIGIN=http://localhost:5173 # This should be the URL of your client application during local development (e.g., React dev server)
```

### Client

To run the client, create a `.env` file in the `client` directory with the following variables:

```
VITE_SERVER_URL=http://localhost:3000
```

---

## Getting Started

### Server

```bash
cd server
npm install
node app.js
```

- Runs on http://localhost:3000
- Routes:
  - `/`: Health check — returns "Backend is up !!!"
  - `/login`: Issues dummy JWT and sets cookie

### Client

```bash
cd client
npm install
npm start
```

- Connects to backend via `VITE_SERVER_URL`. If running the server locally, ensure `VITE_SERVER_URL` in `client/.env` is set to `http://localhost:3000`.
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

### Server

- express
- socket.io
- cors
- cookie-parser
- jsonwebtoken

### Client

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
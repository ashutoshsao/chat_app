let messages = []; // Temporary in-memory storage

export default function handler(req, res) {
  if (req.method === "POST") {
    // Handle message sending
    const { room, message, sender } = req.body;
    messages.push({ room, message, sender, time: new Date().toLocaleTimeString() });
    return res.status(200).json({ message: "Message sent" });
  }

  if (req.method === "GET") {
    // Handle message retrieval for a specific room
    const { room } = req.query;
    const roomMessages = messages.filter((msg) => msg.room === room);
    return res.status(200).json(roomMessages);
  }

  res.status(405).json({ message: "Method not allowed" });
}

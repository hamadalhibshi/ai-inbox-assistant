import { DB } from "../database.js";

export const getTickets = (res) => {
  const sql = "SELECT * from tickets";
  let data = { data: [] };

  DB.all(sql, [], (err, rows) => {
    try {
      if (err) {
        throw err;
      }
      rows.forEach((row) => {
        let contact = row.contact ? JSON.parse(row.contact) : {};

        data.data.push({
          id: row.id,
          status: row.status,
          createdAt: row.createdAt,
          contact,
          channel: row.channel,
          language: row.language,
          intent: row.intent,
          priority: row.priority,
          message_raw: row.message_raw,
          reply_suggestion: row.reply_suggestion,
          updatedAt: row.updatedAt,
        });
      });
      let content = JSON.stringify(data);
      res.send(content);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  });
};

export const getExtractedTickets = (res) => {
  const sql = `SELECT * FROM tickets`;

  DB.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to fetch tickets",
        details: err.message,
      });
    }

    const tickets = rows.map((row) => {
      const contact = row.contact ? JSON.parse(row.contact) : {};

      return {
        id: row.id,
        status: row.status,
        createdAt: row.createdAt,
        contact,
        channel: row.channel,
        language: row.language,
        intent: row.intent,
        priority: row.priority,
        message_raw: row.message_raw,
        reply_suggestion: row.reply_suggestion,
        updatedAt: row.updatedAt,
      };
    });

    res.json(tickets);
  });
};

export const saveTicket = (req, res) => {
  try {
    const {
      status,
      createdAt,
      contact,
      channel,
      language,
      intent,
      priority,
      entities,
      message_raw,
      reply_suggestion,
    } = req.body;

    const sql = `
      INSERT INTO tickets (
         status, createdAt, contact, channel, language, intent, priority, message_raw, reply_suggestion) 
        VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      status || "open",
      createdAt,
      contact
        ? JSON.stringify({
            name: contact.name || null,
            email: contact.email || null,
            phone: contact.phone || null,
          })
        : null, // this will go into the 'contact' JSON column
      channel || "unknown",
      language || "en",
      intent || "general inquiry",
      priority || "medium",
      message_raw,
      reply_suggestion,
    ];

    DB.run(sql, values, (err) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          error: "Failed to save ticket to database",
          details: err.message,
        });
      }

      res.json({
        success: true,
        message: "Ticket saved successfully",
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

export const DeleteTicket = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM tickets WHERE id = ?`;
  DB.run(sql, id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json({ message: "Deleted successfully", id });
    }
  });
};

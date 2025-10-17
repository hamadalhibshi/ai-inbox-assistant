import { DB } from "../database.js";

export const getTickets = (res, filters = {}) => {
  try {
    // Base query
    let sql = "SELECT * FROM tickets";
    const conditions = [];
    const values = [];

    // Add filters dynamically if provided
    if (filters.status && filters.status !== "all") {
      conditions.push("status = ?");
      values.push(filters.status);
    }

    if (filters.priority && filters.priority !== "all") {
      conditions.push("priority = ?");
      values.push(filters.priority);
    }

    if (filters.language && filters.language !== "all") {
      conditions.push("language = ?");
      values.push(filters.language);
    }

    if (filters.search && filters.search.trim() !== "") {
      // Search in contact.name or contact.phone (stored as JSON)
      conditions.push(
        "(LOWER(contact) LIKE LOWER(?) OR LOWER(contact) LIKE LOWER(?))"
      );
      const likeTerm = `%${filters.search}%`;
      values.push(likeTerm, likeTerm);
    }

    // Append WHERE clause if needed
    if (conditions.length > 0) {
      sql += " WHERE " + conditions.join(" AND ");
    }

    DB.all(sql, values, (err, rows) => {
      if (err) {
        console.error("DB Error:", err);
        return res.status(500).json({ error: err.message });
      }

      const data = rows.map((row) => ({
        id: row.id,
        status: row.status,
        createdAt: row.createdAt,
        contact: row.contact ? JSON.parse(row.contact) : {},
        channel: row.channel,
        language: row.language,
        intent: row.intent,
        priority: row.priority,
        message_raw: row.message_raw,
        reply_suggestion: row.reply_suggestion,
        updatedAt: row.updatedAt,
      }));

      res.json({ data });
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
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

export const EditTicket = (req, res) => {
  try {
    const { id } = req.params;
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

    if (!id) {
      return res.status(400).json({ error: "Ticket ID is required" });
    }

    const sql = `
      UPDATE tickets
      SET 
        status = ?,
        createdAt = ?,
        contact = ?,
        channel = ?,
        language = ?,
        intent = ?,
        priority = ?,
        message_raw = ?,
        reply_suggestion = ?,
        updatedAt = CURRENT_TIMESTAMP
      WHERE id = ?
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
        : null,
      channel || "unknown",
      language || "en",
      intent || "general inquiry",
      priority || "medium",
      message_raw,
      reply_suggestion,
      id,
    ];

    DB.run(sql, values, function (err) {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({
          error: "Failed to update ticket",
          details: err.message,
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: "Ticket not found" });
      }

      res.json({
        success: true,
        message: "Ticket updated successfully",
        id,
      });
    });
  } catch (err) {
    res.status(500).json({
      error: "Internal server error",
      details: err.message,
    });
  }
};

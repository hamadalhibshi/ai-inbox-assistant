import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();

const connected = (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the Database.");
};

const DB = new sql3.Database(
  "./myDatabase.db",
  sqlite3.OPEN_READWRITE,
  connected
);

let sql = `CREATE TABLE IF NOT EXISTS tickets (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('open', 'closed')),
  createdAt TEXT NOT NULL,
  contact JSON,  -- store name, email, phone as a JSON object
  channel TEXT NOT NULL CHECK (channel IN ('email', 'whatsapp', 'sms', 'chat', 'unknown')),
  language TEXT NOT NULL,
  intent TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  message_raw TEXT NOT NULL,
  reply_suggestion TEXT NOT NULL,
  updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
)`;

DB.run(sql, [], (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Table created or running.");
});

export { DB };

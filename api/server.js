// api/server.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json());

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// POST route to create a booking
app.post('/api/bookings', async (req, res) => {
  const { serviceId, userId, service_description, service_title, price } = req.body;

  try {
    // Insert booking data into the bookings table
    const result = await pool.query(
      `INSERT INTO bookings (service_id, user_id, service_description, service_title, price, booking_time) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [serviceId, userId, service_description, service_title, price, new Date()]
    );
    
    res.status(200).json({ message: 'Booking saved successfully', booking: result.rows[0] });
  } catch (err) {
    console.error('Error saving booking:', err);
    res.status(500).json({ error: 'Failed to save booking' });
  }
});

// GET route to retrieve all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error retrieving bookings:', err);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
});

// Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Node.js Server!' });
});

// Export the app for Vercel serverless function
module.exports = app;




// rgaNY7c94RpC@EU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmd3aWZ4Znh4bXBxeWlyZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4ODY5ODgsImV4cCI6MjA0NjQ2Mjk4OH0.MfKueoaLWq8ujsC3hctJbwNuV8PUjLBO8gpt6456anQ
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmd3aWZ4Znh4bXBxeWlyZnJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDg4Njk4OCwiZXhwIjoyMDQ2NDYyOTg4fQ.xa_jtj4bv4mkkFOFJs_eXgfyAS3iGxjR2DU9CF1oiQc
// https://nsrgwifxfxxmpqyirfrm.supabase.co
// nwD4rP3g09TXy8UDkXLUdJS0CysMGl04FwwyuVkzP2nz58MST1nc/IqcM7xuarZB/JiCx7ojebHW/dqjmxPy3Q==

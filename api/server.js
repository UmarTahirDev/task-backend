// api/server.js
const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const path = require('path');  // Add path module to resolve paths correctly
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.static('public'));  // Serve static files from the 'public' folder
app.use(express.json());
app.use(cors());


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

// api/server.js

app.post('/api/deliveries', async (req, res) => {
  const {
    collectionDay,
    collectionInstruction,
    collectionTime,
    contactAddress,
    deliveryDay,
    deliveryTime,
    driverInstruction,
    email,
    firstName,
    lastName,
    specialInstruction,
    services
  } = req.body;

  try {
    // Insert data into the 'deliveries' table
    const result = await pool.query(
      `INSERT INTO deliveries (
          collection_day, collection_instruction, collection_time, contact_address, 
          delivery_day, delivery_time, driver_instruction, email, first_name, 
          last_name, special_instruction, services
       ) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
       RETURNING *`,
      [
        collectionDay, collectionInstruction, collectionTime, contactAddress, 
        deliveryDay, deliveryTime, driverInstruction, email, firstName, 
        lastName, specialInstruction, JSON.stringify(services) // Storing services as a JSON string
      ]
    );

    // Return a success response with the created record
    res.status(200).json({ message: 'Delivery saved successfully', delivery: result.rows[0] });
  } catch (err) {
    console.error('Error saving delivery:', err);
    res.status(500).json({ error: 'Failed to save delivery' });
  }
});


// Test route
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Node.js Server!' });
});

app.get('/api', async (req, res) => {
  try {
    // Query data from the 'deliveries' table
    const result = await pool.query('SELECT * FROM deliveries');
    
    // Sending the data back as JSON to the frontend
    res.json({
      message: 'Data fetched successfully!',
      data: result.rows, // Return the rows from the query
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to serve the HTML file on the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));  // Send index.html from the 'public' folder
});

// Export the app for Vercel serverless function (if needed)
module.exports = app;





// rgaNY7c94RpC@EU
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmd3aWZ4Znh4bXBxeWlyZnJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA4ODY5ODgsImV4cCI6MjA0NjQ2Mjk4OH0.MfKueoaLWq8ujsC3hctJbwNuV8PUjLBO8gpt6456anQ
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcmd3aWZ4Znh4bXBxeWlyZnJtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDg4Njk4OCwiZXhwIjoyMDQ2NDYyOTg4fQ.xa_jtj4bv4mkkFOFJs_eXgfyAS3iGxjR2DU9CF1oiQc
// https://nsrgwifxfxxmpqyirfrm.supabase.co
// nwD4rP3g09TXy8UDkXLUdJS0CysMGl04FwwyuVkzP2nz58MST1nc/IqcM7xuarZB/JiCx7ojebHW/dqjmxPy3Q==

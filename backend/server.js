const express = require('express')
const cors = require('cors')
require('dotenv').config()

const pool = require('./db')
const applicationRoutes = require('./routes/applicationRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    message: 'Job Application Tracker API is running',
  })
})

app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()')

    res.json({
      status: 'OK',
      message: 'Backend and PostgreSQL are working',
      databaseTime: result.rows[0].now,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      status: 'ERROR',
      message: 'Database connection failed',
    })
  }
})

app.use('/api/applications', applicationRoutes)
app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
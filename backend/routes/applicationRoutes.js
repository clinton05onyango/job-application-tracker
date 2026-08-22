const express = require('express')
const pool = require('../db')
const authenticateToken = require('../authMiddleware')

const router = express.Router()

// GET ALL APPLICATIONS
router.get('/', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        company,
        position,
        location,
        job_url AS "jobUrl",
        status,
        application_date AS "applicationDate",
        notes,
        interview_date AS "interviewDate",
        created_at AS "createdAt"
      FROM applications
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Get applications error:', error)

    res.status(500).json({
      message: 'Failed to fetch applications',
    })
  }
})

// CREATE APPLICATION
router.post('/', authenticateToken, async (req, res) => {
  try {
    const {
      company,
      position,
      location,
      jobUrl,
      status,
      applicationDate,
      notes,
      interviewDate,
    } = req.body

    if (!company || !position) {
      return res.status(400).json({
        message: 'Company and position are required',
      })
    }

    const result = await pool.query(
      `
      INSERT INTO applications (
        user_id,
        company,
        position,
        location,
        job_url,
        status,
        application_date,
        notes,
        interview_date
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING
        id,
        company,
        position,
        location,
        job_url AS "jobUrl",
        status,
        application_date AS "applicationDate",
        notes,
        interview_date AS "interviewDate",
        created_at AS "createdAt"
      `,
      [
        req.user.id,
        company,
        position,
        location || null,
        jobUrl || null,
        status || 'Applied',
        applicationDate || null,
        notes || null,
        interviewDate || null,
      ]
    )

    res.status(201).json(result.rows[0])
  } catch (error) {
    console.error('Create application error:', error)

    res.status(500).json({
      message: 'Failed to create application',
    })
  }
})

// UPDATE APPLICATION
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const {
      company,
      position,
      location,
      jobUrl,
      status,
      applicationDate,
      notes,
      interviewDate,
    } = req.body

    const result = await pool.query(
      `
      UPDATE applications
      SET
        company = $1,
        position = $2,
        location = $3,
        job_url = $4,
        status = $5,
        application_date = $6,
        notes = $7,
        interview_date = $8
      WHERE id = $9
        AND user_id = $10
      RETURNING
        id,
        company,
        position,
        location,
        job_url AS "jobUrl",
        status,
        application_date AS "applicationDate",
        notes,
        interview_date AS "interviewDate",
        created_at AS "createdAt"
      `,
      [
        company,
        position,
        location || null,
        jobUrl || null,
        status,
        applicationDate || null,
        notes || null,
        interviewDate || null,
        id,
        req.user.id,
      ]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Application not found',
      })
    }

    res.json(result.rows[0])
  } catch (error) {
    console.error('Update application error:', error)

    res.status(500).json({
      message: 'Failed to update application',
    })
  }
})

// DELETE APPLICATION
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      `
      DELETE FROM applications
      WHERE id = $1
        AND user_id = $2
      RETURNING id
      `,
      [id, req.user.id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Application not found',
      })
    }

    res.json({
      message: 'Application deleted successfully',
    })
  } catch (error) {
    console.error('Delete application error:', error)

    res.status(500).json({
      message: 'Failed to delete application',
    })
  }
})

module.exports = router
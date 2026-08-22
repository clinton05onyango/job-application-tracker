import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'https://job-application-tracker-api-870u.onrender.com/api'

function App() {
  const [token, setToken] = useState(
    localStorage.getItem('token')
  )

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  if (!token) {
    return (
      <AuthScreen
        setToken={setToken}
        setUser={setUser}
      />
    )
  }

  return (
    <Dashboard
      token={token}
      user={user}
      setToken={setToken}
      setUser={setUser}
    />
  )
}

/* =========================
   AUTH SCREEN
========================= */

function AuthScreen({ setToken, setUser }) {
  const [isRegistering, setIsRegistering] =
    useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError('')
    setLoading(true)

    try {
      const endpoint = isRegistering
        ? `${API_URL}/auth/register`
        : `${API_URL}/auth/login`

      const data = isRegistering
        ? formData
        : {
            email: formData.email,
            password: formData.password,
          }

      const response = await axios.post(
        endpoint,
        data
      )

      localStorage.setItem(
        'token',
        response.data.token
      )

      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      )

      setToken(response.data.token)
      setUser(response.data.user)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          'Something went wrong.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Job Application Tracker</h1>

          <p>
            {isRegistering
              ? 'Create your account'
              : 'Welcome back'}
          </p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <div className="form-group">
              <label>Full Name</label>

              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>

            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
            />
          </div>

          <button
            className="add-button auth-submit"
            type="submit"
            disabled={loading}
          >
            {loading
              ? 'Please wait...'
              : isRegistering
                ? 'Create Account'
                : 'Login'}
          </button>
        </form>

        <div className="auth-switch">
          {isRegistering ? (
            <>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(false)
                  setError('')
                }}
              >
                Login
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(true)
                  setError('')
                }}
              >
                Create account
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

/* =========================
   DASHBOARD
========================= */

function Dashboard({
  token,
  user,
  setToken,
  setUser,
}) {
  const [applications, setApplications] =
    useState([])

  const [showForm, setShowForm] =
    useState(false)

  const [selectedApplication, setSelectedApplication] =
    useState(null)

  const [editingId, setEditingId] =
    useState(null)

  const [loading, setLoading] =
    useState(true)

  const [searchTerm, setSearchTerm] =
    useState('')

  const [statusFilter, setStatusFilter] =
    useState('All')

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    jobUrl: '',
    status: 'Applied',
    applicationDate: '',
    interviewDate: '',
    notes: '',
  })

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  /* =========================
     LOAD APPLICATIONS
  ========================= */

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/applications`,
        authConfig
      )

      setApplications(response.data)
    } catch (error) {
      console.error(error)

      if (error.response?.status === 401) {
        logout()
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))
  }

  /* =========================
     SAVE / UPDATE
  ========================= */

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      if (editingId) {
        await axios.put(
          `${API_URL}/applications/${editingId}`,
          formData,
          authConfig
        )
      } else {
        await axios.post(
          `${API_URL}/applications`,
          formData,
          authConfig
        )
      }

      await fetchApplications()

      resetForm()
    } catch (error) {
      console.error(error)

      alert(
        error.response?.data?.message ||
          'Failed to save application.'
      )
    }
  }

  /* =========================
     EDIT
  ========================= */

  const handleEdit = (application) => {
    setFormData({
      company: application.company || '',
      position: application.position || '',
      location: application.location || '',
      jobUrl: application.jobUrl || '',
      status:
        application.status || 'Applied',
      applicationDate:
        application.applicationDate
          ? application.applicationDate.slice(
              0,
              10
            )
          : '',
      interviewDate:
        application.interviewDate
          ? application.interviewDate.slice(
              0,
              10
            )
          : '',
      notes: application.notes || '',
    })

    setEditingId(application.id)
    setSelectedApplication(null)
    setShowForm(true)

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  /* =========================
     DELETE
  ========================= */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this application?'
    )

    if (!confirmed) {
      return
    }

    try {
      await axios.delete(
        `${API_URL}/applications/${id}`,
        authConfig
      )

      setApplications((previous) =>
        previous.filter(
          (application) =>
            application.id !== id
        )
      )

      setSelectedApplication(null)
    } catch (error) {
      console.error(error)

      alert(
        error.response?.data?.message ||
          'Failed to delete application.'
      )
    }
  }

  /* =========================
     RESET FORM
  ========================= */

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      jobUrl: '',
      status: 'Applied',
      applicationDate: '',
      interviewDate: '',
      notes: '',
    })

    setEditingId(null)
    setShowForm(false)
  }

  /* =========================
     LOGOUT
  ========================= */

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken(null)
    setUser(null)
  }

  /* =========================
     FILTER
  ========================= */

  const filteredApplications = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim()

    return applications.filter(
      (application) => {
        const matchesSearch =
          application.company
            .toLowerCase()
            .includes(search) ||
          application.position
            .toLowerCase()
            .includes(search)

        const matchesStatus =
          statusFilter === 'All' ||
          application.status === statusFilter

        return (
          matchesSearch &&
          matchesStatus
        )
      }
    )
  }, [
    applications,
    searchTerm,
    statusFilter,
  ])

  /* =========================
     STATISTICS
  ========================= */

  const totalApplications =
    applications.length

  const applicationsSent =
    applications.filter(
      (application) =>
        application.status === 'Applied'
    ).length

  const interviews =
    applications.filter(
      (application) =>
        application.status === 'Interview'
    ).length

  const offers =
    applications.filter(
      (application) =>
        application.status === 'Offer'
    ).length
    const rejectedApplications =
  applications.filter(
    (application) =>
      application.status === 'Rejected'
  ).length

const interviewRate =
  applicationsSent > 0
    ? Math.round(
        (interviews / applicationsSent) * 100
      )
    : 0

const offerRate =
  applicationsSent > 0
    ? Math.round(
        (offers / applicationsSent) * 100
      )
    : 0
    const upcomingInterviews = useMemo(() => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return applications
    .filter((application) => {
      if (!application.interviewDate) {
        return false
      }

      const interviewDate = new Date(
        application.interviewDate
      )

      interviewDate.setHours(0, 0, 0, 0)

      return (
        interviewDate >= today &&
        application.status === 'Interview'
      )
    })
    .sort(
      (a, b) =>
        new Date(a.interviewDate) -
        new Date(b.interviewDate)
    )
}, [applications])

  return (
    <div className="app">
      {/* HEADER */}

      <header className="header">
        <div>
          <h1>
            Job Application Tracker
          </h1>

          <p>
            Welcome, {user?.name || 'User'}
          </p>
        </div>

        <div className="header-actions">
          <button
            className="add-button"
            onClick={() => {
              setEditingId(null)
              setSelectedApplication(null)
              setShowForm(true)
            }}
          >
            + Add Application
          </button>

          <button
            className="logout-button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>

      <main>
        {/* STATISTICS */}

       <section className="stats">
  <div className="stat-card">
    <span>Total Applications</span>

    <strong>{totalApplications}</strong>

    <small>
      All tracked applications
    </small>
  </div>

  <div className="stat-card">
    <span>Applications Sent</span>

    <strong>{applicationsSent}</strong>

    <small>
      {totalApplications > 0
        ? `${Math.round(
            (applicationsSent /
              totalApplications) *
              100
          )}% of total`
        : 'No applications yet'}
    </small>
  </div>

  <div className="stat-card">
    <span>Interviews</span>

    <strong>{interviews}</strong>

    <small>
      {interviewRate}% interview rate
    </small>
  </div>

  <div className="stat-card">
    <span>Offers</span>

    <strong>{offers}</strong>

    <small>
      {offerRate}% offer rate
    </small>
  </div>

  <div className="stat-card">
    <span>Rejected</span>

    <strong>{rejectedApplications}</strong>

    <small>
      Applications not progressing
    </small>
  </div>
</section>
{/* APPLICATION PIPELINE */}

<section className="pipeline-section">
  <div className="section-header">
    <h2>Application Pipeline</h2>

    <p>
      Track how your applications are progressing.
    </p>
  </div>

  <div className="pipeline">
    <div className="pipeline-stage saved">
      <div className="pipeline-stage-top">
        <span>Saved</span>
        <strong>
          {
            applications.filter(
              (application) =>
                application.status === 'Saved'
            ).length
          }
        </strong>
      </div>

      <div className="pipeline-bar">
        <div
          style={{
            width: `${
              totalApplications > 0
                ? (applications.filter(
                    (application) =>
                      application.status === 'Saved'
                  ).length /
                    totalApplications) *
                  100
                : 0
            }%`,
          }}
        />
      </div>
    </div>

    <div className="pipeline-stage applied">
      <div className="pipeline-stage-top">
        <span>Applied</span>
        <strong>{applicationsSent}</strong>
      </div>

      <div className="pipeline-bar">
        <div
          style={{
            width: `${
              totalApplications > 0
                ? (applicationsSent /
                    totalApplications) *
                  100
                : 0
            }%`,
          }}
        />
      </div>
    </div>

    <div className="pipeline-stage interview">
      <div className="pipeline-stage-top">
        <span>Interview</span>
        <strong>{interviews}</strong>
      </div>

      <div className="pipeline-bar">
        <div
          style={{
            width: `${
              totalApplications > 0
                ? (interviews /
                    totalApplications) *
                  100
                : 0
            }%`,
          }}
        />
      </div>
    </div>

    <div className="pipeline-stage offer">
      <div className="pipeline-stage-top">
        <span>Offer</span>
        <strong>{offers}</strong>
      </div>

      <div className="pipeline-bar">
        <div
          style={{
            width: `${
              totalApplications > 0
                ? (offers /
                    totalApplications) *
                  100
                : 0
            }%`,
          }}
        />
      </div>
    </div>

    <div className="pipeline-stage rejected">
      <div className="pipeline-stage-top">
        <span>Rejected</span>
        <strong>{rejectedApplications}</strong>
      </div>

      <div className="pipeline-bar">
        <div
          style={{
            width: `${
              totalApplications > 0
                ? (rejectedApplications /
                    totalApplications) *
                  100
                : 0
            }%`,
          }}
        />
      </div>
    </div>
  </div>
</section>
{/* UPCOMING INTERVIEWS */}

<section className="upcoming-section">
  <div className="section-header">
    <h2>Upcoming Interviews</h2>

    <p>
      Your scheduled interviews coming up.
    </p>
  </div>

  {upcomingInterviews.length === 0 ? (
    <div className="upcoming-empty">
      <div className="upcoming-empty-icon">
        ✓
      </div>

      <div>
        <strong>No upcoming interviews</strong>

        <p>
          Interviews you schedule will appear
          here.
        </p>
      </div>
    </div>
  ) : (
    <div className="upcoming-list">
      {upcomingInterviews.map((application) => (
        <div
          className="upcoming-card"
          key={application.id}
        >
          <div className="upcoming-date">
            <strong>
              {new Date(
                application.interviewDate
              ).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
            </strong>

            <span>
              {new Date(
                application.interviewDate
              ).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </span>
          </div>

          <div className="upcoming-info">
            <h3>
              {application.position}
            </h3>

            <p>
              {application.company}
            </p>

            {application.location && (
              <span>
                {application.location}
              </span>
            )}
          </div>

          <button
            className="details-button"
            onClick={() =>
              setSelectedApplication(application)
            }
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  )}
</section>

        {/* FORM */}

        {showForm && (
          <section className="form-section">
            <div className="section-header">
              <h2>
                {editingId
                  ? 'Edit Job Application'
                  : 'Add Job Application'}
              </h2>

              <p>
                Enter the details of your
                application.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                {/* COMPANY */}

                <div className="form-group">
                  <label>
                    Company
                  </label>

                  <input
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Microsoft"
                    required
                  />
                </div>

                {/* POSITION */}

                <div className="form-group">
                  <label>
                    Position
                  </label>

                  <input
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="e.g. Junior Software Developer"
                    required
                  />
                </div>

                {/* LOCATION */}

                <div className="form-group">
                  <label>
                    Location
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Remote"
                  />
                </div>

                {/* STATUS */}

                <div className="form-group">
                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Saved">
                      Saved
                    </option>

                    <option value="Applied">
                      Applied
                    </option>

                    <option value="Interview">
                      Interview
                    </option>

                    <option value="Offer">
                      Offer
                    </option>

                    <option value="Rejected">
                      Rejected
                    </option>
                  </select>
                </div>

                {/* APPLICATION DATE */}

                <div className="form-group">
                  <label>
                    Application Date
                  </label>

                  <input
                    name="applicationDate"
                    type="date"
                    value={
                      formData.applicationDate
                    }
                    onChange={handleChange}
                  />
                </div>

                {/* INTERVIEW DATE */}

                <div className="form-group">
                  <label>
                    Interview Date
                  </label>

                  <input
                    name="interviewDate"
                    type="date"
                    value={
                      formData.interviewDate
                    }
                    onChange={handleChange}
                  />
                </div>

                {/* JOB URL */}

                <div className="form-group full-width">
                  <label>
                    Job URL
                  </label>

                  <input
                    name="jobUrl"
                    type="url"
                    value={formData.jobUrl}
                    onChange={handleChange}
                    placeholder="https://..."
                  />
                </div>

                {/* NOTES */}

                <div className="form-group full-width">
                  <label>
                    Notes
                  </label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Add interview notes, requirements, reminders..."
                    rows="5"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="add-button"
                >
                  {editingId
                    ? 'Update Application'
                    : 'Save Application'}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* APPLICATIONS */}

        <section className="applications">
          <div className="section-header">
            <h2>
              Applications
            </h2>

            <p>
              Your recent job applications.
            </p>
          </div>

          {/* SEARCH */}

          {applications.length > 0 && (
            <div className="filters">
              <input
                type="text"
                placeholder="Search company or position..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(
                    event.target.value
                  )
                }
              />

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target.value
                  )
                }
              >
                <option value="All">
                  All Statuses
                </option>

                <option value="Saved">
                  Saved
                </option>

                <option value="Applied">
                  Applied
                </option>

                <option value="Interview">
                  Interview
                </option>

                <option value="Offer">
                  Offer
                </option>

                <option value="Rejected">
                  Rejected
                </option>
              </select>
            </div>
          )}

          {/* LOADING */}

          {loading ? (
            <div className="empty-state">
              <h3>
                Loading applications...
              </h3>
            </div>
          ) : applications.length === 0 ? (
            <div className="empty-state">
              <h3>
                No applications yet
              </h3>

              <p>
                Start tracking your job
                applications.
              </p>

              <button
                className="add-button"
                onClick={() =>
                  setShowForm(true)
                }
              >
                + Add Your First Application
              </button>
            </div>
          ) : filteredApplications.length ===
            0 ? (
            <div className="empty-state">
              <h3>
                No matching applications
              </h3>

              <p>
                Try changing your search
                or status filter.
              </p>
            </div>
          ) : (
            <div className="application-list">
  {filteredApplications.map((application) => (
    <div
      className="application-card"
      key={application.id}
    >
      <div className="application-main">
        <div className="application-title-row">
          <div>
            <h3>{application.position}</h3>

            <p>{application.company}</p>
          </div>

          <span
            className={`status ${application.status.toLowerCase()}`}
          >
            {application.status}
          </span>
        </div>

        <div className="application-meta">
          {application.location && (
            <span>
              📍 {application.location}
            </span>
          )}

          {application.applicationDate && (
            <span>
              Applied:{' '}
              {new Date(
                application.applicationDate
              ).toLocaleDateString()}
            </span>
          )}

          {application.interviewDate && (
            <span className="interview-meta">
              Interview:{' '}
              {new Date(
                application.interviewDate
              ).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="application-right">
        {application.jobUrl && (
          <a
            className="job-link"
            href={application.jobUrl}
            target="_blank"
            rel="noreferrer"
          >
            View Job
          </a>
        )}

        <button
          className="details-button"
          onClick={() =>
            setSelectedApplication(application)
          }
        >
          Details
        </button>

        <button
          className="edit-button"
          onClick={() =>
            handleEdit(application)
          }
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() =>
            handleDelete(application.id)
          }
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
          )}
        </section>

        {/* DETAILS */}

        {selectedApplication && (
          <section className="details-section">
            <div className="details-header">
              <div>
                <h2>
                  {
                    selectedApplication.position
                  }
                </h2>

                <p>
                  {
                    selectedApplication.company
                  }
                </p>
              </div>

              <button
                className="close-button"
                onClick={() =>
                  setSelectedApplication(null)
                }
              >
                ×
              </button>
            </div>

            <div className="details-grid">
              <div>
                <strong>
                  Location
                </strong>

                <p>
                  {selectedApplication.location ||
                    'Not specified'}
                </p>
              </div>

              <div>
                <strong>
                  Status
                </strong>

                <p>
                  {selectedApplication.status}
                </p>
              </div>

              <div>
                <strong>
                  Application Date
                </strong>

                <p>
                  {selectedApplication.applicationDate
                    ? new Date(
                        selectedApplication.applicationDate
                      ).toLocaleDateString()
                    : 'Not specified'}
                </p>
              </div>

              <div>
                <strong>
                  Interview Date
                </strong>

                <p>
                  {selectedApplication.interviewDate
                    ? new Date(
                        selectedApplication.interviewDate
                      ).toLocaleDateString()
                    : 'Not scheduled'}
                </p>
              </div>

              <div className="details-full">
                <strong>
                  Notes
                </strong>

                <p>
                  {selectedApplication.notes ||
                    'No notes added.'}
                </p>
              </div>

              {selectedApplication.jobUrl && (
                <div className="details-full">
                  <strong>
                    Job Posting
                  </strong>

                  <p>
                    <a
                      href={
                        selectedApplication.jobUrl
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Job Posting
                    </a>
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
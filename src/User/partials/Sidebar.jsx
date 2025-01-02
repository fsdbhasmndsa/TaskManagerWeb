import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div>
        {/* Logo Section */}
        <div className="d-flex align-items-center mb-5">
          <img
            src="images/icons8-github-48.png" // Thay bằng logo của bạn
            alt="logo"
            className="me-2"
          />
          <h2 className='fw-bold' style={{
            background: 'linear-gradient(87deg, #11cdef, #1171ef)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>argon</h2>

        </div>

        {/* Navigation Links */}
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Icons
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Maps
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              User Profile
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Tables
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Register
            </NavLink>
          </li>
        </ul>
      </div>


    </nav>
  )
}

export default Sidebar
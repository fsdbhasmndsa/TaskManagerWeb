import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();
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
          <NavLink to={"/Task/dashboard"} className="nav-link fw-bold">
            <i className="bi bi-house-fill text-primary me-3 pt-1 fw-bold"></i>  Trang chủ
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to={"/task/project"} className="nav-link fw-bold">
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i>  Dự án
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to={"/Task/project"} className="nav-link fw-bold">
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i>  Công việc
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to={"/"} className="nav-link fw-bold">
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i>  Tài khoản
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to={"/"} className="nav-link fw-bold">
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i>  Làm nhóm
            </NavLink>
          </li>
          <li className="nav-item">
          <NavLink to={"/"} className="nav-link fw-bold">
            <i className="bi bi-list-task me-3 pt-1 fw-bold"></i>  Tham gia
            </NavLink>
          </li>
          <li  className="nav-item">
            <div  onClick={()=>{
              localStorage.removeItem("Token")
           
              navigate("/")
            }} className="nav-link fw-bold">
              <i   className="bi bi-box-arrow-left me-3 pt-1 fw-bold"></i>  Đăng xuất
              </div>
          </li>
          
        </ul>
      </div>


    </nav>
  )
}

export default Sidebar
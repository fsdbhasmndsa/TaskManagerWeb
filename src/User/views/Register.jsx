import { useFormik } from 'formik'
import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
const Register = () => {

  const Navigate = useNavigate();
  const FormIk = useFormik({
    initialValues: {
      Email: ""
    },
    validationSchema: Yup.object({
      Email: Yup.string().required("Hãy nhập Email").email("Hãy nhập đúng định dạng Email"),
    }),
    onSubmit: (values) => {
      console.log("first", values)
      Navigate("/registerNext",{state:{Email:values.Email}})
    }
  })

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
      {/* Logo */}
      <div className="mb-4">
        <img
          src="images/icons8-github-48.png"
          alt="Logo"

        />
      </div>

      {/* Tiêu đề */}
      <h2 className="fw-bold mb-4">Tạo một tài khoản</h2>

      {/* Form */}
      <form className="w-100" style={{ maxWidth: "400px" }} onSubmit={FormIk.handleSubmit} >
        {/* Input Email */}
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Địa chỉ Email*
          </label>
          <input
            onChange={FormIk.handleChange}
            type="Email"
            id="Email"
            className="form-control"
            placeholder="Nhập Email của bạn"
          />
          {FormIk.errors.Email && <i className='text-danger my-2'>{FormIk.errors.Email}</i>}
        </div>


        {/* Nút tiếp tục */}
        <div className="mb-3">
          <button className="btn btn-success w-100 py-2">Tiếp tục</button>
        </div>

        {/* Liên kết đăng nhập */}
        <div className="text-center mb-3">
          Bạn đã có sẵn tài khoản?{" "}
          <NavLink to={"/login"} style={{ textDecoration: "none" }} className="text-success">
            Đăng nhập
          </NavLink>
        </div>

        {/* Hoặc */}
        <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1" />
          <span className="mx-2 text-muted">HOẶC</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Nút tiếp tục với Google */}
        <button
          className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center mb-2"
          style={{ height: "50px" }}
        >
          <i className="fab fa-google me-2"></i>
          Tiếp tục với Google
        </button>

        {/* Nút tiếp tục với Microsoft */}
        {/* <button
       className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
       style={{ height: "50px" }}
     >
       <i className="fab fa-microsoft me-2"></i>
       Tiếp tục với Tài khoản Microsoft
     </button> */}
      </form>
    </div>
  )
}

export default Register

// git commit -m"Cấu hình Folder, viết giao diên home, login, signup, code chức năng đăng nhập" 
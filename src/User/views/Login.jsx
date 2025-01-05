import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { data, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from "yup"

const Login = () => {
  const Naviagte = useNavigate();
  const FormIk = useFormik({
    initialValues: {
      Email: "",
      Password: ""
    },
    validationSchema: Yup.object({
      Email: Yup.string().required("Hãy nhập Email"),
      Password: Yup.string().required("Hãy nhập Email")
    }),
    onSubmit: async (values) => {
      console.log("first")
      const res = await axios({
        url: "http://localhost:8080/user/login",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: values, 
      })
     if(res.data.code == 200)
     {
        toast.success("Đăng nhập thành công");
        sessionStorage.setItem("Token",res.data.Token)
        localStorage.setItem("Token",res.data.Token)
       
        Naviagte("/Task/dashboard")

     }
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
      <h2 className="fw-bold mb-4">Chào mừng trở lại</h2>

      {/* Form */}
      <form className="w-100" style={{ maxWidth: "400px" }} onSubmit={FormIk.handleSubmit}>
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

        {/* Input Email */}
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Mật khẩu *
          </label>
          <input
            onChange={FormIk.handleChange}
            type="Password"
            id="Password"
            className="form-control"
            placeholder="Nhập Password của bạn"
          />
          {FormIk.errors.Password && <i className='text-danger my-2'>{FormIk.errors.Password}</i>}
        </div>

        {/* Nút tiếp tục */}
        <div className="mb-3">
          <button type='submit' className="btn btn-success w-100 py-2">Đăng nhập</button>
        </div>

        {/* Liên kết đăng nhập */}
        <div className="text-center mb-3">
          Bạn chưa có  tài khoản?{" "}
          <NavLink to={"/register"} style={{textDecoration:"none"}} className="text-success">
            Đăng kí
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

export default Login
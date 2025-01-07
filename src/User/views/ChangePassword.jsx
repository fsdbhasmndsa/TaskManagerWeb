import axios from 'axios'
import { useFormik } from 'formik'
import React from 'react'
import { data, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from "yup"

const ChangePassword = () => {
    const Naviagate =  useNavigate();
    const Formik = useFormik({
        initialValues: {
            Email: "",
            CurrentPassword: "",
            NewPassword: ""
        },
        validationSchema: Yup.object({
            Email: Yup.string().required("Hãy nhập Email").email("Hãy nhập đúng định dàng"),
            CurrentPassword: Yup.string().required("Hãy nhập mật khẩu "),
            NewPassword: Yup.string().required("Hãy nhập mật khẩu mới").min(3, "Hãy nhập >= 3").max(10, "Hãy nhập < 10"),
        }),
        onSubmit: async (values) => {
            console.log("first",values)
            const res = await axios({url:"http://localhost:8080/user/changepassword",method:"POST",data:values,headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("Token")}`,
              }})

            if(res.data.code == 200)
            {
                toast.success(res.data.message)
                Naviagate("/login")
            }
            else
            {
                toast.error(res.data.message)
              
            }
        }
    })

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                fontFamily: "'Poppins', sans-serif",
                padding: "20px",
            }}
        >
            <div
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
                    padding: "2rem",
                }}
            >
                <div className="mb-4 text-center">
                    <img
                        src="images/icons8-github-48.png"
                        alt="Logo"
                    />
                </div>
                <h2
                    style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#333",
                        textAlign: "center",
                        marginBottom: "1.5rem",
                    }}
                >
                    ĐỖI MẬT KHẨU
                </h2>
                <form onSubmit={Formik.handleSubmit}>
                    <div style={{ marginBottom: "1.5rem" }}>
                        <label
                            htmlFor="confirmPassword"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#666",
                                fontWeight: "500",
                                fontSize: "0.9rem",
                            }}
                        >
                            Email *
                        </label>
                        <input
                            type="text"
                            id="Email"
                            onChange={Formik.handleChange}
                            placeholder="Nhập Email"
                            style={{
                                width: "100%",
                                padding: "0.9rem",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
                            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                        />
                        {Formik.errors.Email && <i className='text-danger my-2'>{Formik.errors.Email}</i>}
                    </div>
                    <div style={{ marginBottom: "1.2rem" }}>
                        <label
                            htmlFor="currentPassword"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#666",
                                fontWeight: "500",
                                fontSize: "0.9rem",
                            }}
                        >
                            Mật khẩu hiện tại *
                        </label>
                        <input
                            type="password"
                            onChange={Formik.handleChange}
                            id="CurrentPassword"
                            placeholder="Nhập mật khẩu hiện tại"
                            style={{
                                width: "100%",
                                padding: "0.9rem",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
                            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                        />
                        {Formik.errors.CurrentPassword && <i className='text-danger my-2'>{Formik.errors.CurrentPassword}</i>}
                    </div>
                    <div style={{ marginBottom: "1.2rem" }}>
                        <label
                            htmlFor="newPassword"
                            style={{
                                display: "block",
                                marginBottom: "0.5rem",
                                color: "#666",
                                fontWeight: "500",
                                fontSize: "0.9rem",
                            }}
                        >
                            Mật khẩu mới *
                        </label>
                        <input
                            type="password"
                            id="NewPassword"
                            onChange={Formik.handleChange}
                            placeholder="Nhập mật khẩu mới"
                            style={{
                                width: "100%",
                                padding: "0.9rem",
                                borderRadius: "8px",
                                border: "1px solid #ddd",
                                fontSize: "1rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                            }}
                            onFocus={(e) => (e.target.style.borderColor = "#6a11cb")}
                            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                        />
                        {Formik.errors.NewPassword && <i className='text-danger my-2'>{Formik.errors.NewPassword}</i>}
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "0.9rem",
                            background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                            fontWeight: "bold",
                            fontSize: "1rem",
                            cursor: "pointer",
                            transition: "opacity 0.3s ease",
                        }}
                        onMouseOver={(e) => (e.target.style.opacity = "0.9")}
                        onMouseOut={(e) => (e.target.style.opacity = "1")}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
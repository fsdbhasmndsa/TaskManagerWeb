import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

const RegisterNext = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

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
            <h2 className="fw-bold mb-4">Nhập mật khẩu của bạn</h2>

            {/* Form */}
            <form className="w-100" style={{ maxWidth: "400px" }}>
                {/* Email hiển thị */}
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">
                        Địa chỉ Email*
                    </label>
                    <input

                        type="Email"
                        id="Email"
                        className="form-control"
                        placeholder="Nhập Email của bạn"
                    />

                </div>

                {/* Input mật khẩu */}
                <div className="mb-3 position-relative">
                    <label htmlFor="password" className="form-label">
                        Mật khẩu*
                    </label>
                    <input
                        type={showPassword ? "text" : "password"}
                        id="Password"
                        className="form-control"
                        placeholder="Nhập mật khẩu"
                    />
                    <button
                        type="button"
                        className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-decoration-none"
                        onClick={togglePasswordVisibility}
                    >
                        <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                    </button>
                </div>

                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">
                        Họ và tên*
                    </label>
                    <input

                        type="text"
                        id="Fullname"
                        className="form-control"
                        placeholder="Nhập Name của bạn"
                    />

                </div>

                {/* Quên mật khẩu */}
                <div className="mb-3 text-end">
                    <a href="#" className="text-primary">
                        Quên mật khẩu?
                    </a>
                </div>

                {/* Nút tiếp tục */}
                <div className="mb-3">
                    <button className="btn btn-success w-100 py-2">Tiếp tục</button>
                </div>

                {/* Đăng ký */}
                <div className="text-center mb-3">
                    Bạn đã có sẵn tài khoản?{" "}
                    <NavLink to={"/register"} style={{textDecoration:"none"}} className="text-success">
                        Đăng nhập
                    </NavLink>
                </div>

                {/* Hoặc */}
                <div className="d-flex align-items-center mb-3">
                    <hr className="flex-grow-1" />
                    <span className="mx-2 text-muted">HOẶC</span>
                    <hr className="flex-grow-1" />
                </div>

                {/* Các nút đăng nhập khác */}
                <button
                    className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center mb-2"
                    style={{ height: "50px" }}
                >
                    <i className="fab fa-google me-2"></i>
                    Tiếp tục với Google
                </button>

            </form>
        </div>
    )
}

export default RegisterNext
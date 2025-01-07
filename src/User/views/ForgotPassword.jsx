import React, { useState } from "react";
import axios from 'axios'
import { useFormik } from 'formik'
import { data, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from "yup"

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [Email,SetEmail] = useState("")
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State để lưu giá trị của từng ô input
  
  const handleChange = (value, index) => {
    // Cập nhật giá trị từng ô input
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Đảm bảo chỉ có 1 ký tự
    setOtp(newOtp);

    // Tự động focus vào ô tiếp theo
    if (value && index < 5) {
      document.getElementById(`otp-input-${index + 2}`).focus();
    }
  };

  

  const [step, setStep] = useState(1); 

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1); 

  const Formik = useFormik({
    initialValues:{
      Email:""
    }, validationSchema: Yup.object({
      Email: Yup.string().required("Hãy nhập Email").email("Hãy nhập đúng định dạng Email"),
     
    }),
    onSubmit: async (values) => {
      console.log("first",values)
      const res = await axios({
        url: "http://localhost:8080/user/forgotpassword",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: values, 
      })
      if(res.data.code == 200)
      {
        toast.success(res.data.message)
        SetEmail(values.Email)
        handleNextStep()
      }
      else
      {
        toast.error(res.data.message)
      }
    }
  })

  const FormikReset = useFormik({
    initialValues:{
     
      NewPassword:"",
      confirmPassword:""
    }, validationSchema: Yup.object({
      NewPassword: Yup.string().required("Hãy nhập mật khẩu mới"),
      confirmPassword: Yup.string()
      .oneOf([Yup.ref('NewPassword'), null], "Mật khẩu xác nhận không khớp")
      .required("Hãy nhập xác nhận mật khẩu")
     
    }),
    onSubmit: async (values) => {
      console.log("Email",Email)
    
      values.Email = Email
      console.log("first",values)
      const res = await axios({
        url: "http://localhost:8080/user/ResetPassword",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: values, 
      })
      if(res.data.code == 200)
      {
        toast.success(res.data.message)
      
        //
        navigate("/login")
      }
      else
      {
        toast.error(res.data.message)
      }
    }
  })

  const handleSubmit = async () => {
    const otpValue = otp.join(""); // Kết hợp các giá trị thành một chuỗi
    const values ={
      "Email":Email,
      "OTP":otpValue
    }
    const res = await axios({url:"http://localhost:8080/otp/compareOTP",method:"POST",data:values,
      headers: {
        'Content-Type': 'application/json',
      }})

      if(res.data.code = 200)
      {
        toast.success(res.data.message)
        SetEmail(values.Email)
        handleNextStep()
      }
      else
      {
        toast.error(res.data.message)
      }

  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f7f8fc" }}
    >
      <div
        className="card p-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="mb-4 text-center mt-2">
          <img
            src="images/icons8-github-48.png"
            alt="Logo"
          />
        </div>

        {step === 1 && (
          <form onSubmit={Formik.handleSubmit}>
            <h4 className="text-center mb-3">QUÊN MẬT KHẨU</h4>
            <p className="text-center text-muted mb-4">
             NHẬP EMAIL CỦA BẠN VÀO VÀ NHẬN MÃ OTP
            </p>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="Email"
                onChange={Formik.handleChange}
                className="form-control"
                placeholder="Nhập Email của bạn"
              />
            </div>
            <button
            type="submit"
              className="btn btn-primary w-100"
         
            >
              Gửi OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <div>
            <h4 className="text-center mb-3">NHẬP OTP</h4>
            <p className="text-center text-muted">
             Chúng tôi đã gửi mã OTP về Email của bạn
            </p>
            <div className="d-flex justify-content-between mb-3">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <input
              key={index}
              type="text"
              className="form-control text-center"
              maxLength={1}
              id={`otp-input-${index + 1}`} // Gắn id duy nhất cho từng ô input
              style={{
                width: "50px",
                height: "50px",
                marginRight: index !== 5 ? "10px" : "0",
                fontSize: "20px",
              }}
              value={otp[index]} // Giá trị được liên kết với state
              onChange={(e) => handleChange(e.target.value, index)} // Cập nhật state khi nhập
            />
          ))}
        </div>
            <button
              className="btn btn-primary w-100 mb-2"
              onClick={handleSubmit}
            >
              Verify OTP
            </button>
            <button
              className="btn btn-secondary w-100"
              onClick={handlePreviousStep}
            >
              Back
            </button>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={FormikReset.handleSubmit}>
            <h4 className="text-center mb-3">NHẬP MẬT KHẨU MỚI</h4>
            <p className="text-center text-muted">
              NHẬP VÀ XÁC NHẬN MẬT KHẨU MỚI
            </p>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                Mật khẩu mới
              </label>
              <input
                onChange={FormikReset.handleChange}
                type="password"
                id="NewPassword"
                className="form-control"
                placeholder="Enter new password"
              />
                {FormikReset.errors.NewPassword && <i className='text-danger my-2'>{FormikReset.errors.NewPassword}</i>}
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Xác nhận mật khẩu
              </label>
              <input 
                onChange={FormikReset.handleChange}        
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Confirm new password"
              />
               {FormikReset.errors.confirmPassword && <i className='text-danger my-2'>{FormikReset.errors.confirmPassword}</i>}
            </div>
            <button
              type="submit"
              className="btn btn-success w-100"
             
            >
              Đăt lại mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;

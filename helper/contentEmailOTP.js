
const htmlContentOTP = (otp) =>{
 return htmlContent = `
 <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f7f7f7;">
   <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
     <h2 style="color: #4CAF50;">Xác nhận tài khoản của bạn</h2>
     <p style="font-size: 16px; color: #555; ">
       Đây là mã OTP của bạn <p style="font-size: 16px; color: red; font-weight: bold;">${otp}</p>
     </p>
    
   </div>
 </div>
`;
}

 

module.exports = htmlContentOTP;
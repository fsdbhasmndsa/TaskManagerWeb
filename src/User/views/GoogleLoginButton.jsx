import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { data, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const GoogleLoginButton = () => {
  const navigate = useNavigate();

    
 

  const handleLoginSuccess = async (response) => {
    console.log('Login success:', response);

    const res = jwtDecode(response?.credential)
    
    console.log('data', res)


    const userData = {
      Fullname: res.name,
      Email: res.email
    };

    try {
      const res = await axios({url:"http://localhost:8080/user/LoginWithGoogle",method:"POST",data:userData,
        headers: {
            'Content-Type': 'application/json',
          }
        })
      

      console.log("User saved:", res.data);
      
      if(res.data.code == 200)
      {
        localStorage.setItem("Token", res.data.Token);
        toast.success(res.data.message)
        navigate("/task/dashboard")

      }
      
    } catch (error) {
      console.error("Error saving user:", error);
      toast.error(res.data.message)
    }

  };

  const handleLoginFailure = (error) => {
    console.error('Login failed:', error);
  };

  return (
    <div className="container">
      <div className="row mt-1">
       
        <div className="col-md-12">
          <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
            <div className="GoogleLoginButton">
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}

                className="google"
                style={{
                  width: '150px',
                  height: '40px',
                  fontSize: '12px',
                }}
              />
            </div>
          </GoogleOAuthProvider>

          
          
         


         
        </div>
     


       
        
      
      </div>
    </div>
  );
};

export default GoogleLoginButton;

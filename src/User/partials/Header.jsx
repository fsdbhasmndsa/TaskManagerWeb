import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Header = () => {
  const [NameUser,SetNameUser] = useState([])
  const GET_Name_User = async()=>{
    const res = await axios({
      url: "http://localhost:8080/user/getnameuser", method: "GET", headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
      }
    })
   
    SetNameUser(res.data.Name)
  }
  useEffect(()=>{
    GET_Name_User()
  },[])
  return (
    <header className="header d-flex align-items-center justify-content-between px-4 py-3">
      {/* Thanh tìm kiếm */}
      <div className="search-bar">
      
      </div>

      {/* Thông tin người dùng */}
      <div className="user-info d-flex align-items-center">
        <span className="user-name me-3">HELLO, {NameUser}</span>
        
      </div>
    </header>
  )
}

export default Header
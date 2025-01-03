import React from 'react'

const Header = () => {
  return (
    <header className="header d-flex align-items-center justify-content-between px-4 py-3">
      {/* Thanh tìm kiếm */}
      <div className="search-bar">
      
      </div>

      {/* Thông tin người dùng */}
      <div className="user-info d-flex align-items-center">
        <span className="user-name me-3">HELLO, Jessica Jones</span>
        
      </div>
    </header>
  )
}

export default Header
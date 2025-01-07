import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PersonalPage = () => {
  const [dataUser, SetdataUser] = useState([])
  const [editMode, setEditMode] = useState(false);
  // const [profile, setProfile] = useState({
  //   name: "Nguyễn Văn Lợi",
  //   title: "Lập trình viên React.js & Spring Boot",
  //   description:
  //     "Tôi là một lập trình viên đam mê phát triển web với React.js và Spring Boot. Tôi thích học hỏi công nghệ mới và làm việc với các dự án sáng tạo.",
  //   email: "loi@example.com",
  //   phone: "0123-456-789",
  //   github: "https://github.com/loi123",
  //   totalProjects: 15,
  // });

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleInputChange = (e) => {
    
  };

  const handleSave = () => {
    setEditMode(false);
  };
  const Call_API_DATA_User = async () => {


    const res = await axios({url:"http://localhost:8080/user/Detail",method:"GET", headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    }})
    console.log("data",res.data)
    SetdataUser(res.data)
  }
  useEffect(()=>{
    Call_API_DATA_User()
  },[])
  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div
        className="card"
        style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
      >
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="card-img-top rounded-circle"
          style={{
            width: "150px",
            height: "150px",
            margin: "20px auto",
            display: "block",
          }}
        />
        <div className="card-body text-center">
          {editMode ? (
            <div>
              <input
                type="text"
                name="name"
                value={dataUser.UserDetail?.Fullname}
                onChange={handleInputChange}
                className="form-control mb-2"
                placeholder="Tên của bạn"
              />
              <input
                type="text"
                name="title"
                value={dataUser.UserDetail?.Email}
                onChange={handleInputChange}
                className="form-control mb-2"
                disabled
                placeholder="Email"
              />
              <textarea
                name="description"
                // value={dataUser.description}
                onChange={handleInputChange}
                className="form-control mb-2"
                rows="3"
                placeholder="Title"
              ></textarea>
             
            </div>
          ) : (
            <>
              <h1 className="card-title" style={{ fontSize: "2rem" }}>
                {dataUser.UserDetail?.Fullname}
              </h1>
              <p className="card-text" style={{ fontStyle: "italic", color: "#555" }}>
              {dataUser.UserDetail?.Title}
              
              </p>
              <p className="card-text" style={{ color: "#333" }}>
              {dataUser.UserDetail?.Email}
              </p>
              <ul className="list-unstyled">
               
             
                <li>
                  <strong>Tổng số dự án:</strong> {dataUser.ProjectTotal}
                </li>
              </ul>
            </>
          )}

          <button
            className={`btn ${editMode ? "btn-success" : "btn-primary"} mt-3`}
            onClick={editMode ? handleSave : handleEditToggle}
          >
            {editMode ? "Lưu thay đổi" : "Chỉnh sửa"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalPage
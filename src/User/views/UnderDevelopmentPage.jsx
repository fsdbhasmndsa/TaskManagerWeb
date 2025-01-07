import React from "react";
import { NavLink } from "react-router-dom";

const UnderDevelopmentPage = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #6a11cb, #2575fc)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        textAlign: "center",
        padding: "20px",
        borderRadius: "10px"
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          Chức năng đang được phát triển
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            marginBottom: "30px",
            textShadow: "1px 1px 5px rgba(0, 0, 0, 0.5)",
          }}
        >
          Chúng tôi đang làm việc chăm chỉ để mang lại trải nghiệm tốt nhất cho bạn. Hãy quay lại sau!
        </p>
        <div style={{ marginBottom: "30px" }}>
        <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzBxNTQzbm1tYmNiZmFtNHZqY21nejA1aG9wdHc1bXQzcmYwN2YxMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vR1dPIYzQmkRzLZk2w/giphy.webp"
        alt="Under Construction"
        style={{
          width: "400px",
          height: "300px",
          borderRadius: "10px",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
        }}
      />
        </div>
        <NavLink
        to={"/Task/dashboard"}
        
          className="btn btn-light btn-lg"
          style={{
            fontSize: "1.2rem",
            padding: "10px 20px",
            borderRadius: "25px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
        >
          Quay lại
        </NavLink>
      </div>
    </div>
  );
};

export default UnderDevelopmentPage;

import React from 'react'
import { Bar, Pie } from "react-chartjs-2";
import TopStatistics from './TopStatistics'
import { useEffect, useState } from 'react'
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const DashBoard = () => {

  const [states, SetStates] = useState({
    countInit: 0,
    countDoing: 0,
    countFinish: 0,
    countNotFinish: 0,
  });

  const [chartData, setChartData] = useState(null);


  const GetTaskByUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/task`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },

      });

      SetStates({
        countInit:res.data.init,
        countDoing:res.data.doing,
        countFinish:res.data.finish,
        countNotFinish:res.data.notfinish,
      })
      setChartData({
        labels: ["Init", "Doing", "Finish", "Not Finish"],
        datasets: [
          {
            label: "Tasks Status",
            data: [res.data.init, res.data.doing, res.data.finish, res.data.notfinish],
            backgroundColor: [
              "rgba(255, 99, 132, 0.5)",
              "rgba(54, 162, 235, 0.5)",
              "rgba(75, 192, 192, 0.5)",
              "rgba(255, 206, 86, 0.5)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };




  useEffect(() => {
    GetTaskByUser()
  }, [])



  return (
    <div className='container-fluid'>
      <TopStatistics init={states.countInit} doing={states.countDoing} finish={states.countFinish} notfinish={states.countNotFinish} />
      <div className="row mt-5">
        <div className="col-md-5 bg-light d-flex justify-content-center align-items-center" style={{borderRadius:5}}>
        <div style={{ width: "300px", height: "330px", margin: "5px", padding: "5px" }}>
  {chartData ? (
    <Pie
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "right", // Đặt vị trí nhãn ở bên phải
            align: "center", // Căn thẳng hàng nhãn
            labels: {
              boxWidth: 20, // Kích thước ô màu bên cạnh nhãn
              padding: 10,  // Khoảng cách giữa các nhãn
              font: {
                size: 12, // Kích thước chữ
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
            },
          },
          title: {
            display: true,
            text: "Task Status Chart (Pie)",
          },
        },
      }}
    />
  ) : (
    <p>Loading chart...</p>
  )}
</div>


        </div>
        <div className="col-md-2 my-3"></div>
        <div className="col-md-5 bg-light d-flex justify-content-center align-items-center" style={{borderRadius:5}}>
        <div style={{ width: "300px", height: "350px", margin: "5px", padding: "5px" }}>
  {chartData ? (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false, // Bật chế độ không duy trì tỉ lệ mặc định
        plugins: {
          legend: {
            position: "top", // Vị trí nhãn
            labels: {
              font: {
                size: 10, // Kích thước font nhỏ hơn
              },
              padding: 8, // Khoảng cách giữa các nhãn
            },
          },
          title: {
            display: true,
            text: "Task Status Chart (Bar)",
            font: {
              size: 14, // Kích thước tiêu đề
            },
          },
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 10, // Kích thước font trên trục X
              },
            },
          },
          y: {
            ticks: {
              font: {
                size: 10, // Kích thước font trên trục Y
              },
              stepSize: 1, // Bước giá trị trên trục Y
            },
          },
        },
      }}
    />
  ) : (
    <p>Loading chart...</p>
  )}
</div>

        </div>
      </div>
    </div>
  )
}

export default DashBoard
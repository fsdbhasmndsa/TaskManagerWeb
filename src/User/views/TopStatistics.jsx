import axios from 'axios';
import React, { useEffect, useState } from 'react'

const TopStatistics = ({init,doing,finish,notfinish}) => {
  


  return (
    <div className="d-flex justify-content-between mb-4">
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Khởi tạo</h6>
        <h3>{init}</h3>
        <p className="text-success">↑ 3.48% Since last month</p>
      </div>
    </div>
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Đang làm</h6>
        <h3>{doing}</h3>
        <p className="text-danger">↓ 3.48% Since last week</p>
      </div>
    </div>
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Hoàn thành</h6>
        <h3>{finish}</h3>
        <p className="text-danger">↓ 1.10% Since yesterday</p>
      </div>
    </div>
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Không hoàn thành</h6>
        <h3>{notfinish}</h3>
        <p className="text-success">↑ 1.2% Since last month</p>
      </div>
    </div>
  </div>
  )
}

export default TopStatistics
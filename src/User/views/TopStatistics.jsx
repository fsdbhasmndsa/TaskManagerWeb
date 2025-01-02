import React from 'react'

const TopStatistics = () => {
  return (
    <div className="d-flex justify-content-between mb-4">
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Traffic</h6>
        <h3>350,897</h3>
        <p className="text-success">↑ 3.48% Since last month</p>
      </div>
    </div>
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">New Users</h6>
        <h3>2,356</h3>
        <p className="text-danger">↓ 3.48% Since last week</p>
      </div>
    </div>
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Sales</h6>
        <h3>924</h3>
        <p className="text-danger">↓ 1.10% Since yesterday</p>
      </div>
    </div>
    <div className="card flex-fill mx-2 text-center">
      <div className="card-body">
        <h6 className="text-uppercase">Performance</h6>
        <h3>49.65%</h3>
        <p className="text-success">↑ 1.2% Since last month</p>
      </div>
    </div>
  </div>
  )
}

export default TopStatistics
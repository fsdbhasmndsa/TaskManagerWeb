import React from 'react'

const Overview = () => {
  return (
    <div className="d-flex">
      <div className="card flex-fill mx-2">
        <div className="card-body">
          <h6>Overview</h6>
          <h4>Sales value</h4>
          <div className="btn-group mb-3">
            <button className="btn btn-primary">Month</button>
            <button className="btn btn-light">Week</button>
          </div>
          <div className="placeholder-chart">Chart Placeholder</div>
        </div>
      </div>

      <div className="card flex-fill mx-2">
        <div className="card-body">
          <h6>Performance</h6>
          <h4>Total Orders</h4>
          <div className="placeholder-chart">Chart Placeholder</div>
        </div>
      </div>
    </div>
  )
}

export default Overview
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'


const TableProject = () => {

  const [ListProject, SetListProject] = useState([]);
  const [StatusUpdate, SetStatusUpdate] = useState(false);

  const Call_API_GetProjectByUser = async () => {
    const res = await axios({
      url: "http://localhost:8080/project", method: "GET", headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      }
    })

    SetListProject(res.data.ListProject)
    console.log("first", res.data.ListProject)

  }

  useEffect(() => {
    Call_API_GetProjectByUser()
  }, [])


  const Formik = useFormik({
    initialValues: {
      ID: "",
      Name: "",
      Content: ""
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Hãy nhập Name"),
      Content: Yup.string().required("Hãy nhập Content")
    }),
    onSubmit: async (values) => {
      console.log(values)
      const close = document.getElementsByClassName("btn-close")[0];
      if (StatusUpdate) {
        const res = await axios({
          url: "http://localhost:8080/project/Update", method: "PUT", data: values, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        })

        if (res.data.code == 200) {
          toast.success(res.data.message)

          Call_API_GetProjectByUser();
          Formik.resetForm()
          if (close) {
            close.click()
          }
        }
        else {
          toast.error(res.data.message)
        }
      }
      else {
        const res = await axios({
          url: "http://localhost:8080/project/Create", method: "POST", data: values, headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          }
        })

        if (res.data.code == 200) {
          toast.success(res.data.message)

          Call_API_GetProjectByUser();
          Formik.resetForm()
          if (close) {
            close.click()
          }
        }
        else {
          toast.error(res.data.message)
        }
      }

    }
  })
  return (
    <div className='container'>
      <div className="container-fluid d-flex align-items-center">
        <span className="navbar-brand mb-0 fw-bold ">Task have to do to have Job</span>
        <div className="ms-auto d-flex align-items-center">
          <button onClick={()=>{
            SetStatusUpdate(false)
            Formik.resetForm()
          }} className="btn btn-outline-light me-2" id='BTNADD' data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
            <i className="bi bi-plus-square-fill" /> <span>Add</span>
          </button>
          <button style={{display:"none"}} className="btn btn-outline-light me-2"  id='BTNUP'  data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
            <i className="bi bi-plus-square-fill" /> <span>Add</span>
          </button>
          <button className="btn btn-outline-light me-2">
            <i className="bi bi-people" />
          </button>
          {/* <div className="dropdown">
        <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-layout-text-sidebar-reverse" /> Bảng
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="#">Option 1</a></li>
          <li><a className="dropdown-item" href="#">Option 2</a></li>
        </ul>
      </div> */}
        </div>
      </div>


      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ borderBottom: "none" }}>
              <h4 className='bg-init'>Thêm dự án</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body row" style={{ minHeight: 300 }}>
              <div className="col-md-12">
                <form onSubmit={Formik.handleSubmit} >

                  <div className="form-floating mb-3">
                    <input value={Formik.values.Name} onChange={Formik.handleChange} type="text" className="form-control" id="Name" placeholder="name@example.com" />
                    <label className='text-dark' htmlFor="Name">Email address</label>

                    {Formik.errors.Name && <i className='text-danger my-2 ms-2'>{Formik.errors.Name}</i>}
                  </div>



                  <div className="form-floating">
                    <textarea value={Formik.values.Content} onChange={Formik.handleChange} className="form-control" placeholder="Leave a comment here" id="Content" style={{ height: 100 }} />
                    <label className='text-dark' htmlFor="Content">Comments</label>
                    {Formik.errors.Content && <i className='text-danger my-2 ms-2'>{Formik.errors.Content}</i>}
                  </div>


                  {StatusUpdate ? <button type='submit' className='btn fw-bold text-light mt-4' style={{ background: `linear-gradient(135deg, #ff6a6a, #d63031)`, minWidth: 100 }}>Cập nhật</button>
                    :
                    <button type='submit' className='btn fw-bold text-light mt-4' style={{ background: `linear-gradient(135deg, #00c6ff, #0072ff)`, minWidth: 100 }}>Thêm</button>}

                  <button onClick={() => {
                    Formik.resetForm()
                    SetStatusUpdate(false)
                  }} className='btn fw-bold text-light  mt-4 ms-3' style={{ background: `linear-gradient(135deg, #38ef7d, #11998e)`, minWidth: 100 }}>Làm mới</button>




                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-12">
          <div className="card w-100" style={{ minHeight: 500 }} >

            <div className="card-body">
              <div className="row m-3">
                {ListProject.map((p) => {
                  return <NavLink
                    style={{ textDecoration: 'none' }}
                    to={`/task/project/${p._id}`}
                    className="col-md-4 my-3"
                    key={p._id}
                  >
                    <div class="card1">
                      <div class="icons">
                        <i class="fas fa-edit" onClick={(e) => {
                          e.preventDefault();
                          SetStatusUpdate(true)
                          Formik.setFieldValue("Name", p.Name)
                          Formik.setFieldValue("Content", p.Content)
                          Formik.setFieldValue("ID", p._id)
                          Formik.setFieldTouched('Name', true);
                          Formik.setFieldTouched('Content', true);
                          const modelADD = document.getElementById("BTNUP");
                          modelADD.click()

                        }} title="Edit"></i>
                        <i class="fas fa-trash" onClick={async (e) => {
                          e.preventDefault();
                          if (window.confirm("Bạn có muốn xóa dự án này không")) {
                            const values = { "ID": p._id }
                            const res = await axios({
                              url: "http://localhost:8080/project/Delete", method: "PUT", data: values, headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${localStorage.getItem("Token")}`,
                              }
                            })

                            if (res.data.code == 200) {
                              toast.success(res.data.message)
                              Call_API_GetProjectByUser()
                            }
                          }


                        }} title="Delete"></i>
                      </div>
                      <span class="mt-5">{p.Name}</span>
                      <p class="job">Job Title</p>

                    </div>

                  </NavLink>

                })

                
                }
                {ListProject.length ==0 ? 
                  <div className="row d-flex align-items-center justify-content-center" style={{ minHeight: '60vh', minWidth: 370 }}>
                  <div className="col-md-12 d-flex align-items-center justify-content-center">
                    <img
                      className="img-fluid"
                      style={{ borderRadius: 15 }}
                      width={300}
                      height={300}
                      src="https://img.freepik.com/premium-vector/no-data-found-empty-file-folder-concept-design-vector-illustration_620585-1698.jpg?ga=GA1.1.1115368738.1680703315&semt=ais_hybrid"
                      alt=""
                    />
                  </div>
                </div>
                 : null }

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TableProject
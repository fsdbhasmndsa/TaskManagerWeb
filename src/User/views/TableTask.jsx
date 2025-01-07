import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { data, useParams } from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from "yup"
import { toast } from 'react-toastify';
const ItemType = 'TASK';

const TableTask = () => {
  const [NameProject, SetNameProject] = useState('');
  const [TaskDetail, SetTaskDetail] = useState({
    Title:"",
    Status:"",
    Content:"",
    TimeStart:"",
    TimeFinish:"",
    CreateBy:"",
    BelongProject:"",
  });
  const [TaskByUser, SetTaskByUser] = useState([]);
  const [StatusUpdate, SetStatusUpdate] = useState(false);
  const param = useParams();
  const projectId = param.id;

  const jobData = {
    Title: "Software Developer",
    Status: "In Progress",
    Content: "Develop and maintain web applications, collaborate with cross-functional teams.",
    TimeStart: new Date("2025-01-01T09:00:00Z"),
    TimeFinish: new Date("2025-12-31T17:00:00Z"),
    CreateBy: "John Doe",
    BelongProject: "WebApp Project"
  };


  const Formik = useFormik({
    initialValues: {
      ID:"",
      Title: "",
      Content: "",
      TimeStart: "",
      TimeFinish: "",
      BelongProject: projectId
      
    },
    validationSchema: Yup.object({
      Title: Yup.string().required("Hãy nhập tiêu đề"),
      Content: Yup.string().required("Hãy nhập nội dung"),
      TimeStart: Yup.string().required("Hãy nhập thời gian bắt đầu"),
      TimeFinish: Yup.string().required("Hãy nhập thời gian kết thúc")
    }),
    onSubmit: async (values) => {
      console.log(values)
      const close = document.getElementsByClassName("btn-close")[1];
      if (StatusUpdate) {
      const res = await axios({url:`http://localhost:8080/task/Update/${values.ID}`,method:"PUT",data:values, headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem("Token")}`,

      }})
      if(res.data.code = 200)
      {
        toast.success(res.data.message)
        
      }
      else
      {
        toast.error(res.data.message)
      }
  
      }
      else {
        const res = await axios({url:'http://localhost:8080/task/Create',method:"POST",data:values, headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
          
        })

        if(res.data.code = 200)
          {
            toast.success(res.data.message)
          }
          else
          {
            toast.error(res.data.message)
          }
      }
      Formik.resetForm()
      close.click()
      GetTaskByUser(); // Refresh lại danh sách task
    }
  })

  // Lấy danh sách task theo ID project
  const GetTaskByUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/task/GETtaskByID/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      SetTaskByUser(res.data.ListTask);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const AutoUpdateStatusNotFinish = async () => {
    
      const res = await axios.get(`http://localhost:8080/task/AutoChangeStatus`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
     
 
  };

  // Lấy tên project
  const GetNameProject = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/project/GetnameProject/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      SetNameProject(res.data.Name);
    } catch (err) {
      console.error('Error fetching project name:', err);
    }
  };

  // Cập nhật trạng thái task
  const UpdateTaskStatus = async (taskId, newStatus) => {
    const values = {
      "id": taskId,
      "status": newStatus
    }
    try {
      await axios({
        url: 'http://localhost:8080/task/ChangeStatus', method: "PATCH", data: values, headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        }
      });
      GetTaskByUser(); // Refresh lại danh sách task
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };
  // xóa task
  const API_Delete_Task = async(id)=>{

    const res = await axios({url:`http://localhost:8080/task/DeleteTask/${id}`,method:"PATCH",headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    }})

    if(res.data.code)
    {
      toast.success(res.data.message)
    }
    else
    {
      toast.error(res.data.message)
    }
    GetTaskByUser(); // Refresh lại danh sách task
  }

  useEffect(() => {
    AutoUpdateStatusNotFinish()
    GetTaskByUser();
    GetNameProject();
  }, []);

  // Component Drag-and-Drop cho từng task
  const DraggableItem = ({ task,index }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType,
      item: task,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
      onClick={()=>{
        SetTaskDetail({
          Title: task.Title,
          Status:task.Status,
          Content:task.Content,
          TimeStart:task.TimeStart,
          TimeFinish:task.TimeFinish,
        
          BelongProject:NameProject,
        })
        const btnup = document.getElementById("BTNGetDetail")
        btnup.click()
        console.log("click div")
      }}
        ref={drag}
        className="task-item"
      
        style={{
          opacity: isDragging ? 0.5 : 1,
          padding: '10px',
          border: '1px solid #ccc',
          marginBottom: '8px',
          backgroundColor: '#fff',
          borderRadius: '5px',
          maxWidth: '250px', // Giới hạn chiều rộng
          wordWrap: 'break-word', // Tự động xuống dòng khi từ quá dài
          overflow: 'hidden', // Ngăn nội dung tràn ra ngoài
          textAlign: 'left', // Căn chữ bên trái
          // border: `1px solid ${task.Status }`
        }}
      >
        <h6 style={{ margin: 0, fontSize: '14px' }}>{task.Title}</h6>
        <div className="task-actions">
          <i onClick={(event)=>{
            event.stopPropagation();
            const btnup = document.getElementById("BTNUP")
            const timeStartDate = new Date(task.TimeStart);
            const formattedDate = timeStartDate.toISOString().split('T')[0]; 
            const TimeFinish = new Date(task.TimeFinish);
            const formattedDateTimeFinish = TimeFinish.toISOString().split('T')[0]; 
            Formik.setFieldValue("ID",task._id)
            Formik.setFieldValue("Title",task.Title)
            Formik.setFieldValue("Content",task.Content)
            Formik.setFieldValue("TimeStart",formattedDate)
            Formik.setFieldValue("TimeFinish",formattedDateTimeFinish)
            SetStatusUpdate(true)
            btnup.click()

          }} className="bi bi-pencil-square edit-icon"></i>
          <i  onClick={(event)=>{
              event.stopPropagation();
             API_Delete_Task(task._id)
          }}  className="bi bi-trash delete-icon"></i>
        </div>
      </div>

    );
  };

  // Xử lý drop vào cột mới
  const handleDrop = (task, newStatus) => {
    if (task.Status !== newStatus) {
      UpdateTaskStatus(task._id, newStatus); // Gọi API để cập nhật trạng thái
    }
  };

  // Hook drop cho từng cột
  const DropColumn = ({ status, children }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (task) => handleDrop(task, status),
    }));

    return (
      <div
        ref={drop}
        className="task-column"
        style={{
          width: '200px',
          padding: '10px',
          margin: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
        }}
      >
        {children}
      </div>
    );
  };

  return (
    <div>
        <div className="container-fluid d-flex align-items-center">
      <h2 className="navbar-brand mb-0 fw-bold pt-3" style={{ fontSize: "1.4rem" }}>{NameProject}</h2>
        <div className="ms-auto d-flex align-items-center">
        <button className="btn btn-outline-light me-2" style={{display:"none"}} onClick={()=>{
            
          }} id='BTNGetDetail' data-bs-toggle="modal" data-bs-target="#customModal">
            <i className="bi bi-plus-square-fill" /> <span>Add</span>
          </button>
        <button className="btn btn-outline-light me-2" style={{display:"none"}} onClick={()=>{
            
          }} id='BTNUP' data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
            <i className="bi bi-plus-square-fill" /> <span>Add</span>
          </button>
          <button className="btn btn-outline-light me-2" id='BTNADD' onClick={()=>{
              SetStatusUpdate(false)
              Formik.resetForm()
             
          }} data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
            <i className="bi bi-plus-square-fill" /> <span>Add</span>
          </button>
          <button className="btn btn-outline-light me-2">
            <i className="bi bi-people" />
          </button>
          <div className="dropdown">
            <button className="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="bi bi-layout-text-sidebar-reverse" /> Bảng
            </button>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">Option 1</a></li>
              <li><a className="dropdown-item" href="#">Option 2</a></li>
            </ul>
          </div>
        </div>
      </div>

    {/* modal chi tiết */}
   <div className="modal fade" id="customModal" tabIndex={-1} aria-labelledby="customModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header" style={{borderBottom:"none"}}>
     
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
     
      <div className="modal-body" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '800px', margin: '0 auto' }}>
  {/* Job Header */}
  <div style={{ backgroundColor: '#007bff', color: 'white', borderRadius: '15px 15px 0 0', padding: '20px' }}>
    <h3 style={{ fontSize: '24px', fontWeight: 'bold' }}>{TaskDetail.Title}</h3>
    <p style={{ fontSize: '16px', fontStyle: 'italic', marginTop: '5px' }}>{TaskDetail.Status}</p>
  </div>

  {/* Job Description */}
  <div style={{ padding: '20px', color: "blue" }}>
    <h5 style={{ fontSize: '20px', fontWeight: '500', marginBottom: '10px' }}>Job Description</h5>
    <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>{TaskDetail.Content}</p>

    <h5 style={{ fontSize: '20px', fontWeight: '500', marginTop: '20px' }}>Timeframe</h5>
    <p style={{ fontSize: '16px', color: '#444' }}><strong>Start:</strong> {TaskDetail.TimeStart.toLocaleString()}</p>
    <p style={{ fontSize: '16px', color: '#444' }}><strong>Finish:</strong> {TaskDetail.TimeFinish.toLocaleString()}</p>

  

    <h5 style={{ fontSize: '20px', fontWeight: '500', marginTop: '20px' }}>Project</h5>
    <p style={{ fontSize: '16px', color: '#444' }}>{TaskDetail.BelongProject}</p>
    
    </div>
      </div>
    
    </div>
  </div>
</div>

{/* end modal chi tiết */}

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
                    <input onChange={Formik.handleChange} value={Formik.values.Title} type="text" className="form-control" id="Title"  />
                    <label className='text-dark' htmlFor="Name">Tiêu đề</label>

                    {Formik.errors.Title && <i className='text-danger my-2 ms-2'>{Formik.errors.Title}</i>}
                  </div>



                  

                  <div className="form-floating mb-3">
                    <input onChange={Formik.handleChange} value={Formik.values.Content} type="text" className="form-control" id="Content"  />
                    <label className='text-dark' htmlFor="Name">Nội dung</label>

                    {Formik.errors.Content && <i className='text-danger my-2 ms-2'>{Formik.errors.Content}</i>}
                  </div>

                  <div className="form-floating mb-3">
                    <input onChange={Formik.handleChange} type="date" value={Formik.values.TimeStart} className="form-control" id="TimeStart"  />
                    <label className='text-dark' htmlFor="Name">Thời gian bắt đầu</label>

                    {Formik.errors.TimeStart && <i className='text-danger my-2 ms-2'>{Formik.errors.TimeStart}</i>}
                  </div>

                  <div className="form-floating mb-3">
                    <input onChange={Formik.handleChange} type="date" value={Formik.values.TimeFinish} className="form-control" id="TimeFinish"  />
                    <label className='text-dark' htmlFor="Name">Thời gian kết thúc</label>

                    {Formik.errors.TimeFinish && <i className='text-danger my-2 ms-2'>{Formik.errors.TimeFinish}</i>}
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
      <div className="task-board" style={{ display: 'flex' }}>
        {[
          { status: 'init', label: 'KHỞI TẠO' },
          { status: 'doing', label: 'ĐANG LÀM' },
          { status: 'finish', label: 'ĐÃ XONG' },
          { status: 'not finish', label: 'KHÔNG XONG' },
        ].map((column, index) => (
          <DropColumn key={index} status={column.status}>
            <h4>{column.label}</h4>
            {TaskByUser.filter((task) => task.Status === column.status).map((task,index) => (
              <DraggableItem key={task._id} task={task} />
            ))}
          </DropColumn>
        ))}
      </div>
    </div>
  );
};

export default TableTask;

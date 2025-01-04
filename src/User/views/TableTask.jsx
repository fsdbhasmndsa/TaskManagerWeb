import React, { useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { data, useParams } from 'react-router-dom';
import axios from 'axios';

const ItemType = 'TASK';

const TableTask = () => {
  const [NameProject, SetNameProject] = useState('');
  const [TaskByUser, SetTaskByUser] = useState([]);
  const param = useParams();
  const projectId = param.id;

  const Formik = useFormik({
    initialValues: {
      Title: "",
      Content: "",
      TimeStart: "",
      TimeFinish: "",
      BelongProject: id
      
    },
    validationSchema: Yup.object({
      // Name: Yup.string().required("Hãy nhập Name"),
      // Content: Yup.string().required("Hãy nhập Content")
    }),
    onSubmit: async (values) => {
      console.log(values)
      const close = document.getElementsByClassName("btn-close")[0];
      if (StatusUpdate) {
      
      }
      else {
      
      }

    }
  })

  // Lấy danh sách task theo ID project
  const GetTaskByUser = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/task/GETtaskByID/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
        },
      });
      SetTaskByUser(res.data.ListTask);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  // Lấy tên project
  const GetNameProject = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/project/GetnameProject/${projectId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('Token')}`,
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
          Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
        }
      });
      GetTaskByUser(); // Refresh lại danh sách task
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  useEffect(() => {
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
          <i className="bi bi-pencil-square edit-icon"></i>
          <i className="bi bi-trash delete-icon"></i>
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
      <h2>{NameProject}</h2>
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

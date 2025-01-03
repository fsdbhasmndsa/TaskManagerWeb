import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useParams } from 'react-router-dom';

const ItemType = 'TASK';

const TableTask = () => {

  const param = useParams();
  const id = param.id;
  console.log("first",id)

  const [tasks, setTasks] = useState([
    { id: 1, name: 'Task 1', column: 1 },
    { id: 2, name: 'Task 2', column: 2 },
    { id: 3, name: 'Task 3', column: 3 },
    { id: 4, name: 'Task 4', column: 4 }
  ]);

  // Hook for drag functionality
  const DraggableItem = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType,
      item: { task }, // Passing the task object to the drag item
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    console.log('Rendering task:', task); // Logging to verify task object

    // Rendering task with drag functionality
    return (
      <div
        ref={drag}
        className="task-item"
        style={{
          opacity: isDragging ? 0.5 : 1,
          padding: '10px', // Added padding for visibility
          border: `1px solid ${task.column == '1' ? 'blue':'' } ${task.column == '2' ? 'yellow':'' } ${task.column == '3' ? 'green':'' } ${task.column == '4' ? 'red':'' }`, // Border to make sure it's visible
        }}
      >
        {task.name} {/* Display the task name */}
      </div>
    );
  };

  // Hook for drop functionality in each column
  const useDropColumn = (columnId) => {
    const [, drop] = useDrop(() => ({
      accept: ItemType,
      drop: (item) => handleDrop(item, columnId),
    }));

    return drop;
  };

  const handleDrop = (item, columnId) => {
    const updatedTasks = [...tasks];
    const taskToMove = updatedTasks.find((task) => task.id === item.task.id);

    // Move task to the new column
    if (taskToMove) {
      taskToMove.column = columnId;
    }

    // Update the tasks state after the task has been moved
    setTasks(updatedTasks);
  };

  return (
    <div>
   
  <div className="container-fluid d-flex align-items-center">
    <span className="navbar-brand mb-0 fw-bold ">Task have to do to have Job</span>
    <div className="ms-auto d-flex align-items-center">
      <button className="btn btn-outline-light me-2" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">
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

 
  <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex={-1}>
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header" style={{borderBottom:"none"}}>
         
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body" style={{minHeight:300,minWidth:800}}>
     
        </div>
       
      </div>
    </div>
  </div>
  



      <div className="task-board mt-5" style={{ display: 'flex' }}>
        <div
          ref={useDropColumn(1)}
          className={`task-column `}
          style={{ width: '200px', padding: '10px' }}
        >
          <h4 className='bg-init'>KHỞI TẠO</h4>
          {tasks
            .filter((task) => task.column === 1)
            .map((task) => (
              <DraggableItem key={task.id} task={task} />
            ))}
        </div>
        <div
          ref={useDropColumn(2)}
          className="task-column"
          style={{ width: '200px', padding: '10px' }}
        >
          <h4 className='bg-in-progress'>ĐANG LÀM</h4>
          {tasks
            .filter((task) => task.column === 2)
            .map((task) => (
              <DraggableItem key={task.id} task={task} />
            ))}
        </div>
        <div
          ref={useDropColumn(3)}
          className="task-column"
          style={{ width: '200px', padding: '10px' }}
        >
          <h4  className='bg-completed'>ĐÃ XONG</h4>
          {tasks
            .filter((task) => task.column === 3)
            .map((task) => (
              <DraggableItem key={task.id} task={task} />
            ))}
        </div>
        <div
          ref={useDropColumn(4)}
          className="task-column"
          style={{ width: '200px', padding: '10px' }}
        >
          <h4 className='bg-not-completed'>KHÔNG XONG</h4>
          {tasks
            .filter((task) => task.column === 4)
            .map((task) => (
              <DraggableItem key={task.id} task={task} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TableTask;

import React, { useState } from "react";
import EditTask from "./EditTask";


const List = ({ task, onSelectDelete, onSelectEdit, onSelectDoneId }) => {
    const { id, label, is_done } = task
    const [isHover, setIshover] = useState(false)
    const [editTaskId, setEditTaskId] = useState(null)
    const [done, setDone] = useState(is_done)
    const handleHover = (state) => {    //funcion para activar los botones eliminar y editar para eliminar tarea, al pasar el mouse
        setIshover(state)
    }

    const handleDone = () => {

        setDone(!done)

        onSelectDoneId(task, done)
    }

    return (
        <>
            <li className={`d-flex justify-content-between list-group-item text-start  ${isHover ? 'active' : ''}`}
                onMouseEnter={() => { handleHover(true) }}
                onMouseLeave={() => { handleHover(false) }}
                key={id}>
                <span>
                    {label} <i className={`fa-solid ${done ? "fa-circle-check text-warning " : "fa-solid fa-square-xmark text-danger"}`}/>
                       
                </span>
                {isHover &&
                        <div className="me-2">
                            <div className={`btn ${done ? "btn-danger" : "btn-success"} btn-sm shadow border border-light rounded-pill`} onClick={() => { handleDone() }}>{done ? "No Hecho" : "Hecho"}</div>
                            <span className="pointer" onClick={() => setEditTaskId(id)}>
                                <i className="fa-solid fa-pen-to-square ms-2 fs-5" ></i></span>
                            <span className="pointer" onClick={() => { onSelectDelete(id) }} >
                                <i className="fa-solid fa-trash ms-2 fs-5"></i></span>
                        </div>}
            </li>
            {editTaskId === id &&
                <EditTask
                    task={task}
                    onEditTask={onSelectEdit}
                    onCancelar={() => setEditTaskId(null)}
                />

            }
        </>
    )



}


export default List
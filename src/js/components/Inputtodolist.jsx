import React, { useState, useEffect } from "react";
import List from "./List";
import AlertEmpty from "./AlertEmpty";

const Inputtodolist = (props) => {
    const {data, onAddTask, onDeleteTask, onEditTask, onDoneTask, sendUser} = props
   // const [user, setUser] = useState('omarpaezdev')
    const [task, setTask] = useState('')
  
    const [isEmpty, setIsempty] = useState()
    
    
    
    const handleSubmitTask = e => {
        e.preventDefault()

       if (task === ""){
          return  setIsempty(!isEmpty)
       }


        fetch('https://playground.4geeks.com/todo/todos/' + sendUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "label": task,
                "is_done": false
            })
        })
            .then(resp => resp.json())
            .then(data => {
             onAddTask(data)
             setTask("")
            
            })
            .catch(error => console.log(error))

    }



    return (
        <>
            <div className="container border border-primary-subtle shadow-lg rounded p-1">
                <form onSubmit={handleSubmitTask} className="form-text ">
                    {isEmpty && <AlertEmpty/>}
                    <input className="form-control border-0 border-bottom shadow-none rounded-0" type="text" value={task} onChange={e => setTask(e.target.value)} placeholder="Escribe tu tarea..." />
                </form>
                    <ul className="list-group list-group-flush fw-semibold fs-6">
                       
                        {data.length !==0 ? data.map((el) => <List key={el.id} task={el} onSelectDelete={onDeleteTask} onSelectEdit ={onEditTask} onSelectDoneId={onDoneTask} />):"No hay tareas, añadir tareas"}
                    </ul>
                    <div className="text-start">
                        <span className="ps-2 fst-italic text-info-emphasis">{data.length} item left </span>
                    </div>

            </div>

        </>
    )



}

export default Inputtodolist
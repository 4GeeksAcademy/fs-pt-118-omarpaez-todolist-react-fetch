import React, { useState } from "react";
import AlertEmpty from "./AlertEmpty";


const EditTask = ({task, onEditTask, onCancelar }) =>{


    const [textEdit, setTextEdit] = useState('')    //tarea editada
    const [isEmpty, setIsempty] = useState()

    const handleSubmit = (e) =>{
        e.preventDefault();  
        if (textEdit === ""){
          return  setIsempty(!isEmpty)
       }


           fetch('https://playground.4geeks.com/todo/todos/' + task.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "label": textEdit,
                "is_done": false
            })
        })
		 .then(resp => resp.json())
        .then(data => {
             onEditTask(data)
             setTextEdit("")
             
            })
            .catch(error => console.log(error))

    } 



    return(

        <form className="text-center mt-2 " onSubmit={handleSubmit}>
            {isEmpty && <AlertEmpty/>}
            <input
            type="text"
            value={textEdit}
            onChange={(e) => setTextEdit(e.target.value)}
            className="me-2"
            
            />
            
            <button
                type="button"
                onClick={onCancelar}
                className="btn btn-danger btn-sm"
            >
                Cancelar
            </button>


        </form>


    )

}

export default EditTask
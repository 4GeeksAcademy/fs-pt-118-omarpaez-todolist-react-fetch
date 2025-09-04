import React from "react";
import { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import Inputtodolist from "./Inputtodolist";




//create your first component
const Home = () => {
	const user = 'omarpaezdev'
	//const [user, setUser] = useState('omarpaezdev')
	const [savedTasks, setSavedtasks] = useState([])
	//const [loadTask, setLoadTask] = useState(false)




	const addTask = (newTask) => {   //agrega nueva tarea al array de tareas
		setSavedtasks([...savedTasks, newTask])
	}

	const deleteTask = (id) => { // filtra y elimina tarea especifica

		fetch('https://playground.4geeks.com/todo/todos/' + id,
			{
				method: "DELETE"
			})
			.then((resp) => {
				if (!resp.ok) {
					throw new Error(`Error al eliminar la tarea: ${resp.status}`);

				}
				setSavedtasks(savedTasks.filter((e) => e.id !== id))
				console.log("Tarea eliminada correctamente")
			})
			.catch((error) => console.error(error))

	}


	const editTask = (newTask) => { // actualiza la tarea en el array de las tareas. 
		setSavedtasks(savedTasks.map((task) => {
			return task.id === newTask.id ? newTask : task;
		}))


	}

	const editTaskDone = (task, done) => {

		fetch('https://playground.4geeks.com/todo/todos/' + task.id, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"label": task.label,
				"is_done": !done
			})
		})
			.then(resp => resp.json())
			.then(data => {
				console.log(data)

			})
			.catch(error => console.log(error))



	}

	const createUser = () => { //he dejado esta funcion, en el caso de que el usuario omarpaezdev este eliminado en el servidor me devuelve error 404 y crea el usuario. 

		fetch('https://playground.4geeks.com/todo/users/' + user, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}

		})
			.then(resp => resp.json())
			.then(data => {
				console.log('Usuario creado:', data.name)
				return loadData()
			})
			.catch(error => console.log(error))


	}

	const loadData = () => {
		fetch('https://playground.4geeks.com/todo/users/' + user)
			.then(resp => {

				//if (resp.status === 404) return createUser() //si el usuario guardado en user no existe ejecuta la funcion para crearlo
				//manejamos errores, siempre se manejan
				if (!resp.ok) {
					//lanzamos un error si el OK es false (significa que hubo un error en el pedido)
					createUser()
					throw new Error(`${resp.status} ${resp.statusText}`)
				}
				return resp.json() //aqui transformamos la respuesta de texto a objeto js
			})
			.then(data => setSavedtasks(data.todos))
			.catch(error => console.log(error))

	}

	const deleteAllTask = () => {

		fetch('https://playground.4geeks.com/todo/users/' + user,
			{
				method: "DELETE"
			})
			.then((resp) => {
				if (!resp.ok) {
					throw new Error(`Error al eliminar la tarea: ${resp.status}`);

				}

				console.log("Tareas eliminadas correctamente")
				createUser()
			})
			.catch((error) => console.error(error))




	}

	useEffect(() => {
		//fetch por promesas
		loadData()


	}, []) // array de dependencias vacio para que se ejecute onLoad y una vez.


	return (
		<>
			<div className="text-center">
				<h1 className="text-center mt-5 bg-primary bg-gradient p-2 text-white">To do List</h1>

				<Inputtodolist data={savedTasks} onAddTask={addTask} onDeleteTask={deleteTask} onEditTask={editTask} onDoneTask={editTaskDone} sendUser={user} />
				{savedTasks.length > 0 &&
					<input className="btn btn-primary btn-sm my-4" type="button" value="Eliminar Tareas" data-bs-toggle="modal" data-bs-target="#exampleModal" />
				}


			</div>

			<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						
						<div className="modal-body text-center fs-5">
							Vas a eliminar todas las tareas. ¿Estas seguro?
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
							<button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={deleteAllTask}>Confirmar</button>
						</div>
					</div>
				</div>
			</div>

		</>
	);
};

export default Home;
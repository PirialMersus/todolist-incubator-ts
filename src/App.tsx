import React, {ChangeEvent, useState} from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v1} from "uuid"
import InputPlusButton from "./components/InpuPlusButton/InputPlusButton";

export type FilterValuesType = "All" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TodolistsType = Array<TodoListType>


function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });


    const [todolists, setTodolists] = useState<TodolistsType>([{
        id: todolistId1,
        title: "First todoList",
        filter: "All"
    }, {
        id: todolistId2,
        title: "Second todoList",
        filter: "All"
    }])

    const [taskValue, setTaskValue] = useState('')

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
    }

    function addTodolist(todolistTitle: string) {
        const todolistId = v1()
        const newTodolist: TodoListType = {
            id: todolistId,
            title: todolistTitle,
            filter: "All"
        }

        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }

    function setTempTaskValue(text: string) {
        setTaskValue(text)
    }

    function addTask(todolistId: string, taskValue: string) {
        if (taskValue.trim().length !== 0) {
            const newTask = {
                id: v1(), title: taskValue, isDone: false
            }
            const todolistTasks = tasks[todolistId]
            tasks[todolistId] = [newTask, ...todolistTasks]
            setTasks({...tasks})
        } else {

        }
    }

    function removeTask(id: string, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        tasks[todolistId] = todolistTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
        }
        setTodolists([...todolists]);
    }

    function clickOnCheckBox(id: string, newIsDoneValue: boolean, todolistId: string) {
        const todolistTasks = tasks[todolistId]
        const task = todolistTasks.find(task => task.id === id)
        if (task) {
            task.isDone = newIsDoneValue
            setTasks({...tasks});
        }
    }

    return (
        <div className="App">
            <InputPlusButton addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    const allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks

                    if (tl.filter === "active") {
                        tasksForTodolist = allTodolistTasks.filter(task => !task.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = allTodolistTasks.filter(task => task.isDone)
                    }
                    return (
                        <Todolist title={tl.title}
                                  filter={tl.filter}
                                  clickOnCheckBox={clickOnCheckBox}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  tempTaskValue={taskValue}
                                  setTempTaskValue={setTempTaskValue}
                                  addTask={addTask}
                                  key={tl.id}
                                  id={tl.id}
                                  removeTodolist={removeTodolist}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;

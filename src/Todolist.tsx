import React, {ChangeEvent, useCallback, useEffect} from 'react';
import AddItemForm from "./components/AddItemForm/AddItemForm";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import IconButton from '@material-ui/core/IconButton';
import {Delete} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Task from "./components/Task/Task";
import {TaskStatuses, TaskType} from './api/tasks-api';
import { FilterValuesType } from './state/todolists-reducer';
import { fetchTasksTC } from './state/tasks-reducer';
import {useDispatch} from "react-redux";



type PropsType = {
    title: string
    tasks: Array<TaskType>
    editTodolistTitle: (todoListId: string, title: string) => void
    editTaskTitle: (value: string, todoListId: string, taskId: string) => void
    removeTodolist: (id: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    // setTempTaskValue: (value: string) => void
    addTask: (todolistId: string, taskText: string) => void
    // tempTaskValue: string
    clickOnCheckBox: (id: string, status: TaskStatuses, todolistId: string) => void
    filter: string
    id: string
}

export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    },[])

    const allTodolistTasks = props.tasks
    let tasksForTodolist = allTodolistTasks

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed)
    }

    const addTask = useCallback((tempTaskValue: string) => {
        props.addTask(props.id, tempTaskValue)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const editItem = useCallback((value: string, taskId: string | undefined) => {
        if (taskId) {
            props.editTaskTitle(value, props.id, taskId)
        }
    }, [props.editTaskTitle, props.id])

    const editTodolistTitle = useCallback((title: string) => {
        props.editTodolistTitle(props.id, title)
    }, [props.id, props.editTodolistTitle])

    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    return <div>
        <EditableSpan
            editItem={editTodolistTitle}
            value={props.title}
            class={"todoListTitle"}
        />
        <IconButton aria-label="delete" onClick={removeTodolist}><Delete/>
        </IconButton>
        <AddItemForm
            addItem={addTask}
        />
        <ul>
            {
                tasksForTodolist.map(t => {
                    return (<li className={t.status === TaskStatuses.Completed ? "is-done" : ""} key={t.id}>
                        <Task
                            task={t}
                            todoListId={props.id}
                            editItem={editItem}
                            removeTask={props.removeTask}
                            clickOnCheckBox={props.clickOnCheckBox}
                        />
                    </li>)
                })
            }
        </ul>
        <div>
            <Button
                variant={props.filter === "all" ? "outlined" : "text"}

                color={"primary"}
                onClick={onAllClickHandler}>
                All
            </Button>
            <Button
                variant={props.filter === "active" ? "outlined" : "text"}
                color={"inherit"}
                onClick={onActiveClickHandler}>
                Active
            </Button>
            <Button
                variant={props.filter === "completed" ? "outlined" : "text"}
                color={"secondary"}
                className={"filterButtons " + (props.filter === "completed" ? "active" : "")}
                onClick={onCompletedClickHandler}>
                Completed
            </Button>
        </div>
    </div>
})

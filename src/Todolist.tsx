import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType} from './App';
import InputPlusButton from "./components/InpuPlusButton/InputPlusButton";
import EditableSpan from "./components/EditableSpan/EditableSpan";
import IconButton from '@material-ui/core/IconButton';
import {Delete} from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    editTodolistTitle: (todoListId: string, title: string) => void
    editTaskTitle: (value: string, todoListId: string, taskId: string) => void
    removeTodolist: (id: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    setTempTaskValue: (value: string) => void
    addTask: (todolistId: string, taskText: string) => void
    tempTaskValue: string
    clickOnCheckBox: (id: string, newIsDoneValue: boolean, todolistId: string) => void
    filter: string
    id: string
}

export function Todolist(props: PropsType) {
    const addTask = (tempTaskValue: string) => {
        props.addTask(props.id, tempTaskValue)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const editItem = (value: string, taskId: string | undefined) => {
        if (taskId) {
            props.editTaskTitle(value, props.id, taskId)
        }
    }

    const editTodolistTitle = (title: string) => {
        props.editTodolistTitle(props.id, title)
    }

    return <div>
        <EditableSpan
            editItem={editTodolistTitle}
            value={props.title}
            class={"todoListTitle"}
        />
        <IconButton aria-label="delete" onClick={removeTodolist}><Delete/>
        </IconButton>
        <InputPlusButton
            addItem={addTask}
        />
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.clickOnCheckBox(t.id, event.currentTarget.checked, props.id)
                    }
                    return (<li className={t.isDone ? "is-done" : ""} key={t.id}>
                        <Checkbox
                            onChange={onChangeHandler}
                            checked={t.isDone}
                            value="checkedA"
                            color={"primary"}
                        />
                        {/*<input*/}
                        {/*    type="checkbox"*/}
                        {/*    checked={t.isDone}*/}
                        {/*    onChange={onChangeHandler}/>*/}
                        <EditableSpan editItem={editItem} value={t.title} taskId={t.id}/>
                        <IconButton aria-label="delete" onClick={() => {
                            props.removeTask(t.id, props.id)
                        }}><Delete/>
                        </IconButton>
                    </li>)
                })
            }
        </ul>
        <div>
            <Button
                variant={props.filter === "All" ? "outlined" : "text"}

                color={"primary"}
                onClick={() => {
                    props.changeFilter("All", props.id)
                }}>
                All
            </Button>
            <Button
                variant={props.filter === "active" ? "outlined" : "text"}
                color={"inherit"}
                onClick={() => {
                    props.changeFilter("active", props.id)
                }}>
                Active
            </Button>
            <Button
                variant={props.filter === "completed" ? "outlined" : "text"}
                color={"secondary"}
                className={"filterButtons " + (props.filter === "completed" ? "active" : "")}
                onClick={() => {
                    props.changeFilter("completed", props.id)
                }}>
                Completed
            </Button>
        </div>
    </div>
}

import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Simulate} from "react-dom/test-utils";
import {strict} from "assert";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTodolist: (id: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, id: string) => void
    setTempTaskValue: (value: string) => void
    addTask: (todolistId: string) => void
    tempTaskValue: string
    clickOnCheckBox: (id: string, newIsDoneValue: boolean, todolistId: string) => void
    error: string | null
    filter: string
    key: string
    id: string
}

export function Todolist(props: PropsType) {
    const onChangeTaskInput = (e: ChangeEvent<HTMLInputElement>) => {
        const taskText = e.currentTarget.value
        props.setTempTaskValue(taskText)
    }

    const addTask = () => {
        props.addTask(props.id)
    }
    const onKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) addTask()
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return <div>
        <h3 className="todoListTitle">{props.title}</h3>
        <button onClick={removeTodolist}>X</button>
        <div>
            <input
                onChange={onChangeTaskInput}
                value={props.tempTaskValue}
                onKeyPress={onKeyPress}
            />
            <button onClick={addTask}>+</button>
            {props.error && <div className="error-message">{props.error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                        props.clickOnCheckBox(t.id, event.currentTarget.checked, props.id)
                    }
                    return (<li className={t.isDone ? "is-done" : ""} key={t.id}>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={onChangeHandler}/>
                        <span>{t.title}</span>
                        <button onClick={() => {
                            props.removeTask(t.id, props.id)
                        }}>x
                        </button>
                    </li>)
                })
            }
        </ul>
        <div>
            <button className={"filterButtons " + (props.filter === "all" ? "active" : "")} onClick={() => {
                props.changeFilter("All", props.id)
            }}>
                All
            </button>
            <button className={"filterButtons " + (props.filter === "active" ? "active" : "")} onClick={() => {
                props.changeFilter("active", props.id)
            }}>
                Active
            </button>
            <button className={"filterButtons " + (props.filter === "completed" ? "active" : "")} onClick={() => {
                props.changeFilter("completed", props.id)
            }}>
                Completed
            </button>
        </div>
    </div>
}

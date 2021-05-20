import React, {ChangeEvent} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import EditableSpan from "../EditableSpan/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../../Todolist";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
    editItem: (value: string, taskId: string | undefined) => void
    removeTask: (taskId: string, todolistId: string) => void
    clickOnCheckBox: (id: string, newIsDoneValue: boolean, todolistId: string) => void

}

const Task = React.memo(({task, todoListId, editItem, removeTask, clickOnCheckBox}: TaskPropsType) => {
    console.log("Task called")

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        clickOnCheckBox(task.id, event.currentTarget.checked, todoListId)
    }
    return (
        <>
            <Checkbox
                onChange={onChangeHandler}
                checked={task.isDone}
                value="checkedA"
                color={"primary"}
            />
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={t.isDone}*/}
            {/*    onChange={onChangeHandler}/>*/}
            <EditableSpan editItem={editItem} value={task.title} taskId={task.id}/>
            <IconButton aria-label="delete" onClick={() => {
                removeTask(task.id, todoListId)
            }}><Delete/>
            </IconButton>
        </>
    )
})
export default Task
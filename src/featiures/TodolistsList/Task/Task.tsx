import React, {ChangeEvent} from "react";
import Checkbox from "@material-ui/core/Checkbox";
import EditableSpan from "../../../components/EditableSpan/EditableSpan";
import IconButton from "@material-ui/core/IconButton";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../api/tasks-api";

export type TaskPropsType = {
    task: TaskType
    todoListId: string
    editItem: (value: string, taskId: string | undefined) => void
    removeTask: (taskId: string, todolistId: string) => void
    clickOnCheckBox: (id: string, status: TaskStatuses, todolistId: string) => void
}

const Task = React.memo(({task, todoListId, editItem, removeTask, clickOnCheckBox}: TaskPropsType) => {

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = event.currentTarget.checked
        clickOnCheckBox(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todoListId)
    }
    return (
        <>
            <Checkbox
                onChange={onChangeHandler}
                checked={task.status === TaskStatuses.Completed}
                value="checkedA"
                color={"primary"}
                disabled={task.entityStatus === 'loading'}
            />
            {/*<input*/}
            {/*    type="checkbox"*/}
            {/*    checked={t.isDone}*/}
            {/*    onChange={onChangeHandler}/>*/}
            <EditableSpan
                entityStatus={task.entityStatus}
                editItem={editItem}
                value={task.title}
                taskId={task.id}/>
            <IconButton
                disabled={task.entityStatus === 'loading'}
                aria-label="delete" onClick={() => {
                removeTask(task.id, todoListId)
            }}><Delete/>
            </IconButton>
        </>
    )
})
export default Task
import React, {ChangeEvent, useState} from "react";
import InputPlusButton from "../InpuPlusButton/InputPlusButton";
import TextField from "@material-ui/core/TextField";

type EditableSpanPropsType = {
    editItem: (title: string, taskId?: string) => void
    value: string
    taskId?: string
    class?: string
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(props.value)

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        props.editItem(value, props.taskId)
        setEditMode(false)
    }

    return (
        <>
            {!editMode
                ? <span className={props.class ? props.class : ''}
                        onDoubleClick={onDoubleClickHandler}>{props.value}</span>
                : <TextField autoFocus
                             onChange={onChangeHandler}
                             onBlur={onBlurHandler}
                             label={value}
                             variant="filled"
                />
                // <input className={props.class ? props.class : ''}
                // autoFocus
                // value={value}
                // onChange={onChangeHandler}
                // onBlur={onBlurHandler}
                // />
            }
        </>
    )
}
export default EditableSpan
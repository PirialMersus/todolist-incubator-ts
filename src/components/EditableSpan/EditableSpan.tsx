import React, {ChangeEvent, useState} from "react";
import InputPlusButton from "../InpuPlusButton/InputPlusButton";

type EditableSpanPropsType = {
    addItem: (title: string) => void
    value: string
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
        props.addItem(value)
        setEditMode(false)
    }

    return (
        <>
            {!editMode
                ? <span onDoubleClick={onDoubleClickHandler}>{props.value}</span>
                : <input
                    autoFocus
                    value={value}
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                />
            }
        </>
    )
}
export default EditableSpan
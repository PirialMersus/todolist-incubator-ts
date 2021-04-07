import React, {ChangeEvent, useState} from "react";

type InputPlusButtonPropsType = {
    addItem: (title: string) => void
    value?: string
}

const InputPlusButton = (props: InputPlusButtonPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        const taskText = e.currentTarget.value
        setTitle(taskText)
    }
    const onClickHandler = () => {
        if (title.trim().length === 0) {
            setError("Title is required!")
        } else {
        setError(null)
        props.addItem(title)
        setTitle('')}
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.charCode === 13) onClickHandler()
    }

    return (
        <div>
            <input
                onChange={onChangeHandler}
                value={title}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={onClickHandler}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
export default InputPlusButton
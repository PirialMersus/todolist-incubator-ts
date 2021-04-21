import {changeTodoListFilterAC, todoListReducer, changeTodoListTitleAC, addTodoListsAC, removeTodoListsAC} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType} from '../App';

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState,removeTodoListsAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, addTodoListsAC("new todolist done"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("new todolist done");
});
test('correct todolist title should be edit', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, changeTodoListTitleAC(todolistId1, "New title")
    )

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("New title");
});
test('Edit todolist filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]

    const endState = todoListReducer(startState, changeTodoListFilterAC("active", todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("active");
});

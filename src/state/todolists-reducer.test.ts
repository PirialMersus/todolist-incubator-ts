import {
    changeTodoListFilterAC,
    todoListReducer,
    changeTodoListTitleAC,
    addTodoListsAC,
    removeTodoListsAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodoListType} from '../App.txt';

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "All"},
        {id: todolistId2, title: "What to buy", filter: "All"}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todoListReducer(startState, removeTodoListsAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {

    const endState = todoListReducer(startState, addTodoListsAC("new todolist done"))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("new todolist done");
});
test('correct todolist title should be edit', () => {

    const endState = todoListReducer(startState, changeTodoListTitleAC(todolistId1, "New title")
    )

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("New title");
});
test('Edit todolist filter', () => {

    const endState = todoListReducer(startState, changeTodoListFilterAC("active", todolistId1))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe("active");
});

import {removeTodoListsAC} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

type TasksType = {
    [todolistId: string]: Array<TaskType>
}

let todolistId1: string
let todolistId2: string

let taskId1: string
let taskId2: string
let taskId3: string
let taskId4: string
let taskId5: string

let tasks: TasksType


beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()

    taskId1 = v1()
    taskId2 = v1()
    taskId3 = v1()
    taskId4 = v1()
    taskId5 = v1()


    tasks = {
        [todolistId1]: [
            {id: taskId1, title: "HTML&CSS1", isDone: true},
            {id: taskId2, title: "JS1", isDone: true},
            {id: taskId3, title: "ReactJS1", isDone: false},
            {id: taskId4, title: "Rest API1", isDone: false},
            {id: taskId5, title: "GraphQL1", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    }
})


test('correct task should be removed', () => {



    const endState = tasksReducer(tasks, removeTaskAC(taskId2, todolistId1))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][1].title).toBe("ReactJS1");
    expect(endState[todolistId1].every((t) => t.title !== taskId2)).toBeTruthy()

});
test('correct task should be added', () => {

    const endState = tasksReducer(tasks, addTaskAC("new task is added", todolistId2))

    expect(endState[todolistId2].length).toBe(6);
    expect(endState[todolistId2][0].title).toBe("new task is added");
});
test('correct task title should be edit', () => {

    const endState = tasksReducer(tasks, editTaskTitleAC("new task title", todolistId1, taskId4))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][3].title).toBe("new task title");
});
test('Edit task status', () => {

    const endState = tasksReducer(tasks, changeTaskStatusAC(todolistId1, taskId5, true,))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].isDone).toBeTruthy()
});
test('the removal of the todolist caused the removal of the tasks', () => {

    const endState = tasksReducer(tasks, removeTodoListsAC(todolistId2))
    const keys = Object.keys(endState)

    expect(endState[todolistId2]).toBeUndefined()
    expect(keys.length).toBe(1);
});

import {addTodoListsAC, removeTodoListsAC} from './todolists-reducer';
import {v1} from 'uuid';
import {TaskType} from "../Todolist";
import {addTaskAC, changeTaskStatusAC, editTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

type TasksType = {
    [todolistId: string]: Array<TaskType>
}

test('correct task should be removed', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3 = v1()
    const taskId4 = v1()
    const taskId5 = v1()


    const tasks: TasksType = {
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

    const endState = tasksReducer(tasks, removeTaskAC(taskId2, todolistId1))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId1][1].title).toBe("ReactJS1");
    expect(endState[todolistId1].every((t) => t.title !== taskId2)).toBeTruthy()

});
test('correct task should be added', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const tasks: TasksType = {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS1", isDone: true},
            {id: v1(), title: "JS1", isDone: true},
            {id: v1(), title: "ReactJS1", isDone: false},
            {id: v1(), title: "Rest API1", isDone: false},
            {id: v1(), title: "GraphQL1", isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    }

    const endState = tasksReducer(tasks, addTaskAC("new task is added", todolistId2))

    expect(endState[todolistId2].length).toBe(6);
    expect(endState[todolistId2][0].title).toBe("new task is added");
});
test('correct task title should be edit', () => {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3 = v1()
    const taskId4 = v1()
    const taskId5 = v1()


    const tasks: TasksType = {
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

    const endState = tasksReducer(tasks, editTaskTitleAC("new task title", todolistId1, taskId4))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][3].title).toBe("new task title");
});
test('Edit task status', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3 = v1()
    const taskId4 = v1()
    const taskId5 = v1()

    const tasks: TasksType = {
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

    const endState = tasksReducer(tasks, changeTaskStatusAC(todolistId1, taskId5, true,))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId1][4].isDone).toBeTruthy()
});
test('the removal of the todolist caused the removal of the tasks', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()
    const todolistId3 = v1()

    const taskId1 = v1()
    const taskId2 = v1()
    const taskId3 = v1()
    const taskId4 = v1()
    const taskId5 = v1()

    const tasks: TasksType = {
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

    const endState = tasksReducer(tasks, removeTodoListsAC(todolistId2))
    const keys = Object.keys(endState)

    expect(endState[todolistId2]).toBeUndefined()
    expect(keys.length).toBe(1);
});

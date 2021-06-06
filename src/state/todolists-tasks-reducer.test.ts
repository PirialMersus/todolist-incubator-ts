import {addTodoListsAC, removeTodoListsAC, todoListReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {TasksType, TodolistsType, TodoListType} from '../App.txt';
import {tasksReducer} from "./tasks-reducer";

test('TodoListId is equal TodoListId from tasks', () => {
    const startTodolistsState: TodolistsType = []
    const startTasksState: TasksType = {}

    const action = addTodoListsAC("anything")
    const endTodoListState = todoListReducer(startTodolistsState, action)
    const endTasksState = tasksReducer(startTasksState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodoLists = endTodoListState[0].id


    expect(idFromTasks).toBe(action.id);
    expect(idFromTodoLists).toBe(action.id);

});

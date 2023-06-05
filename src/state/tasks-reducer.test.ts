import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC, todolistsReducer, TodolistsType} from "./todolists-reducer";
import {TasksType} from "../AppWithRedux";
import {TaskPriority, TaskStatuses, TaskType} from "../api/task-api";
import {v1} from "uuid";

let startState: TasksType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', status: TaskStatuses.New, addedDate: `soon`, order: 1, completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: 'todolistId1' },
            {id: '2', title: 'JS', status: TaskStatuses.Completed, addedDate: `soon`, order: 1, completed: true, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: 'todolistId1' },
            {id: '3', title: 'React', status: TaskStatuses.New, addedDate: `soon`, order: 1, completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: 'todolistId1' }
        ],
        'todolistId2': [
            {id: '1', title: 'bread', status: TaskStatuses.New, addedDate: `soon`, order: 1, completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: 'todolistId2' },
            {id: '2', title: 'milk', status: TaskStatuses.Completed, addedDate: `soon`, order: 1, completed: true, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: 'todolistId2' },
            {id: '3', title: 'tea', status: TaskStatuses.New, addedDate: `soon`, order: 1, completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: 'todolistId1' }
        ]
    }
})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC('2', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isDone: false},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'React', isDone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isDone: false},
            {id: '3', title: 'tea', isDone: false}
        ]
    })
})

test('correct task should be added to correct array', () => {

    let newTask: TaskType = {id: v1(), title: 'juce', status: TaskStatuses.New, addedDate: `soon`, order: 2, todoListId: 'todolistId2', completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low}

    const action = addTaskAC(newTask)

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].id).toBeDefined()
    expect(endState['todolistId2'][0].title).toBe('juce')
    expect(endState['todolistId2'][0].status).toBe(0)
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC('2', false, 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].status).toBe(0)
    expect(endState['todolistId2'][0].status).toBe(0)
    expect(endState['todolistId2'][2].status).toBe(0)
})

test('title of task should be changed', () => {

    const action = changeTaskTitleAC('2', 'coffee', 'todolistId2')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('coffee')
    expect(endState['todolistId2'][0].title).toBe('bread')
    expect(endState['todolistId2'][2].title).toBe('tea')
})

test('new array should be added when new todolist is added', () => {

    let newTodo: TodolistsType = {id: v1(), title: 'new todolist', filter: 'all', addedDate: `${new Date().getDate()}`, order: 3, entityStatus: 'idle'}
    const action = addTodolistAC(newTodo)

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistsType> = []

    let newTodo: TodolistsType = {id: v1(), title: 'new todolist', filter: 'all', addedDate: `${new Date().getDate()}`, order: 3, entityStatus: 'idle'}
    const action = addTodolistAC(newTodo)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodolist.id)
    expect(idFromTodolists).toBe(action.newTodolist.id)
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})

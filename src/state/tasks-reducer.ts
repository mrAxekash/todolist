import {TasksType} from "../App";
import {TaskType} from "../Todolist";
import {v1} from "uuid";

type ActionType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskID: string
    todolistID: string
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistID: string,
    taskID: string,
    newStatus: boolean
}

export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID, taskID
    } as const
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        title, todolistID
    } as const
}

export const changeTaskStatusAC = (taskID: string, newStatus: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID, taskID, newStatus
    } as const
}



export const tasksReducer = (state: TasksType, action: ActionType) => {
    switch(action.type  ) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)  }
        }
        case "ADD-TASK": {
            const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {...state, [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {...task, isDone: action.newStatus} : task) }
        }

        default: return state
    }
}




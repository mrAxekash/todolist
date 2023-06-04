import {TasksType} from "../App";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {taskAPI, TaskPriority, TaskStatuses, TaskType} from "../api/task-api";
import {AppRootStateType} from "../state/store";

type ActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksAT
    | ChangeTaskActionType

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

type AddTaskActionType = ReturnType<typeof addTaskAC>

type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ChangeTaskActionType = ReturnType<typeof changeTaskAC>

type SetTasksAT = ReturnType<typeof setTasksAC>

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriority
    startDate?: number
    deadline?: number
}


export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID, taskID
    } as const
}

export const addTaskAC = (newTask: TaskType) => {
    return {
        type: 'ADD-TASK',
        newTask
    } as const
}

export const changeTaskStatusAC = (taskID: string, newStatus: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todolistID, taskID, newStatus
    } as const
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID, newTitle, todolistID
    } as const
}

export const changeTaskAC = (taskID: string, data: UpdateDomainTaskModelType, todolistID: string) => {
    return {
        type: "CHANGE-TASK",
        taskID, todolistID, data
    } as const
}

export const setTasksAC = (todolistID: string, dataTasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        todolistID, dataTasks
    } as const
}


const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType): TasksType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)}
        }
        case "ADD-TASK": {
            //const newTask: TaskType = {id: v1(), title: action.title, isDone: false}
            //return {...state, [action.todolistID]: [newTask, ...state[action.todolistID]]}
            return {...state, [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    isDone: action.newStatus
                } : task)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {
                    ...task,
                    title: action.newTitle
                } : task)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.newTodolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const newState = {...state}
            delete newState[action.id]
            return newState
        }
        case "SET-TODOLISTS": {
            let newState = {...state}
            action.data.forEach(todo => {
                newState[todo.id] = []
            })
            return newState
        }
        case "SET-TASKS": {
            return {...state, [action.todolistID]: action.dataTasks}
        }
        case "CHANGE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].map(task => task.id === action.taskID ? {...task, ...action.data} : task) }
        }
        default:
            return state
    }
}

//thunks

export const setTasksTC = (todolistID: string) => (dispatch: Dispatch) => {
    taskAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(todolistID, res.items))
        })
}

export const deleteTaskTC = (todolistID: string, taskID: string) => (dispatch: Dispatch) => {
    taskAPI.deleteTask(todolistID, taskID)
        .then(res => {
            dispatch(removeTaskAC(taskID, todolistID))
        })
}

export const addTaskTC = (newTaskTitle: string, todolistID: string) => (dispatch: Dispatch) => {
    taskAPI.createTask(todolistID, newTaskTitle)
        .then(res => {
            dispatch(addTaskAC(res.data.item))
        })
}

export const changeTaskTitleAndStatusTC = (todolistID: string, taskID: string, data: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const todolistTasks = getState().tasks[todolistID]
    const task = todolistTasks.find(task => task.id === taskID)


    if (task) {
        taskAPI.updateTask(todolistID, taskID, {
            deadline: data.deadline ? data.deadline : task.deadline,
            title: data.title ? data.title : task.title,
            status: data.status ? data.status : task.status,
            completed: data.completed ? data.completed : task.completed,
            description: data.description ? data.description : task.description,
            priority: data.priority ? data.priority : task.priority,
            startDate: data.startDate ? data.startDate : task.startDate
        })
            .then(res => {
                dispatch(changeTaskAC(taskID, data, todolistID))
            })
    }


}





import axios from "axios";
import {Dispatch} from "redux";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '6f4db439-9884-4ff2-8dec-d35fda8e60cc'
    }
})

export enum TaskStatuses {
    New = 0,
    InProgress= 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriority {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriority
    startDate: number
    deadline: number
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string[]
}

export type ResponseTaskType<D = {}> = {
    resultCode: number
    messages: string[],
    data: D
}


type ImportantType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriority
    startDate: number
    deadline: number
}



export const taskAPI = {
    getTasks(todolistID: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistID}/tasks`)
            .then(res => {
                return res.data
            })
    },
    deleteTask(todolistID: string, taskID: string) {
        return instance.delete<ResponseTaskType>(`/todo-lists/${todolistID}/tasks/${taskID}`)
            .then(res => {
                return res.data
            })
    },
    createTask(todolistID: string, title: string) {
        return instance.post<ResponseTaskType<{item: TaskType}>>(`/todo-lists/${todolistID}/tasks`, {title})
            .then(res => res.data)
    },
    updateTask(todolistID: string, taskID: string, data: ImportantType) {
        return instance.put<ResponseTaskType<{ item: TaskType }>>(`/todo-lists/${todolistID}/tasks/${taskID}`, data)
            .then(res => {
                return res.data
            })
    }
}


import axios from "axios";


//types

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    fieldsError?: string[]
    data: D
}



const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '6f4db439-9884-4ff2-8dec-d35fda8e60cc'
    }

})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
            .then(res => {
                return res.data
            })
    },
    addTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('/todo-lists', {title})
            .then(res => {
                return res.data
            })
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistID}`)
            .then(res => {
                return res.data
            })
    },
    updateTodolistTitle(newTitle: string, todolistID: string) {
        return instance.put<ResponseType>(`/todo-lists/${todolistID}`, {title: newTitle})
            .then(res => res.data)
    }
}

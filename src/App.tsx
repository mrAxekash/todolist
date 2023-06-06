import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from './components/AddItemForm/AddItemForm';
// import {Header} from "./Header";
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Grid from "@mui/material/Grid";
// import {TaskPriority, TaskStatuses, TaskType} from './api/task-api';
// import {TasksType} from "./AppWithRedux";
//
//
// export type FilteredValuesType = 'all' | 'active' | 'completed'
//
// export type TodolistsType = {
//     id: string
//     title: string
//     filter: FilteredValuesType
// }
//
// // export type TasksType = {
// //     [key: string]: Array<TaskType>
// // }
//
// function App() {
//
//     let todolistID1 = v1()
//     let todolistID2 = v1()
//
//     let [todolists, setTodolists] = useState<TodolistsType[]>([
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//
//     ])
//     let [tasks, setTasks] = useState<TasksType>({
//         [todolistID1]: [
//             {id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, addedDate: `soon`, order: 1, completed: true, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: todolistID1 },
//             {id: v1(), title: 'JS', status: TaskStatuses.Completed, addedDate: `soon`, order: 1, completed: true, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: todolistID1 },
//             {id: v1(), title: 'ReactJS', status: TaskStatuses.New, addedDate: `soon`, order: 1, completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: todolistID1 },
//         ],
//         [todolistID2]: [
//             {id: v1(), title: 'Rest API', status: TaskStatuses.Completed, addedDate: `soon`, order: 1, completed: true, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: todolistID2},
//             {id: v1(), title: 'GraphQL', status: TaskStatuses.New, addedDate: `soon`, order: 1, completed: false, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: todolistID2 },
//         ]
//     })
//     //tasks function
//     const deleteTask = (taskId: string, todolistID: string) => {
//         setTasks({...tasks, [todolistID]: tasks[todolistID].filter(task => task.id !== taskId)})
//     }
//     const addTask = (newTaskTitle: string, todolistID: string) => {
//         let newTask: TaskType = {id: v1(), title: newTaskTitle, status: TaskStatuses.Completed, addedDate: `soon`, order: 1, completed: true, deadline: 10, startDate: new Date().getDate(), description: '', priority: TaskPriority.Low, todoListId: todolistID }
//         setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
//     }
//     const changeTaskStatus = (taskId: string, newStatus: TaskStatuses, todolistID: string) => {
//         setTasks({...tasks, [todolistID]: tasks[todolistID].map(task => task.id === taskId ? {...task, status: newStatus } : task)})
//     }
//     const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
//         setTasks({
//             ...tasks,
//             [todolistID]: tasks[todolistID].map(task => task.id === taskID ? {...task, title: newTitle} : task)
//         })
//     }
//     //todolists function
//     const deleteTodolist = (todolistID: string) => {
//         setTodolists(todolists.filter(todolist => todolist.id !== todolistID))
//         delete tasks[todolistID]
//     }
//     const addTodolist = (title: string) => {
//         let newTodolist: TodolistsType = {id: v1(), title, filter: 'all'}
//         setTodolists([newTodolist, ...todolists])
//         setTasks({...tasks, [newTodolist.id]: []})
//     }
//     const changeFilter = (todolistId: string, filter: FilteredValuesType) => {
//         setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter} : todolist))
//
//     }
//     const changeTodolistTitle = (todolistID: string, newTitle: string) => {
//         setTodolists(todolists.map(todolist => todolist.id === todolistID ? {...todolist, title: newTitle} : todolist))
//     }
//     return (
//         <div className="App">
//             <Header/>
//             <Container fixed>
//                 <Grid container style={{padding: '20px'}}>
//                     <AddItemForm callback={addTodolist}/>
//                 </Grid>
//
//                 <Grid container spacing={3}>
//                     {todolists.map(todolist => {
//                         let taskForTodolist = tasks[todolist.id]
//                         if (todolist.filter === 'active') {
//                             taskForTodolist = taskForTodolist.filter(task => task.status === 0)
//                         }
//                         if (todolist.filter === 'completed') {
//                             taskForTodolist = taskForTodolist.filter(task => task.status === 2)
//                         }
//                         return (
//                             <Grid item>
//                                 <Paper variant={'outlined'} elevation={6} style={{padding: '10px', margin: '10px'}}>
//                                     <Todolist
//                                         key={todolist.id}
//                                         id={todolist.id}
//                                         title={todolist.title}
//                                         filter={todolist.filter}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeTaskStatus}
//                                         deleteTask={deleteTask}
//                                         deleteTodolist={deleteTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodolistTitle={changeTodolistTitle}
//                                         entityStatus={'idle'}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         )
//                     })}
//                 </Grid>
//
//             </Container>
//
//         </div>
//     );
// }
//
// export default App;

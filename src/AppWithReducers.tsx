import React, {useReducer, useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from './AddItemForm';
// import {Header} from "./Header";
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Grid from "@mui/material/Grid";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from './state/todolists-reducer';
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
// export type TasksType = {
//     [key: string]: Array<TaskType>
// }
//
// function AppWithReducers() {
//
//     let todolistID1 = v1();
//     let todolistID2 = v1();
//
//
//     let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
//         {id: todolistID1, title: 'What to learn', filter: 'all'},
//         {id: todolistID2, title: 'What to buy', filter: 'all'},
//     ]);
//
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todolistID1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//         ],
//         [todolistID2]: [
//             {id: v1(), title: 'Rest API', isDone: true},
//             {id: v1(), title: 'GraphQL', isDone: false},
//         ]
//     })
//
//     //tasks function
//     const deleteTask = (taskId: string, todolistID: string) => {
//         dispatchToTasks(removeTaskAC(taskId, todolistID))
//     }
//     const addTask = (newTaskTitle: string, todolistID: string) => {
//         dispatchToTasks(addTaskAC(newTaskTitle, todolistID))
//     }
//     const changeTaskStatus = (taskId: string, isDone: boolean, todolistID: string) => {
//         dispatchToTasks(changeTaskStatusAC(taskId, isDone, todolistID))
//     }
//     const changeTaskTitle = (todolistID: string, taskID: string, newTitle: string) => {
//         dispatchToTasks(changeTaskTitleAC(taskID, newTitle, todolistID))
//     }
//     //todolists function
//     const deleteTodolist = (todolistID: string) => {
//         dispatchToTodolists(removeTodolistAC(todolistID))
//         dispatchToTasks(removeTodolistAC(todolistID))
//     }
//     const addTodolist = (title: string) => {
//         const action = addTodolistAC(title)
//         dispatchToTodolists(action)
//         dispatchToTasks(action)
//     }
//     const changeFilter = (todolistId: string, filter: FilteredValuesType) => {
//         dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
//     }
//     const changeTodolistTitle = (todolistID: string, newTitle: string) => {
//         dispatchToTodolists(changeTodolistTitleAC(todolistID, newTitle))
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
//                             taskForTodolist = taskForTodolist.filter(task => !task.isDone)
//                         }
//                         if (todolist.filter === 'completed') {
//                             taskForTodolist = taskForTodolist.filter(task => task.isDone)
//                         }
//                         return (
//                             <Grid item key={todolist.id}>
//                                 <Paper variant={'elevation'} elevation={6} style={{padding: '10px', margin: '10px'}}>
//                                     <Todolist
//                                         key={todolist.id}
//                                         id={todolist.id}
//                                         title={todolist.title}
//                                         //tasks={taskForTodolist}
//                                         filter={todolist.filter}
//                                         changeFilter={changeFilter}
//                                         addTask={addTask}
//                                         changeTaskStatus={changeTaskStatus}
//                                         deleteTask={deleteTask}
//                                         deleteTodolist={deleteTodolist}
//                                         changeTaskTitle={changeTaskTitle}
//                                         changeTodolistTitle={changeTodolistTitle}
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
// export default AppWithReducers;

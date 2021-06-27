import React, {useEffect} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import {fetchTodolistsTC} from './state/todolists-reducer';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskType} from './api/tasks-api';
import {initializeAppTC, RequestStatusType} from './state/app-reducer';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import {TodolistType} from "./api/todolist-api";
import {Redirect, Route, Switch, useHistory} from 'react-router-dom'
import TodolistsList from "./featiures/TodolistsList/TodolistsList";
import {Login} from './featiures/Login/Login';
import CircularProgress from "@material-ui/core/CircularProgress";
import {logoutTC} from "./state/auth-reducer";

export type TodolistsType = Array<TodolistType>

export type TasksType = {
    [key: string]: Array<TaskType>
}

type PropsType = {
    demo?: boolean
}

function App(props: PropsType) {
    const dispatch = useDispatch()

    const isLogin = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    useEffect(() => {
        if (props.demo || !isLogin){
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status
    )

    const onClickHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={""} color="inherit" aria-label="menu">
                        <Menu open={false}/>
                    </IconButton>
                    <Typography variant="h6" className={""}>
                        News
                    </Typography>
                    {isLogin && <Button color="inherit" onClick={onClickHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <Switch>
                    <Route exact path={'/'} render={() => <TodolistsList demo={props.demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                    <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
                    <Redirect from={'*'} to={'/404'}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;

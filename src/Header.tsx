import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {LinearProgress} from "@mui/material";
import {useAppSelector} from "./state/store";
import {InitialStateType, RequestStatusType} from "./state/app-reducer";

type Props = {

};
export const Header = (props: Props) => {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
            {status === 'loading' && <LinearProgress color={"secondary"}/>}
        </AppBar>
    );
};
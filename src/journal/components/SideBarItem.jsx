import {useMemo} from 'react';
import {Grid, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';
import {TurnedInNot} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {setActiveNote} from '../../store/journal';

export const SideBarItem = ({id, date, title, body, imageUrls = []}) => {
    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17
            ? title.substring(0, 17) + '...'
            : title;

    }, [title]);

    const onClickNote = (e) => {
        e.preventDefault();

        console.log('clicked onClickSideBarItem');
        dispatch(setActiveNote({
            id, date, title, body, imageUrls,
        }));
    };

    return (
        <ListItem disablePadding onClick={onClickNote}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot/>
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle}/>
                    <ListItemText secondary={body}/>
                </Grid>
            </ListItemButton>
        </ListItem>
    );
};
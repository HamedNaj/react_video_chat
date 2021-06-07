import React, {useContext} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import {Phone} from '@material-ui/icons';
import {SocketContext} from "../SocketContext";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    justifyContent: 'center',
  },
  span: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  }
}));

export default function UsersList() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const {usersList, callUser,loggedIn} = useContext(SocketContext)
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <List className={classes.root}>
      {usersList.map((user, index) => {
        const labelId = `checkbox-list-label-${index}`;

        return (
          <ListItem key={index} role={undefined} dense button onClick={handleToggle(index)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(index) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{'aria-labelledby': labelId}}
              />
            </ListItemIcon>
            <ListItemText id={user} primary={`${user}`}/>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <Phone onClick={() => callUser(user)}/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      {loggedIn && usersList.length === 0 && <span className={classes.span}>Nobody is Online</span>}
    </List>
  );
}

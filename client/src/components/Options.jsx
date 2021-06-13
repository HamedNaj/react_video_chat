import React, {useContext, useEffect} from 'react'
import {Button, TextField, Grid, Typography, Container, Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import {SocketContext} from "../SocketContext";
import UsersList from '../components/UsersList'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  margin: {
    marginTop: 20,
    type: 'submit'
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Options = ({children}) => {
  const {name, setName, login, usersList, loggedIn} = useContext(SocketContext)
  const classes = useStyles()
  const submitHandler = e => {
    e.preventDefault()
    login(name)
  }
  useEffect(() => {
    const sessionName = sessionStorage.getItem('HPINGER_ZOOM_USERNAME')
    if (sessionName)
      login(sessionName)
  }, [])
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete='off' onSubmit={submitHandler}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={12} className={classes.padding}>
              <Typography variant='h6'> Account Info : {name}</Typography>
              {!loggedIn && <TextField label='Name' value={name} onChange={(e) => setName(e.target.value)}
                         fullWidth/>}
              {!loggedIn &&
              <Button variant='contained' color='primary' startIcon={<ExitToApp fontSize='large'/>} fullWidth
                      onClick={() => login(name)}
                      className={classes.margin}>
                Login
              </Button>}
            </Grid>
            <UsersList usersList={usersList}/>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}

export default Options

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { inputData } from '../Redux/Store/AccoutSlice';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  root:{
    paddingTop: '1px !important',
    paddingBottom: "10px !important"
  },
  fotter:{
    marginTop: '5px'
  },
  selectbox: {
    margin: theme.spacing(0, 0, 2, 0)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    border: "red"
  },
  signup: {
    marginBottom: theme.spacing(3)
  }
}));

const LogIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useSelector(state => state);
  let history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(inputData({ [name]: value }))
  }

  const [values, setValues] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const submit = async e => {
    e.preventDefault();
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(account.email) && account.password != null && account.password.length > 7) {
      let success = await axios({
        baseURL: 'https://localhost:44323/api/Account',
        url: '/login',
        data: { password: account.password, email: account.email },
        method: "POST"
      }).then(res => res.data);

      if(success){
        history.push("/home");
        localStorage.setItem("userName", account.email);
      }else{
        alert("Login Invalid");
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.signup} component="h1" variant="h5">
          Sign up
        </Typography>
        <form method='Post' noValidate onSubmit={e => submit()}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={e => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  className='password'
                  autoComplete="current-password"
                  value={account.password}
                  onChange={e => handleChange(e)}
                />
                <br />
            </Grid>
            <Grid item xs={12} className={classes.root}>
              <FormControlLabel
                className={classes.root}
                control={<Checkbox value="true" color="primary" />}
                label="Remeber Me" />
            </Grid>
          </Grid>
          <Button
            type="button"
            onClick={(e) => submit(e)}
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
          <Grid container justify="space-between" className={classes.fotter}>
            <Grid item>
              <button variant='body2' >Forgot password?</button>
            </Grid>
            <Grid item>
              <Link to="register" variant="body2">
                Didn't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LogIn;
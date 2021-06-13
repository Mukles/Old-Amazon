import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { inputData } from '../Redux/Store/AccoutSlice';
import  $ from 'jquery';
import { useHistory } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  input: {
    border: "red"
  }
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { account } = useSelector(state => state);
  const { fristName, lastName, email, city, date, Mobile, password, confirmPassword } = account;
 
  const [error, setError] = useState({
    fristName: { isError: false, errorMessage: "" },
    lastName: { isError: false, errorMessage: "" },
    email: { isError: false, errorMessage: "" },
    date: { isError: false, errorMessage: "" },
    city: { isError: false, errorMessage: "" },
    Mobile: { isError: false, errorMessage: "" },
    password: { isError: false, errorMessage: "" },
    confirmPassword: { isError: false, errorMessage: "" },
  });

  useEffect(() =>{
    
  },[error]);

  const history = useHistory();
  let obj = {...error};

  async function IsEmailAlreadyUsed(mail, obj) {
    $.ajax({  
      type: "POST",  
      url: "https://localhost:44323/api/Account/IsEmailAlreadyUsed",  
      contentType: "application/json; charset=utf-8",  
      dataType: "json",  
      data: JSON.stringify(mail),
      success: function (data) {  
          if(data===true){
            obj = {...error, email: {errorMessage: "", isError: false}}
            setError({...obj});
            localStorage.setItem('username', account.email);
            history.push('/home')
          }
          else{
            
            obj = {...error, email: { errorMessage: `this ${mail} is already used.`, isError: true}}
            setError({...obj})
          }
      },
  
      failure: function (data) {  
          console.log(data.responseText);  
      },  
      error: function (data) {  
          alert(data.responseText);  
      } 
  
  }); 
  }

  function ValidateEmail(mail) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (mail.length < 1) {
      obj = {...obj, email: { errorMessage: "Choose a Gamil", isError: true}}
    }
    else if(regex.test(mail)){
      IsEmailAlreadyUsed(mail);
    }
    else{
      obj = {...obj, email: { errorMessage: "", isError: false}}
    }

    setError({...obj})
  }

  const validationCheck = (data) => {
    let k = Object.keys(data);
    let i = 0;
    let isValid;
    while (i < k.length) {
      if (k[i] === 'confirmPassword' && password !== confirmPassword && password !== '') {
        obj = { ...obj, [k[i]]: { errorMessage: "Those passwords didn’t match. Try again.", isError: true } }
        isValid = false;
    }
      else if (k[i] === 'email') {
        ValidateEmail(email, obj)
      }
      else if ((account[k[i]] === null || account[k[i]] === "")) {
        if (k[i] !== 'confirmPassword') {
          obj = { ...obj, [k[i]]: { errorMessage: `Enter your ${k[i]}`, isError: true } }
          isValid = false;
        }
        else {
          obj = { ...obj, [k[i]]: { errorMessage: "", isError: true } }
          isValid = false;
        }
      }
      else {
        obj = { ...obj, [k[i]]: { errorMessage: "", isError: false } }
      }

      i++
    }
    setError({ ...obj });
    obj = null;
    return isValid;
  }

  const submit = event => {
    event.preventDefault();
    var isValid = validationCheck(error);
    if (isValid !== false) {
      fetchVideo();
    }
    else {
      alert("Regitation is unsuccessfull......!");
    }
  }

const fetchVideo = async () => {
  $.ajax({  
    type: "POST",  
    url: "https://localhost:44323/api/Account/Register",  
    contentType: "application/json; charset=utf-8",  
    dataType: "json",  
    data: JSON.stringify({...account}),
    success: function (data) {  
      console.log(data.length)
        if(data===true){
          setError({ ...error, password: { errorMessage: "", isError: false } });
        }
        else{
          let errors = ""
          for(let i in data){
            errors += data[i];
          }
          setError({ ...error, password: { errorMessage: errors, isError: true } })
        }
    }, 

    failure: function (data) {  
        console.log(data.responseText);  
    }, //End of AJAX failure function  
    error: function (data) {  
        alert(data.responseText);  
    } //End of AJAX error function  

});         
  }
  const isValidationChecking = (name, value) => {
    console.log(confirmPassword)
    if (name === 'confirmPassword') {
      const password_element = document.getElementsByName("password")[0].value;
      if (value !== password_element && password_element !== '') {
        setError({ ...error, [name]: { errorMessage: "Those passwords didn’t match. Try again.", isError: true } })
      }
      else {
        setError({ ...error, [name]: { errorMessage: "", isError: false } })
      }
    }
    else if (name === 'password') {
      if(value !== confirmPassword && confirmPassword.length > 0){
        setError({ ...error, 'confirmPassword': { errorMessage: "Those passwords didn’t match. Try again.", isError: true } })
      }
      else{
        setError({ ...error, 'confirmPassword': { errorMessage: "", isError: false } })
      }
    }
    else if (name === 'email') {
      ValidateEmail(value);
    }
    else if (value === '') {
      setError({ ...error, [name]: { errorMessage: `Enter your ${name}`, isError: true } });
    }
    else {
      setError({ ...error, [name]: { errorMessage: "", isError: false } });
    }
  }
  const HoldData = (event) => {
    const { name, value } = event.target;
    dispatch(inputData({ [name]: value }));
    isValidationChecking(name, value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={(e) => submit(e)} className={classes.form} action="action.php" method='Post' noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.fristName.isError}
                helperText={error.fristName.errorMessage}
                autoComplete="fname"
                name="fristName"
                variant="outlined"
                required
                fullWidth
                id="fristName"
                label="Frist Name"
                autoFocus
                value={fristName}
                onChange={e => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={error.lastName.isError}
                helperText={error.lastName.errorMessage}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.email.isError}
                helperText={error.email.errorMessage}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.date.isError}
                helperText={error.date.errorMessage}
                variant="outlined"
                required
                fullWidth
                name="date"
                type="date"
                id="date"
                autoComplete="date"
                value={date}
                onChange={e => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.city.isError}
                helperText={error.city.errorMessage}
                variant="outlined"
                required
                fullWidth
                name="city"
                label="City"
                type="text"
                id="text"
                autoComplete="text"
                value={city}
                onChange={e => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.Mobile.isError}
                helperText={error.Mobile.errorMessage}
                variant="outlined"
                required={true}
                fullWidth
                name="Mobile"
                label="Number"
                type="number"
                id="number"
                autoComplete="number"
                value={Mobile}
                onChange={e => HoldData(e)}
                onWheel={() =>{
                  if(document.activeElement.type === "number"){
                    document.activeElement.blur();
                }
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={error.password.isError}
                helperText={error.password.errorMessage}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                className='password'
                autoComplete="current-password"
                value={password}
                onChange={e => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                error={error.confirmPassword.isError}
                helperText={error.confirmPassword.errorMessage}
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="current-password"
                value={confirmPassword}
                onChange={e => HoldData(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an  Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
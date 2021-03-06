import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Fetch from '../script/Fetch.js';
import { Redirect } from 'react-router-dom';


const styles = theme => ({

main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
});
class SignIn extends React.Component{
      constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            redirect: '',
            errore: '',
        }
        localStorage.setItem('linkThenLogin', '/addPrenotazione')
    }

    handleSubmit(e){
        e.preventDefault();
        Fetch.login(this.state.email, this.state.password)
            .then(res => {
                console.log(res.error)
                if(res.error !== undefined){
                    this.setState({errore: res.error})
                }
                if(res.token !== undefined){
                    localStorage.setItem('token', res.token)
                }
            })
            .catch(err =>{
                this.setState({errore : 'Il server non è disponibile'})
            })

        console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token') !== null && localStorage.getItem('token') !== 'null'){
            var link = localStorage.getItem('linkThenLogin');
            if(link !== null && link !== 'null')
                this.setState({redirect: link});
            else
                this.setState({redirect: '/addprenotazione'});
        }
    }
  render(){
  const { classes } = this.props;


   let tileData = [{
      title: "notte blu",
      titleBar: "piscina con lettini",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCzSk6oKATf6rLVwO4VRXwrGJWewpoqGq6n0Le4uzd8fCriTxFzQ"
  },
  {
      title: "idromassaggio",
      titleBar: "idromassaggio",
      img: "https://www.sanguineto.it/images/phocagallery/centro_benessere/centro-benessere-montepulciano.jpg"
  },
  {
      title: "massaggi schina",
      titleBar: "massaggi schiena",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqqDRGyDBKgrpxMBKxKpD_EQFuoZ59AeS617gZToLFp9d5qHPd"

  },
  {
      title: "viso",
      titleBar: "trattamenti viso",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuMZ1W2T1Gn3oeAEssFvByJYxW_r7BYCkfpOIVcWfHXqu98gwb"
  },
  {
      title: "milf",
      titleBar: "milf",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDtJwk4QoITQpr9LmaxxwC-CinfG5wnA3C-6TXoWm1xcsgfTwr"
  }
  ];





  if(this.state.redirect !== '')
    return (<Redirect push to={this.state.redirect}/>)

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={(e)=>this.handleSubmit(e)}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email" >Email Address</InputLabel>
            <Input id="email" name="email" onChange={(e)=>this.setState({email: e.target.value})} autoComplete="email" autoFocus value={this.state.email}  />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" onChange={(e)=>this.setState({password: e.target.value})} value={this.state.password} autoComplete="current-password" />
          </FormControl>
          <Typography color='error'>{this.state.errore}</Typography>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>


        </form>
         <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick = {()=>{
                this.setState({ redirect:'/registrazione'})
            }}
          >
            sign up
          </Button>
      </Paper>
       <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              classes={{
                root: classes.titleBar,
                title: classes.title,
              }}
              actionIcon={
                <IconButton>
                  <StarBorderIcon className={classes.title} />
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>

    </div>
    </main>

  );
}}


export default withStyles(styles)(SignIn);

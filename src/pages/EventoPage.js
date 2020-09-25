import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Fetch from '../script/Fetch.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import {
  DateTimePicker,
  MuiPickersUtilsProvider,
  Calendar,
  TimePicker,
  usePickerState,
} from "@material-ui/pickers";
import IconButton from '@material-ui/core/IconButton';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class EventoPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            eventi: [],
            open: false,
            id: null,
            data: new Date(),
            maxDate: new Date(),
            minDate: new Date(),
            giorni: [],
            changeToTimer: false,

        }
    }

    componentDidMount(){
        Fetch.getEventi()
            .then(res => this.setState({eventi: this.state.eventi.concat(res)}))
    }

    handlePrenotazione(elemento){
        var giorni= [];
        elemento.giorniNonDisponibili.split(',').forEach((giorno)=>{
            if(giorno === 'lunedi') giorni.push(1);
            if(giorno === 'martedi') giorni.push(2);
            if(giorno === 'mercoledi') giorni.push(3);
            if(giorno === 'giovedi') giorni.push(4);
            if(giorno === 'venerdi') giorni.push(5);
            if(giorno === 'sabato') giorni.push(6);
            if(giorno === 'domenica') giorni.push(0);
        })
        this.setState({
            open: true,
            id: elemento.id_evento,
            minDate: elemento.dataInizio,
            maxDate: elemento.dataFine,
            giorni: giorni,
            data: undefined,
            });
    }

    handleGiorni(){

    }

    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        const { classes } = this.props;

        console.log(this.state.eventi)

        let jsxCalendar =
                <Calendar {...{date: this.state.data, onChange:(date, isFinish)=>{this.setState({data: date})}}}
                maxDate = {this.state.maxDate}
                minDate = {this.state.minDate}
                renderDay = {(day,selectedDate, dayInCurrentMonth, dayComponent)=> this.state.giorni.includes(day.getDay()) ? <IconButton disabled/> : dayComponent}
                />

        if(this.state.changeToTimer)
            jsxCalendar =
            <TimePicker
                value = {this.state.data}
                onChange = {(data)=>this.setState({data: data})}


            />


        let jsx =
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"Prenotazione"}
          </DialogTitle>
          <DialogContent>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {jsxCalendar}
            </MuiPickersUtilsProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Chiudi
            </Button>
            <Button onClick={()=>this.setState({changeToTimer: true})} color="primary">
              Accetta
            </Button>
          </DialogActions>
        </Dialog>


        return (
            <div>
            {jsx}
            <Grid container spacing={5}>
            {this.state.eventi.map((elemento, i) =>
                <Grid item xs key={i}>
                <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                    {elemento.nome}  {elemento.cognome}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>this.handlePrenotazione(elemento)}>Prenotati</Button>
                </CardActions>
                </Card>
            </Grid>
            )}
            </Grid>
            </div>
        );
    }
}


export default withStyles(styles)(EventoPage);

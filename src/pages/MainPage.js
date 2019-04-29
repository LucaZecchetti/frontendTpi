import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fingerprint from "@material-ui/icons/Done";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
});

class OutlinedInputAdornments extends React.Component {
  state = {
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    weigh: "",
    showPassword: false
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <TextField
          id="outlined-simple-start-adornment"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="NOME"
        />

        <TextField
          id="outlined-adornment-amount"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="COGNOME"
          value={this.state.amount}
          onChange={this.handleChange("amount")}
        />

        <TextField
          id="outlined-adornment-weight"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="EMAIL"
          value={this.state.weigh}
          onChange={this.handleChange("weigh")}
        />

        <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? "text" : "password"}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Fab color="primary" aria-label="Add" className={classes.fab}>
          <AddIcon />
        </Fab>
        <TextField
          id="outlined-adornment-weight"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label="EMAIL"
          value={this.state.weight}
          onChange={this.handleChange("weight")}
        />

        <TextField
          id="outlined-adornment-password"
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          type={this.state.showPassword ? "text" : "password"}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Fab color="secondary" aria-label="Edit" className={classes.fab}>
          <Fingerprint />
        </Fab>
        <GridList className={classes.gridList} cols={2.5} />
      </div>
    );
  }
}

/*
const styles = theme => ({
  button: {
    margin: "50px",
  },
  input: {
    display: 'none',
  },
  titolo: {
    marginTop: theme.spacing.unit * 50,
  },
  bottoni:{
    
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,

  },
});

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      showPassword: false,
      password: "",
    })
  }
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <TextField
          id="outlined-adornment-password"
          className={[classes.margin, classes.textField]}
          variant="outlined"
          type={this.state.showPassword ? 'text' : 'password'}
          label="Password"
          value={this.state.password}
          onChange={this.handleChange('password')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={this.handleClickShowPassword}
                >
                  {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className={classes.titolo}>
          <Typography variant="h1" component="h3">
            BENVENUTI!!!!!
        </Typography>
          <Typography component="p">
            Centro Massaggi Brixia
        </Typography>
        </div>
        <div className={classes.bottoni}>
          <Button variant="contained" href="#contained-buttons" className={classes.button}>
            Link
        </Button>
          <Button variant="contained" component="span" className={classes.button}>
            Upload
        </Button>
        </div>
      </div>
    );
  }
}


*/

export default withStyles(styles)(OutlinedInputAdornments);

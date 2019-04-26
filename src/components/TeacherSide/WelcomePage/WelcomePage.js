import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles'
import NavBar from '../NavBar/NavBar';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';




class WelcomePage extends Component {

  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'})
  }

  render() {
    const { classes } = this.props;
    return (
      <section>
        {/* <NavBar/> */}
        {/* <img src="/images/Activated.png"></img> */}
        <Paper elevation = '0'>
          <Typography className={classes.name} variant="h4">Welcome {this.props.reduxState.teacher.first_name}</Typography>
        </Paper>
        <Grid
          container
          direction="rows"
          justify="space-between"
          alignItems="flex-end"
          spacing={40}
        >
        {/* <Grid
          container
          direction="rows"
          justify="flex-start"
          alignItems="flex-start"
          spacing={8}> */}
            <Grid
            item xs={6}>
              <Paper className={classes.treePaper} elevation={0}><img src="/images/education_tree_concept_.jpg"></img></Paper>
            </Grid>
        {/* </Grid> */}
        
        <Grid 
          item xs={6}
          >
        
            <Grid
            item xs={6} column>
              <Paper className={classes.pencilPaper} elevation={0}><img src="/images/lightbulbFormattedSmaller.png"></img></Paper>
            </Grid>

            <Grid
            item xs={6} column>
              <Paper className={classes.dataPaper} elevation={0}><img src="/images/templateGraphSmaller.png"></img></Paper>
            </Grid>
        </Grid>
      </Grid>


    
        
      </section>
    );
  }
}

const styles = theme => ({


  treePaper:{
    // height: '100vw',
    // width: '100%',
    // backgroundImage: "url('/images/education_tree_concept_.jpg')",
    // backgroundRepeat: 'no-repeat',
  },
  pencilPaper:{
    // height: '100vw',
    // width: '100%',
    // backgroundImage: "url('/images/create-an-activitor.png')",
    // backgroundRepeat: 'no-repeat',
  },
  dataPaper:{
    // height: '100vw',
    // width: '100%',
    // backgroundImage: "url('/images/graphs.png')",
    // backgroundRepeat: 'no-repeat',
  },


  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(WelcomePage));
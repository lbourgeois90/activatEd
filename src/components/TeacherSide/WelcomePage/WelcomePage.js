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
import { unstable_Box as Box } from '@material-ui/core/Box';




class WelcomePage extends Component {

  componentDidMount(){
    this.props.dispatch({type:'GET_TEACHER'})
  }

  render() {
    const { classes } = this.props;
    return (
      <section>
        <NavBar/>
        <Paper elevation = '0'>
          <Typography className={classes.name} variant="h4">Welcome {this.props.reduxState.teacher.first_name}</Typography>
        </Paper>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
          spacing={24}
        >
        <Grid item xs={6} >
        <Box className={classes.boxSize}>
          <Card className={classes.educationCard} elevation={1}>
            <CardMedia
              component="img"
              alt="Project Screenshot"
              className={classes.media}
              image='/images/pencil.png'
            /> 
            <CardContent>
            <Button>Create Activator</Button>
            </CardContent>
            
          </Card>
          </Box>
        
        </Grid>
        <Grid item xs={6}>
            <Card className={classes.educationCard} elevation={1}>
                <CardMedia
                  component="img"
                  alt="Project Screenshot"
                  className={classes.media}
                  image='/images/graphs.png'
                /> 
                <CardContent>
                <Button>See Class Data</Button>
                </CardContent>
                
                
              </Card>



        
        </Grid>
        </Grid>


    
        
      </section>
    );
  }
}

const styles = theme => ({
  education: {
    backgroundImage: "url('/images/educationImage.png')",
    // backgroundColor: '#D60E54
  },
  media:{
    height: 'auto',
    width: '100%',
    margin:'0 auto',       
  },
  name: {
    textAlign: 'center',
    margin: '2%',
  },
  educationCard:{
    width: '100%',
    margin: '0 auto',
    height: '50%',
  },
  boxSize:{
    
  }

  })




const mapReduxStateToProps = (reduxState) => ({
  reduxState,
});

export default connect( mapReduxStateToProps )(withStyles(styles)(WelcomePage));
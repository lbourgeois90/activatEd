import React, { Component } from 'react';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class LoginSelector extends Component {
  
  //on initialization will get github api information
  componentDidMount(){
    this.props.dispatch({type:'GET_GITHUB'})
  }

  navToTeacher = () => {
    this.props.history.push('/teacherlogin')
  }

  navToStudent = () => {
    this.props.history.push('/studentLogin')
  }


  render() {
    const {classes} = this.props;
    return (
        <section>
            <Paper className={classes.logoPaper} elevation='0'>
                 <img src='/images/activated.png' className={classes.image}/>
            </Paper>
            <Paper className={classes.loginPaper}>
                <Typography variant="h3" className={classes.logintitle}> Select Your Login</Typography>
                 <Typography variant="h3" className={classes.typographyTop}>
                 <Button onClick={this.navToTeacher} className={classes.link} size="large" color="primary">Teacher Login</Button>
                </Typography>
                    <br/>
                <Typography variant="h3" className={classes.typography}>
                <Button onClick={this.navToStudent} className={classes.link} size="large" color="primary">Student Login</Button>
                </Typography>    
            </Paper>
            {/* <Paper className={classes.loginPaper}>
                <Typography>
                    <Link href='/teacherlogin' >
                        Teacher Login
                    </Link>
                    <br/>
                    <Link href={'/studentlogin'}>
                        Student Login
                    </Link>
                </Typography>    
            </Paper> */}
       </section> 
    )
  }
}

const styles = theme => ({
   logoPaper: {
    textAlign: 'center',
    width: '50%',
    height: '50%',
    margin: '0 auto',
   },
   typographyTop:{
      textAlign: 'center',
      paddingBottom: '10%',
   },
   typography:{
    textAlign: 'center',
 },
   image:{
    width: '100%',
    height: '75%',
    marginBottom: '10%',
   },
   loginPaper: {
    textAlign: 'center',
    width: '50%',
    margin: '0 auto',
    paddingBottom: '10%',
   },
   logintitle: {
       paddingBottom: '10%',
       paddingTop: '5%',
   },
   
   
  });

const mapReduxStateToProps = (reduxState) => ({
    reduxState,
})

export default connect(mapReduxStateToProps)(withStyles(styles)(LoginSelector));

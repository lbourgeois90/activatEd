import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import AddStudents from '../AddStudents/AddStudents';
import CreateActivator from '../CreateActivator';
import ClassActivatorData from '../ClassActivatorData/ClassActivatorData';
import CreateClasses from '../CreateClasses/CreateClasses';
import CreateProfile from '../CreateProfile/CreateProfile';
import CreateUsernameAndPassword from '../CreateUsernameAndPassword/CreateUsernameAndPassword';
import StudentActivator from '../StudentActivator/StudentActivator';
import StudentLogin from '../StudentLogin/StudentLogin';
import Submission from '../Submission/Submission';
import TeacherLogin from '../TeacherLogin/TeacherLogin';
import WelcomePage from '../WelcomePage/WelcomePage';
import LoginSelector from '../LoginSelector';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/loginselector"
              component={LoginSelector}
            />
               <Route
              exact
              path="/teacherlogin"
              component={TeacherLogin}
            />
               <Route
              exact
              path="/studentlogin"
              component={StudentLogin}
            />
            <Route
              exact
              path="/register"
              component={CreateUsernameAndPassword}
            />
             <Route
              exact
              path="/createprofile"
              component={CreateProfile}
            />
            <Route
              exact
              path="/createclasses"
              component={CreateClasses}
            />
              <Route
              exact
              path="/addstudents"
              component={AddStudents}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/welcome"
              component={WelcomePage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/createactivator"
              component={CreateActivator}
            />
            <ProtectedRoute
              exact
              path="/classdata"
              component={ClassActivatorData}
            />
            <ProtectedRoute
              exact
              path="/studentactivator"
              component={StudentActivator}
            />
              <ProtectedRoute
              exact
              path="/submission"
              component={Submission}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);

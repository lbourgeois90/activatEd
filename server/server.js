
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const profileRouter = require('./routes/profile.router');
const teacherRouter = require('./routes/teacher.router');
const classesRouter = require('./routes/classes.router');
const studentRouter =  require('./routes/student.router');
const activatorRouter = require('./routes/activator.router');
const answerRouter = require('./routes/answers.router');
const studentClassesRouter = require('./routes/studentClasses.router')
const quoteRouter = require('./routes/inspirationalQuote.router');
const randomQuestionRouter = require('./routes/randomQuestion.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/profile', profileRouter);
app.use('/teacher', teacherRouter);
app.use('/classes', classesRouter);
app.use('/student', studentRouter);
app.use('/activator', activatorRouter);
app.use('/answer', answerRouter);
app.use('/studentClasses', studentClassesRouter);
app.use ('/quote', quoteRouter);
app.use('/randomquestion', randomQuestionRouter)
// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

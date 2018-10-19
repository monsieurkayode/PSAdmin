import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import toastr from 'toastr';
import store from './store';
import { loadCourses } from './actions/courseActions';
import { loadAuthors } from './actions/authorActions';
import Header from './components/common/Header/Index';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import CoursesPage from './components/Courses/CoursesPage';
import AuthorsPage from './components/Authors/AuthorsPage';
import ManageCoursesPage from './components/Courses/ManageCoursesPage';
import NotFoundPage from './components/NotFound/NotFoundPage';
import ManageAuthorsPage from './components/Authors/ManageAuthorsPage';

import './styles/index.scss';

toastr.options = {
  closeButton: true,
  progressBar: true,
  showMethod: 'slideDown',
};

// Dispatch the loadCourses action on initilaization
store.dispatch(loadCourses());
store.dispatch(loadAuthors());

render(
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/courses" component={CoursesPage} />
          <Route exact path="/authors" component={AuthorsPage} />
          <Route exact path="/course" component={ManageCoursesPage} />
          <Route exact path="/course/:id" component={ManageCoursesPage} />
          <Route exact path="/author" component={ManageAuthorsPage} />
          <Route exact path="/author/:id" component={ManageAuthorsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

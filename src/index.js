import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/common/Header/Index';
import HomePage from './components/Home/HomePage';
import AboutPage from './components/About/AboutPage';
import CoursesPage from './components/Courses/CoursesPage';
import AuthorsPage from './components/Authors/AuthorsPage';

import './styles/index.scss';

render(
  <BrowserRouter>
    <Fragment>
      <Header />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/courses" component={CoursesPage} />
      <Route exact path="/authors" component={AuthorsPage} />
    </Fragment>
  </BrowserRouter>,
  document.getElementById('root')
);

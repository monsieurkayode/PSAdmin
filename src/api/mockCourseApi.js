/* eslint-disable no-param-reassign */
import delay from './delay';
import courseBaseUrl from '../config';
import { validateInput } from '../helpers/validator';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
export const courses = [
  {
    id: 'react-flux-building-applications',
    title: 'Building Applications in React and Flux',
    watchHref: `${courseBaseUrl}/react-flux-building-applications`,
    authorId: 'cory-house',
    length: '5:08',
    category: 'JavaScript'
  },
  {
    id: 'clean-code',
    title: 'Clean Code: Writing Code for Humans',
    watchHref: `${courseBaseUrl}/writing-clean-code-humans`,
    authorId: 'cory-house',
    length: '3:10',
    category: 'Software Practices'
  },
  {
    id: 'architecture',
    title: 'Architecting Applications for the Real World',
    watchHref: `${courseBaseUrl}/architecting-applications-dotnet`,
    authorId: 'cory-house',
    length: '2:52',
    category: 'Software Architecture'
  },
  {
    id: 'career-reboot-for-developer-mind',
    title: 'Becoming an Outlier: Reprogramming the Developer Mind',
    watchHref: `${courseBaseUrl}/career-reboot-for-developer-mind`,
    authorId: 'cory-house',
    length: '2:30',
    category: 'Career'
  },
  {
    id: 'web-components-shadow-dom',
    title: 'Web Component Fundamentals',
    watchHref: `${courseBaseUrl}/web-components-shadow-dom`,
    authorId: 'cory-house',
    length: '5:10',
    category: 'HTML5'
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

// This would be performed on the server in a real app. Just stubbing in.
const generateId = course => replaceAll(course.title.toLowerCase(), ' ', '-');

class CourseApi {
  static getAllCourses() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], courses));
      }, delay);
    });
  }

  static saveCourse(course) {
    course = Object.assign({}, course);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const { errors, isValid } = validateInput(course);
        if (!isValid) { reject(errors); }

        if (course.id) {
          const existingCourseIndex = courses
            .findIndex(a => a.id === course.id);
          courses.splice(existingCourseIndex, 1, course);
        } else {
          course.id = generateId(course);
          course.watchHref = `${courseBaseUrl}/${course.id}`;
          courses.push(course);
        }

        resolve(course);
      }, delay);
    });
  }

  static deleteCourse(courseId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfCourseToDelete = courses
          .findIndex(course => course.id === courseId);
        courses.splice(indexOfCourseToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default CourseApi;

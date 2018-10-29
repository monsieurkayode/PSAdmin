/* eslint-disable no-param-reassign */
import delay from './delay';
import { validateInput } from '../helpers/validator';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
export const authors = [
  {
    id: 'cory-house',
    firstName: 'Cory',
    lastName: 'House'
  },
  {
    id: 'scott-allen',
    firstName: 'Scott',
    lastName: 'Allen'
  },
  {
    id: 'dan-wahlin',
    firstName: 'Dan',
    lastName: 'Wahlin'
  },
  {
    id: 'kent-dodds',
    firstName: 'Kent',
    lastName: 'Dodds'
  },
  {
    id: 'stephen-grider',
    firstName: 'Stephen',
    lastName: 'Grider'
  }
];

// This would be performed on the server in a real app. Just stubbing in.
const generateId = author => `${author.firstName.toLowerCase()}-${author.lastName.toLowerCase()}`; // eslint-disable-line

class AuthorApi {
  static getAllAuthors() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Object.assign([], authors));
      }, delay);
    });
  }

  static saveAuthor(author) {
    author = Object.assign({}, author); // avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const { errors, isValid } = validateInput(author, false);
        if (!isValid) { reject(errors); }

        if (author.id) {
          const existingAuthorIndex = authors
            .findIndex(a => a.id === author.id);
          authors.splice(existingAuthorIndex, 1, author);
        } else {
          // Just simulating creation here.
          // The server would generate ids for new authors in a real app.
          // Cloning so copy returned passed by value rather than by reference.
          author.id = generateId(author);
          authors.push(author);
        }

        resolve(author);
      }, delay);
    });
  }

  static deleteAuthor(authorId) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const indexOfAuthorToDelete = authors
          .findIndex(author => author.id === authorId);
        authors.splice(indexOfAuthorToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default AuthorApi;

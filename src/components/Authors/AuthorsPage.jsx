import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  arrayOf, shape, func, bool
} from 'prop-types';
import { deleteAuthor, pageChange } from '../../actions/authorActions';
import AuthorList from './AuthorList';
import Loader from '../common/Loader/Index';
import Pagination from '../common/Pagination/Index';
import paginator from '../../helpers/paginator';

/**
 *
 * @class AuthorsPage
 * @extends Component
 *
 * @returns {JSX}
 */
class AuthorsPage extends Component {
  static propTypes = {
    authors: arrayOf(shape({})).isRequired,
    pageChange: func.isRequired,
    isLoading: bool.isRequired,
    deleteAuthorAction: func.isRequired
  }

  componentWillUpdate({ meta, currentPage }) {
    if (meta.pageSize === 0 && currentPage > 1 && meta.pageCount >= 1) {
      this.props.pageChange(currentPage - 1);
    }
  }

  componentWillUnmount() {
    this.props.pageChange(1);
  }

  /**
   * @method handlePageClick
   * @memberof CoursePage
   *
   * @param {object} { selected }
   *
   * @returns {void}
   */
  handlePageClick = ({ selected }) => {
    this.props.pageChange(selected + 1);
  }

  render() {
    const {
      authors,
      isLoading,
      meta,
      deleteAuthorAction
    } = this.props;
    return (
      <main>
        <div className="container jumbotron">
          <div className="container-fluid">
            <h1>Authors</h1>
            <p>Authors management page.</p>
            <Link to="/author">
              <button type="button" className="btn btn-lg btn-primary">
                Add Author
              </button>
            </Link>
          </div>
        </div>
        <section className="container">
          <div>
            {isLoading && <Loader size={40} />}
            {!isLoading && authors.length > 0
              && (
              <AuthorList
                authors={authors}
                deleteAuthor={deleteAuthorAction}
              />
              )
            }
            {!isLoading && !authors.length > 0
              && <div className="no-content">The authors catalog is empty.</div>
            }
            {!isLoading && authors.length > 0 && (
            <Pagination
              {...meta}
              handlePageChange={this.handlePageClick}
            />
            )}
          </div>
        </section>
      </main>
    );
  }
}

/**
 *
 * @description makes the AuthorPage a container component
 * by making it aware of the application state in the store
 * via the connect function from react-redux library
 *
 * @function mapStateToProps
 *
 * @param {object} { allAuthors }
 */
const mapStateToProps = ({
  allAuthors: { authors, isLoading, currentPage }
}) => {
  const sortedAuthors = authors.sort(
    (prev, next) => prev.firstName.toUpperCase() > next.firstName.toUpperCase()
  );
  const meta = paginator(sortedAuthors, currentPage);

  return {
    authors: meta.results,
    isLoading,
    meta,
    currentPage
  };
};

export default connect(
  mapStateToProps,
  { deleteAuthorAction: deleteAuthor, pageChange }
)(AuthorsPage);

export default (state => state.map(author => (
  {
    value: author.id,
    text: `${author.firstName} ${author.lastName}`
  }
)));

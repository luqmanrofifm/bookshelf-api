/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */

const { getAllBookDataHandler, addBookhandler, getBookDatabyIdHandler, updateBookDatabyIdHandler, deleteBookDatabyIdHandler } = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookhandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBookDataHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookDatabyIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBookDatabyIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookDatabyIdHandler,
  },
];

module.exports = routes;

/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

const { nanoid } = require('nanoid');
const books = require('./books');

const addBookhandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toString();
  const updatedAt = insertedAt;
  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  const newBookData = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBookData);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBookDataHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let bookDataFilter = books;

  if (name !== undefined) {
    bookDataFilter = bookDataFilter.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  if (reading !== undefined) {
    if (reading == 0) {
      bookDataFilter = bookDataFilter.filter((book) => book.reading === false);
    } else {
      bookDataFilter = bookDataFilter.filter((book) => book.reading === true);
    }
  }

  if (finished !== undefined) {
    if (finished == 0) {
      bookDataFilter = bookDataFilter.filter((book) => book.finished === false);
    } else {
      bookDataFilter = bookDataFilter.filter((book) => book.finished === true);
    }
  }

  const filterResult = bookDataFilter.map((book) => {
    const container = {};
    container.id = book.id;
    container.name = book.name;
    container.publisher = book.publisher;
    return container;
  });

  const response = h.response({
    status: 'success',
    data: {
      books: filterResult,
    },
  });

  response.code(200);

  return response;
};

const getBookDatabyIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((i) => i.id === bookId)[0];
  let response;

  if (book !== undefined) {
    response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
  } else {
    response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });
    response.code(404);
  }

  return response;
};

const updateBookDatabyIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const updatedAt = new Date().toString();
  const index = books.findIndex((book) => book.id === bookId);

  let finished = false;

  if (pageCount === readPage) {
    finished = true;
  }

  let response;
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
  } else {
    response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
  }

  return response;
};

const deleteBookDatabyIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  let response;
  if (index !== -1) {
    books.splice(index, 1);
    response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
  } else {
    response = h.response({
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
  }
  return response;
};

module.exports = { addBookhandler, getAllBookDataHandler, getBookDatabyIdHandler, updateBookDatabyIdHandler, deleteBookDatabyIdHandler };

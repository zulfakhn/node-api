const UID = require("get-uid");
const notes = require("./notes");

const addNoteFunction = (request, h) => {
  const id = UID();
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const newNote = {
    id,
    createdAt,
    updatedAt,
    name,
    author,
    summary,
    year,
    publisher,
    pageCount,
    readPage,
    reading,
    finished: readPage === pageCount,
  };

  if (name === "" || name === undefined || name === null) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  notes.push(newNote);
  const isSuccess = notes.filter((note) => note.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: { bookId: id },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "error",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllNotes = (request, h) => {
  const response = h.response({
    status: "success",
    data: {
      books: notes.map((note) => ({
        id: note.id,
        name: note.name,
        publisher: note.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const bookId = notes.filter((n) => n.id === id)[0];

  if (bookId === undefined) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  const book = {
    ...bookId,
  };
  return {
    status: "success",
    data: {
      book,
    },
  };
};

module.exports = { addNoteFunction, getAllNotes, getBookByIdHandler };

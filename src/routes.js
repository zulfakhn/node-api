const {
  addNoteFunction,
  getAllNotes,
  getBookByIdHandler,
} = require("./handler");
const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addNoteFunction,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllNotes,
  },
  {
    method: "GET",
    path: "/books/{id}",
    handler: getBookByIdHandler,
  },
];

module.exports = routes;

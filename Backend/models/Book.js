const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  kind: { type: String },
  id: { type: String, required: true, unique: true },
  etag: { type: String },
  selfLink: { type: String },
  volumeInfo: {
    title: { type: String, required: true },
    authors: [{ type: String }],
    publishedDate: { type: String },
    description: { type: String },
    industryIdentifiers: [
      {
        type: { type: String },
        identifier: { type: String },
      },
    ],
    readingModes: {
      text: { type: Boolean },
      image: { type: Boolean },
    },
    pageCount: { type: Number },
    printType: { type: String },
    maturityRating: { type: String },
    allowAnonLogging: { type: Boolean },
    contentVersion: { type: String },
    imageLinks: {
      smallThumbnail: { type: String },
      thumbnail: { type: String },
    },
    language: { type: String },
    previewLink: { type: String },
    infoLink: { type: String },
    canonicalVolumeLink: { type: String },
  },
  saleInfo: {
    country: { type: String },
    saleability: { type: String },
    isEbook: { type: Boolean },
  },
  accessInfo: {
    country: { type: String },
    viewability: { type: String },
    embeddable: { type: Boolean },
    publicDomain: { type: Boolean },
    textToSpeechPermission: { type: String },
    epub: {
      isAvailable: { type: Boolean },
    },
    pdf: {
      isAvailable: { type: Boolean },
    },
    webReaderLink: { type: String },
    accessViewStatus: { type: String },
    quoteSharingAllowed: { type: Boolean },
  },
  searchInfo: {
    textSnippet: { type: String },
  },
  quantity: { type: Number, default: 1 },
  available: { type: Number, default: 1 },
});

module.exports = mongoose.model("Book", bookSchema);

const mongoose = require('mongoose');

const linkSchema = mongoose.Schema({
    link: {
        type: String, required: true,
    },
    shortLink: {
        type: String, required: true,
    },
    clics: {
        type: Number, required: true,
    }
  }, { timestamps: true });

  module.exports = mongoose.model('linkSchema', linkSchema);
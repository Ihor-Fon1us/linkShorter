const LinkModel = require('../models/mongoose/model');

class LinkService {
  static async getAll() {
    return LinkModel.find({}).exec();
  }

  static async getOne(linkId) {
    return LinkModel.findById(linkId).exec();
  }

  static async getByLink(link) {
      return LinkModel.findOne({ 'link': link }).exec();
  }

  static async getByShortLink(shortLink) {
    return LinkModel.findOne({ 'shortLink': shortLink }).exec();
  }

  static async create(data) {
    const newLink = new LinkModel();
    newLink.link = data.link;
    newLink.shortLink = this.createShortLink(6);
    newLink.clics = 0;
    return newLink.save();
  }

  static async remove(linkId) {
    return LinkModel.findByIdAndRemove(linkId);
  }

  static async updateClics(linkId) {
    const link = await LinkModel.findById(linkId);
    link.clics +=1;
    return link.save();
  }

  static async removeAll() {
    return LinkModel.remove({});
  }

  static createShortLink(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
    charactersLength));
   }
   return result;
  }
}

module.exports = LinkService;
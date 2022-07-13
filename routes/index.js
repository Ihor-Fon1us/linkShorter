const express = require('express');
const router = express.Router();
const LinkService = require('../services/linkServices');

router.route('/')
  .get((req, res) => {
    LinkService.getAll()
      .then(links => res.json(links))
      .catch(err => res.status(500).json(err));
  })
  .post( async function(req, res, next) {
    try {
      const link = await LinkService.create(req.body);
      return res.status(200).send("Ready " + link); 
    } catch (error) {
      return res.status(400).send({
        message: error,
      });
    }
  });

router.get('/:shortLink', function(req, res, next) {
    LinkService.getByShortLink(req.params.shortLink)
      .then(link => {
        if (link) {
          LinkService.updateClics(link._id)
            .then(link => {
              res.redirect(link.link);
            }).catch(err => res.status(500).json(err));
        } else {
          res.status(404).send('Not found');
        }
      })
      .catch(err => res.status(500).json(err));
  })

module.exports = router;

const {
    Bookmark
} = require('../models')

module.exports = {
   async index (req, res) {
        try {
           const {songId, userId} = req.query
           const bookmark = await Bookmark.findOne({
               where: {
                   SongId: songId,
                   UserId: userId
               }
           })
           res.json(bookmark)

        } catch (error) {
            res.status(500).json({
                error: 'Sorry somthing is wrong.'
            })
        }
    },
  
}
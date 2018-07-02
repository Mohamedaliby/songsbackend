const {
    Bookmark,
    User,
    Song
} = require('../models')

module.exports = {
   async index (req, res) {
        try {
        //    console.log(req.query)
           const {songId, userId} = req.query
           console.log(songId)
           console.log(userId)
           const bookmark = await Bookmark.findOne({
               where: {
                   SongId: songId,
                   UserId: userId
               }
           })
            // const bookmark = await Bookmark.findAll({})
            res.json(bookmark)
            console.log(bookmark)

        } catch (error) {
            res.status(500).json({
                error
                // error: 'Sorry somthing is wrong.'
            })
            console.log(error)
        }
    },
    async post (req, res) {
        try {
           const {songId, userId} = req.body
           const bookmark = await Bookmark.findOne({
            where: {
                SongId: songId,
                UserId: userId
            }
        })
        if (bookmark) {
            return res.status(400).json({
                error:'already bookmarked'
            })
        }
           const newBookmark = await Bookmark.create({
             SongId: songId,
             UserId: userId
           })
           res.json(newBookmark)

        } catch (error) {
            res.status(500).json({
                error: 'Sorry somthing is wrong.'
            })
            console.log(error)
        }
    },
    async delete (req, res) {
        try {
           const {id} = req.params
           const bookmark = await Bookmark.findById(id)
           await bookmark.destroy()
           res.json('bookmark deleted')
        } catch (error) {
            res.status(500).json({
                error: 'Sorry somthing is wrong.'
            })
        }
    },
  
}
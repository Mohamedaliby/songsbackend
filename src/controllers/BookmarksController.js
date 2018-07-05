const {
    Bookmark,
    User,
    Song
} = require('../models')
const _ = require('lodash')

module.exports = {
   async index (req, res) {
        try {
        //    console.log(req.query)
           const userId = req.user.id
           const {songId} = req.query
        if (songId) {
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
            //  console.log(bookmark)
        } else {
            const bookmarks = await Bookmark.findAll({
                where: {
                    UserId: userId
                },
                include: [
                    {
                      model: Song
                    }
                  ]
            })
             .map(bookmark => bookmark.toJSON())
             .map(bookmark => _.extend({
                bookmarkId: bookmark.id,
                artist: bookmark.Song.artist,
                title: bookmark.Song.title,
                songId:  bookmark.Song.id}))
            
             // const bookmark = await Bookmark.findAll({})
             res.json(bookmarks)
             console.log(bookmark)
        }
        
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
           const userId = req.user.id
           const {songId} = req.body
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
           const userId = req.user.id
           const {id} = req.params
           const bookmark = await Bookmark.findOne({
               id,
               UserId: userId
        })
           await bookmark.destroy()
           res.json('bookmark deleted')
        } catch (error) {
            res.status(500).json({
                error: 'Sorry somthing is wrong.'
            })
        }
    },
    async getall (req, res) {
        try {
           const all = await Bookmark.findAll({})
            res.json(all)
            console.log(all.length)

        } catch (error) {
            res.status(500).json({
                error
                // error: 'Sorry somthing is wrong.'
            })
            console.log(error)
        }
    },
  
}
const {
    Song
} = require('../models')

module.exports = {
    index (req, res) {
        const songs = Song.findAll({
                limit: 10
            })
            .then((songs) => {
                res.json(songs)
            })
            .catch((err) => {
                res.status(500).json({
                    error: 'Sorry somthing is wrong.'
                })
            })

    },
    post (req, res) {
        console.log(req.body)
        console.log(req.file)
        // const song = Song.create(req.body)
        //     .then((song) => {
        //         res.json(song)
        //     })
        //     .catch((err) => {
        //         res.status(500).json({
        //             error: 'Sorry can not post due to an error'
        //         })
        //     })
    },
    show (req, res) {
        const song = Song.findById(req.params.id)
            .then((song) => {
                res.json(song)
            })
            .catch((err) => {
                res.status(500).json({
                    error: 'Sorry somthing is wrong.'
                })
            })

    },
}
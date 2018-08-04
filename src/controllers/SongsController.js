const {
    Song
} = require('../models')
const image = require('./image')

module.exports = {
    async index(req, res) {
        try {
            let songs = null
            const search = req.query.search
            if (search) {
                songs = await Song.findAll({
                    where: {
                        $or: [
                            'title', 'artist', 'genre', 'album'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                songs = await Song.findAll({
                    limit: 30
                })
                console.log('got songs')
            }
            res.json(songs)

        } catch (error) {
            res.status(500).json({
                error: 'Sorry somthing is wrong.'
            })
        }
    },
    async post(req, res) {
        let file = req.file.buffer
         image.upload(file).then((url)=>{
            // req.imageUrl = url
            // console.log('url is ........', url)
            // console.log('req is ........', req.imageUrl)
            const newSong = req.body
            newSong.albumImage = url
            console.log(newSong.albumImage)
            // console.log(req.file)
            const song = Song.create(newSong)
                .then((song) => {
                    res.json(song)
                })
                .catch((err) => {
                    res.status(500).json({
                        error: 'Sorry can not post due to an error'
                    })
                })
        })
    },
    show(req, res) {
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
    put(req, res) {
        const id = req.params.id
        console.log(id)
        console.log(req.body)
        console.log(req.file)
        const newSong = req.body
        //if storage
        // newSong.albumImage = `/uploads/${req.imageUrl}`
        newSong.albumImage = req.imageUrl
        const song = Song.update(newSong, {
                where: {
                    id: id
                }
            })
            .then(() => {
                res.json(req.body)
            })
            .catch((err) => {
                res.status(500).json({
                    error: 'Sorry can not save due to an error'
                })
            })
    },
    async delete(req, res) {
        try {
            const {
                id
            } = req.params
            const song = await Song.findById(id)
            await song.destroy()
            res.json(song)
        } catch (error) {
            res.status(500).json({
                error: 'Sorry somthing is wrong.'
            })
        }
    }
}
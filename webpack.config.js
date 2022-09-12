{
    module.exports = {
        target: 'node',
    },

    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "zlib": false,
            "http": false,
            "https": false,
            "stream": false,
            "crypto": false,
            "util": false,
            "os": false,
            "url": false
        }
    }
}
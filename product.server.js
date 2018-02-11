/**
 * Created by jj02 on 2017/7/4.
 */

var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
  req.url = '/index.html'
  next()
})

app.use(router)

app.use(express.static('./dist'))

var server = app.listen(port)

console.log('open platform portal server start on port:' + port)

module.exports = {
  close: () => {
    server.close()
  }
}

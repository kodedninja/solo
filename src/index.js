const choo = require('choo')

const app = choo()

app.use(require('./solo.js')())

app.route('*', require('./views/main'))
app.mount('main')

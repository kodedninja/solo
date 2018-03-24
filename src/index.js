const choo = require('choo')
const solo = require('./solo')

const app = choo()

app.use(solo())

app.route('*', require('./views/main'))
app.mount('main')

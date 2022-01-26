const express = require("express")
const path = require('path')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json({ extended: true }))

app.use('/api/auth', require('./routes/auth'))
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

console.log('prod  ' + process.env.NODE_ENV);


if (process.env.NODE_ENV === 'production') {
   app.use('/', express.static(path.join(__dirname, 'client', 'build')));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
   })
}



const PORT = config.get('port') || 3000


async function start() {
   try {
      await mongoose.connect(config.get('mongoUrl'), {

      })

      app.listen(5000, () => console.log(`App has been started on port  ${PORT}`))
   } catch (e) {
      console.log('Server error', e.message)
      process.exit(1)
   }
}

start()
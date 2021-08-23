const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser")
const config = require('./config/key')

const { User } = require("./models/User")

//bodyParser 가 client에서 오는정보를 분석해서 사용할수 있게 가공
//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//application/json;
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World~~!'))

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보들을 client에서  req => db
  
  const user = new User(req.body)
  
  user.save((err, userInfo) => {
    if (err) return res.json({ sucess: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => {
  return (
    console.log(`-------- Let Start node sever ----------`),
    console.log(`Example app listenling on port ${port}!`),
    console.log(`-----------------------------------------`)
  )
})
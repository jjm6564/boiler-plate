const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const {User} = require('./models/User');
const config = require('./config/key');

//bodyParser는 서버에서 분석해서 가져올수 있게
//application/x-www-form-rulencoded -> 이런 데이터를 분석
app.use(bodyParser.urlencoded({ extended: true }));

//json타입의 데이터를 분석
app.use(bodyParser.json());

mongoose.connect(config.mongoURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res)=>{
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다
  
  const user = new User(req.body)

  user.save((err,doc)=>{
    if(err) return res.json({sucess:false,err})
    return res.status(200).json({
      sucess:true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


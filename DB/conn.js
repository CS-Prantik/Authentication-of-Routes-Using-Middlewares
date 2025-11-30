const mongoose=require('mongoose')
const url='mongodb://localhost:27017/RC'
mongoose.connect(url)
.then(()=>{console.log('MongoDB Connected')})
.catch((err)=>{console.log(err)})
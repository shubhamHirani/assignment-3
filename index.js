const app = require('./app')
const port = process.env.PORT || 3000

app.get('/', (req,res)=>{
    res.send('hello world')
})

app.listen(port, ()=>{
    console.log('this appliation is running on port '+port)
})
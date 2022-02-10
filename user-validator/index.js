const app = require('./app')

const port = process.env.PORT ||3003

app.get('/', (req,res)=>{
    console.log('inside user router api');
})

app.listen(port , ()=>{
    console.log('this app is running on port ', port);
})
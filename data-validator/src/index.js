const app = require('./app')

const port = process.env.PORT ||3002

app.get('/', (req,res)=>{
    console.log('inside validator api');
})

app.listen(port,()=>
{
    console.log('this app is running on port ', port);
})
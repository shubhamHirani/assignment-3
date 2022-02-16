const app = require('./app')

const port = process.env.PORT

app.get('/', (req,res)=>{
    console.log('inside tracker api');
})

app.listen(port, ()=>{
    console.log('this application is running on port ',port);
})
const app =require('./app')

const port = process.env.PORT ||3000

app.get('/', (req,res)=>{
    res.send('inside pusher application')
})

app.listen(port, ()=>{
    console.log('this application is running on port', port);
})
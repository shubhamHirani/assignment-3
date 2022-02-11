getRandom = (num)=>{
    const val = Math.floor(Math.random() * num)
    if(val === 0){
        return getRandom(num)
    }
    else{
        return val
    }
}

module.exports = getRandom
const exitLog = (...data)=>{
    process.on('exit', function (){
        console.log(data)
    })
    process.exit(1)
}
module.exports = exitLog
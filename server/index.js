const http = require('http');
const {listController} = require('./controller/list/listController')
const exitLog = require('./exit')

const host = '127.0.0.1';
const port = 3001;
const server = http.createServer((req, res) => {
    const url = req.url;
    let body = ''
    function getRequestBody(body, res, callBack, id){
        req.on('data', (chunk) => {
            body += chunk.toString()
        })
        req.on('end', () => {
            callBack(body, res, id)
        })
    }

    const regexGetOne = /\/api\/list\/\d*$/g;
    const regexUpdate = /\/api\/list\/update\/\d*$/g;
    const regexDelete = /\/api\/list\/delete\/\d*$/g;
    if (url === '/api/list' && req.method == 'GET') {
        //exitLog(req.method, url)
        listController.getAll(req, res)
    }
    if (url === '/api/list' && req.method == 'POST') {
        getRequestBody(body, res, listController.create)

    }
    if (url.match(regexGetOne)) {
        const urlParams = url.split('\/')
        let id = [...urlParams].pop()
        listController.getOne(req, res, id)
    }
    if (url.match(regexUpdate) && req.method == 'PATCH') {
        const urlParams = url.split('\/')
        let id = [...urlParams].pop()
        getRequestBody(body, res, listController.update, id)
    }
    if (url.match(regexDelete) && req.method == 'DELETE') {

        const urlParams = url.split('\/')
        let id = [...urlParams].pop()
        listController.remove(req, res, id)
    }

});
server.listen(port, host,()=>{
    console.log(`Server running at http://${host}:${port}/`)
});
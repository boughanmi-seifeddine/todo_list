const listModel = require(`${__dirname}/../../model/list/List`)

class ListController {
    static getAll(req, res) {
        listModel.getList().then((data) => {
            console.log(data)
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
        }).catch((e)=>{
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: 'error',
                message: "error with sql query...",
                detail: e.sqlMessage
            }))
        })
    }

    static update(req, res, id) {
        listModel.updateAction([JSON.parse(req).action || null, JSON.parse(req).completed] || null, id).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
        }).catch((e)=>{
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: 'error',
                message: "error with sql query...",
                detail: e.sqlMessage
            }))
        })
    }

    static create(req, res) {
        listModel.createAction(JSON.parse(req).action, JSON.parse(req).completed).then((data) => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
        }).catch((e)=>{
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: 'error',
                message: "error with sql query...",
                detail: e.sqlMessage
            }))
        })
    }

    static remove(req, res, id) {
        listModel.deleteAction(id).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
        }).catch((e)=>{
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: 'error',
                message: "error with sql query...",
                detail: e.sqlMessage
            }))
        })
    }

    static getOne(req, res, id) {
        listModel.getOneAction(id).then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: "success",
                data: data
            }))
        }).catch((e)=>{
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                status: 'error',
                message: "error with sql query...",
                detail: e.sqlMessage
            }))
        })
    }
}

module.exports = {listController: ListController}
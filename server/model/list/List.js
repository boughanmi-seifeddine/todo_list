let db = require(`${__dirname}/../../database/connect`)

class List {

    static getQueryPromise(sql, params){
        return new Promise((resolve, reject) => {
            db.query(sql, params, (error, result) => {
                if (error) reject(error)
                resolve(result)
            })
        })
    }

    static getList() {
        return this.getQueryPromise('select * from list',[])
    }

    static getOneAction(id) {
        return this.getQueryPromise('select * from list where id=?',[id])
    }

    static updateAction(action, id) {
        return this.getQueryPromise('update list set action = ? where id = ?', [action, id])
    }

    static createAction(action) {
        return this.getQueryPromise('insert into list (action) value (?)', [action])
    }

    static deleteAction(id) {
        return this.getQueryPromise('delete from list where id = ? ', [id])
    }
}

module.exports = List
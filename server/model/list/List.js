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

    static updateAction(fields, id) {
        if (fields[0] && !fields[1]) return this.getQueryPromise('update list set action = ? where id = ?', [fields[0], id])
        if (fields[1] && !fields[0]) return this.getQueryPromise('update list set completed = ? where id = ?', [fields[1], id])
        if (fields[1] && fields[0]) return this.getQueryPromise('update list set action = ? , completed = ? where id = ?', [...fields, id])
    }

    static createAction(action, completed= 0) {
        return this.getQueryPromise('insert into list (action, completed) value (?,?)', [action, completed])
    }

    static deleteAction(id) {
        return this.getQueryPromise('delete from list where id = ? ', [id])
    }
}

module.exports = List
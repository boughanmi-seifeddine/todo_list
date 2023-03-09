import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            input: '',
            todos : []

        }

    }
    componentDidMount() {
       /* axios
            .get('https://jsonplaceholder.typicode.com/todos', {
                params: {
                    _limit: 15
                }
            })
            .then(response => this.setState({ todos: response.data }))
            .catch(function (error) {
            // handle error
            console.log(error);
        });*/
        this.getTodos();
    }
    async getTodos() {
        try {
            const response = await axios.get('api/list');
            this.setState({ todos: response.data.data })
        } catch (error) {
            console.error(error);
        }
    }
    renderList(){
        return this.state.todos.map(item => {
            let checked = item.completed ? true : false
            let textDecoration = checked ? 'line-through' : 'none'
            return(
               /* <li key={item.id} onClick={this.inputClickHandler.bind(this,item.id)}>{item.title} x</li>*/
            <li key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center border-start-0 border-top-0 border-end-0 border-bottom rounded-0 mb-2">
                <div className="d-flex align-items-center">
                    <input onChange={this.inputCheckedHandler.bind(this,item.id)} defaultChecked = {item.completed ? 'Checked' : ''}   className="form-check-input me-2" type="checkbox" value=""
                           aria-label="..."/>
                    <p style = {{textDecoration: textDecoration }}> {item.action}</p>
                </div>
                <a onClick={this.inputClickHandler.bind(this,item.id)} href="#!" data-mdb-toggle="tooltip" title="Remove item">
                    x
                </a>
            </li>
            );
        })

    }
    inputCheckedHandler(id){
        let todos = [...this.state.todos]
        let index = todos.findIndex(item=>item.id === id)
        todos[index].completed = !todos[index].completed
        this.setState({todos:todos})
    }
    inputClickHandler(id){
        let todos = [...this.state.todos]
        let index = todos.findIndex(item=>item.id === id)
        todos.splice(index, 1)
        this.setState({todos:todos})
    }
    inputChangeHandler(e){
        this.state.input = e.target.value;
    }
    formSubmitHandler(e){
        e.preventDefault()
        console.log('submit')
        let todos = [...this.state.todos]
        if(!this.state.input){
           return
        }
        todos.push({id:Date.now(),action:this.state.input, completed:false, userId: 1})
        this.setState({todos:todos, input:''})
    }
    render() {
        {console.log(this.state)}
        return (
            <React.Fragment>
                <section className="vh-100" style={{backgroundColor: "#e2d5de"}} >
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">

                                <div className="card" style={{borderRadius: "15px"}}>
                                    <div className="card-body p-5">

                                        <h6 className="mb-3">Todo List</h6>

                                        <form onSubmit={this.formSubmitHandler.bind(this)} className="d-flex justify-content-center align-items-center mb-4">
                                                <div className="form-outline flex-fill">
                                                    <input onChange={this.inputChangeHandler.bind(this)} type="text" id="form3" className="form-control form-control-lg"/>
                                                    <label className="form-label" htmlFor="form3">What do you need to do
                                                        today?</label>
                                                </div>
                                                <button type="submit" className="btn btn-primary btn-lg ms-2">Add</button>

                                        </form>

                                        <ul className="list-group mb-0">
                                            {this.renderList()}
                                        </ul>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
               {/* <form onSubmit={this.formSubmitHandler.bind(this)}>
                    <h2>My To Do List</h2>
                    <input onChange={this.inputChangeHandler.bind(this)} type="text" className="todo-input"
                           placeholder="What needs to be done"/>
                    <input type='submit'/>
                </form>
                <div className="header">

                </div>

                <ul>
                    {this.renderList()}
                </ul>*/}
            </React.Fragment>
        );
    }
}

export default App;

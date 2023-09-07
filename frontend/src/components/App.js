/* eslint-disable no-template-curly-in-string */
import React, { Component } from "react";
import axios from "axios";
import Modal from "./Modal.js";
import './Appstyles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      activeItem: {
        
        title: "",
        description: "",
        completed: false
      },
      todoList: [],
      };
  }

    async componentDidMount() {
      try {
        const res = await fetch('http://localhost:8000/api/todos/');
        const todoList = await res.json();
        console.log(todoList);
        this.setState({
          todoList
        });
      } catch (e) {
        console.log(e);
    }
    }

    toggle = ()=>{
      this.setState({modal: !this.state.modal});
    }

    // Responsible for saving the tasks 
    handleSubmit = (item)=>{
      this.toggle();
      if (item.id){
        axios.put('http://127.0.0.1:8000/api/todos/${item.id}/', item)
        return ;
      }
      axios.post('http://127.0.0.1:8000/api/todos/', item)
    };

    createItem = ()=>{
      const item = {
        title:"",
        description:"",
        completed:false,
      };
      this.setState({
        activeItem:item, 
        modal: !this.state.modal,
      });
    };

    displayCompleted = (status) =>{
      if (status){
        return this.setState({viewCompleted: true});
      }
      return this.setState({viewCompleted: false});
    }

    renderTableList = ()=>{
      return (
        <div className="my-5 d-md-flex tab-list">
          <div className="d-grid col-5 mx-auto">
            <button
              onClick={()=> this.displayCompleted(true)}  
              className="btn btn-outline-danger" >
                  Completed
            </button>
          </div>
          <div className="d-grid col-5 mx-auto">
            <button className="btn btn-outline-dark"
                    onClick={()=>this.displayCompleted(false)}  
                    style={{"float":"right"}}>
            Incomplete
            </button>
          </div>
        </div>
      );
    };

    renderItems = () => {
      var count = 1;
      const { viewCompleted } = this.state;
      const newItems = this.state.todoList.filter(
        item => item.completed === viewCompleted
      );
      return newItems.map(item => (
        <li 
          key={item.id}
          id="items"
          className="list-group-item d-flex justify-content-between align-items-center">
         
          <span 
            className={`todo-title mr-2 ${
              this.state.viewCompleted ? "completed-todo" : ""
            }`}
            title={item.description}>
            {count++}. {item.title}
            </span>
        </li>
      ));
    };

    render() {
      return (
        <main className="content">
        <h1 className="text-black text-uppercase text-center my-4">Todo App</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3 todo-card">
              <div className="d-grid col-12 mx-auto">
                <button className="btn btn-secondary" id="addButton" onClick={this.createItem}>Add Task</button>
              </div>
              {this.renderTableList()}
              <ul className="list-group list-group-flush item-list">
                <span>{this.renderItems()}</span>
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ): null}
      </main>
      )
    }
  }
  
export default App;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';
import Best from './Best.jsx';

import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
// App component - represents the whole app
class App extends Component {

   handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
 
   Meteor.call('tasks.insert', text);
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }


   renderTopTask(){

        let lista = this.props.tasks;
        let arrayOrdenado = lista.sort(function (a, b) {
            return b.cont-a.cont;
        });

        var top = arrayOrdenado.slice(0,1);

        
        return top.map((task)=>(
            <Best key={task._id} task={task} />
        ));

    }

  renderTasks() {
    return this.props.tasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }
 
  render() {
    return (
      <div className="content">
      <p className="titulos">Mejor chiste</p>
                        <ul>
                            {this.renderTopTask()}
                        </ul>



         <h4>¿Quieres publicar un chiste?</h4>

      <AccountsUIWrapper />
      { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="textInput"
                placeholder="Escribe aquí tu chiste"
              />
            </form> : ''
          }
   
       

          <div class="post-preview">
            
              <h2 class="post-title">
                Todos los chistes:
              </h2>
              <h3 class="post-subtitle">
                {this.renderTasks()}
              </h3>
            
            
          </div>

           

                       
 
        
      </div>

       

                       

                        
    );
  }
}

App.propTypes = {
  tasks: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
};
 
export default createContainer(() => {
  Meteor.subscribe('tasks');
  
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
}, App);
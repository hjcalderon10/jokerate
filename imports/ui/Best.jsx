import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {

 
 
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
 
    return (
      <p className={taskClassName}>    

       

       
 		<span className="text" id="bueno">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
        
      </p>
    );
  }
}
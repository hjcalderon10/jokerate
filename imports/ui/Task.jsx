import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Tasks } from '../api/tasks.js';
 
// Task component - represents a single todo item
export default class Task extends Component {

  incCouter() {
    var contador = this.props.task.cont;
    Meteor.call('tasks.increaseCont', this.props.task._id, this.props.task.owner);
  }
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id, !this.props.task.checked);
  }
 
  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }
 
  render() {
    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
 
    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

       <span class="likebtn-wrapper" data-theme="roundthumb" data-ef_voting="heartbeat" data-identifier="item_1"></span>

       
 		<span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
        
        <button className="like" id="LikeButton" name='PuedeContar' onClick={this.incCouter.bind(this)}><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                  
                </button>

                <span><span>   </span>{this.props.task.cont} </span>
      </li>
    );
  }
}
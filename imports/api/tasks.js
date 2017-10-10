import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Tasks = new Mongo.Collection('dhalia');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
    });
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
      cont:0,
    });
  },
  'tasks.remove'(taskId) {
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    const temp = Tasks.findOne(taskId);
    if (temp.owner !== Meteor.userId()) {
            // Only the owner can delete the poem
            throw new Meteor.Error('not-authorized');
        }

    check(taskId, String);
 
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.increaseCont'(taskId,userId){
    check(taskId, String);
    Tasks.update(taskId, { $inc: {cont: 1} });
  },
});
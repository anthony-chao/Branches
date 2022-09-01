import React, { useState, useEffect } from 'react';
import CreateTaskForm from './createTaskForm';
import TaskList from './taskList';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import LoadingContainer from '../util/LoadingContainer';

const Task = (props) => {
  debugger

  // console.log(props)
  // const [project, setProject] = useState(project)

  const taskContent = () => {
    return (
      <div>
        {/* <h1>{this.props.project.name}</h1> */}
        {/* {console.log(this.props)} */}
        <h1>{props.project.name}</h1>
        <h2>{props.project.description}</h2>
        <h1>Task List</h1>
        <CreateTaskForm createTask={props.createTask}/>
        <TaskList tasks={props.tasks} deleteTask={props.deleteTask} updateTask={props.updateTask}/>
      </div>
    )
  }

  return props.project ? taskContent() : <LoadingContainer />;

}

const mapStateToProps = (state, ownProps) => ({
    // WE NEED STATE TO HAVE A PROJECT WITH AN ARRAY OF TASKS SO WE CAN MAP OVER THEM
    userProjects: Object.values(state.entities.projects),
    currentUserId: state.session.user.id,
    project: state.entities.projects[ownProps.location.pathname.split("/")[3]]
})

const mapDispatchToProps = dispatch => ({
    // createTask: (task) => dispatch(createTask(task)),
    // deleteTask: (taskId) => dispatch(deleteTask(taskId)),
    // updateTask: (taskId) => dispatch(updateTask(taskId))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Task));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PersonalTask from './PersonalTask';

class Task extends Component {
  render() {
    const { name, email } = this.props.user;
    const { title } = this.props.task;
    console.log('task', this.props.task.title);
    return(
      <div style={{margin: '5px'}}>
        <Link to={'/app'}><i className="fa fa-angle-double-left"></i> Back</Link>
        <h4>
          List of tasks for <span><em>{ name }</em></span><span> ({ email })</span>
        </h4>
        {
          this.props.goals.map((goal, index) => {
            const { assigned } = goal;
            if ( assigned === email ) {
              return (
                <PersonalTask key={index} goal={goal} />
              )
            }
            return false;
          })
        }
        { title }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const { goals, user } = state;
  // console.log('op',task);
  // console.log('op',ownProps);
  return{
    goals,
    user,
    task: state.goals.find(task => task.serverKey === ownProps.match.params.id)
  }
}

export default connect(mapStateToProps)(Task);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, FormGroup, Input } from 'reactstrap';
import { goalRef } from '../firebase';

// import PersonalTask from './PersonalTask';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: ''
    }
  }

  componentDidMount() {
    goalRef.on('value', snap => {
      snap.forEach(goal => {
        const { description } = goal.val();
        const serverKey = goal.key;
        if (serverKey === this.props.task.serverKey) {
          this.setState({ description: description });
        }
      })
    })
  }

  editDescription() {
    const { serverKey } = this.props.task;
    goalRef.child(serverKey).update({description: this.state.description});
    this.refs.descriptionInput.value = '';
  }

  render() {
    const { name, email } = this.props.user;
    const { title, description } = this.props.task;
    // console.log('task', this.props.task.title);
    return(
      <div style={{margin: '5px'}}>
        <Link to={'/app'}><i className="fa fa-angle-double-left"></i> Back</Link>
        <h4>
          Task for <span><em>{ name }</em></span><span> ({ email })</span>
        </h4>
        {/* {
          this.props.goals.map((goal, index) => {
            const { assigned } = goal;
            if ( assigned === email ) {
              return (
                <PersonalTask key={index} goal={goal} />
              )
            }
            return false;
          })
        } */}
        <div>
          <div><strong>Task:</strong></div>
          <div>{ title }</div>
        </div>
        <FormGroup>
          {/* <Label for="descriptionText"><strong>Description:</strong></Label> */}
          <div>
            <strong>Description:</strong>
            <Button
              outline
              className="fa fa-pencil"
              color="secondary"
              size="sm"
              style={{marginLeft: '5px'}}
              onClick={this.toggle}
            >
            </Button>
          </div>
          <div><pre>{ description }</pre></div>
          <Input
            style={{marginBottom: '5px'}}
            type="textarea"
            placeholder="Enter a description"
            name="text"
            rows="5"
            ref="descriptionInput"
            value= { this.state.description }
            onChange={event => this.setState({description: event.target.value})}
          />
          <Button color="primary" onClick={()=> this.editDescription()}>Update</Button>
        </FormGroup>
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

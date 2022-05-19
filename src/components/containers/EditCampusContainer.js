/*==================================================
EditCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { editCampusThunk, fetchCampusThunk } from "../../store/thunks";
import EditCampusView from '../views/EditCampusView';
import { Redirect } from 'react-router-dom';


class EditCampusContainer extends Component {

  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      name: this.props.campus.name,
      address: this.props.campus.address,
      description: this.props.campus.description,
      imageUrl: this.props.campus.imageUrl,
      redirect: false, 
      redirectId: this.props.match.params.id,
    };
    console.log(this.state);
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // Take action after user click the submit button
  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let campus = {
      id: this.state.redirectId,
      name: this.state.name === undefined ? this.props.campus.name: this.state.name,
      address: this.state.address === undefined ? this.props.campus.address: this.state.address,
      description: this.state.description ===  undefined ? this.props.campus.description: this.state.description,
      imageUrl: this.state.imageUrl === undefined ? this.props.campus.imageUrl : this.state.imageUrl,
    };

    // Edit campus in back-end database
    await this.props.editCampus(campus);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      name: "",
      address: "",
      description: "",
      redirect: true, 
      redirectId: this.props.match.params.id,
    });
  }

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({redirect: false, redirectId: null});
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    // Redirect to new campus's page after submit
    if(this.state.redirect) {
      return (<Redirect to={`/campuses/${this.state.redirectId}`}/>)
    }

    return (
      <div>
        <Header />
        <EditCampusView 
          handleChange = {this.handleChange} 
          handleSubmit={this.handleSubmit}  
          campus={this.props.campus} state={this.state} 
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "EditCampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

// Export store-connected container by default
// EditCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
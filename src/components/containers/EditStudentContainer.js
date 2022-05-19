/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";
import EditCampusView from "../views/EditCampusView";
import { Redirect } from "react-router-dom";
import EditstudentView from "../views/EditStudentView";

class EditStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: this.props.student.firstname,
      lastname: this.props.student.lastname,
      campusId: this.props.student.campusId,
      email: this.props.student.email,
      imageUrl: this.props.student.imageUrl,
      gpa: this.props.student.gpa,
      redirect: false,
      redirectId: this.props.match.params.id,
    };
    console.log(this.state);
  }

  // Capture input data when it is entered
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let student = {
      id: this.props.match.params.id,
      firstname:
        this.state.firstname === undefined
          ? this.props.student.firstname
          : this.state.firstname,
      lastname:
        this.state.lastname === undefined
          ? this.props.student.lastname
          : this.state.lastname,
      campusId:
        this.state.campusId === undefined
          ? this.props.student.campusId
          : this.state.campusId,
      email:
        this.state.email === undefined
          ? this.props.student.email
          : this.state.email,
      imageUrl:
        this.state.imageUrl === undefined
          ? this.props.student.imageUrl
          : this.state.imageUrl,
      gpa:
        this.state.gpa === undefined ? this.props.student.gpa : this.state.gpa,
    };

    // Edit campus in back-end database
    await this.props.editStudent(student);

    // Update state, and trigger redirect to show the new campus
    this.setState({
      firstname: "",
      lastname: "",
      campusId: null,
      email: "",
      imageUrl: "",
      gpa: 0,
      redirect: true,
      redirectId: this.props.match.params.id,
      error: false,
    });
  };

  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchCampus(this.props.match.params.id);
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    // Redirect to new campus's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/students/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditstudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          student={this.props.student}
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "EditStudentContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    student: state.student, // Get the State object from Reducer "campus"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchStudentThunk(id)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
  };
};

// Export store-connected container by default
// EditStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditStudentContainer);

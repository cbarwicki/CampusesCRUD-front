import { Link } from "react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <h3>{student.email}</h3>
      <img
        style={{ height: "400px", width: "400px" }}
        src={student.imageUrl}
        alt={student.firstname}
      />
      <h3>Gpa: {student.gpa}</h3>
      {student.campus === null ? (
        <h3>The student is not enrolled into any campus at the moment.</h3>
      ) : (
        <Link to={`/campuses/${student.campus.id}`}>
          <h3>{student.campus.name}</h3>
        </Link>
      )}
    </div>
  );
};

export default StudentView;

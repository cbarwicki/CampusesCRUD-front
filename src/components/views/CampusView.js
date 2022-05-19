/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus } = props;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <img src={campus.imageUrl} alt={campus.name} />
      {campus.students.length === 0 ? (
        <h3>The university does not have any students at the moment.</h3>
      ) : (
        <h2>List of Students</h2>
      )}
      {campus.students.map((student) => {
        let name = student.firstname + " " + student.lastname;
        return (
          <Link key={student.id} to={`/students/${student.id}`}>
            <h2>{name}</h2>
          </Link>
        );
      })}
    </div>
  );
};

export default CampusView;

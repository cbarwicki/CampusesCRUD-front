/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from './mystyle.module.css'; 

const AllCampusesView = (props) => {
  const {deleteCampus} = props;
  // If there is no campus, display a message.
  if (!props.allCampuses.length) {
    return (
      <div>
        <div>There are no campuses.</div>
        <Link to={`/newcampus`}>
          <button>Add New Campus</button>
        </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "2em"
      }}>
        {props.allCampuses.map((campus) => (
          <div key={campus.id}>
            <div className={styles.card}>
              <div style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "left"
              }}>
                <Link to={`/campuses/${campus.id}`}>
                  <h2>{campus.name}&nbsp;<span style={{color: "darkgray"}}>Click me</span></h2>
                </Link>
                <h4>campus id: {campus.id}</h4>
                <p className={styles.address}>{campus.address}</p>
                <p>{campus.description}</p>
              </div>
              <img style={{
                height: "100%"
              }} src={campus.imageUrl}
              alt={campus.name}
              />
            </div>
            <Link to={`/editCampus/${campus.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          </div>
        ))}
      </div>
      <br/>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// AllCampusesView.propTypes = {
//   allCampuses: PropTypes.array.isRequired,
// };

export default AllCampusesView;
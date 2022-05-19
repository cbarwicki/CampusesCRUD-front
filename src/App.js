import "./App.css";

//Router
import { Switch, Route } from "react-router-dom";
//Components
import {
  HomePageContainer,
  CampusContainer,
  NewCampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
} from './components/containers';
import EditCampusContainer from "./components/containers/EditCampusContainer";
import EditStudentContainer from "./components/containers/EditStudentContainer";

// if you create separate components for adding/editing 
// a student or campus, make sure you add routes to those
// components here

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/newcampus" component={NewCampusContainer} />
        <Route exact path="/campuses/:id" component={CampusContainer} />
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/students/:id" component={StudentContainer} />
        {/* editing campus route */}
        <Route exact path="/editCampus/:id" component={EditCampusContainer} />
        {/* editing student route */}
        <Route exact path="/editStudent/:id" component={EditStudentContainer} />
      </Switch>        
    </div>
  );
}

export default App;


import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from 'react-bootstrap';
import Homepage from "./Components/Homepage"
import Dashboardadmin from './Components/Dashboardadmin';
import Dashboarduser from './Components/Dashboarduser';
import Logout from './Components/Logout';
import Adduser from './Components/Adduser';
import Adminreportdash from './Components/Adminreportdash';
import Viewcomplaintadmin from './Components/Viewcomplaintadmin';
import Viewuserprofile from './Components/Viewuserprofile';
import Departmentmaster from './Components/Departmentmaster';
import Boothmaster from './Components/Boothmaster';
import Addappointment from './Components/Addappointment';
import Summary from './Components/Summary';
import Adminallappointments from './Components/Adminallappointments';
import Viewappointmentadmin from './Components/Viewappointmentadmin';
import Appointmentsuser from './Components/Appointmentsuser';
import Viewappointmentuser from './Components/Viewappointmentuser';

function App() {
  return (
    <div className="">
      <Container fluid >
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/Dashboardadmin" element={<Dashboardadmin />} />
            <Route exact path="/Dashboarduser" element={<Dashboarduser />} />
            <Route exact path="/Logout" element={<Logout />} />
            <Route exact path="/Adduser" element={<Adduser />} />
            <Route exact path="/Viewcomplaintadmin/:id" element={<Viewcomplaintadmin />} />
            <Route exact path="/Viewuserprofile" element={<Viewuserprofile />} />
            <Route exact path="/Departmentmaster" element={<Departmentmaster />} />
            <Route exact path="/Boothmaster" element={<Boothmaster />} />
            <Route exact path="/Addappointment" element={<Addappointment />} />
            <Route exact path="/Summary" element={<Summary />} />
            <Route exact path="/Adminallappointments" element={<Adminallappointments />} />
            <Route exact path="/Viewappointmentadmin" element={<Viewappointmentadmin />} />
            <Route exact path="/Appointmentsuser" element={<Appointmentsuser />} />
            <Route exact path="/Viewappointmentuser" element={<Viewappointmentuser />} />


          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;

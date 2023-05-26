import logo from './logo.svg';
import './App.css';
import Mainpage from './PermissionTable/Pages-js/Mainpage';
import Useraccess from './PermissionTable/Pages-js/Useraccess';
import GeneralAccess from './PermissionTable/Pages-js/GeneralAccess';
import BulkAccess from './PermissionTable/Pages-js/BulkAccess';
import { BrowserRouter as Router,Routes,Route,Switch,Navigate,Link, BrowserRouter,useNavigate } from 'react-router-dom'
function App() {
  return (
    <div className="App"> 
    <Mainpage/>
      <Routes>   
        <Route path="SMDB/userAccess" element={<Useraccess />}></Route>
        <Route path="SMDB/generalAccess" element={<GeneralAccess />}></Route>
        <Route path="SMDB/bulkAccess" element={<BulkAccess />}></Route>
    </Routes>

    </div>
  );
}

export default App;

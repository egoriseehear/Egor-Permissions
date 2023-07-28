import logo from './logo.svg';
import './App.css';
import Mainpage from './PermissionTable/Pages-js/Mainpage';
import Useraccess from './PermissionTable/Pages-js/Useraccess';
import GeneralAccess from './PermissionTable/Pages-js/GeneralAccess';
import BulkAccess from './PermissionTable/Pages-js/BulkAccess';
import { BrowserRouter as Router,Routes,Route,Switch,Navigate,Link, BrowserRouter,useNavigate } from 'react-router-dom';
import { SetFieldAccess } from './PermissionTable/SetFieldAccess/SetFieldAccess';
import { ProtocolAccess } from './PermissionTable/ProtocolAccess/ProtocolAccess';

function App() {
  return (
    <div className="App"> 
    <Mainpage/>
      <Routes>   
        <Route path="SMDB/userAccess" element={<Useraccess />}></Route>
        <Route path="SMDB/generalAccess" element={<GeneralAccess />}></Route>
        <Route path="SMDB/bulkAccess" element={<BulkAccess />}></Route>
        <Route path="SMDB/setFieldAccess" element={<SetFieldAccess />} />
        <Route path="SMDB/protocolAccess" element={<ProtocolAccess />} />
    </Routes>
    </div>
  );
}

export default App;

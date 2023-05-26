import React,{useState,useEffect} from 'react'
import circle from '../Logos/circle.svg'
import useraccesslogo from'../Logos/useraccesslogo.svg'
import useraccessnoborderlogo from'../Logos/useraccessblack.svg'
import generalaccessblack from'../Logos/generalaccessblack.svg'
import generalaccess from'../Logos/generalaccess.svg'
import bulkaccesslogo from'../Logos/grouplogo.svg'
import bulkaccessblack from'../Logos/grouplogoblack.svg'
import dropdownlogo from '../Logos/dropdownlogo.svg'
import fieldaccesslogo from '../Logos/fieldlogo.svg'
import fieldaccessnoborderlogo from '../Logos/fieldaccessblack.svg'
import '../Pages-css/Mainpage.css'
import {useNavigate,Link } from 'react-router-dom' 
import {AdminName_URL} from '../Pages-js/URL';
import axios from 'axios';
import GeneralAccess from './GeneralAccess'
import BulkAccess from './BulkAccess' 
import protocolaccessnoborderlogo from'../Logos/protocolaccessblack.svg'
import projectaccesssectionnoborder from'../Logos/projectaccessblack.svg'
import studyaccessnoborderlogo from'../Logos/studyaccessblack.svg'
import protocolaccesslogo from'../Logos/protocolaccess.svg'
import projectaccesslogo from'../Logos/projectaccess.svg'
import studyaccesslogo from'../Logos/studyaccess.svg'




function Mainpage() {
  const navigate = useNavigate();
  const [showGeneralBorder, setShowGeneralBorder] = useState(true);
  const [showBulkAccessBorder, setShowBulkAccessBorder] = useState(false);
  const [showUserAccessBorder, setShowUserAccessBorder] = useState(false);
  const [showFieldBorder, setShowFieldBorder] = useState(false);
  const [showProtocolAccessBorder, setProtocolAccessBorder] = useState(false);
  const [showProjectAccessBorder, setProjectAccessBorder] = useState(false);
  const [showStudyAccessBorder, setStudyAccessBorder] = useState(false);
  const [adminName, setAdminName] = useState('');


const generalAccessPage=()=>{
// navigate('SMDB/generalAccess') 
  setShowGeneralBorder(true); 
  setShowBulkAccessBorder(false);
  setShowUserAccessBorder(false); 
  setShowFieldBorder(false); 
  setProtocolAccessBorder(false);
  setProjectAccessBorder(false); 
  setStudyAccessBorder(false); 
}
const bulkAccessPage=()=>{
  //navigate('SMDB/bulkAccess')
  setShowGeneralBorder(false); 
  setShowBulkAccessBorder(true);
  setShowUserAccessBorder(false); 
  setShowFieldBorder(false); 
  setProtocolAccessBorder(false);
  setProjectAccessBorder(false); 
  setStudyAccessBorder(false); 
}
const userAccessPage=()=>{
  //navigate('SMDB/useraccess')
  setShowGeneralBorder(false); 
  setShowBulkAccessBorder(false);
  setShowUserAccessBorder(true); 
  setShowFieldBorder(false);  
  setProtocolAccessBorder(false);
  setProjectAccessBorder(false); 
  setStudyAccessBorder(false);
}
const fieldAccessPage=()=>{
 // navigate('SMDB/useraccess')
  setShowGeneralBorder(false); 
  setShowBulkAccessBorder(false);
  setShowUserAccessBorder(false); 
  setShowFieldBorder(true); 
  setProtocolAccessBorder(false);
  setProjectAccessBorder(false); 
  setStudyAccessBorder(false); 
}
const protocolAccessPage=()=>{
  //navigate('SMDB/useraccess')
  setShowGeneralBorder(false); 
  setShowBulkAccessBorder(false);
  setShowUserAccessBorder(false); 
  setShowFieldBorder(false); 
  setProtocolAccessBorder(true);
  setProjectAccessBorder(false); 
  setStudyAccessBorder(false); 
}
const projectAccessPage=()=>{
 // navigate('SMDB/useraccess')
  setShowGeneralBorder(false); 
  setShowBulkAccessBorder(false);
  setShowUserAccessBorder(false); 
  setShowFieldBorder(false);
  setProtocolAccessBorder(false);
  setProjectAccessBorder(true); 
  setStudyAccessBorder(false);  
}
const studyAccessPage=()=>{
 // navigate('SMDB/useraccess')
  setShowGeneralBorder(false); 
  setShowBulkAccessBorder(false);
  setShowUserAccessBorder(false); 
  setShowFieldBorder(false);  
  setProtocolAccessBorder(false);
  setProjectAccessBorder(false); 
  setStudyAccessBorder(true);
}

useEffect(() => {
  generalAccessPage();
   // Call the API using Axios for AdminName
   const url=`${AdminName_URL}`;
   axios.get(url)
   .then(response => {
     setAdminName(response.data)
     console.log(response.data)
   })
   .catch(error => {
   console.error(error);
   }) 
 }, []);
 
  return (
    <div className='mainpage'>
      <div className='profilesection'>
      <img className="circle" src={`${process.env.PUBLIC_URL}js/permissions/media/circle.ae17a9537c4b2634c77ec699a6bd1a6c.svg`} alt="circle" />
      <div className='adminname'>{adminName}</div>
      <div className='adminlabel'>admin</div>
      </div>      
    <Link to="/SMDB/generalAccess" className={showGeneralBorder?"generalaccesssection" : "generalaccesssectionnoborder"} onClick={generalAccessPage}> 
    <img className= "generalaccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/generalaccess.0abf0c4bdf3a630e441dfd9a88aadb16.svg`} alt="generalaccesslogo" />
    <img className="generalaccessnoborderlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/generalaccessblack.4cf1611eaf2fb682abd750f36a35c162.svg`} alt="generalaccessnoborderlogo" />
    <div className='generalaccesssectionlabel'>General Access</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" />
    </Link>
    <Link to="/SMDB/bulkAccess" className={showBulkAccessBorder?"bulkaccesssection" : "bulkaccesssectionnoborder"} onClick={bulkAccessPage}>
    <img className="bulkaccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/grouplogo.6bc9e893266af234b4ddfaa21870b249.svg`} alt="bulkaccesslogo" />
    <img className="bulkaccessnoborderlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/grouplogoblack.021c4836ac79512a69bf3d05054e346d.svg`} alt="bulkaccessnoborderlogo" />
    <div className='bulkaccesssectionlabel'>Set Bulk Access</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" />
    </Link>
    <Link to="" className={showUserAccessBorder?"useraccesssection" : "useraccesssectionnoborder"} onClick={userAccessPage}>
    <img className="useraccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/useraccesslogo.9a30b35861e46b7919ce687b59184adb.svg`} alt="useraccesslogo" />
    <img className="useraccessnoborderlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/useraccessblack.4c0db6f4bba159cc894fb42b4cc833cf.svg`} alt="useraccessnoborderlogo" />
    <div className='useraccesssectionlabel'>Set Access by User</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" /> 
    </Link>
    <Link to="" className={showFieldBorder?"fieldaccesssection" : "fieldaccesssectionnoborder"} onClick={fieldAccessPage}>
    <img className="fieldaccessnoborderlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/fieldaccessblack.f171dd3c7152ae389677096c577625ee.svg`} alt="fieldaccessnoborderlogo" />
    <img className="fieldaccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/fieldlogo.73cc9d76033b645be229471b2e16d48d.svg`} alt="fieldaccesslogo" />
    <div className='fieldaccesssectionlabel'>Set Field Access</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" /> 
    </Link>
    <Link to="" className={showProtocolAccessBorder?"protocolaccesssection" : "protocolaccesssectionnoborder"} onClick={protocolAccessPage}>
    <img className="protocolaccesssectionnoborder" src={`${process.env.PUBLIC_URL}js/permissions/media/protocolaccessblack.fc014adc64c973b0afdfe9ca4fd9f3a6.svg`} alt="fieldaccessnoborderlogo" />
    <img className="protocolaccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/protocolaccess.408191c9abfa36a5e2c67588444d89af.svg`} alt="fieldaccesslogo" />
    <div className='protocolaccesssectionlabel'>Protocol Access</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" /> 
    </Link>
    <Link to="" className={showProjectAccessBorder?"projectaccesssection" : "projectaccesssectionnoborder"} onClick={projectAccessPage}>
    <img className="projectaccesssectionnoborder" src={`${process.env.PUBLIC_URL}js/permissions/media/projectaccessblack.bb2887f46eb9ebf37bd5dc4d7318f471.svg`} alt="projectaccesssectionnoborder" />
    <img className="projectaccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/projectaccess.21842e51ab0ae3c64b841dd4bbd113e8.svg`} alt="projectaccesslogo" />
    <div className='projectaccesssectionlabel'>Project Access</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" /> 
    </Link>
    <Link to="" className={showStudyAccessBorder?"studyaccesssection" : "studyaccesssectionnoborder"} onClick={studyAccessPage}>
    <img className="studyaccessnoborderlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/studyaccessblack.18e4b9112b3d4e137dec6e6a2a17199b.svg`} alt="studyaccessnoborderlogo" />
    <img className="studyaccesslogo" src={`${process.env.PUBLIC_URL}js/permissions/media/studyaccess.d99da9a5801e0796ffdb3d3f4c7ebf3f.svg`} alt="studyaccesslogo" />
    <div className='studyaccesssectionlabel'>Study Access</div>
    <img className="dropdownlogo" src={`${process.env.PUBLIC_URL}js/permissions/media/dropdownlogo.85cdc1f6fd9b4a654c108d2b61490665.svg`} alt="dropdownlogo" /> 
    </Link>
    </div>
    
  )
}

export default Mainpage
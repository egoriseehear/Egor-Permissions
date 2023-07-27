import React, { useState,useEffect,useRef,Component  } from 'react';
import ReactDOM from "react-dom";
import '../Pages-css/Useraccess.css';
import DataTable from "react-data-table-component";
//import Select from 'react-select'; 
import { default as ReactSelect } from "react-select";
import dropdown from '../Logos/dropdown.svg'
import userpagelogo from '../Logos/userpagelogo.svg'
import searchlogo from '../Logos/searchlogo.svg'
import pluslogo from '../Logos/pluslogo.svg'
import viewenablelogo from '../Logos/viewenablelogo.svg'
import viewdisablelogo from '../Logos/viewdisablelogo.svg'
import editenablelogo from '../Logos/editenablelogo.svg'
import editdisablelogo from '../Logos/editdisablelogo.svg'
import createenablelogo from '../Logos/createenablelogo.svg'
import transferenablelogo from '../Logos/transferenablelogo.svg'
import Select, { components } from "react-select";
import ReactPaginate from 'react-paginate';
import { useTable, usePagination } from 'react-table';
import {UserAccess_URL} from '../Pages-js/URL';
import axios from 'axios';
import {UserAccesssharingflagPost_URL} from '../Pages-js/URL';
import {UserAccessDeletePost_URL} from '../Pages-js/URL';
import {PermissionChanges_URL} from '../Pages-js/URL';
import BAModal from 'react-modal';
import { Table, Column, AutoSizer } from 'react-virtualized';


import { TextField, Stack } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";






function Useraccess() {
  const [selectedRowsTable, setSelectedRowsTable] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowsinside, setSelectedRowsinside] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAll1, setSelectAll1] = useState(false);
  const [selectAll2, setSelectAll2] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectOption, setSelectOption] = useState("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  //const [options, setOptions] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showData, setShowData] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [isSetYes,setIsSetYes] =useState(false);
  const [isSetYesView1,setIsSetYesView1] =useState(false);
  const [mouselinedefault,setMouselineDefault]=useState([]);
  const [mouselinedefaultedit,setMouselineDefaultEdit]=useState([]);
  const [isSetYesEdit1,setIsSetYesEdit1] =useState(false);
  const [isSetYesViewDuplicate,setIsSetYesViewDuplicate] =useState(false);
  const [isSetYesEditDuplicate,setIsSetYesEditDuplicate] =useState(false);
  const [isSetYesCreate,setIsSetYesCreate] =useState(false);
  const [isSetYesCreateDuplicate,setIsSetYesCreateDuplicate] =useState(false);
  const [isSetYesTransfer,setIsSetYesTransfer] =useState(false);
  const [isSetYesTransferDuplicate,setIsSetYesTransferDuplicate] =useState(false);
  const [isSetYesViewUnshared,setIsSetYesViewUnshared] =useState(false);
  const [isSetYesEditUnshared,setIsSetYesEditUnshared] =useState(false);
  const [isSetYesCreateUnshared,setIsSetYesCreateUnshared] =useState(false);
  const [isSetYesTransferUnshared,setIsSetYesTransferUnshared] =useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const[data,setData]=useState([]);
  const[data2,setData2]=useState([]);
  const[data3,setData3]=useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const[defaultSharing,setDefaultSharing]=useState(0);
  //const[options,setOptions]=useState([]);
  const [duplicatedRows, setDuplicatedRows] = useState(false);
  const [data2duplicate, setData2duplicate] = useState([]);
  const [data3duplicate, setData3duplicate] = useState([]);
  const [data2Index,setData2Index]=useState(); 
  const [sharedUser,setSharedUser]=useState([]);
  const[options,setOptions]=useState([])
  const[optionsmouselines,setOptionsmouselines]=useState([])
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState("");
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState("");
  const [isDeleteOwner, setIsDeleteOwner] = useState(""); 
  const [isDeleteUserView, setIsDeleteUserView] = useState(""); 
  const [isDeleteUserViewDuplicate, setIsDeleteUserViewDuplicate] = useState(""); 
  const [row, setRow] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [shareDeletePopup, setShareDeletePopup] = useState(false);
  const [deletePopupIndex, setDeletePopupIndex] = useState();
  const[deleteselectall,setDeleteselectall]=useState(false);
  const[buttonvalallselect,setButtonvalallselect]=useState(false);
  const[viewMouselines,setViewMouselines]=useState([]);
  const[editMouselines,setEditMouselines]=useState([]);
  const[ownerdeleteindex,setOwnerdeleteindex]=useState();
  const[ownerdeleterow,setOwnerdeleterow]=useState();
  const[deleteindexpopup,setdeleteindexpopup]=useState()
  const[deleteshareindexpopup,setdeleteshareindexpopup]=useState()
  const [deleteSharePopup, setDeleteSharePopup] = useState(false);
  const[deleteshareindexpopupDuplicate,setdeleteshareindexpopupDuplicate]=useState()
  const [deleteSharePopupDuplicate, setDeleteSharePopupDuplicate] = useState(false);
  const parentTableRef = useRef(null);
  const expandedTableRef = useRef(null);
  const [editenable, setEditEnable] = useState(false);
  const [editenableDuplicate, setEditEnableDuplicate] = useState(false);
  const [editenableUnshared, setEditEnableUnshared] = useState(false);
  const [selectedCheckbox, setSelectedCheckbox] = useState(false);
  const [selectedCheckbox2, setSelectedCheckbox2] = useState(false);
  const [newindex, setNewindex] = useState();
  const [autoCompleteChange, setAutoCompleteChange] = useState(false);
  const [autoCompleteChangeUnshare, setAutoCompleteChangeUnshare] = useState(false);
  const [autoCompleteChangeDuplicate, setAutoCompleteChangeDuplicate] = useState(false);


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const userAccessLoad = () => {
       // Call the API using Axios for UserAccess
    const url=`${UserAccess_URL}`;
   axios.get(url)
   .then(response => {
     console.log(response.data)
     var idincrement=0;
     const ownernames = response.data.map(({ownerId,ownerName,defaultSharing,userLevel}) => ({
      id: "dataid"+(idincrement++),
      ownerId:ownerId,
      name: ownerName,
      defaultSharing:defaultSharing,
      userLevel:userLevel,
}))
var idincrement2=0;
const sharedUsersList= response.data.map(({ownerId,sharedUsersList}) => ({
  ownerId:ownerId,
    sharedUsersList:sharedUsersList.map(({sharedUserId,sharedUserName,editMouseLines,viewMouseLines,sharingflag,creatorFlag,ownerSwitchFlag,userLevel}) => ({
      id:"dataid2"+(idincrement2++),
      sharedUserId:sharedUserId,
      sharedUserName:sharedUserName,  
      ownerId:ownerId,  
      editMouseLines:editMouseLines,
      viewMouseLines:viewMouseLines,
      sharingflag:sharingflag,
      creatorFlag:creatorFlag,
      ownerSwitchFlag:ownerSwitchFlag,
      userLevel,userLevel
    }))
}))
var idincrement3=0;
const unSharedUsersList= response.data.map(({ownerId,unSharedUsersList}) => ({
  ownerId:ownerId,
  unSharedUsersList:unSharedUsersList.map(({userid,username}) => ({
      id:"dataid3"+(idincrement3++),
      unSharedUserId:userid,
      unSharedUserName:username, 
      ownerId:ownerId,    
    }))
}))
var idincrement4=0;
const mouselines= response.data.map(({ownerId,mouselines}) => ({
  ownerId:ownerId,
  mouselines:mouselines.map(({mouseLineId,mouseLineName}) => ({
      id:"mouselines"+(idincrement3++),
      mouseLineId:mouseLineId,
      mouseLineName:mouseLineName,  
      ownerId:ownerId,   
    }))
}))

setData(ownernames);
setData2(sharedUsersList);
setData3(unSharedUsersList);
setOptions(mouselines);

//const index = sharedUsersList.findIndex((element) => element.ownerid === sharedUsersList.ownerId);
const index2 = mouselines.findIndex((element) => element.ownerid === mouselines.ownerId);
   })
   .catch(error => {
   console.error(error);
   }) 
  };

  useEffect(() => {

   userAccessLoad();
 }, []);

 /* const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: 'option6' },
    { label: 'Option 7', value: 'option7' },
    { label: 'Option 8', value: 'option8' },
    { label: 'Option 9', value: 'option9' },
  ];*/


  
 /*const data2 = [
    { id:"data21",name: "Bob" },
    {id:"data22",name: "Jane" }
  ];*/
  
  function DataRow({ option, onSelect, isChecked  }) {
    return (
      <tr  className="table-row">
      <td className='multicheckbox'>
        <input  type="checkbox" checked={isChecked} onChange={() => onSelect(option)} />
        {isChecked && <span className="tick">&#x2713;</span>}
      </td>
      <td className='multitabledata'>{option}</td>
    </tr>
    );
  }
  

  const [selectedOptionsmulti, setSelectedOptionsmulti] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(false);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const [activeRowValue, setActiveRowValue] = useState(null);
  const [activeRow, setActiveRow] = useState(null);
  const [activeButtonValue, setActiveButtonValue] = useState(null);
  const [isTableVisible2, setIsTableVisible2] = useState(false);
  const tableRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [paginationIndex, setPaginationIndex] = useState({});
  const [textboxValues, setTextboxValues] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const itemsPerPage = 2; 
  const [selectedAutoValues, setSelectedAutoValues] = useState([]);
  const [page, setPage] = useState(1);

  


  const handlePageChange = (pageNumber, index,row,increment) => {

    setCurrentPage(pageNumber);
    /*const textboxValue = textboxValues[row.id] ? textboxValues[row.id][index] : [];
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOptions = textboxValue.slice(indexOfFirstItem, indexOfLastItem);
    setSelectedOptionsmulti(currentOptions);  
    setPaginationIndex((prevPaginationIndex) => ({
      ...prevPaginationIndex,
      [row.id]: pageNumber,
    }));*/
    const totalPages = Math.ceil(selectedAutoValues.length / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentValues = selectedAutoValues.slice(startIndex, endIndex);
    setSelectedAutoValues(currentValues);
    setPage((prevPage) => prevPage + increment);
  
  };

 {/* const handleInputChange  = (row, index) => {
   const newTextboxValues = { ...textboxValues };
  
    if (!newTextboxValues[row.id]) {
      newTextboxValues[row.id] = {};
    }
  
    if (!newTextboxValues[row.id][index]) {
      newTextboxValues[row.id][index] = [];
    }
  
    newTextboxValues[row.id][index] = [value]; 
  
  setTextboxValues(newTextboxValues);

  };*/}
  
 



  
 

  {/*const handleSelect = (value,row,index) => {
    const updatedOptions = [...selectedOptionsmulti];

    // If the option is already selected, remove it. Otherwise, add it to the selectedOptions array.
    if (updatedOptions.includes(value)) {
      const index = updatedOptions.indexOf(value);
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(value);
    }

    //setSelectedOptionsmulti(updatedOptions);   
    setSelectedOptionsmulti(updatedOptions.filter((option) =>
    options.map((opt) => opt.value).includes(option)));

    const newTextboxValues = { ...textboxValues };

    // Check if the value for the current row exists in the object
    if (!newTextboxValues[row.id]) {
      newTextboxValues[row.id] = {}; // Create a new object for the row if it doesn't exist
    }
  
    // Check if the selected values array for the current row and index exists
    if (!newTextboxValues[row.id][index]) {
      newTextboxValues[row.id][index] = []; // Create a new array for the index if it doesn't exist
    }
  
    // Check if the value is already selected
    const selectedIndex = newTextboxValues[row.id][index].indexOf(value);
    if (selectedIndex === -1) {
      // Value is not selected, add it to the array
      newTextboxValues[row.id][index].push(value);
    } else {
      // Value is already selected, remove it from the array
      newTextboxValues[row.id][index].splice(selectedIndex, 1);
    }
  
    // Update the textbox values
    setTextboxValues(newTextboxValues);
  };*/}



  



  useEffect(() => {
  
    function handleClickOutside(event) {
      if (tableRef.current && !tableRef.current.contains(event.target) && !event.target.closest("table")) {
        setIsTableVisible(false);
        setSelectedOptionsmulti([]);
      }
    }
  
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const handleInputClick = (row,index) => {
   setActiveRow(row)
   setActiveRowIndex(index);
   setIsTableVisible(true);
   setCurrentPage(1);

  // setIsEditing(true);
  };    
    
   
 /* const data = [
    { id: "i1", name: "John" },
    { id: "i2", name: "Jane" },
    { id: "i3", name: "Bob" },
    { id: "i4", name: "Alice" }
  ];*/

  /*const data3 = [
    { id:"data31",name: "John" },
    {id:"data32",name: "Alice" }
  ];*/
  const handleButtonClick = (index,row) => {
    var newStates;
    newStates = [...rowStates];
    newStates[index] = !newStates[index];
    setIsSetYes(true);
    if(selectAll===true){
      setDeleteselectall(true)
       newStates = [...rowStates].fill(newStates[index]);
       setRowStates(newStates);
    }else{
      setDeleteselectall(false)
    setRowStates(newStates);
    }
    var ids=[];
    ids[0]=row.ownerId
    var sharingFlag;
    if(newStates[index]===true){
    sharingFlag=1;
    }
    else{
      sharingFlag=0;
    }
    var url;
if(selectAll===true){
   ids = selectedRowsTable.map(item => item.ownerId);
   url=`${UserAccesssharingflagPost_URL}`;
}
else{
  const index = data.findIndex((element) => element.ownerId === row.ownerId);
  const ids = data[index].ownerId;
  url=`${UserAccesssharingflagPost_URL}`;
}
    axios.post(url,{
      ownerIds:ids,
      sharingFlag:sharingFlag
    }) 
       .then(response => {
    {/*    if(response){
      // setIsUpdateSuccessful(true);
       const url=`${UserAccess_URL}`;
      axios.get(url)
        .then(response => { 
          const rowchange=response.data[index]
          if(rowchange.defaultSharing===1){
            setButtonvalallselect(true);
            if(selectAll){
              var newStates2 = [...rowStates].fill(true);
              setRowStates(newStates2)
            }
            else{
              var newStates2 = [...rowStates]
               newStates2[index]=true
              setRowStates(newStates2)
              }

          }
          else {
            setButtonvalallselect(false);

            if(selectAll){
              var newStates2 = [...rowStates].fill(false);
              setRowStates(newStates2)
            }
            else{
              var newStates2 = [...rowStates]
               newStates2[index]=false
               setRowStates(newStates2)
              }

          }
        })
        .catch(error => {
        console.error(error);
        }) 

        }
        else{
          setIsUpdateSuccessful(false);
        }*/}
       })
       .catch(error => {
       console.error(error);
       setIsUpdateSuccessful(false);
       })
       .finally(() => {
       setIsConfirmationOpen(false);
       });
  };

      /*Submit Button Popup*/
      BAModal.setAppElement('#root'); // Set the root element for accessibility

      const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
      return (
          <BAModal
          className="BAModaluseraccess"
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Confirmation Dialog"
          >   
          <span className='deletepopuplabel1'>Delete</span>
          <span className='deletepopuplabel2'>Are you sure want to delete all this user access?</span>      
          <button className='yesbutton' onClick={onConfirm}>Yes</button>
          <button className='nobutton' onClick={onClose}>No</button>
          </BAModal>
      );
      }; 
      const handleConfirm = () => {
        const rowdelete=ownerdeleterow
        var shareduserId=[];
        var mouselineId=[];
        var ownerId=[];
        if(isDeleteOwner===true){
          const indexowner = data.findIndex((element) => element.ownerId === rowdelete.ownerId);
          const userlevel = data[indexowner].userLevel;
          ownerId[0] = data[indexowner].ownerId;
          shareduserId=null;
          mouselineId=null;
          if(userlevel===1){
            setIsConfirmationOpen(false);
           setIsDeleteSuccessful(false);
          }
          else{
            console.log(ownerId,shareduserId,mouselineId)
             setIsUpdateSuccessful(true);
             setIsConfirmationOpen(false);
              const url=`${UserAccessDeletePost_URL}`;
               axios.post(url,{
                 ownerIds:ownerId,
                 accessUserIds:shareduserId,
                 sharedMouselineIds:mouselineId,
               }) 

                  .then(response => {
                    console.log(response)
                   if(response.data==="success"){
                  setIsUpdateSuccessful(true);
                  userAccessLoad();
                   }
                   else{
                     setIsUpdateSuccessful(false);
                   }
                  })
                  .catch(error => {
                  console.error(error);
                  setIsUpdateSuccessful(false);
                  })
                  .finally(() => {
                  setIsConfirmationOpen(false);
                  });
    
                }
        }
        else if(isDeleteUserView==true){
          var userlevelshared;
        const shareduserIdIndex = data2.findIndex((element) => element.ownerId === rowdelete.ownerId);
         // shareduserId[0] = data2[shareduserIdIndex].sharedUsersList[0].sharedUserId;
         shareduserId[0]=rowdelete.sharedUserId;
          const indexshared = data2.findIndex((element) => element.ownerId === rowdelete.ownerId);
          const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === rowdelete.id);
          const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
           userlevelshared=data2[indexshared].sharedUsersList[indexrow].userLevel;
          ownerId[0] = data2[indexshared].sharedUsersList[indexrow].ownerId;
          if(autovalue2[rowdelete.id]!==undefined){
            mouselineId=autovalue2[rowdelete.id].map(item => item.mouseLineId)
          }
          else{
            if(viewMouseLinesvalue!==null && viewMouseLinesvalue!==undefined && viewMouseLinesvalue!==[]){
              mouselineId=viewMouseLinesvalue.map(item => item.mouseLineId)
            }
          }
          if(userlevelshared===1){
            setIsConfirmationOpen(false);
           setIsDeleteSuccessful(false);
          }
          else{
            console.log(ownerId,shareduserId,mouselineId)
           //  setIsUpdateSuccessful(true);
             setIsConfirmationOpen(false);
              const url=`${UserAccessDeletePost_URL}`;
              axios.post(url,{
                ownerIds:ownerId,
                accessUserIds:shareduserId,
                sharedMouselineIds:mouselineId,
               }) 
                  .then(response => {
                    console.log(response)
                   if(response.data==="success"){
                 // setIsUpdateSuccessful(true);
                 userAccessLoad();
                 
                   }
                   else{
                     setIsUpdateSuccessful(false);
                   }
                  })
                  .catch(error => {
                  console.error(error);
                  setIsUpdateSuccessful(false);
                  })
                  .finally(() => {
                  setIsConfirmationOpen(false);
                  });
    
                }
        }
        else if(isDeleteUserViewDuplicate==true){
          var userlevelsharedDuplicate;
        const shareduserIdIndex = data2.findIndex((element) => element.ownerId === rowdelete.ownerId);
          //shareduserId[0] = data2[shareduserIdIndex].sharedUsersList[0].sharedUserId;
          shareduserId[0]=rowdelete.sharedUserId;
          const indexshared = data2.findIndex((element) => element.ownerId === rowdelete.ownerId);
          const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === rowdelete.id);
          const editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
          userlevelsharedDuplicate=data2[indexshared].sharedUsersList[indexrow].userLevel;
          ownerId[0] = data2[indexshared].sharedUsersList[indexrow].ownerId;
          if(autovalue3[rowdelete.id]!==undefined){
            mouselineId=autovalue3[rowdelete.id].map(item => item.mouseLineId)
          }
          else{
            if(editMouseLinesvalue!==null && editMouseLinesvalue!==undefined && editMouseLinesvalue!==[]){
              mouselineId=editMouseLinesvalue.map(item => item.mouseLineId)
            }
          }
          if(userlevelsharedDuplicate===1){
            setIsConfirmationOpen(false);
           setIsDeleteSuccessful(false);
          }
          else{
            console.log(ownerId,shareduserId,mouselineId)
           //  setIsUpdateSuccessful(true);
             setIsConfirmationOpen(false);
              const url=`${UserAccessDeletePost_URL}`;
               axios.post(url,{
                ownerIds:ownerId,
                accessUserIds:shareduserId,
                sharedMouselineIds:mouselineId,
               }) 
                  .then(response => {
                    console.log(response)
                   if(response.data==="success"){
                  //setIsUpdateSuccessful(true);
                  userAccessLoad();

                   }
                   else{
                     setIsUpdateSuccessful(false);
                   }
                  })
                  .catch(error => {
                  console.error(error);
                  setIsUpdateSuccessful(false);
                  })
                  .finally(() => {
                  setIsConfirmationOpen(false);
                  });
    
                }
        }
   
       };

       
     
       const handleClose = () => {
         setIsConfirmationOpen(false);
       };
       const closeSymbol = () => {
        setIsUpdateSuccessful("")
        userAccessLoad();
      };

  const handleOwnerLevelDeleteClick = (index,row) => {
    setDeletePopup(false);
    setIsConfirmationOpen(true);
    setOwnerdeleteindex(index);
    setOwnerdeleterow(row);
    setIsDeleteOwner(true);
  };
  const passindextopopup = (index) => {
    setDeletePopup(true);
    setdeleteindexpopup(index);
  };
  const handleShareLevelDeleteClick = (index,row) => {
    setDeleteSharePopup(false);
    setIsConfirmationOpen(true);
    setOwnerdeleteindex(index);
    setOwnerdeleterow(row);
    setIsDeleteUserView(true)
  };
  const handleShareLevelDeleteClickDuplicate = (index,row) => {
    setDeleteSharePopup(false);
    setIsConfirmationOpen(true);
    setOwnerdeleteindex(index);
    setOwnerdeleterow(row);
    setIsDeleteUserViewDuplicate(true)
  };
  const passshareindextopopup = (index) => {
    setDeleteSharePopup(true);
    setdeleteshareindexpopup(index);
  };
  const passshareindextopopupduplicate = (index) => {
    setDeleteSharePopupDuplicate(true);
    setdeleteshareindexpopupDuplicate(index);
  };
  const [rowStates, setRowStates] = useState(data.map(() => false));
  const [rowStatesView, setRowStatesView] = useState([]);
  const [rowStatesEdit, setRowStatesEdit] = useState([]);
  const [rowStatesCreate, setRowStatesCreate] = useState([]);
  const [rowStatesTransfer, setRowStatesTransfer] = useState([]);
  const [rowStatesViewUnshared, setRowStatesViewUnshared] = useState([]);
  const [rowStatesEditUnshared, setRowStatesEditUnshared] = useState([]);
  const [rowStatesCreateUnshared, setRowStatesCreateUnshared] = useState([]);
  const [rowStatesTransferUnshared, setRowStatesTransferUnshared] = useState([]);
  const [rowStatesViewDuplicate, setRowStatesViewDuplicate] = useState([]);
  const [rowStatesEditDuplicate, setRowStatesEditDuplicate] = useState([]);
  const [rowStatesCreateDuplicate, setRowStatesCreateDuplicate] = useState([]);
  const [rowStatesTransferDuplicate, setRowStatesTransferDuplicate] = useState([]);
  const [rowStatesViewRow, setRowStatesViewRow] = useState();
  const [rowStatesEditRow, setRowStatesEditRow] = useState();
  const [rowStatesCreateRow, setRowStatesCreateRow] = useState();
  const [rowStatesTransferRow, setRowStatesTransferRow] = useState();
  const textBoxRef = useRef(null);
 /* useEffect(() => {
    if (isEditing) {
      textBoxRef.current.focus(); // Focus the text box
    }
  }, [isEditing]);*/
  const columns = [
         {
        name: 'Name',
        selector: row => row.name,
        sortable: true,  
        
      },
      {
        name: "Action",
        cell: (row,index) => {
          //const currentPage = currentPage[paginationIndex] || 1;
          if(isSetYes !==true){
          const defaultSharing = row.defaultSharing;
          if(defaultSharing===0){
            rowStates[index]=false;
            }
            else if(defaultSharing===1){
              rowStates[index]=true;
            }
          }
          return (   
        
            <div className="buttons-defaultsharing">
                <button className={rowStates[index] ?"yes":"no"} onClick={() =>handleButtonClick(index,row)}>
                 {rowStates[index] ? "Yes" : "No"}
                </button>
           </div>
          );
         }
      },
      {
        name: "Action",
        cell: (row,index) => {
          
          return (          
            <div className="buttons-deleteownerlevel">
                   <button className='deleteownerlevel' onClick={()=>passindextopopup(index)}>
                  &#8942;
                </button>
               </div>
          );
         }
      },
      {
        name: "Action",
        cell: (row,index) => {
          
          return (          
            <div className="buttons-deleteownerlevelpopup">
              {deletePopup && deleteindexpopup===index ?
                   <button className='deleteownerlevelpopup' onClick={()=>handleOwnerLevelDeleteClick(index,row)}>
                  Delete
                </button>:null}
               </div>
          );
         }
      }

  ];
  const handleViewClick = (index,row,viewMouseLinesvalue) => {
    var newStates = { ...rowStatesView };
    newStates[row.id] = !newStates[row.id];
      setRowStatesViewRow(row.id); 
      setIsSetYesView1(true);
      setAutoCompleteChange((prevAutoChanges) => ({
        ...prevAutoChanges,
        [row.id]: false,
      }));
      var ownerIds=[];
      var accessUserIds=[];
      var sharedMouseLineIds=[];
      if(selectAll1 === true){
        setSelectedCheckbox(true);
        for(let i=0;i<selectedRows1.length;i++){
          let j=selectedRows1[i].id
          newStates[j]=newStates[row.id]
        }
        setRowStatesView(newStates);
        ownerIds = selectedRows1.map(item => item.ownerId); 
        accessUserIds = selectedRows1.map(item => item.sharedUserId); 
        const selectedLength=selectedRows1.length
        const viewMouseLines = selectedRows1.map(item => item.viewMouseLines);
        for(var i=0;i<selectedLength;i++){
          const id=selectedRows1[i].id;
          if(autovalue2[id]!==undefined){
            sharedMouseLineIds[i]=autovalue2[id].map(item => item.mouseLineId);
                }
          else{   
            if(viewMouseLines[i]!==null){     
            sharedMouseLineIds[i]=viewMouseLines[i].map(item => item.mouseLineId);
            }
            else if(viewMouseLines[i]===null){
              sharedMouseLineIds[i]=viewMouseLines[i];
            }
          }
      }
      var permissions=[];
      if(newStates[row.id]===true && editenable ===false){
      permissions[0]=0;
      }
      else if(newStates[row.id]===false && editenable ===false){        
          permissions[0]=-1;
        } 
      else if(newStates[row.id]===true && editenable ===true){
          permissions[0]=1;
          }
          var userAccessPostRequestDataObject = [];
          var userAccessPostRequestDataArr=[];

          for (let i = 0; i < selectedRows1.length; i++) {
            var ownerId = ownerIds[i];
            var accessUserId = accessUserIds[i];
            var sharedMouselineId = sharedMouseLineIds[i];
            var permission = permissions[0]; 
          
            userAccessPostRequestDataObject[i] = {
              ownerId: ownerId,
              accessUserId: accessUserId, 
              sharedMouselineIds: sharedMouselineId,
              permission: permission 
            };            
            userAccessPostRequestDataArr[i]=userAccessPostRequestDataObject[i]
          }   

         
          console.log(userAccessPostRequestDataArr);  
      }

      else{
        setSelectedCheckbox(false);
        rowStatesView[row.id] = !rowStatesView[row.id];
        setRowStatesView({ ...rowStatesView });
        var ownerId;
        var accessUserId;
        var permission;
      ownerIds[0]=row.ownerId
      ownerId=row.ownerId;
      accessUserIds[0]=row.sharedUserId;
      accessUserId=row.sharedUserId;
      var permissions=[];
      if(newStates[row.id]===true && editenable ===false){
      permissions[0]=0;
      permission=0;
      }
      else if(newStates[row.id]===false && editenable ===false){        
          permissions[0]=-1;
          permission=-1;
        } 
      else if(newStates[row.id]===true && editenable ===true){
          permissions[0]=1;
          permission=1;
          }
      if(autovalue2[row.id]!==undefined){
        sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
      }
      else{
        if(viewMouseLinesvalue!==null && viewMouseLinesvalue!==undefined && viewMouseLinesvalue!==[]){
          sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
        }
      }
      var userAccessPostRequestDataArr=[];
      var userAccessPostRequestDataObject = {
        ownerId: ownerId,
        accessUserId: accessUserId,
        sharedMouselineIds: sharedMouseLineIds,
        permission: permission
      };
      userAccessPostRequestDataArr=[userAccessPostRequestDataObject]
      console.log(userAccessPostRequestDataArr)
      }      
      const url=`${PermissionChanges_URL}`;
      if(editenable ===false){
      axios.post(url,{
        userAccessPostRequestDataArr:userAccessPostRequestDataArr
      }) 
         .then(response => {
          if(response){
            console.log(response)
      }        
         })
         .catch(error => {
         console.error(error);
         })
        }

  };
  const handleViewClickUnshared = (index,row) => {
    var newStates = { ...rowStatesViewUnshared };
    newStates[row.id] = !newStates[row.id];
      setRowStatesViewRow(row.id); 
      setIsSetYesView1(true);
      setAutoCompleteChangeUnshare((prevAutoChanges) => ({
        ...prevAutoChanges,
        [row.id]: false,
      }));
      var ownerIds=[];
      var accessUserIds=[];
      var sharedMouseLineIds=[];
      if(selectAll2 === true){
        setSelectedCheckbox2(true);
        for(let i=0;i<selectedRows2.length;i++){
          let j=selectedRows2[i].id
          newStates[j]=newStates[row.id]
        }
        setRowStatesViewUnshared(newStates);
        ownerIds = selectedRows2.map(item => item.ownerId); 
        accessUserIds = selectedRows2.map(item => item.unSharedUserId); 
        const selectedLength=selectedRows2.length
        const viewMouseLines = selectedRows2.map(item => item.viewMouseLines);
        for(var i=0;i<selectedLength;i++){
          const id=selectedRows2[i].id;
          if(autovalue4[id]!==undefined){
            sharedMouseLineIds[i]=autovalue4[id].map(item => item.mouseLineId);
                }
          
      }
      var permissions=[];
      if(newStates[row.id]===true && editenableUnshared ===false){
      permissions[0]=0;
      }
      else if(newStates[row.id]===false && editenableUnshared ===false){        
          permissions[0]=-1;
        } 
      else if(newStates[row.id]===true && editenableUnshared ===true){
          permissions[0]=1;
          }
          var userAccessPostRequestDataObject = [];
          var userAccessPostRequestDataArr=[];

          for (let i = 0; i < selectedRows2.length; i++) {
            var ownerId = ownerIds[i];
            var accessUserId = accessUserIds[i];
            var sharedMouselineId = sharedMouseLineIds[i];
            var permission = permissions[0]; 
          
            userAccessPostRequestDataObject[i] = {
              ownerId: ownerId,
              accessUserId: accessUserId, 
              sharedMouselineIds: sharedMouselineId,
              permission: permission 
            };            
            userAccessPostRequestDataArr[i]=userAccessPostRequestDataObject[i]
          }   

         
          console.log(userAccessPostRequestDataArr);  
      }

      else{
        setSelectedCheckbox2(false);
        setRowStatesViewUnshared[row.id] = !rowStatesViewUnshared[row.id];
        setRowStatesViewUnshared({ ...rowStatesViewUnshared });
        var ownerId;
        var accessUserId;
        var permission;
      ownerIds[0]=row.ownerId
      ownerId=row.ownerId;
      accessUserIds[0]=row.unSharedUserId;
      accessUserId=row.unSharedUserId;
      var permissions=[];
      if(newStates[row.id]===true && editenableUnshared ===false){
      permissions[0]=0;
      permission=0;
      }
      else if(newStates[row.id]===false && editenableUnshared ===false){        
          permissions[0]=-1;
          permission=-1;
        } 
      else if(newStates[row.id]===true && editenableUnshared ===true){
          permissions[0]=1;
          permission=1;
          }
      if(autovalue4[row.id]!==undefined){
        sharedMouseLineIds=autovalue4[row.id].map(item => item.mouseLineId)
      }

      var userAccessPostRequestDataArr=[];
      var userAccessPostRequestDataObject = {
        ownerId: ownerId,
        accessUserId: accessUserId,
        sharedMouselineIds: sharedMouseLineIds,
        permission: permission
      };
      userAccessPostRequestDataArr=[userAccessPostRequestDataObject]
      console.log(userAccessPostRequestDataArr)
      }       
      const url=`${PermissionChanges_URL}`;
      if(editenable ===false){
      axios.post(url,{
        userAccessPostRequestDataArr:userAccessPostRequestDataArr
      }) 
         .then(response => {
          if(response){
            console.log(response);
              userAccessLoad();       

   // renderDropdown(row,index);
      }        
         })
         .catch(error => {
         console.error(error);
         })
        }
    };
    const handleViewClickDuplicate = (index,row,editMouseLinesvalue) => {
var newStates = { ...rowStatesViewDuplicate  };
newStates[row.id] = !newStates[row.id];
  //setRowStatesViewDuplicate(row.id); 
  setIsSetYesViewDuplicate(true);
  setAutoCompleteChangeDuplicate((prevAutoChanges) => ({
    ...prevAutoChanges,
    [row.id]: false,
  }));
  var ownerIds=[];
  var accessUserIds=[];
  var sharedMouseLineIds=[];

    rowStatesViewDuplicate[row.id] = !rowStatesViewDuplicate[row.id];
    setRowStatesViewDuplicate({ ...rowStatesViewDuplicate });
  ownerIds[0]=row.ownerId
  accessUserIds[0]=row.sharedUserId;
  var ownerId=row.ownerId
  var accessUserId=row.sharedUserId;
  var permission;
  var permissions=[];
  if(newStates[row.id]===true && editenableDuplicate ===false){
  permissions[0]=0;
  permission=0;
  }
  else if(newStates[row.id]===false && editenableDuplicate ===false){        
      permissions[0]=-1;
      permission=0;
    } 
  else if(newStates[row.id]===true && editenableDuplicate ===true){
      permissions[0]=1;
      permission=0;
      }
  if(autovalue3[row.id]!==undefined){
    sharedMouseLineIds=autovalue3[row.id].map(item => item.mouseLineId)
  }
  else{
    if(editMouseLinesvalue!==null && editMouseLinesvalue!==undefined && editMouseLinesvalue!==[]){
      sharedMouseLineIds=editMouseLinesvalue.map(item => item.mouseLineId)
    }
  }
  var userAccessPostRequestDataArr=[];
  var userAccessPostRequestDataObject = {
    ownerId: ownerId,
    accessUserId: accessUserId,
    sharedMouselineIds: sharedMouseLineIds,
    permission: permission
  };
  userAccessPostRequestDataArr=[userAccessPostRequestDataObject]
console.log(userAccessPostRequestDataArr)
  const url=`${PermissionChanges_URL}`;
  if(editenable ===false){
  axios.post(url,{
    userAccessPostRequestDataArr:userAccessPostRequestDataArr
  }) 
     .then(response => {
      if(response){
        console.log(response)
  }        
     })
     .catch(error => {
     console.error(error);
     })
    }
      };

  const handleEditClick = (index,row,viewMouseLinesvalue) => {
    var newStates = { ...rowStatesEdit };
    newStates[row.id] = !newStates[row.id];
    //rowStatesView[row.id] = !rowStatesView[row.id];
      setRowStatesEditRow(row.id); 
      setIsSetYesEdit1(true);
      setEditEnable(!editenable);
      setAutoCompleteChange((prevAutoChanges) => ({
        ...prevAutoChanges,
        [row.id]: false,
      }));
      var ownerIds=[];
      var accessUserIds=[];
      var sharedMouseLineIds=[];
      if(selectAll1 === true){
        setSelectedCheckbox(true);
        for(let i=0;i<selectedRows1.length;i++){
          let j=selectedRows1[i].id
          newStates[j]=newStates[row.id]
        }
        setRowStatesEdit(newStates);
        ownerIds = selectedRows1.map(item => item.ownerId); 
        accessUserIds = selectedRows1.map(item => item.sharedUserId); 
        const selectedLength=selectedRows1.length
        const viewMouseLines = selectedRows1.map(item => item.viewMouseLines);
        for(var i=0;i<selectedLength;i++){
          const id=selectedRows1[i].id;
          if(autovalue2[id]!==undefined){
            sharedMouseLineIds[i]=autovalue2[id].map(item => item.mouseLineId);
                }
          else{   
            if(viewMouseLines[i]!==null){     
            sharedMouseLineIds[i]=viewMouseLines[i].map(item => item.mouseLineId);
            }
            else if(viewMouseLines[i]===null){
              sharedMouseLineIds[i]=viewMouseLines[i];
            }
          }
      }
      var permissions=[];
      if(newStates[row.id]===true){
      permissions[0]=1;
      }
      else{
        permissions[0]=0;
      }
          var userAccessPostRequestDataObject = [];
          var userAccessPostRequestDataArr=[];

          for (let i = 0; i < selectedRows1.length; i++) {
            var ownerId = ownerIds[i];
            var accessUserId = accessUserIds[i];
            var sharedMouselineId = sharedMouseLineIds[i];
            var permission = permissions[0]; 
          
            userAccessPostRequestDataObject[i] = {
              ownerId: ownerId,
              accessUserId: accessUserId, 
              sharedMouselineIds: sharedMouselineId,
              permission: permission 
            };            
            userAccessPostRequestDataArr[i]=userAccessPostRequestDataObject[i]
          }   

         
          console.log(userAccessPostRequestDataArr);  
      }

      else{
        setSelectedCheckbox(false);
        rowStatesEdit[row.id] = !rowStatesEdit[row.id];
        setRowStatesEdit({ ...rowStatesEdit });
        var ownerId;
        var accessUserId;
        var permission;
      ownerIds[0]=row.ownerId
      ownerId=row.ownerId;
      accessUserIds[0]=row.sharedUserId;
      accessUserId=row.sharedUserId;
      var permissions=[];
      if(rowStatesEdit[row.id]===true){
      permissions[0]=1;
      }
      else{
        permissions[0]=0;
      }
      if(autovalue2[row.id]!==undefined){
        sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
      }
      else{
        if(viewMouseLinesvalue!==null && viewMouseLinesvalue!==undefined && viewMouseLinesvalue!==[]){
          sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
        }
      }
      var userAccessPostRequestDataArr=[];
      var userAccessPostRequestDataObject = {
        ownerId: ownerId,
        accessUserId: accessUserId,
        sharedMouselineIds: sharedMouseLineIds,
        permission: permission
      };
      userAccessPostRequestDataArr=[userAccessPostRequestDataObject]
      console.log(userAccessPostRequestDataArr)
      } 
      const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        ownerIds:ownerIds,
        accessUserIds:accessUserIds,
        sharedMouselineIds:sharedMouseLineIds,
        permissions:permissions
      }) 
         .then(response => {
          if(response){
            console.log(response)
      }
        
         })
         .catch(error => {
         console.error(error);
         })
  };

  const handleEditClickUnshared = (index,row) => {
    var newStates = { ...rowStatesEditUnshared };
    newStates[row.id] = !newStates[row.id];
      setRowStatesEditUnshared(row.id); 
      setIsSetYesEditUnshared(true);
      setEditEnableUnshared(!editenableUnshared);
      setAutoCompleteChangeUnshare((prevAutoChanges) => ({
        ...prevAutoChanges,
        [row.id]: false,
      }));
      var ownerIds=[];
      var accessUserIds=[];
      var sharedMouseLineIds=[];
      if(selectAll2 === true){
        setSelectedCheckbox2(true);
        for(let i=0;i<selectedRows2.length;i++){
          let j=selectedRows2[i].id
          newStates[j]=newStates[row.id]
        }
        setRowStatesEditUnshared(newStates);
        ownerIds = selectedRows2.map(item => item.ownerId); 
        accessUserIds = selectedRows2.map(item => item.unSharedUserId); 
        const selectedLength=selectedRows2.length
        for(var i=0;i<selectedLength;i++){
          const id=selectedRows2[i].id;
          if(autovalue4[id]!==undefined){
            sharedMouseLineIds[i]=autovalue4[id].map(item => item.mouseLineId);
                }

      }
      var permissions=[];
      if(newStates[row.id]===true){
      permissions[0]=1;
      }
      else{
        permissions[0]=0;
      }
          var userAccessPostRequestDataObject = [];
          var userAccessPostRequestDataArr=[];

          for (let i = 0; i < selectedRows2.length; i++) {
            var ownerId = ownerIds[i];
            var accessUserId = accessUserIds[i];
            var sharedMouselineId = sharedMouseLineIds[i];
            var permission = permissions[0]; 
          
            userAccessPostRequestDataObject[i] = {
              ownerId: ownerId,
              accessUserId: accessUserId, 
              sharedMouselineIds: sharedMouselineId,
              permission: permission 
            };            
            userAccessPostRequestDataArr[i]=userAccessPostRequestDataObject[i]
          }   

         
          console.log(userAccessPostRequestDataArr);  
      }

      else{
        setSelectedCheckbox2(false);
        rowStatesEditUnshared[row.id] = !rowStatesEditUnshared[row.id];
        setRowStatesEditUnshared({ ...rowStatesEdit });
        var ownerId;
        var accessUserId;
        var permission;
      ownerIds[0]=row.ownerId
      ownerId=row.ownerId;
      accessUserIds[0]=row.unSharedUserId;
      accessUserId=row.unSharedUserId;
      var permissions=[];
      if(rowStatesEditUnshared[row.id]===true){
      permissions[0]=1;
      permission=1;
      }
      else{
        permissions[0]=0;
        permission=0;
      }
      if(autovalue4[row.id]!==undefined){
        sharedMouseLineIds=autovalue4[row.id].map(item => item.mouseLineId)
      }

      var userAccessPostRequestDataArr=[];
      var userAccessPostRequestDataObject = {
        ownerId: ownerId,
        accessUserId: accessUserId,
        sharedMouselineIds: sharedMouseLineIds,
        permission: permission
      };
      userAccessPostRequestDataArr=[userAccessPostRequestDataObject]
      console.log(userAccessPostRequestDataArr)
      } 
      const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        userAccessPostRequestDataArr:userAccessPostRequestDataArr
      }) 
         .then(response => {
          if(response){
            console.log(response)
            userAccessLoad();
      }
        
         })
         .catch(error => {
         console.error(error);
         })

  };
  const handleEditClickDuplicate = (index,row,editMouseLinesvalue) => {
    var newStates = { ...rowStatesEditDuplicate };
    newStates[row.id] = !newStates[row.id];
    //rowStatesView[row.id] = !rowStatesView[row.id];
      //setRowStatesEditRow(row.id); 
      setIsSetYesEditDuplicate(true);
      setEditEnableDuplicate(!editenableDuplicate);
      setAutoCompleteChangeDuplicate((prevAutoChanges) => ({
        ...prevAutoChanges,
        [row.id]: false,
      }));
      var ownerIds=[];
      var accessUserIds=[];
      var sharedMouseLineIds=[];

        rowStatesEditDuplicate[row.id] = !rowStatesEditDuplicate[row.id];
        setRowStatesEditDuplicate({ ...rowStatesEditDuplicate });
        var ownerId;
        var accessUserId;
        var permission;
        ownerIds[0]=row.ownerId
        ownerId=row.ownerId;
        accessUserIds[0]=row.sharedUserId;
        accessUserId=row.sharedUserId;
       var permissions=[];
      if(rowStatesEditDuplicate[row.id]===true){
      permissions[0]=1;
      permission=1;
      }
      else{
        permissions[0]=0;
        permission=0;
      }
      if(autovalue3[row.id]!==undefined){
        sharedMouseLineIds=autovalue3[row.id].map(item => item.mouseLineId)
      }
      else{
        if(editMouseLinesvalue!==null){
          sharedMouseLineIds=editMouseLinesvalue.map(item => item.mouseLineId)
        }
      }
      
      var userAccessPostRequestDataArr=[];
      var userAccessPostRequestDataObject = {
        ownerId: ownerId,
        accessUserId: accessUserId,
        sharedMouselineIds: sharedMouseLineIds,
        permission: permission
      };
      userAccessPostRequestDataArr=[userAccessPostRequestDataObject]
      console.log(userAccessPostRequestDataArr) 

      const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        userAccessPostRequestDataArr:userAccessPostRequestDataArr
      }) 
         .then(response => {
          if(response){
            console.log(response)
      }
        
         })
         .catch(error => {
         console.error(error);
         })
  };
  const handleCreateClick = (index,row,viewMouseLinesvalue) => {
     const newStates = { ...rowStatesCreate };
    newStates[row.id] = !newStates[row.id];
    setRowStatesCreate(newStates);
      setRowStatesCreateRow(row.id); 
    setIsSetYesCreate(true);
    var ownerIds=[];
    var accessUserIds=[];
    var sharedMouseLineIds=[];
    if(selectAll1 === true){
      setSelectedCheckbox(true);
     // newStates = [...rowStates].fill(newStates[row.id]);
      for(let i=0;i<selectedRows1.length;i++){
        let j=selectedRows1[i].id
        newStates[j]=newStates[row.id]
      }
      setRowStatesCreate(newStates);
      ownerIds = selectedRows1.map(item => item.ownerId); 
      accessUserIds = selectedRows1.map(item => item.sharedUserId); 
     const selectedLength=selectedRows1.length
      const viewMouseLines = selectedRows1.map(item => item.viewMouseLines);
    /*  for(var i=0;i<selectedLength;i++){
        const id=selectedRows1[i].id;
        
      if(autovalue2[id]!==undefined){
        sharedMouseLineIds[i]=autovalue2[id];
            }
      else{        
        sharedMouseLineIds[i]=viewMouseLines[i];
      }
    }*/
     var permissions=[];
    if(newStates[row.id]===true){
    permissions[0]=2;
    }
    else{
      permissions[0]=-2;
    }
}
    else{
      setSelectedCheckbox(false);
      rowStatesCreate[row.id] = !rowStatesCreate[row.id];
      setRowStatesCreate({ ...rowStatesCreate });
    ownerIds[0]=row.ownerId
    accessUserIds[0]=row.sharedUserId;
     var permissions=[];
    if(rowStatesCreate[row.id]===true){
    permissions[0]=2;
    }
    else{
      permissions[0]=-2;
    }
 /*  if(autovalue2[row.id]!==undefined){
      sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
    }
    else{
      if(viewMouseLinesvalue!==null){
        sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
      }
    }*/
    }
      console.log(ownerIds)
      console.log( accessUserIds)
      console.log( sharedMouseLineIds)
      console.log(permissions);
const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        ownerIds:ownerIds,
        accessUserIds:accessUserIds,
        sharedMouselineIds:sharedMouseLineIds,
        permissions:permissions
      }) 
         .then(response => {
          if(response){
            console.log(response)
      }
        
         })
         .catch(error => {
         console.error(error);
         })
  };
  const handleCreateClickUnshared = (index,row) => {
    const newStates = { ...rowStatesCreateUnshared };
    newStates[row.id] = !newStates[row.id];
    setRowStatesCreateUnshared(newStates);
      setRowStatesCreateRow(row.id); 
    setIsSetYesCreateUnshared(true);
    var ownerIds=[];
    var accessUserIds=[];
    var sharedMouseLineIds=[];
    if(selectAll2 === true){
      setSelectedCheckbox2(true);
      for(let i=0;i<selectedRows2.length;i++){
        let j=selectedRows2[i].id
        newStates[j]=newStates[row.id]
      }
      setRowStatesCreateUnshared(newStates);
      ownerIds = selectedRows2.map(item => item.ownerId); 
      accessUserIds = selectedRows2.map(item => item.unSharedUserId); 
     const selectedLength=selectedRows2.length
     var permissions=[];
    if(newStates[row.id]===true){
    permissions[0]=2;
    }
    else{
      permissions[0]=-2;
    }
}
    else{
      setSelectedCheckbox2(false);
      rowStatesCreateUnshared[row.id] = !rowStatesCreateUnshared[row.id];
      setRowStatesCreateUnshared({ ...rowStatesCreateUnshared });
    ownerIds[0]=row.ownerId
    accessUserIds[0]=row.unSharedUserId;
     var permissions=[];
    if(rowStatesCreateUnshared[row.id]===true){
    permissions[0]=2;
    }
    else{
      permissions[0]=-2;
    }
    }
      console.log(ownerIds)
      console.log( accessUserIds)
      console.log( sharedMouseLineIds)
      console.log(permissions);
const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        ownerIds:ownerIds,
        accessUserIds:accessUserIds,
        sharedMouselineIds:sharedMouseLineIds,
        permissions:permissions
      }) 
         .then(response => {
          if(response){
            console.log(response)
			userAccessLoad();
      }
        
         })
         .catch(error => {
         console.error(error);
         })
 };
 const handleCreateClickDuplicate = (index,row) => {
  const newStates = { ...rowStatesCreateDuplicate };
  newStates[row.id] = !newStates[row.id];
  setRowStatesCreateDuplicate(newStates);
    //setRowStatesCreateRow(row.id); 
  setIsSetYesCreateDuplicate(true);
  var ownerIds=[];
  var accessUserIds=[];
  var sharedMouseLineIds=[];


    rowStatesCreateDuplicate[row.id] = !rowStatesCreateDuplicate[row.id];
    setRowStatesCreateDuplicate({ ...rowStatesCreateDuplicate });
  ownerIds[0]=row.ownerId
  accessUserIds[0]=row.sharedUserId;
   var permissions=[];
  if(rowStatesCreateDuplicate[row.id]===true){
  permissions[0]=2;
  }
  else{
    permissions[0]=-2;
  }
/*  if(autovalue2[row.id]!==undefined){
    sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
  }
  else{
    if(viewMouseLinesvalue!==null){
      sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
    }
  }*/
  
    console.log(ownerIds)
    console.log( accessUserIds)
    console.log( sharedMouseLineIds)
    console.log(permissions);
const url=`${PermissionChanges_URL}`;
    axios.post(url,{
      ownerIds:ownerIds,
      accessUserIds:accessUserIds,
      sharedMouselineIds:sharedMouseLineIds,
      permissions:permissions
    }) 
       .then(response => {
        if(response){
          console.log(response)
    }
      
       })
       .catch(error => {
       console.error(error);
       })
};
  const handleTransferClick = (index,row,viewMouseLinesvalue) => {
    const newStates = { ...rowStatesTransfer };
    newStates[row.id] = !newStates[row.id];
    setRowStatesTransfer(newStates);
      setRowStatesTransferRow(row.id); 
    setIsSetYesTransfer(true);
    var ownerIds=[];
    var accessUserIds=[];
    var sharedMouseLineIds=[];
    if(selectAll1 === true){
      setSelectedCheckbox(true);
     // newStates = [...rowStates].fill(newStates[row.id]);
      for(let i=0;i<selectedRows1.length;i++){
        let j=selectedRows1[i].id
        newStates[j]=newStates[row.id]
      }
      setRowStatesTransfer(newStates); 
      ownerIds = selectedRows1.map(item => item.ownerId); 
      accessUserIds = selectedRows1.map(item => item.sharedUserId); 
      const selectedLength=selectedRows1.length
      const viewMouseLines = selectedRows1.map(item => item.viewMouseLines);
   /*   for(var i=0;i<selectedLength;i++){
        const id=selectedRows1[i].id;
        
      if(autovalue2[id]!==undefined){
        sharedMouseLineIds[i]=autovalue2[id].mouselinesId;
            }
      else{        
        sharedMouseLineIds[i]=viewMouseLines[i].mouselinesId;
      }
    }*/
     var permissions=[];
    if(newStates[row.id]===true){
    permissions[0]=3;
    }
    else{
      permissions[0]=2;
    }
}
    else{
      setSelectedCheckbox(false);
      rowStatesTransfer[row.id] = !rowStatesTransfer[row.id];
      setRowStatesTransfer({ ...rowStatesTransfer });
    ownerIds[0]=row.ownerId
    accessUserIds[0]=row.sharedUserId;
     var permissions=[];
    if(rowStatesTransfer[row.id]===true){
    permissions[0]=1;
    }
    else{
      permissions[0]=0;
    }
  /*  if(autovalue2[row.id]!==undefined){
      sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
    }
    else{
      if(viewMouseLinesvalue!==null){
        sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
      }
    }*/
    }
      console.log(ownerIds)
      console.log( accessUserIds)
      console.log( sharedMouseLineIds)
      console.log(permissions);
const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        ownerIds:ownerIds,
        accessUserIds:accessUserIds,
        sharedMouselineIds:sharedMouseLineIds,
        permissions:permissions
      }) 
         .then(response => {
          if(response){
            console.log(response)
      }
        
         })
         .catch(error => {
         console.error(error);
         })
  };
  const handleTransferClickUnshared = (index,row) => {
    const newStates = { ...rowStatesTransferUnshared };
    newStates[row.id] = !newStates[row.id];
    setRowStatesTransferUnshared(newStates);
      setRowStatesTransferRow(row.id); 
    setIsSetYesTransferUnshared(true);
    var ownerIds=[];
    var accessUserIds=[];
    var sharedMouseLineIds=[];
    if(selectAll2 === true){
      setSelectedCheckbox2(true);
      for(let i=0;i<selectedRows2.length;i++){
        let j=selectedRows2[i].id
        newStates[j]=newStates[row.id]
      }
      setRowStatesTransferUnshared(newStates);
      ownerIds = selectedRows2.map(item => item.ownerId); 
      accessUserIds = selectedRows2.map(item => item.unSharedUserId); 
      const selectedLength=selectedRows1.length
   /*   for(var i=0;i<selectedLength;i++){
        const id=selectedRows1[i].id;
        
      if(autovalue2[id]!==undefined){
        sharedMouseLineIds[i]=autovalue2[id].mouselinesId;
            }
      else{        
        sharedMouseLineIds[i]=viewMouseLines[i].mouselinesId;
      }
    }*/
     var permissions=[];
    if(newStates[row.id]===true){
    permissions[0]=3;
    }
    else{
      permissions[0]=2;
    }
}
    else{
      setSelectedCheckbox2(false);
      rowStatesTransferUnshared[row.id] = !rowStatesTransferUnshared[row.id];
      setRowStatesTransferUnshared({ ...rowStatesTransferUnshared });
    ownerIds[0]=row.ownerId
    accessUserIds[0]=row.unSharedUserId;
     var permissions=[];
    if(rowStatesTransferUnshared[row.id]===true){
    permissions[0]=1;
    }
    else{
      permissions[0]=0;
    }
  /*  if(autovalue2[row.id]!==undefined){
      sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
    }
    else{
      if(viewMouseLinesvalue!==null){
        sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
      }
    }*/
    }
      console.log(ownerIds)
      console.log( accessUserIds)
      console.log( sharedMouseLineIds)
      console.log(permissions);
const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        ownerIds:ownerIds,
        accessUserIds:accessUserIds,
        sharedMouselineIds:sharedMouseLineIds,
        permissions:permissions
      }) 
         .then(response => {
          if(response){
            console.log(response)
			userAccessLoad();
      }
        
         })
         .catch(error => {
         console.error(error);
         })
  };
  const handleTransferClickDuplicate = (index,row) => {
    const newStates = { ...rowStatesTransferDuplicate };
    newStates[row.id] = !newStates[row.id];
    setRowStatesTransferDuplicate(newStates);
     // setRowStatesTransferRow(row.id); 
    setIsSetYesTransferDuplicate(true);
    var ownerIds=[];
    var accessUserIds=[];
    var sharedMouseLineIds=[];


      rowStatesTransferDuplicate[row.id] = !rowStatesTransferDuplicate[row.id];
      setRowStatesTransferDuplicate({ ...rowStatesTransferDuplicate });
    ownerIds[0]=row.ownerId
    accessUserIds[0]=row.sharedUserId;
     var permissions=[];
    if(rowStatesTransferDuplicate[row.id]===true){
    permissions[0]=1;
    }
    else{
      permissions[0]=0;
    }
  /*  if(autovalue2[row.id]!==undefined){
      sharedMouseLineIds=autovalue2[row.id].map(item => item.mouseLineId)
    }
    else{
      if(viewMouseLinesvalue!==null){
        sharedMouseLineIds=viewMouseLinesvalue.map(item => item.mouseLineId)
      }
    }*/
    
      console.log(ownerIds)
      console.log( accessUserIds)
      console.log( sharedMouseLineIds)
      console.log(permissions);
const url=`${PermissionChanges_URL}`;
      axios.post(url,{
        ownerIds:ownerIds,
        accessUserIds:accessUserIds,
        sharedMouselineIds:sharedMouseLineIds,
        permissions:permissions
      }) 
         .then(response => {
          if(response){
            console.log(response)
      }
        
         })
         .catch(error => {
         console.error(error);
         })
  };
  
  const [selectedOptionsauto2, setSelectedOptionsauto2] = useState()
  const [autovalue2, setAutovalue2] = useState([]);
  const[valuetest,setValueTest]=useState([]);
  const [pageauto2, setPageauto2] = useState(0);
  const [curPage2, setCurPage2] = useState(1);
  const [endindex,setEndindex]=useState(2);
  const[viewMouseLinesvalueAuto,setViewMouseLinesvalueAuto]=useState([])
  const columns2 = [
    {
   name: 'Access User',
   selector: row => row.sharedUserName,
   sortable: true,  
   width: '100px', 
 },
 {
  name: "Textbox",
  cell: (row, index) => {
    const rowId = row.data ? row.data.id : row.id;
    const indexmouseline = options.findIndex((element) => element.ownerId === (row.data ? row.data.ownerId : row.ownerId));
    const indexviewmouseline = data2duplicate.findIndex((element) => element.id === rowId);
    const optionsmouselines = options[indexmouseline].mouselines;
    const viewmouselines = (indexviewmouseline !== -1 && data2duplicate[indexviewmouseline].viewMouseLines) || [];
    const editmouselines = (indexviewmouseline !== -1 && data2duplicate[indexviewmouseline].editMouseLines) || [];

   /* const textboxValue = textboxValues[rowId] ? textboxValues[rowId][index] : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOptions = textboxValue.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(textboxValue.length / itemsPerPage);*/

    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === rowId);
    const sharedUserId = data2[indexshared].sharedUsersList[indexrow].sharedUserId;
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    const editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    //setViewMouselines(viewMouseLinesvalue)
    var viewMouseLines=[];
    if((viewMouseLinesvalue !== null)){
  
      if(viewMouseLinesvalue.length!==0){
        console.log("if")
     viewMouseLines = (viewMouseLinesvalue.map(({ mouseLineId, mouseLineName }) => ({
      id: "viewmouse" + mouseLineId,
      sharedUserId,
      mouseLineId,
      mouseLineName,
    })))
  }
   }
   if((editMouseLinesvalue !== null)){   
      if((viewMouseLinesvalue !== null)){
      if(viewMouseLinesvalue.length===0 && editMouseLinesvalue.length!==0){
        console.log("else")
    viewMouseLines = (editMouseLinesvalue.map(({ mouseLineId, mouseLineName }) => ({
      id: "editmouse" + mouseLineId,
      sharedUserId,
      mouseLineId,
      mouseLineName,
    })));
  }
  } 
  else{
    viewMouseLines = (editMouseLinesvalue.map(({ mouseLineId, mouseLineName }) => ({
      id: "editmouse" + mouseLineId,
      sharedUserId,
      mouseLineId,
      mouseLineName,
    })));
  }
  }

console.log(viewMouseLinesvalue)
console.log(editMouseLinesvalue)
console.log(viewMouseLines)
console.log((editMouseLinesvalue !== [] && editMouseLinesvalue !== null))
    var indexOfLastItem="";
  var indexOfFirstItem="";
  var currentOptions="";
  var totalPages=1;
  var viewMouseLinesvalueauto=[];
  indexOfLastItem = page * itemsPerPage;
  indexOfFirstItem = indexOfLastItem - itemsPerPage;
 // currentOptions = autovalue2[rowId].slice(indexOfFirstItem, indexOfLastItem);
 const indexsharedauto = data2.findIndex((element) => element.ownerId === row.ownerId);
 const indexrowauto = data2[indexsharedauto].sharedUsersList.findIndex((element) => element.id === rowId);
 //const sharedUserIdauto = data2[indexsharedauto].sharedUsersList[indexrowauto].sharedUserId;
  viewMouseLinesvalueauto[rowId] = data2[indexsharedauto].sharedUsersList[indexrowauto].viewMouseLines;
 if(autovalue2[rowId]!==undefined){
  totalPages = Math.ceil(autovalue2[rowId].length / itemsPerPage);
 }
 else if(viewMouseLinesvalueauto[rowId]!==null){
  totalPages = Math.ceil(viewMouseLinesvalueauto[rowId].length / itemsPerPage);
 }


  
  const handlePageChangeauto2 = (index,row) => {

      setCurPage2(curPage2+1);
    const startIndex = (pageauto2 * itemsPerPage)+2;
    const endIndex = startIndex + itemsPerPage;
    setEndindex(endIndex)
   // setEndindex(endIndex)
    if(valuetest!==[]){
      if (startIndex < 0 || endIndex >= valuetest.length || startIndex >= endIndex) {
    
      }
  
      const elementsToMove = valuetest.slice(startIndex, endIndex+1);
      const newArray = valuetest.slice(); // Create a copy of the array to avoid direct mutation
  
      // Remove the elements from the original positions
      newArray.splice(startIndex, elementsToMove.length);
  
      // Insert the elements at positions 0 and 1
      newArray.splice(0, 0, ...elementsToMove);
  
      // Update the state with the new array
      setSelectedOptionsauto2((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [row.id]: newArray,
      }));
      console.log(newArray)
   /* setSelectedOptionsauto2((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: valuetest.slice(startIndex, endIndex),
    }));*/
  }
  else if (viewMouseLinesvalueauto[rowId] !=null){
    if (startIndex < 0 || endIndex >= viewMouseLinesvalueauto[rowId].length || startIndex >= endIndex) {
    
    }

    const elementsToMove = viewMouseLinesvalueauto[rowId].slice(startIndex, endIndex + 1);
    const newArray = viewMouseLinesvalueauto[rowId].slice(); // Create a copy of the array to avoid direct mutation

    // Remove the elements from the original positions
    newArray.splice(startIndex, elementsToMove.length);

    // Insert the elements at positions 0 and 1
    newArray.splice(0, 0, ...elementsToMove);

    // Update the state with the new array
    setSelectedOptionsauto2((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: newArray,
    }));

 /*   setSelectedOptionsauto2((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: viewMouseLinesvalueauto.slice(startIndex, endIndex),
    }));*/
  }
    setPageauto2((prevPage) => prevPage + 1);
  };
  
  const handlePageChangeminus2 = (index,row) => {

    setCurPage2(curPage2-1);
    const startIndex = pageauto2 * itemsPerPage;
    const endIndex = startIndex - itemsPerPage;
    setEndindex(startIndex)
    if(valuetest!==[]){
      if (endIndex < 0 || startIndex >= valuetest.length || endIndex >= startIndex) {
    
      }
  
      const elementsToMove = valuetest.slice(endIndex, startIndex + 1);
      const newArray = valuetest.slice(); // Create a copy of the array to avoid direct mutation
  
      // Remove the elements from the original positions
      newArray.splice(endIndex, elementsToMove.length);
  
      // Insert the elements at positions 0 and 1
      newArray.splice(0, 0, ...elementsToMove);    
      setSelectedOptionsauto2((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [row.id]: newArray,
      }));  
      
   /* setSelectedOptionsauto2((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: valuetest.slice(endIndex, startIndex),
    }));*/
  }
  else if (viewMouseLinesvalueauto[rowId] !=null){
    if (endIndex < 0 || startIndex >= viewMouseLinesvalueauto[rowId].length || endIndex >= startIndex) {
    
    }

    const elementsToMove = viewMouseLinesvalueauto[rowId].slice(endIndex, startIndex + 1);
    const newArray = viewMouseLinesvalueauto[rowId].slice(); // Create a copy of the array to avoid direct mutation

    // Remove the elements from the original positions
    newArray.splice(endIndex, elementsToMove.length);

    // Insert the elements at positions 0 and 1
    newArray.splice(0, 0, ...elementsToMove);

    // Update the state with the new array
    setSelectedOptionsauto2((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: newArray,
    }));
  /*  setSelectedOptionsauto2((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: viewMouseLinesvalueauto.slice(endIndex, startIndex),
    }));*/
  }
    setPageauto2((prevPage) => prevPage - 1);
  };


    const handleOptionChange2 = (event, values, rowId) => { 
      setActiveRow(row)
      var selectedAllMouselines;
      var selectedOtherOption;

      if(valuetest.length !==0){
      selectedAllMouselines = valuetest.some((option) => option.mouseLineId === -1);
     selectedOtherOption = values.some((option) => option.mouseLineId === -1);
      }
      else{
        selectedAllMouselines = viewMouseLines.some((option) => option.mouseLineId === -1);
        selectedOtherOption = values.some((option) => option.mouseLineId === -1);
      }
     if (selectedOtherOption && selectedAllMouselines)  {
        values = values.filter((option) => option.mouseLineId !== -1);
      }
      else if (selectedOtherOption && !selectedAllMouselines) {
        values = values.filter((option) => option.mouseLineId === -1);
      }
      setAutoCompleteChange((prevAutoChanges) => ({
        ...prevAutoChanges,
        [rowId]: true,
      }));
      setSelectedOptionsauto2((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [rowId]: values,
      }));
      setAutovalue2((prevAutoValues) => ({
        ...prevAutoValues,
        [rowId]: values,
      }));
      setValueTest(values);
    };

    return (
      <div>
        <Stack spacing={2} sx={{ width: 200 }}>
          <Autocomplete
            multiple
            id={`checkboxes-tags-demo-${rowId}`}
            options={optionsmouselines}
            disableCloseOnSelect
            getOptionLabel={(optionsmouselines) => optionsmouselines?.mouseLineName}
            value={selectedOptionsauto2?.[rowId] || viewMouseLines}
            isOptionEqualToValue={(option, value) =>
              option.mouseLineName === value.mouseLineName && option.mouseLineId === value.mouseLineId
            }
            onChange={(event, values) => handleOptionChange2(event, values, rowId)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option?.mouseLineName}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Mouseline" placeholder="Search" />
            )}
          />
        </Stack>

        <div className="buttons-container">
          <button
            className="plusbutton"
            onClick={() => handlePageChangeauto2(index, row)}
            disabled={curPage2 === totalPages}
          >
            <span className="plusbuttonlabel">+</span>
          </button>
          <button
            className="minusbutton"
            onClick={() => handlePageChangeminus2(index, row)}
            disabled={curPage2 === 1 }
          >
            <span className="plusbuttonlabel">-</span>
          </button>
          {autovalue2[rowId]!==undefined && (activeRowIndex !== index)  ?
           <span className='recordcount'>{Math.min(endindex,autovalue2[rowId].length)}/{autovalue2[rowId].length}</span>
          :
          <div>
          {viewMouseLinesvalueauto[rowId] !== null && (activeRowIndex !== index)?
          <span className='recordcount'>{Math.min(endindex,viewMouseLinesvalueauto[rowId].length)}/{viewMouseLinesvalueauto[rowId].length}</span>:
          <span className='recordcount'>0/0</span>}
          </div>
          }
        </div>
      </div>
    );
  },
},

{
  name: "View",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    var viewMouseLinesvalue=[];
    var editMouseLinesvalue=[];
    viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    setMouselineDefault(viewMouseLinesvalue);
    console.log(viewMouseLinesvalue)
    console.log(editMouseLinesvalue)
    console.log("view")
    if(isSetYesView1===false && (viewMouseLinesvalue!==null)&& indexrow===index){
      if(viewMouseLinesvalue.length!==0)  { 
        console.log("if")    
    rowStatesView[row.id]=true;
      }
    }
    if(isSetYesView1===false && (editMouseLinesvalue!==null) && indexrow===index){   
      if((viewMouseLinesvalue !== null)){   
        if(viewMouseLinesvalue.length===0 && editMouseLinesvalue.length!==0){    
        console.log("else")  
    rowStatesView[row.id]=true;
   setEditEnable(true);
   rowStatesEdit[row.id]=true; 
        }
      }
      else{
        console.log("else")  
        rowStatesView[row.id]=true;
       setEditEnable(true);
       rowStatesEdit[row.id]=true; 
      }     
    }
    if(autoCompleteChange[row.id]===true && indexrow===index){
      rowStatesView[row.id]=false;
    }
      return ( 
        <div className="buttons-View"> 
        {editenable ===false ?
    <button className={(rowStatesView[row.id]) ?"viewenable":"viewdisable"} onClick={() =>handleViewClick(index,row,viewMouseLinesvalue)}>
             {(rowStatesView[row.id]) ? 
             <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>:
            <div>
            {isSetYesView1 === true  ?
             <button className={((rowStatesEdit[row.id] && editenable===true) || (rowStatesView[row.id]) ) ?"viewenable":"viewdisable"} onClick={() =>handleViewClick(index,row)}>
             {((rowStatesEdit[row.id] && editenable===true) || (rowStatesView[row.id]) ) ? <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>:
            <button className={((rowStatesEdit[row.id] && editenable===true) || (rowStatesView[row.id]) ) ?"viewenable":"viewdisable"} onClick={() =>handleViewClick(index,row)}>
            {((rowStatesEdit[row.id] && editenable===true) || (rowStatesView[row.id]) ) ? <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>
           }
            </div>}
           </div>

      );
     }
},
{
  name: "Edit",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    const editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    setMouselineDefault(viewMouseLinesvalue);
    if(isSetYesEdit1===false && editenable===true){
      rowStatesEdit[row.id]=true;
    }
    if(autoCompleteChange[row.id]===true && indexrow===index){
      rowStatesEdit[row.id]=false;
    }
    return (  
   
      <div className="buttons-Edit">
  <button className={(rowStatesEdit[row.id]) ?"editenable":"editdisable"} onClick={() =>handleEditClick(index,row,viewMouseLinesvalue)}>
           {(rowStatesEdit[row.id]) ?              <span className='editenablelabel'>
             <img className='editenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/editenablelogo.da24caef0f2a8196d8332a9e8e6e1ec0.svg`} alt="editenablelogo" />
             &nbsp; Edit
             </span> : <span className='editdisablelabel'>
             <img className='editdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/editdisablelogo.6786aebd64764b09aad37019edd8354b.svg`} alt="editdisablelogo" />
             &nbsp; Edit
             </span>}
          </button>
         </div>
    );
   }
},
{
  name: "Secbreak2",
  cell: (row,index) => {
    
    return (          
      <div className="secbreak2">
         </div>
    );
   }
},
{
  name: "Create",
  cell: (row,index) => {   
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    const creatorFlag = data2[indexshared].sharedUsersList[indexrow].creatorFlag;
    if(isSetYesCreate===false && (creatorFlag ===1)&& indexrow===index){         
    rowStatesCreate[row.id]=true;      
    }
    return (          
      <div className="buttons-Create">
  <button className={(rowStatesCreate[row.id] ) ?"createenable":"createdisable"} onClick={() =>handleCreateClick(index,row,viewMouseLinesvalue)}>
           {(rowStatesCreate[row.id]) ?              <span className='createenablelabel'>
             <img className='createenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/createenablelogo.ee61071c969e89f189f0cd0205b8eb7e.svg`} alt="createenablelogo" />
             &nbsp; Create
             </span> : <span className='createdisablelabel'>
              Create
             </span>}
          </button>
         </div>
    );
   }
},
{
  name: "Transfer",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    const ownerSwitchFlag = data2[indexshared].sharedUsersList[indexrow].ownerSwitchFlag;
    if(isSetYesTransfer===false && (ownerSwitchFlag ===1)&& indexrow===index){         
    rowStatesTransfer[row.id]=true;      
    }
    return (     
      <div className="buttons-Transfer">
  <button className={(rowStatesTransfer[row.id]) ?"transferenable":"transferdisable"} onClick={() =>handleTransferClick(index,row,viewMouseLinesvalue)}>
           {(rowStatesTransfer[row.id]) ?              
           <span className='transferenablelabel'>
             <img className='transferenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/transferenablelogo.7d048062fc59b5e01fd7dcb884fe687e.svg`} alt="transferenablelogo" />
             &nbsp; Transfer
             </span> : <span className='transferdisablelabel'>
	           Transfer
             </span>}
          </button>
         </div>      
    );
   }
},
{
  name: "Action",
  cell: (row,index) => {
    
    return (          
      <div className="buttons-deletesharelevel">
             <button className='deletesharelevel' onClick={()=>passshareindextopopup(index)}>
            &#8942;
          </button>
         </div>
    );
   }
},
{
  name: "Action",
  cell: (row,index) => {
    
    return (          
      <div className="buttons-deletesharelevelpopup">
        {deleteSharePopup && deleteshareindexpopup===index ?
             <button className='deletesharelevelpopup' onClick={()=>handleShareLevelDeleteClick(index,row)}>
            Delete
          </button>:null}
         </div>
    );
   }
}
]; 
const [selectedOptionsauto4, setSelectedOptionsauto4] = useState()
const [autovalue4, setAutovalue4] = useState([]);
const[valuetestunshared,setValueTestUnshared]=useState([]);
const [pageauto4, setPageauto4] = useState(0);
const [curPageUnshared, setcurPageUnshared] = useState(1);
const [endindexunshared,setEndindexunshared]=useState(2);
const columns3 = [
  {
 name: 'Access User',
 selector: 'unSharedUserName',
 sortable: true,   
},
{
  name: "Textbox",
  cell: (row,index) => {
    const rowId = row.data ? row.data.id : row.id;
    const indexmouseline = options.findIndex((element) => element.ownerId === (row.data ? row.data.ownerId : row.ownerId));
    const indexviewmouseline = data3duplicate.findIndex((element) => element.id === rowId);
    const optionsmouselines = options[indexmouseline].mouselines;
    const viewmouselines = (indexviewmouseline !== -1 && data3duplicate[indexviewmouseline].viewMouseLines) || [];
    const editmouselines = (indexviewmouseline !== -1 && data3duplicate[indexviewmouseline].editMouseLines) || [];

  /*  const textboxValue = textboxValues[rowId] ? textboxValues[rowId][index] : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOptions = textboxValue.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(textboxValue.length / itemsPerPage);*/

    var indexOfLastItem="";
    var indexOfFirstItem="";
    var currentOptions="";
    var totalPages=1;
    indexOfLastItem = page * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;

    if(autovalue4[rowId]!==undefined){
      totalPages = Math.ceil(autovalue4[rowId].length / itemsPerPage);
     }
    
    
    const handlePageChangeautounshared = (index,row) => {
          setcurPageUnshared(curPageUnshared+1);
    
        const startIndex = (pageauto4 * itemsPerPage)+2;
        const endIndex = startIndex + itemsPerPage;
        setEndindexunshared(endIndex)
        if(valuetestunshared!==[]){
          if (startIndex < 0 || endIndex >= valuetestunshared.length || startIndex >= endIndex) {
        
          }
      
          const elementsToMove = valuetestunshared.slice(startIndex, endIndex + 1);
          const newArray = valuetestunshared.slice(); // Create a copy of the array to avoid direct mutation
      
          // Remove the elements from the original positions
          newArray.splice(startIndex, elementsToMove.length);
      
          // Insert the elements at positions 0 and 1
          newArray.splice(0, 0, ...elementsToMove);
      
          // Update the state with the new array
          setSelectedOptionsauto4((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [row.id]: newArray,
          }));
    
      }
    
        setPageauto4((prevPage) => prevPage + 1);
      };
      
      const handlePageChangeminusunshared = (index,row) => {
        setcurPageUnshared(curPageUnshared-1);
        const startIndex = pageauto4 * itemsPerPage;
        const endIndex = startIndex - itemsPerPage;
        setEndindexunshared(startIndex)
        if(valuetestunshared!==[]){
          if (endIndex < 0 || startIndex >= valuetestunshared.length || endIndex >= startIndex) {
        
          }
      
          const elementsToMove = valuetestunshared.slice(endIndex, startIndex + 1);
          const newArray = valuetestunshared.slice(); // Create a copy of the array to avoid direct mutation
      
          // Remove the elements from the original positions
          newArray.splice(endIndex, elementsToMove.length);
      
          // Insert the elements at positions 0 and 1
          newArray.splice(0, 0, ...elementsToMove);
      
          // Update the state with the new array
          setSelectedOptionsauto4((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [row.id]: newArray,
          }));
    
      }
    
        setPageauto4((prevPage) => prevPage - 1);
      };
    
    
        const handleOptionChange4 = (event, values, rowId) => { 
             const selectedAllMouselines = valuetestunshared.some((option) => option.mouseLineId === -1);
          const selectedOtherOption = values.some((option) => option.mouseLineId === -1);
         if (selectedOtherOption && selectedAllMouselines)  {
            // If other options are selected, unselect all other options
            values = values.filter((option) => option.mouseLineId !== -1);
          }
          else if (selectedOtherOption && !selectedAllMouselines) {
            values = values.filter((option) => option.mouseLineId === -1);
          }
          setAutoCompleteChangeUnshare((prevAutoChanges) => ({
            ...prevAutoChanges,
            [rowId]: true,
          }));
          setSelectedOptionsauto4((prevSelectedOptions) => ({
            ...prevSelectedOptions,
            [rowId]: values,
          }));
          setAutovalue4((prevAutoValues) => ({
            ...prevAutoValues,
            [rowId]: values,
          }));
          setValueTestUnshared(values);
        };

    return (
      <div>
        <Stack spacing={2} sx={{ width: 200 }}>
          <Autocomplete
            multiple
            id={`checkboxes-tags-demo-${rowId}`}
            options={optionsmouselines}
            disableCloseOnSelect
            getOptionLabel={(optionsmouselines) => optionsmouselines?.mouseLineName}
            value={selectedOptionsauto4?.[rowId] || []}
            isOptionEqualToValue={(option, value) =>
              option.mouseLineName === value.mouseLineName && option.mouseLineId === value.mouseLineId
            }
            onChange={(event, values) => handleOptionChange4(event, values, rowId)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option?.mouseLineName}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Mouseline" placeholder="Search" />
            )}
          />
        </Stack>

        <div className="buttons-containerunshared">
          <button
            className="plusbuttonunshared"
            onClick={() => handlePageChangeautounshared(index, row)}
            disabled={curPageUnshared === totalPages}
          >
            <span className="plusbuttonlabelunshared">+</span>
          </button>
          <button
            className="minusbuttonunshared"
            onClick={() => handlePageChangeminusunshared(index, row)}
            disabled={curPageUnshared === 1 }
          >
            <span className="plusbuttonlabelunshared">-</span>
          </button>
          {autovalue4[rowId]!==undefined ?
           <span className='recordcountunshared'>{Math.min(endindexunshared,autovalue4[rowId].length)}/{autovalue4[rowId].length}</span>
          :
           <span className='recordcountunshared'>0/0</span>
          }
        </div>
      </div>
    );
  }
},
{
  name: "View",
  cell: (row,index) => {
    const indexshared = data3.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data3[indexshared].unSharedUsersList.findIndex((element) => element.id === row.id);
    if(autoCompleteChangeUnshare[row.id]===true && indexrow===index){
      rowStatesViewUnshared[row.id]=false;
    }
    return (          
      <div className="buttons-ViewUnshared">
        {editenableUnshared ===false?
    <button className={(rowStatesViewUnshared[row.id]) ?"viewenable":"viewdisable"} onClick={() =>handleViewClickUnshared(index,row)}>
             {(rowStatesViewUnshared[row.id]) ? 
             <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>:
            <div>
            {isSetYesViewUnshared === true  ?
             <button className={((rowStatesEditUnshared[row.id] && editenableUnshared===true) || (rowStatesViewUnshared[row.id]) ) ?"viewenable":"viewdisable"} onClick={() =>handleViewClickUnshared(index,row)}>
             {((rowStatesEditUnshared[row.id] && editenableUnshared===true) || (rowStatesViewUnshared[row.id]) ) ? <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>:
            <button className={((rowStatesEditUnshared[row.id] && editenableUnshared===true) || (rowStatesViewUnshared[row.id]) ) ?"viewenable":"viewdisable"} onClick={() =>handleViewClickUnshared(index,row)}>
            {((rowStatesEditUnshared[row.id] && editenableUnshared===true) || (rowStatesViewUnshared[row.id]) ) ? <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>
           }
            </div>}
         </div>
    );
   }
},
{
  name: "Edit",
  cell: (row,index) => {
    const indexshared = data3.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data3[indexshared].unSharedUsersList.findIndex((element) => element.id === row.id);
    if(autoCompleteChangeUnshare[row.id]===true && indexrow===index){
      rowStatesEditUnshared[row.id]=false;
    }
    return (          
      <div className="buttons-EditUnshared">
  <button className={(rowStatesEditUnshared[row.id]) ?"editenable":"editdisable"} onClick={() =>handleEditClickUnshared(index,row)}>
           {(rowStatesEditUnshared[row.id]) ?              <span className='editenablelabel'>
             <img className='editenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/editenablelogo.da24caef0f2a8196d8332a9e8e6e1ec0.svg`} alt="editenablelogo" />
             &nbsp; Edit
             </span> : <span className='editdisablelabel'>
             <img className='editdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/editdisablelogo.6786aebd64764b09aad37019edd8354b.svg`} alt="editdisablelogo" />
             &nbsp; Edit
             </span>}
          </button>
         </div>
    );
   }
},
{
  name: "Secbreak4",
  cell: (row,index) => {
    
    return (          
      <div className="secbreak2">
         </div>
    );
   }
},
{
  name: "Create",
  cell: (row,index) => {    
    return (          
      <div className="buttons-CreateUnshared">
<button className={(rowStatesCreateUnshared[row.id] ) ?"createenable":"createdisable"} onClick={() =>handleCreateClickUnshared(index,row)}>
           {(rowStatesCreateUnshared[row.id]) ?              <span className='createenablelabel'>
             <img className='createenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/createenablelogo.ee61071c969e89f189f0cd0205b8eb7e.svg`} alt="createenablelogo" />
             &nbsp; Create
             </span> : <span className='createdisablelabel'>
              Create
             </span>}
          </button>
         </div>
    );
   }
},
{
  name: "Transfer",
  cell: (row,index) => {
    return (     
      <div className="buttons-TransferUnshared">
  <button className={(rowStatesTransferUnshared[row.id]) ?"transferenable":"transferdisable"} onClick={() =>handleTransferClickUnshared(index,row)}>
           {(rowStatesTransferUnshared[row.id]) ?              
           <span className='transferenablelabel'>
             <img className='transferenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/transferenablelogo.7d048062fc59b5e01fd7dcb884fe687e.svg`} alt="transferenablelogo" />
             &nbsp; Transfer
             </span> : <span className='transferdisablelabel'>
	           Transfer
             </span>}
          </button>
         </div>      
    );
   }
}
];
const [selectedOptionsauto3, setSelectedOptionsauto3] = useState()
const [autovalue3, setAutovalue3] = useState([]);
const[valuetestduplicate,setValueTestDulpicate]=useState([]);
const [curPageDuplicate, setCurPageDuplicate] = useState(1);
const [endindexduplicate,setEndindexDuplicate]=useState(2);
const[editMouseLinesvalueAuto,setEditMouseLinesvalueAuto]=useState([])
const [pageauto3, setPageauto3] = useState(0);
const columns4 = [
  {
 name: 'Access User',
 selector: row => row.sharedUserName,
 sortable: true,   
},
{
  name: "Textbox",
  cell: (row, index) => {
    const rowId = row.data ? row.data.id : row.id;
    const indexmouseline = options.findIndex((element) => element.ownerId === (row.data ? row.data.ownerId : row.ownerId));
    const indexviewmouseline = data2duplicate.findIndex((element) => element.id === rowId);
    const optionsmouselines = options[indexmouseline].mouselines;
    const viewmouselines = (indexviewmouseline !== -1 && data2duplicate[indexviewmouseline].viewMouseLines) || [];
    const editmouselines = (indexviewmouseline !== -1 && data2duplicate[indexviewmouseline].editMouseLines) || [];

   /* const textboxValue = textboxValues[rowId] ? textboxValues[rowId][index] : [];
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOptions = textboxValue.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(textboxValue.length / itemsPerPage);*/

    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === rowId);
    const sharedUserId = data2[indexshared].sharedUsersList[indexrow].sharedUserId;
    const editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    const editMouseLines = (editMouseLinesvalue !== null && viewMouseLinesvalue!==null && editMouseLinesvalue.map(({ mouseLineId, mouseLineName }) => ({
      id: "editmouse" + mouseLineId,
      sharedUserId,
      mouseLineId,
      mouseLineName,
    }))) || [];

    var indexOfLastItem="";
  var indexOfFirstItem="";
  var currentOptions="";
  var totalPages=1;
  var editMouseLinesvalueauto=[];
  indexOfLastItem = page * itemsPerPage;
  indexOfFirstItem = indexOfLastItem - itemsPerPage;
 const indexsharedauto = data2.findIndex((element) => element.ownerId === row.ownerId);
 const indexrowauto = data2[indexsharedauto].sharedUsersList.findIndex((element) => element.id === rowId);
 //const sharedUserIdauto = data2[indexsharedauto].sharedUsersList[indexrowauto].sharedUserId;
  editMouseLinesvalueauto[rowId] = data2[indexsharedauto].sharedUsersList[indexrowauto].editMouseLines;
 if(autovalue3[rowId]!==undefined){
  totalPages = Math.ceil(autovalue3[rowId].length / itemsPerPage);
 }
 else if(editMouseLinesvalueauto[rowId]!==null){
  totalPages = Math.ceil(editMouseLinesvalueauto[rowId].length / itemsPerPage);
 }

  const handlePageChangeautoDuplicate = (index,row) => {
      setCurPageDuplicate(curPageDuplicate+1);
    const startIndex = (pageauto3 * itemsPerPage)+2;
    const endIndex = startIndex + itemsPerPage;
    setEndindexDuplicate(endIndex)
    if(valuetestduplicate!==[]){
      if (startIndex < 0 || endIndex >= valuetestduplicate.length || startIndex >= endIndex) {
    
      }
  
      const elementsToMove = valuetestduplicate.slice(startIndex, endIndex + 1);
      const newArray = valuetestduplicate.slice(); // Create a copy of the array to avoid direct mutation
  
      // Remove the elements from the original positions
      newArray.splice(startIndex, elementsToMove.length);
  
      // Insert the elements at positions 0 and 1
      newArray.splice(0, 0, ...elementsToMove);
  
      // Update the state with the new array
      setSelectedOptionsauto3((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [row.id]: newArray,
      }));
  }
  else if (editMouseLinesvalueauto[rowId] !=null){
    if (startIndex < 0 || endIndex >= editMouseLinesvalueauto[rowId].length || startIndex >= endIndex) {
    
    }

    const elementsToMove = editMouseLinesvalueauto[rowId].slice(startIndex, endIndex + 1);
    const newArray = editMouseLinesvalueauto[rowId].slice(); // Create a copy of the array to avoid direct mutation

    // Remove the elements from the original positions
    newArray.splice(startIndex, elementsToMove.length);

    // Insert the elements at positions 0 and 1
    newArray.splice(0, 0, ...elementsToMove);

    // Update the state with the new array
    setSelectedOptionsauto3((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: newArray,
    }));

  }
    setPageauto3((prevPage) => prevPage + 1);
  };
  
  const handlePageChangeminusDuplicate = (index,row) => {
    setCurPageDuplicate(curPageDuplicate-1);
    const startIndex = pageauto3 * itemsPerPage;
    const endIndex = startIndex - itemsPerPage;
    setEndindexDuplicate(startIndex)
    if(valuetestduplicate!==[]){
      if (endIndex < 0 || startIndex >= valuetestduplicate.length || endIndex >= startIndex) {
    
      }
  
      const elementsToMove = valuetestduplicate.slice(endIndex, startIndex + 1);
      const newArray = valuetestduplicate.slice(); // Create a copy of the array to avoid direct mutation
  
      // Remove the elements from the original positions
      newArray.splice(endIndex, elementsToMove.length);
  
      // Insert the elements at positions 0 and 1
      newArray.splice(0, 0, ...elementsToMove);
  
      // Update the state with the new array
      setSelectedOptionsauto3((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [row.id]: newArray,
      }));
  }
  else if (editMouseLinesvalueauto[rowId] !=null){
    if (endIndex < 0 || startIndex >= editMouseLinesvalueauto[rowId].length || endIndex >= startIndex) {
    
    }

    const elementsToMove = editMouseLinesvalueauto[rowId].slice(endIndex, startIndex + 1);
    const newArray = editMouseLinesvalueauto[rowId].slice(); // Create a copy of the array to avoid direct mutation

    // Remove the elements from the original positions
    newArray.splice(endIndex, elementsToMove.length);

    // Insert the elements at positions 0 and 1
    newArray.splice(0, 0, ...elementsToMove);

    // Update the state with the new array
    setSelectedOptionsauto3((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [row.id]: newArray,
    }));

  }
    setPageauto3((prevPage) => prevPage - 1);
  };


    const handleOptionChange3 = (event, values, rowId) => { 
      var selectedAllMouselines;
      var selectedOtherOption;

      if(valuetest.length !==0){
      selectedAllMouselines = valuetestduplicate.some((option) => option.mouseLineId === -1);
     selectedOtherOption = values.some((option) => option.mouseLineId === -1);
      }
      else{
        selectedAllMouselines = editMouseLines.some((option) => option.mouseLineId === -1);
        selectedOtherOption = values.some((option) => option.mouseLineId === -1);
      }

     if (selectedOtherOption && selectedAllMouselines)  {
        // If other options are selected, unselect all other options
        values = values.filter((option) => option.mouseLineId !== -1);
      }
      else if (selectedOtherOption && !selectedAllMouselines) {
        values = values.filter((option) => option.mouseLineId === -1);
      }
      setAutoCompleteChangeDuplicate((prevAutoChanges) => ({
        ...prevAutoChanges,
        [rowId]: true,
      }));
      setSelectedOptionsauto3((prevSelectedOptions) => ({
        ...prevSelectedOptions,
        [rowId]: values,
      }));
      setAutovalue3((prevAutoValues) => ({
        ...prevAutoValues,
        [rowId]: values,
      }));
      setValueTestDulpicate(values);
    };

    return (
      <div>
        <Stack spacing={2} sx={{ width: 200 }}>
          <Autocomplete
            multiple
            id={`checkboxes-tags-demo-${rowId}`}
            options={optionsmouselines}
            disableCloseOnSelect
            getOptionLabel={(optionsmouselines) => optionsmouselines?.mouseLineName}
            value={selectedOptionsauto3?.[rowId] || editMouseLines}
            isOptionEqualToValue={(option, value) =>
              option.mouseLineName === value.mouseLineName && option.mouseLineId === value.mouseLineId
            }
            onChange={(event, values) => handleOptionChange3(event, values, rowId)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option?.mouseLineName}
              </li>
            )}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Mouseline" placeholder="Search" />
            )}
          />
        </Stack>

        <div className="buttons-containerduplicate">
          <button
            className="plusbuttonduplicate"
            onClick={() => handlePageChangeautoDuplicate(index, row)}
            disabled={curPageDuplicate === totalPages}
          >
            <span className="plusbuttonlabelduplicate">+</span>
          </button>
          <button
            className="minusbuttonduplicate"
            onClick={() => handlePageChangeminusDuplicate(index, row)}
            disabled={curPageDuplicate === 1 }
          >
            <span className="plusbuttonlabelduplicate">-</span>
          </button>
          {autovalue3[rowId]!==undefined ?
           <span className='recordcountduplicate'>{Math.min(endindexduplicate,autovalue3[rowId].length)}/{autovalue3[rowId].length}</span>
          :
          <div>
          {editMouseLinesvalueauto[rowId] !== null  ?
          <span className='recordcountduplicate'>{Math.min(endindexduplicate,editMouseLinesvalueauto[rowId].length)}/{editMouseLinesvalueauto[rowId].length}</span>:
          <span className='recordcountduplicate'>0/0</span>}
          </div>
          }
        </div>
      </div>
    );
  },
},
{
  name: "View",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    setMouselineDefaultEdit(editMouseLinesvalue);
    if(isSetYesViewDuplicate===false && viewMouseLinesvalue!==null && (editMouseLinesvalue!==null)&& indexrow===index){
      if(editMouseLinesvalue.length!==0)  {     
    rowStatesViewDuplicate[row.id]=true;
      }
    }
    if(autoCompleteChangeDuplicate[row.id]===true && indexrow===index){
      rowStatesViewDuplicate[row.id]=false;
    }
    return (          
      <div className="buttons-ViewDuplicate">
        {editenableDuplicate ===false ?
    <button className={(rowStatesViewDuplicate[row.id]) ?"viewenable":"viewdisable"} onClick={() =>handleViewClickDuplicate(index,row,editMouseLinesvalue)}>
             {(rowStatesViewDuplicate[row.id]) ? 
             <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>:
            <div>
            {isSetYesViewDuplicate === true  ?
             <button className={((rowStatesEditDuplicate[row.id] && editenableDuplicate===true) || (rowStatesViewDuplicate[row.id]) ) ?"viewenable":"viewdisable"} onClick={() =>handleViewClick(index,row)}>
             {((rowStatesEditDuplicate[row.id] && editenableDuplicate===true) || (rowStatesViewDuplicate[row.id]) ) ? <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>:
            <button className={((rowStatesEditDuplicate[row.id] && editenableDuplicate===true) || (rowStatesViewDuplicate[row.id]) ) ?"viewenable":"viewdisable"} onClick={() =>handleViewClick(index,row)}>
            {((rowStatesEditDuplicate[row.id] && editenableDuplicate===true) || (rowStatesViewDuplicate[row.id]) )  ? <span className='viewenablelabel'>
             <img className='viewenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewenablelogo.11227f11649231fa38ca0b1de3834584.svg`} alt="viewenablelogo" />
             &nbsp; View
             </span> : <span className='viewdisablelabel'>
             <img className='viewdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/viewdisablelogo.c63b4c1fa3584e301845f05a99f335e8.svg`} alt="viewdisablelogo" />
             &nbsp; View
             </span>}
            </button>
           }
            </div>}
         </div>
    );
   }
},
{
  name: "Edit",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const editMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    const viewMouseLinesvalue = data2[indexshared].sharedUsersList[indexrow].viewMouseLines;
    setMouselineDefaultEdit(editMouseLinesvalue);
    if(isSetYesEditDuplicate===false && viewMouseLinesvalue !== null && (editMouseLinesvalue!==null)&& indexrow===index){
      if(editMouseLinesvalue.length!==0)  {     
        rowStatesEditDuplicate[row.id]=true;
      }
    }
    if(autoCompleteChangeDuplicate[row.id]===true && indexrow===index){
      rowStatesEditDuplicate[row.id]=false;
    }
    return (          
      <div className="buttons-EditDuplicate">
<button className={(rowStatesEditDuplicate[row.id]) ?"editenable":"editdisable"} onClick={() =>handleEditClickDuplicate(index,row,editMouseLinesvalue)}>
           {(rowStatesEditDuplicate[row.id]) ?              <span className='editenablelabel'>
             <img className='editenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/editenablelogo.da24caef0f2a8196d8332a9e8e6e1ec0.svg`} alt="editenablelogo" />
             &nbsp; Edit
             </span> : <span className='editdisablelabel'>
             <img className='editdisablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/editdisablelogo.6786aebd64764b09aad37019edd8354b.svg`} alt="editdisablelogo" />
             &nbsp; Edit
             </span>}
          </button>
         </div>
    );
   }
},
{
  name: "Secbreak3",
  cell: (row,index) => {
    
    return (          
      <div className="secbreak3">
         </div>
    );
   }
},
{
  name: "Create",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const creatorFlag = data2[indexshared].sharedUsersList[indexrow].creatorFlag;
    if(isSetYesCreateDuplicate===false && (creatorFlag ===1)&& indexrow===index){         
    rowStatesCreateDuplicate[row.id]=true;      
    }
    return (          
      <div className="buttons-CreateDuplicate">
  <button className={(rowStatesCreateDuplicate[row.id] ) ?"createenable":"createdisable"} onClick={() =>handleCreateClickDuplicate(index,row)}>
           {(rowStatesCreateDuplicate[row.id]) ?              <span className='createenablelabel'>
             <img className='createenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/createenablelogo.ee61071c969e89f189f0cd0205b8eb7e.svg`} alt="createenablelogo" />
             &nbsp; Create
             </span> : <span className='createdisablelabel'>
              Create
             </span>}
          </button>
         </div>
    );
   }
},
{
  name: "Transfer",
  cell: (row,index) => {
    const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
    const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
    const ownerSwitchFlag = data2[indexshared].sharedUsersList[indexrow].ownerSwitchFlag;
    if(isSetYesTransferDuplicate===false && (ownerSwitchFlag ===1)&& indexrow===index){         
    rowStatesTransferDuplicate[row.id]=true;      
    }
    return (     
      <div className="buttons-TransferDuplicate">
<button className={(rowStatesTransferDuplicate[row.id]) ?"transferenable":"transferdisable"} onClick={() =>handleTransferClickDuplicate(index,row)}>
           {(rowStatesTransferDuplicate[row.id]) ?              
           <span className='transferenablelabel'>
             <img className='transferenablelogo' src={`${process.env.PUBLIC_URL}js/permissions/media/transferenablelogo.7d048062fc59b5e01fd7dcb884fe687e.svg`} alt="transferenablelogo" />
             &nbsp; Transfer
             </span> : <span className='transferdisablelabel'>
	           Transfer
             </span>}
          </button>
         </div>      
    );
   }
},
{
  name: "Action",
  cell: (row,index) => {
    
    return (          
      <div className="buttons-deletesharelevelduplicate">
             <button className='deletesharelevelduplicate' onClick={()=>passshareindextopopupduplicate(index)}>
            &#8942;
          </button>
         </div>
    );
   }
},
{
  name: "Action",
  cell: (row,index) => {
    
    return (          
      <div className="buttons-deletesharelevelpopupduplicate">
        {deleteSharePopupDuplicate && deleteshareindexpopupDuplicate===index ?
             <button className='deletesharelevelpopupduplicate' onClick={()=>handleShareLevelDeleteClickDuplicate(index,row)}>
            Delete
          </button>:null}
         </div>
    );
   }
}
];
  const filteredData = data.filter(row =>
    row.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilterText(value);
  };
 
  
  
  const handleRowSelected = (row) => {
    const newSelectedRows = [...selectedRowsTable];
    const index = newSelectedRows.findIndex((r) => r.id === row.id);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRowsTable(newSelectedRows);
  };  

  
  const isRowSelected = (row) => {
    return selectedRowsTable.findIndex((r) => r.id === row.id) > -1;
  };
  const handleSelectAll = () => {
    const newSelectedRows = selectAll ? [] : [...data];
    setSelectedRowsTable(newSelectedRows);
    setSelectAll(!selectAll);
  };

  const handleRowSelectedinside = (row) => {
    const newSelectedRows = [...selectedRows1];
    const index = newSelectedRows.findIndex((r) => r.id === row.id);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRowsinside(newSelectedRows);
   
  };  
  const isRowSelectedinside = (row) => {
    return selectedRows1.findIndex((r) => r.id === row.id) > -1;
  };

  const handleRowSelected1 = (row) => {
    const newSelectedRows = [...selectedRows1];
    const index = newSelectedRows.findIndex((r) => r.id === row.id);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRows1(newSelectedRows);   
  };  
  const isRowSelected1 = (row) => {
    return selectedRows1.findIndex((r) => r.id === row.id) > -1;
  };


  const handleRowSelected2 = (row) => {
    const newSelectedRows = [...selectedRows2];
    const index = newSelectedRows.findIndex((r) => r.id === row.id);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRows2(newSelectedRows);
  };  
  const isRowSelected2 = (row) => {
    return selectedRows2.findIndex((r) => r.id === row.id) > -1;
  };


  const handleSelectAll1 = () => {
    const allAccessUsers = data2duplicate.map((user) => {
      return {
         id: user.id, 
         sharedUserName: user.sharedUserName,
         sharedUserId:user.sharedUserId,
         ownerId:user.ownerId,
         editMouseLines:user.editMouseLines,
         viewMouseLines:user.viewMouseLines
      };
    });
    const newSelectedRows1 = selectAll1 ? [] : [...allAccessUsers];
    setSelectedRows1(newSelectedRows1);
    setSelectAll1(!selectAll1);
  };  

  const handleDropdownClick = () => {
    setShowTable(!showTable);
  };
  const handleSelectAll2 = () => {    
    const allAccessUsers = data3duplicate.map((user) => {
      return {
         id: user.id, 
         unSharedUserName: user.unSharedUserName,
         unSharedUserId:user.unSharedUserId,
         ownerId:user.ownerId
      };
    });
    const newSelectedRows2 = selectAll2 ? [] : [...allAccessUsers];
    setSelectedRows2(newSelectedRows2);
    setSelectAll2(!selectAll2);
  };
  const handleDropdownClick1 = () => {

    setShowTable1(!showTable1);
  };
  const handleRowSelecteddrop = (row,index) => {
    if(duplicatedRows===false){
    setDuplicatedRows(true)
    
    const newId = row.id;
    const newRow = row;
  
    // Find the index of the row with the matching ID in the existing tableData
    const existingRowIndex = data2duplicate.findIndex((row) => row.id === newId);
  
    if (existingRowIndex !== -1) {

      // If the matching row is found, insert the new row after it
      setData2duplicate((prevData) => {
        const newData = [...prevData];
        newData.splice(existingRowIndex + 1, 0, newRow);
        return newData;
      });
    } else {
      // If no matching row is found, simply append the new row to the tableData
      setData2duplicate((prevData) => [...prevData, newRow]);
    }
   
    }
    
    else{
      const newId = row.id;
      const newRow = row;
      const existingRowIndex = setData2duplicate.findIndex((row) => row.id === newId);
      const rowCount = data2[data2Index].sharedUsersList.filter((row) => row.id === newId).length;
      if(rowCount){
      if (existingRowIndex !== -1) {
        // If the matching row is found, insert the new row after it
        setData2duplicate.splice(existingRowIndex + 1, 0, newRow);            
      }     
    }
  
  }
  };
  const renderDropdown2 = (row,event) => {
    const allAccessUsers = data2duplicate.map((user) => {
      return {
         id: user.id, 
         sharedUserName: user.sharedUserName,
         sharedUserId:user.sharedUserId,
         ownerId:user.ownerId,
         editMouseLines:user.editMouseLines,
         viewMouseLines:user.viewMouseLines
      };
    });
    var dropdowndata;
    if(row.data){
   const index = allAccessUsers.findIndex((element) => element.sharedUserId === row.data.sharedUserId);
    dropdowndata=allAccessUsers[index].id;
    }
    else if(!row.data){
      const index = allAccessUsers.findIndex((element) => element.sharedUserId === row.sharedUserId);
       dropdowndata=allAccessUsers[index].id;
    }
   const conditionalRowStyles = [
    {
      when: row => row.id !== dropdowndata, // replace "error" with the name of the column you want to check    
      style: {
        display: "none"      
      }
    }
  ];
     return (
      <>
 
 <DataTable   
 ref={expandedTableRef}   
        columns={[
           
          {
            cell: (row) => (
              <div className={row.id !== dropdowndata ? 'hideRow' : 'notHideRow'}>
              <div className="line1"></div> 
              </div>
            ),
            allowOverflow: true,
            button: true,
            //width: "5%"
          },
          ...columns4,
        ]}
        data={allAccessUsers}
        defaultSortField={row.id}
        selectableRows
        pagination
        paginationPerPage={allAccessUsers.length}
        highlightOnHover
        striped
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRow([])}
        className="my-custom-tableinsideduplicate"
        conditionalRowStyles={conditionalRowStyles}
        keyField={row.id}
      /> 
        </>
     )
   };

 const expandedRows2 = selectedRows1.map((row) => ( 
 {/*  <tr key={`${row.id}-expanded`}>            
      <td colSpan={columns2.length + 1}>{renderDropdown2(row)}</td>
 </tr>*/}
  )); 
 


  const renderDropdown = (row,index) => {    
    var rowId;  
    var indexshared; 
   var rowindex=index;
    if(row.data){      
     rowId=row.data.id;
    setSelectedRowId(row.data.id);  
     indexshared = data2.findIndex((element) => element.ownerId === row.data.ownerId);
     setData2duplicate(data2[indexshared].sharedUsersList);
    }    
    else if(!row.data){
      rowId=row.id;
      setSelectedRowId(row.id);
      index = data2.findIndex((element) => element.ownerId === row.ownerId);
      setData2duplicate(data2[indexshared].sharedUsersList);
    }
    if(duplicatedRows===true){
    data2[indexshared].sharedUsersList=data2duplicate;
    }
 


    var rowId2;  
    var index2;   
    if(row.data){      
     rowId2=row.data.id; 
     index2 = data3.findIndex((element) => element.ownerId === row.data.ownerId);
     setData3duplicate(data3[index2].unSharedUsersList);
    }    
    else if(!row.data){
      rowId2=row.id;
      index2 = data3.findIndex((element) => element.ownerId === row.ownerId);
      setData3duplicate(data3[index2].unSharedUsersList);
    }
 
    const remainingItems = data.filter((item) => item.id !== rowId);
    return (
      <> 
      <div className='emptyheight1'></div>
      <div className='tableSelectAll2'>
      <div className="line3"></div>
      <input className="selectall1" type="checkbox" checked={selectAll1} onChange={handleSelectAll1} />
        <img className={showTable?"dropdownrotate1" : "dropdown1"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick} />
        <span className='access1'>Access User</span>
        <span className='Mouselinelabel'>Select the Mouseline you wish to share</span>
        <span className='view1'>Select the Data Permission level</span>
        <span className='edit1'></span>
        <span className='secbreak'></span>
        <span className='create1'>create and transfer records for the selected user</span>
        <span className='transfer1'></span>
        </div>   
        {showTable && (
      <DataTable  
      ref={parentTableRef}     
        columns={[
           
          {
            cell: (row) => (
              <div>
              <div className="line1"></div> 
              <input
              className='itemcheckbox2'
                type="checkbox"
                onChange={() => handleRowSelected1(row)}
                checked={isRowSelected1(row)}
                //style={"width: 18px;height: 18px;"}
              />
               <img className="plustodown" src={`${process.env.PUBLIC_URL}js/permissions/media/pluslogo.b52f8f5335fd30099bd1f7d7a937db41.svg`} alt="plus" />
              </div>
            ),
            allowOverflow: true,
            button: true,
            //width: "5%"
          },
          ...columns2,
        ]}
        data={data2[indexshared].sharedUsersList}
        defaultSortField={row.id}
        selectableRows={true}
        pagination
        paginationPerPage={data2[indexshared].sharedUsersList.length}
        highlightOnHover
        striped
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRows1([])}
        className="my-custom-tableinside"
        expandableRows ={true}
        expandableRowsComponent={renderDropdown2}
        expandableRowsVisibleOnly
        expandableRowsExpanded={expandedRows} 
        onRowExpandToggled={(expanded, row) => {
          if (!expanded) {
            // do something when the dropdown is collapsed
            setSelectedRowId(null)
          }
        }}
        keyField={row.id}
        /> 
        )}

        <div className='emptyheight2'></div>
        <div className='tableSelectAll3'>
        <div className="line4"></div> 
      <input className="selectall2" type="checkbox" checked={selectAll2} onChange={handleSelectAll2} />
      <img className={showTable1?"dropdownrotate2" : "dropdown2"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick1} />
        <span className='access2'>User you want to share with</span>
        <span className='Mouselinelabel2'>Select the Mouseline you wish to share</span>
        <span className='view2'>Select the Data Permission level</span>
        <span className='secbreak5'></span>
        <span className='create2'>create and transfer records for the selected user</span>
        <span className='edit2'></span>
        <span className='transfer2'></span>
        </div>  
        {showTable1 && (    
        <DataTable    
        columns={[
            
          {
            cell: (row) => (
              <div>
                <div className="line2"></div> 
              <input
              className='itemcheckbox3'
                type="checkbox"
                onChange={() => handleRowSelected2(row)}
                checked={isRowSelected2(row)}
                //style={"width: 18px;height: 18px;"}
              />
              </div>
            ),
            allowOverflow: true,
            button: true,
            //width: "5%"
          },
          ...columns3,
        ]}
        data={data3duplicate}
        defaultSortField="id"
        selectableRows
        pagination
        paginationPerPage={data3duplicate.length}
        highlightOnHover
        striped
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRows2([])}
        //expandableRows
        className="my-custom-tableinside2"
        />       
        )}
        <div className='emptyheight3'></div>
   </>
    ); 
   
  }; 
   
 const expandedRows = selectedRowsTable.map((row) => ( 
  {/* <tr key={`${row.id}-expanded`}>            
      <td colSpan={columns.length + 1}>{renderDropdown(row,index)}</td>
 </tr>*/}
  )); 

  return (
    <div className='userpanel'>
    <div className='submitsection'>
        <div className='userlogo'>
        <img src={`${process.env.PUBLIC_URL}js/permissions/media/userpagelogo.0dae6c67151988674041208254a6d3c4.svg`} alt="upload" />
        <span className='userlogolabel'>Users Access</span>
        </div>  
    </div>
    <div className='selectandsubmit'> 
    <div className='title'>
     <span className='titlelabel'> Grant Permission To Users:</span>
    </div>
    
    </div>
    <div className='tablepanel'>        
    <div className='tablesearch'>
        <input
          type="text"
          placeholder="search"
          value={filterText}
          onChange={handleFilter}
          className='tablesearchbox'
        />
        <img className='searchlogo' src={`${process.env.PUBLIC_URL}js/permissions/media/searchlogo.71d32400eb7b53ffda5d.svg`} alt="searchlogo" />
      </div>
      <div className="tableSelectAll">
        <input className="selectall" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <span className='header' >Users Name</span>  
        <span className='headerbutton' >Grant permission  and control who has access to their data</span>     
    </div>
    </div>
    
      <DataTable      
        columns={[
            
          {
            cell: (row) => (
              <div style={{ display: selectedRowId === row.id ? 'none' : 'block' }}>
              <input
              className='itemcheckbox'              
                type="checkbox"
                onChange={() => handleRowSelected(row)}
                checked={isRowSelected(row)}
                //style={"width: 18px;height: 18px;"}
              />
              </div>
            ),
            allowOverflow: true,
            button: true,
            //width: "5%"
          },
          ...columns,
        ]}
        conditionalRowStyles={[
          {
            when: row => selectedRowId === row.id,
            style: {
              backgroundColor: '#E5E5E5',
            }
          }
        ]}
        data={filteredData}
        defaultSortField="id"
        selectableRows
        pagination
        highlightOnHover
        striped
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        paginationTotalRows={data.length}
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRowsTable([])}
        expandableRows
        expandableRowsComponent={renderDropdown}
        expandableRowsVisibleOnly
        expandableRowsExpanded={expandedRows} 
        onRowExpandToggled={(expanded, row) => {
          if (!expanded) {
            // do something when the dropdown is collapsed
            setSelectedRowId(null)
          }
        }}
        className="my-custom-table"
        />  
     { isConfirmationOpen ?
    <div className='confirmationpopup'>
    <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>:null
    }

  {(isUpdateSuccessful=== true) ? (
        <div className="success-modal">
          <span className="close-symbol" onClick={() =>closeSymbol()}>X</span>
          <h1>Update successful</h1>
          <h2>The update operation completed successfully</h2>
        </div>
      ):null}
        {(isUpdateSuccessful === false) ? (
        <div className="failure-modal">
          <span className="close-symbol" onClick={() => setIsUpdateSuccessful("")}>X</span>
          <h1>Update was not successful</h1>
          <h2>The update operation not completed</h2>
        </div>
      ):null}
              {(isDeleteSuccessful === false) ? (
        <div className="failure-modal-delete">
          <span className="close-symbol" onClick={() => setIsDeleteSuccessful("")}>X</span>
          <h2>You cannot delete this record as the Access User is the Group Administrator who has access to your records by default</h2>
        </div>
      ):null}
    </div>
      
  );
}

export default Useraccess;

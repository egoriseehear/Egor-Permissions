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
import Select, { components } from "react-select";
import ReactPaginate from 'react-paginate';
import { useTable, usePagination } from 'react-table';
import {UserAccess_URL} from '../Pages-js/URL';
import axios from 'axios';
import {UserAccesssharingflagPost_URL} from '../Pages-js/URL';
import {UserAccessDeletePost_URL} from '../Pages-js/URL';
import BAModal from 'react-modal';

import Autocomplete from "@mui/material/Autocomplete";
import { TextField, Stack } from "@mui/material";
import Checkbox from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
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
  const parentTableRef = useRef(null);
  const expandedTableRef = useRef(null);


  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;


  useEffect(() => {
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
    sharedUsersList:sharedUsersList.map(({sharedUserId,sharedUserName,editMouseLines,viewMouseLines,sharingflag}) => ({
      id:"dataid2"+(idincrement2++),
      sharedUserId:sharedUserId,
      sharedUserName:sharedUserName,  
      ownerId:ownerId,  
      editMouseLines:editMouseLines,
      viewMouseLines:viewMouseLines,
      sharingflag:sharingflag,
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
      mouselinesId:mouseLineId,
      mouselinesName:mouseLineName,  
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
    console.log("clicked")
    var newStates;
    newStates = [...rowStates];
    newStates[index] = !newStates[index];
    setIsSetYes(true);
    if(selectAll===true){
      setDeleteselectall(true)
       newStates = [...rowStates].fill(newStates[index]);
       setRowStates(newStates);
       console.log(newStates)
    }else{
      setDeleteselectall(false)
    setRowStates(newStates);
    console.log(newStates[index])
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
          className="BAModal"
          isOpen={isOpen}
          onRequestClose={onClose}
          contentLabel="Confirmation Dialog"
          >       
          <button className='yesbutton' onClick={onConfirm}>Yes</button>
          <button className='nobutton' onClick={onClose}>No</button>
          </BAModal>
      );
      }; 
      const handleConfirm = () => {
        const rowdelete=ownerdeleterow
        const indexowner = data.findIndex((element) => element.ownerId === rowdelete.ownerId);
        const userlevel = data[indexowner].userLevel;
        const ownerId = data[indexowner].ownerId;
        const shareduserIdIndex = data2.findIndex((element) => element.ownerId === rowdelete.ownerId);
         const shareduserId = data2[shareduserIdIndex].sharedUsersList[0].sharedUserId;
         //const mouselineIdIndex = data2.findIndex((element) => element.ownerId === rowdelete.ownerId);
        // const mouselineId = data2[shareduserIdIndex].sharedUserId[0].mouseLineId
   if(userlevel===1){
       setIsUpdateSuccessful(false);
      }
      else{
         setIsUpdateSuccessful(true);
         setIsConfirmationOpen(false);
          const url=`${UserAccessDeletePost_URL}`;
         /*  axios.post(url,{
             ownerId:ownerId,
             shareduserId:shareduserId,
             MouseLineId:mouselineId,
           }) 
              .then(response => {
               if(response.data==="success"){
              setIsUpdateSuccessful(true);
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
              });*/

            }
       };
     
       const handleClose = () => {
         setIsConfirmationOpen(false);
       };

  const handleOwnerLevelDeleteClick = (index,row) => {
    setDeletePopup(false);
    setIsConfirmationOpen(true);
    setOwnerdeleteindex(index);
    setOwnerdeleterow(row);
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
  };
  const passshareindextopopup = (index) => {
    setDeleteSharePopup(true);
    setdeleteshareindexpopup(index);
  };
  const [rowStates, setRowStates] = useState(data.map(() => false));
  const [rowStatesView, setRowStatesView] = useState(data.map(() => false));
  const [rowStatesEdit, setRowStatesEdit] = useState(data.map(() => false));
  const [rowStatesCreate, setRowStatesCreate] = useState(data.map(() => false));
  const [rowStatesTransfer, setRowStatesTransfer] = useState(data.map(() => false));
  const [rowStatesViewUnshared, setRowStatesViewUnshared] = useState(data.map(() => false));
  const [rowStatesEditUnshared, setRowStatesEditUnshared] = useState(data.map(() => false));
  const [rowStatesCreateUnshared, setRowStatesCreateUnshared] = useState(data.map(() => false));
  const [rowStatesTransferUnshared, setRowStatesTransferUnshared] = useState(data.map(() => false));
  const [rowStatesViewDuplicate, setRowStatesViewDuplicate] = useState(data.map(() => false));
  const [rowStatesEditDuplicate, setRowStatesEditDuplicate] = useState(data.map(() => false));
  const [rowStatesCreateDuplicate, setRowStatesCreateDuplicate] = useState(data.map(() => false));
  const [rowStatesTransferDuplicate, setRowStatesTransferDuplicate] = useState(data.map(() => false));
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
        selector: 'name',
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
          {/* {!isSetYes  ?
          <button className={rowStates[index] ?"yes":"no"} onClick={() =>handleButtonClick(index,row)}>
                 {rowStates[index] ? "Yes" : "No"}
                </button>:!deleteselectall ?
                <button className={rowStates[index] ?"yes":"no"} onClick={() =>handleButtonClick(index,row)}>
                 {rowStates[index] ? "Yes" : "No"}
                </button>:<button className={rowStates ?"yes":"no"} onClick={() =>handleButtonClick(index,row)}>
                 {rowStates ? "Yes" : "No"}
                </button>}*/}
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
  const handleViewClick = (index,row) => {
  /*  const newStates = [...rowStates];
    newStates[row.id] = !newStates[row.id];
    setRowStates(newStates);
    setIsSetYes(true)*/
    console.log("1")
    const newStates = [...rowStatesView];
    newStates[index] = !newStates[index];
    setRowStatesView(newStates);
      setRowStatesViewRow(row.id); 
    setIsSetYes(true);
  };
  const handleViewClickUnshared = (index,row) => {
    /*  const newStates = [...rowStates];
      newStates[row.id] = !newStates[row.id];
      setRowStates(newStates);
      setIsSetYes(true)*/
      console.log("2")
      const newStates = [...rowStatesViewUnshared];
      newStates[index] = !newStates[index];
      setRowStatesViewUnshared(newStates);
        setRowStatesViewRow(row.id);
      setIsSetYes(true);
    };
    const handleViewClickDuplicate = (index,row) => {
     /*   const newStates = [...rowStatesViewDuplicate];
        newStates[row.id] = !newStates[index];
        setRowStatesViewDuplicate(newStates);
          setRowStatesViewRow(row.id);*/
          const dataTable = parentTableRef.current;

// Check if the ref is valid
if (dataTable) {
  // Programmatically trigger the click event on the first dropdown
  const dropdownElement = dataTable.querySelector('.DnOeK');
  if (dropdownElement) {
    dropdownElement.click();
  }
}
          setRowStatesViewDuplicate(prevRowStates => {
            const newRowStates = [...prevRowStates];
            newRowStates[index] =  !newRowStates[index]; // Set the state to true for the specific row
            return newRowStates;
          });
        setIsSetYes(true);
      };

  const handleEditClick = (index,row) => {
    const newStates = [...rowStatesEdit];
    newStates[index] = !newStates[index];
    setRowStatesEdit(newStates);
      setRowStatesEditRow(row.id); 
    setIsSetYes(true);
  };
  const handleEditClickUnshared = (index,row) => {
    const newStates = [...rowStatesEditUnshared];
    newStates[index] = !newStates[index];
    setRowStatesEditUnshared(newStates);
      setRowStatesEditRow(row.id); 
    setIsSetYes(true);
  };
  const handleEditClickDuplicate = (index,row) => {
    const newStates = [...rowStatesEditDuplicate];
    newStates[index] = !newStates[index];
    setRowStatesEditDuplicate(newStates);
      setRowStatesEditRow(row.id); 
    setIsSetYes(true);
  };
  const handleCreateClick = (index,row) => {
     const newStates = [...rowStatesCreate];
    newStates[index] = !newStates[index];
    setRowStatesCreate(newStates);
      setRowStatesCreateRow(row.id); 
    setIsSetYes(true);
  };
  const handleCreateClickUnshared = (index,row) => {
    const newStates = [...rowStatesCreateUnshared];
   newStates[index] = !newStates[index];
   setRowStatesCreateUnshared(newStates);
     setRowStatesCreateRow(row.id); 
   setIsSetYes(true);
 };
 const handleCreateClickDuplicate = (index,row) => {
  const newStates = [...rowStatesCreateDuplicate];
 newStates[index] = !newStates[index];
 setRowStatesCreateDuplicate(newStates);
   setRowStatesCreateRow(row.id); 
 setIsSetYes(true);
};
  const handleTransferClick = (index,row) => {
    const newStates = [...rowStatesTransfer];
    newStates[index] = !newStates[index];
    setRowStatesTransfer(newStates);
      setRowStatesCreateRow(row.id); 
    setIsSetYes(true);
  };
  const handleTransferClickUnshared = (index,row) => {
    const newStates = [...rowStatesTransferUnshared];
    newStates[index] = !newStates[index];
    setRowStatesTransferUnshared(newStates);
      setRowStatesCreateRow(row.id); 
    setIsSetYes(true);
  };
  const handleTransferClickDuplicate = (index,row) => {
    const newStates = [...rowStatesTransferDuplicate];
    newStates[index] = !newStates[index];
    setRowStatesTransferDuplicate(newStates);
      setRowStatesCreateRow(row.id); 
    setIsSetYes(true);
  };
  const columns2 = [
    {
   name: 'Access User',
   selector: 'sharedUserName',
   sortable: true,  
   width: '100px', 
 },
 {
  name: "Textbox",
  cell: (row,index) => {
    var rowId;  
    var indexmouseline;  
    var indexviewmouseline;
    if(row.data){      
     rowId=row.data.id; 
     indexmouseline = options.findIndex((element) => element.ownerId === row.data.ownerId);
     indexviewmouseline = data2duplicate.findIndex((element) => element.id === row.data.id);
    }    
    else if(!row.data){
      rowId=row.id;
      indexmouseline = options.findIndex((element) => element.ownerId === row.ownerId);
      indexviewmouseline = data2duplicate.findIndex((element) => element.id === row.id);
    }
    const optionsmouselines=options[indexmouseline].mouselines;
    setOptionsmouselines(optionsmouselines)
    const viewmouselines=data2duplicate[indexviewmouseline].viewMouseLines;
    setViewMouselines(viewmouselines)
    const editmouselines=data2duplicate[indexviewmouseline].editMouseLines;
    setEditMouselines(editmouselines)
    console.log(viewmouselines)
    console.log(editmouselines)
    //const currentPage = currentPage[paginationIndex] || 1;
    const textboxValue = textboxValues[row.id] ? textboxValues[row.id][index] : [];
    var indexOfLastItem="";
    var indexOfFirstItem="";
    var currentOptions="";
    var totalPages="";

     indexOfLastItem = currentPage * itemsPerPage;
     indexOfFirstItem = indexOfLastItem - itemsPerPage;
     currentOptions = textboxValue.slice(indexOfFirstItem, indexOfLastItem);
     totalPages = Math.ceil(textboxValue.length / itemsPerPage); 
     const indexshared = data2.findIndex((element) => element.ownerId === row.ownerId);
     const indexrow = data2[indexshared].sharedUsersList.findIndex((element) => element.id === row.id);
     var idincrement5=0;
     const sharedUserId= data2[indexshared].sharedUsersList[indexrow].sharedUserId;
     const viewMouseLinesvalue= data2[indexshared].sharedUsersList[indexrow].viewMouseLines
    if(viewMouseLinesvalue!==null){
    const viewMouseLines=viewMouseLinesvalue.map(({mouseLineId,mouseLineName}) => ({
      id:"viewmouse"+(idincrement5++),
      sharedUserId:sharedUserId,
      mouseLineId:mouseLineId,
      mouseLineName:mouseLineName,
    }))
  }
    var idincrement6=0;
    /*const editMouseLinesvalue= data2[indexshared].sharedUsersList[indexrow].editMouseLines;
    console.log(editMouseLinesvalue)
    const editMouseLines= editMouseLinesvalue.map(({mouseLineId,mouseLineName}) => ({
      id:"editmouse"+(idincrement6++),
      sharedUserId:sharedUserId,
      mouseLineId:mouseLineId,
      mouseLineName:mouseLineName,
    }))
        setViewMouselines(viewMouseLines)
        console.log(viewMouseLines)
    //setEditMouselines(editMouseLines)
    
    //console.log(editMouseLines)*/
    return (
      
    <div>
   {/* <input
      type="text"
      value={textboxValues[row.id] ? currentOptions : []}
      onClick={() => handleInputClick(row, index)}
      defaultValue="test"
      //onChange={() => handleInputChange( row, index)}
      //ref={textBoxRef}
    />*/}

<Stack spacing={2} sx={{ width: 200 }}>
<Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={optionsmouselines}
      disableCloseOnSelect
      getOptionLabel={(optionsmouselines) =>
        optionsmouselines?.mouselinesName
      }
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
        {option?.mouselinesName}
        </li>
      )}
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
            </Stack>


    <div className="buttons-container">
       <button className="plusbutton" onClick={() => handlePageChange(currentPage + 1, index,row,-1)} disabled={ currentPage === totalPages || (activeRowIndex !== index) || activeRow.id !== row.id}> 
       <span className='plusbuttonlabel'>+ </span>
       </button>
       <button className="minusbutton"  onClick={() => handlePageChange(currentPage - 1, index,row,1)}  disabled={ currentPage === 1 || (activeRowIndex !== index) || activeRow.id !== row.id}>
       <span className='plusbuttonlabel'>-</span>
       </button>
       {activeRowIndex === index && activeRow.id === row.id ?
       <span className='recordcount'>{Math.min(indexOfLastItem,textboxValue.length)}/{textboxValue.length}</span>
       :<span className='recordcount'> {Math.min(indexOfLastItem,textboxValue.length)}/{textboxValue.length} </span>}
        </div>
  {/*  {activeRowIndex === index && isTableVisible && activeRow.id === row.id && (     
      <table className='mouselinetable' ref={tableRef}>
          <tbody className='mouselinetablebody'>
            {optionsmouselines.map((mouselines) => (
              <DataRow
                key={mouselines.mouselinesId}
                option={mouselines.mouselinesName}
                className="mouselinetablecheckbox"
                onSelect={() => handleSelect(mouselines.mouselinesName, row,index)}
                isChecked={(textboxValues[row.id] ? textboxValues[row.id][index] : []).includes(mouselines.mouselinesName)}
              />
            ))}
          </tbody>
        </table>
         )}*/}
         </div>
            



            
    );
   }
},
{
  name: "View",
  cell: (row,index) => {
     //const currentPage = currentPage[paginationIndex] || 1;
     const defaultSharing = row.defaultSharing;
     if(isSetYes ===false){
    //  setRowStatesView([true]);
      }
      return (               
        <div className="buttons-View">  
    <button className={(rowStatesView[index]) ?"viewenable":"viewdisable"} onClick={() =>handleViewClick(index,row)}>
             {(rowStatesView[index]) ? "Enable" : "Disable"}
            </button>
           </div>
      );
     }
},
{
  name: "Edit",
  cell: (row,index) => {
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
   if(isSetYes ===false){
  //  setRowStatesEdit([true]);
    }
    return (  
   
      <div className="buttons-Edit">
  <button className={(rowStatesEdit[index]) ?"editenable":"editdisable"} onClick={() =>handleEditClick(index,row)}>
           {(rowStatesEdit[index]) ? "Enable" : "Disable"}
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
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
   
    return (          
      <div className="buttons-Create">
  <button className={(rowStatesCreate[index] ) ?"createenable":"createdisable"} onClick={() =>handleCreateClick(index,row)}>
           {(rowStatesCreate[index]) ? "Enable" : "Disable"}
          </button>
         </div>
    );
   }
},
{
  name: "Transfer",
  cell: (row,index) => {
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
    return (     
      <div className="buttons-Transfer">
  <button className={(rowStatesTransfer[index]) ?"transferenable":"transferdisable"} onClick={() =>handleTransferClick(index,row)}>
           {(rowStatesTransfer[index]) ? "Enable" : "Disable"}
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
const columns3 = [
  {
 name: 'Access User',
 selector: 'unSharedUserName',
 sortable: true,   
},
{
  name: "Textbox",
  cell: (row,index) => {
  }
},
{
  name: "View",
  cell: (row,index) => {
    console.log(row)
    const indexsharing = data3.findIndex((element) => element.ownerId === row.ownerId);
    console.log(indexsharing)
    const indexsharingflag = data3[indexsharing].unSharedUsersList.findIndex((element) => element.id === row.id);
    return (          
      <div className="buttons-ViewUnshared">
  <button className={(rowStatesViewUnshared[index]) ?"viewenable":"viewdisable"} onClick={() =>handleViewClickUnshared(index,row)}>
           {(rowStatesViewUnshared[index]) ? "Enable" : "Disable"}
          </button>
         </div>
    );
   }
},
{
  name: "Edit",
  cell: (row,index) => {
    const indexsharing = data3.findIndex((element) => element.ownerId === row.ownerId);
    const indexsharingflag = data3[indexsharing].unSharedUsersList.findIndex((element) => element.id === row.id);
    return (          
      <div className="buttons-EditUnshared">
  <button className={(rowStatesEditUnshared[index]) ?"editenable":"editdisable"} onClick={() =>handleEditClickUnshared(index,row)}>
           {(rowStatesEditUnshared[index]) ? "Enable" : "Disable"}
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
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
   
    return (          
      <div className="buttons-CreateUnshared">
  <button className={(rowStatesCreateUnshared[index] ) ?"createenable":"createdisable"} onClick={() =>handleCreateClickUnshared(index,row)}>
           {(rowStatesCreateUnshared[index]) ? "Enable" : "Disable"}
          </button>
         </div>
    );
   }
},
{
  name: "Transfer",
  cell: (row,index) => {
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
    return (     
      <div className="buttons-TransferUnshared">
  <button className={(rowStatesTransferUnshared[index]) ?"transferenable":"transferdisable"} onClick={() =>handleTransferClickUnshared(index,row)}>
           {(rowStatesTransferUnshared[index]) ? "Enable" : "Disable"}
          </button>
         </div>      
    );
   }
}
];
const columns4 = [
  {
 name: 'Access User',
 selector: 'sharedUserName',
 sortable: true,   
},
{
  name: "View",
  cell: (row,index) => {
    console.log(row)
    const indexsharing = data2.findIndex((element) => element.ownerId === row.ownerId);
    console.log(indexsharing)
    const indexsharingflag = data2[indexsharing].sharedUsersList.findIndex((element) => element.id === row.id);
    const defaultSharing = data2[indexsharing].sharedUsersList[indexsharingflag].sharingflag;
    return (          
      <div className="buttons-ViewDuplicate">
  <button className={(rowStatesViewDuplicate[index]) ?"viewenable":"viewdisable"} onClick={() =>handleViewClickDuplicate(index,row)}>
           {(rowStatesViewDuplicate[index]) ? "Enable" : "Disable"}
          </button>
         </div>
    );
   }
},
{
  name: "Edit",
  cell: (row,index) => {
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
    return (          
      <div className="buttons-EditDuplicate">
  <button className={(rowStatesEditDuplicate[index]) ?"editenable":"editdisable"} onClick={() =>handleEditClickDuplicate(index,row)}>
           {(rowStatesEditDuplicate[index]) ? "Enable" : "Disable"}
          </button>
         </div>
    );
   }
},
{
  name: "Secbreak3",
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
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
    return (          
      <div className="buttons-CreateDuplicate">
  <button className={(rowStatesCreateDuplicate[index]) ?"createenable":"createdisable"} onClick={() =>handleCreateClickDuplicate(index,row)}>
           {(rowStatesCreateDuplicate[index]) ? "Enable" : "Disable"}
          </button>
         </div>
    );
   }
},
{
  name: "Transfer",
  cell: (row,index) => {
    //const currentPage = currentPage[paginationIndex] || 1;
    const defaultSharing = row.defaultSharing;
    return (     
      <div className="buttons-TransferDuplicate">
  <button className={(rowStatesTransferDuplicate[index]) ?"transferenable":"transferdisable"} onClick={() =>handleTransferClickDuplicate(index,row)}>
           {(rowStatesTransferDuplicate[index]) ? "Enable" : "Disable"}
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
    console.log(allAccessUsers)
    const newSelectedRows1 = selectAll1 ? [] : [...allAccessUsers];
    setSelectedRows1(newSelectedRows1);
    setSelectAll1(!selectAll1);
    console.log(newSelectedRows1)
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
    console.log(newSelectedRows2)
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
    console.log("renderDropdown2")
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
    console.log(row.id)
    console.log(dropdowndata)
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
        defaultSortField="id"
        selectableRows
        pagination
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
     console.log(data2[indexshared].sharedUsersList)
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
     setData3duplicate(data3[indexshared].unSharedUsersList);
     console.log(data3[indexshared].unSharedUsersList)
    }    
    else if(!row.data){
      rowId2=row.id;
      index2 = data3.findIndex((element) => element.ownerId === row.ownerId);
      setData3duplicate(data3[indexshared].unSharedUsersList);
      console.log(data3[indexshared].unSharedUsersList)
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
        <span className='louselinelabel'>Select the Mouseline you wish to share</span>
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
        defaultSortField="id"
        selectableRows={true}
        pagination
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
        keyField="id"  
        /> 
        )}

        <div className='emptyheight2'></div>
        <div className='tableSelectAll3'>
        <div className="line4"></div> 
      <input className="selectall2" type="checkbox" checked={selectAll2} onChange={handleSelectAll2} />
      <img className={showTable1?"dropdownrotate2" : "dropdown2"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick1} />
        <span className='access2'>User you want to share with</span>
        <span className='louselinelabel'>Select the Mouseline you wish to share</span>
        <span className='view2'>Select the Data Permission level</span>
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
        data={data3[index2].unSharedUsersList}
        defaultSortField="id"
        selectableRows
        pagination
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
          <span className="close-symbol" onClick={() => setIsUpdateSuccessful("")}>X</span>
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
    </div>
  );
}

export default Useraccess;

import React, { useState,useEffect,useRef  } from 'react';
import '../Pages-css/Useraccess.css';
import DataTable from "react-data-table-component";
//import Select from 'react-select'; 
import dropdown from '../Logos/dropdown.svg'
import userpagelogo from '../Logos/userpagelogo.svg'
import searchlogo from '../Logos/searchlogo.svg'
import Select, { components } from "react-select";
import ReactPaginate from 'react-paginate';
import { useTable, usePagination } from 'react-table';
import {UserAccess_URL} from '../Pages-js/URL';
import axios from 'axios';


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
  const [selectedRow, setSelectedRow] = useState(null);
  const[defaultSharing,setDefaultSharing]=useState(0);
 

  useEffect(() => {
   // Call the API using Axios for UserAccess
   const url=`${UserAccess_URL}`;
   axios.get(url)
   .then(response => {
     console.log(response.data)
     var idincrement=0;
     const ownernames = response.data.map(({ownerId,ownerName,defaultSharing}) => ({
      id: "dataid"+(idincrement++),
      ownerId:ownerId,
      name: ownerName,
      defaultSharing:defaultSharing,
}))
var idincrement2=0;
const sharedUsersList= response.data.map(({ownerId,sharedUsersList}) => ({
  ownerId:ownerId,
    sharedUsersList:sharedUsersList.map(({sharedUserId,sharedUserName}) => ({
      id:"dataid2"+(idincrement2++),
      sharedUserId:sharedUserId,
      sharedUserName:sharedUserName,     
    }))
}))
var idincrement3=0;
const unSharedUsersList= response.data.map(({ownerId,unSharedUsersList}) => ({
  ownerId:ownerId,
  unSharedUsersList:unSharedUsersList.map(({userid,username}) => ({
      id:"dataid3"+(idincrement3++),
      unSharedUserId:userid,
      unSharedUserName:username,     
    }))
}))
setData(ownernames);
setData2(sharedUsersList);
setData3(unSharedUsersList);
/*const index = sharedUsersList.findIndex((element) => element.ownerid === sharedUsersList.ownerId);
console.log(index)
console.log(sharedUsersList.[index].sharedUsersList)*/
   })
   .catch(error => {
   console.error(error);
   }) 
 }, []);

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
    { label: 'Option 5', value: 'option5' },
    { label: 'Option 6', value: 'option6' },
    { label: 'Option 7', value: 'option7' },
    { label: 'Option 8', value: 'option8' },
    { label: 'Option 9', value: 'option9' },
  ];
 /*const data2 = [
    { id:"data21",name: "Bob" },
    {id:"data22",name: "Jane" }
  ];*/
  
  function DataRow({ option, onSelect, isChecked  }) {
    return (
      <tr  className="table-row">
      <td className='multicheckbox'>
        <input  type="checkbox" checked={isChecked} onChange={() => onSelect(option.value)} />
        {isChecked && <span className="tick">&#x2713;</span>}
      </td>
      <td className='multitabledata'>{option.label}</td>
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
  


  const handlePageChange = (pageNumber, index,row) => {

    setCurrentPage(pageNumber);
    /*const textboxValue = textboxValues[row.id] ? textboxValues[row.id][index] : [];
    const indexOfLastItem = pageNumber * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOptions = textboxValue.slice(indexOfFirstItem, indexOfLastItem);
    setSelectedOptionsmulti(currentOptions);*/
  
    setPaginationIndex((prevPaginationIndex) => ({
      ...prevPaginationIndex,
      [row.id]: pageNumber,
    }));
  
  };

 /* const handleInputChange = (event, row, index) => {
    const value = event.target.value;
  
    const newTextboxValues = { ...textboxValues };
  
    if (!newTextboxValues[row.id]) {
      newTextboxValues[row.id] = {};
    }
  
    if (!newTextboxValues[row.id][index]) {
      newTextboxValues[row.id][index] = [];
    }
  
    newTextboxValues[row.id][index] = [value]; // Store the value as an array
  
    setTextboxValues(newTextboxValues);
  };*/
  
  

  
 

  const handleSelect = (value,row,index) => {
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
  };



  



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
   console.log(row.id)
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
    const newStates = [...rowStates];
    newStates[index] = !newStates[index];
    setRowStates[index](newStates[index]);
    console.log(newStates[index])
  /*  if(rowStates[index]===false){
      setRowStates[index]=true;
      console.log("true")
      }
      else if(rowStates[index]===true){
        setRowStates[index]=false;
        console.log("false")
      }*/

    setIsSetYes(!isSetYes);
  };
  const [rowStates, setRowStates] = useState(data.map(() => false));
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
          const defaultSharing = row.defaultSharing; 
          if(defaultSharing===0){
            rowStates[index]=false;
            console.log("0")
            }
            else if(defaultSharing===1){
              rowStates[index]=true;
              console.log("1")
            }      
          return (          
            <div className="buttons-defaultsharing">
        <button className={rowStates[index] ?"yes":"no"} onClick={() =>handleButtonClick(index,row)}>
                 {rowStates[index] ? "Yes" : "No"}
                </button>
               </div>
          );
         }
      }

  ];
  const columns2 = [
    {
   name: 'Access User',
   selector: 'sharedUserName',
   sortable: true,   
 },
 {
  name: "Textbox",
  cell: (row,index) => {
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

    return (
    <div className='mouselinetableinput'>
    <input
      type="text"
      value={textboxValues[row.id] ? currentOptions : []}
      onClick={() => handleInputClick(row, index)}
      //onChange={() => handleInputChange( row, index)}
      //ref={textBoxRef}
      readOnly
    />

    <div className="buttons-container">
       <button className="plusbutton" onClick={() => handlePageChange(currentPage + 1, index,row)} disabled={ currentPage === totalPages || (activeRowIndex !== index) || activeRow.id !== row.id}> 
       <span className='plusbuttonlabel'>+ </span>
       </button>
       <button className="minusbutton"  onClick={() => handlePageChange(currentPage - 1, index,row)}  disabled={ currentPage === 1 || (activeRowIndex !== index) || activeRow.id !== row.id}>
       <span className='plusbuttonlabel'>-</span>
       </button>
       {activeRowIndex === index && activeRow.id === row.id ?
       <span className='recordcount'>{Math.min(indexOfLastItem,textboxValue.length)}/{textboxValue.length}</span>
       :<span className='recordcount'> {Math.min(indexOfLastItem,textboxValue.length)}/{textboxValue.length} </span>}
        </div>
    {activeRowIndex === index && isTableVisible && activeRow.id === row.id && (     
      <table className='mouselinetable' ref={tableRef}>
          <tbody className='mouselinetablebody'>
            {filteredOptions.map((option) => (
              <DataRow
                key={option.value}
                option={option}
                className="mouselinetablecheckbox"
                onSelect={() => handleSelect(option.value, row,index)}
                isChecked={(textboxValues[row.id] ? textboxValues[row.id][index] : []).includes(option.value)}
              />
            ))}
          </tbody>
        </table>
         )}
         </div>
    );
   }
},
 {
  name: 'View',
  selector: '',
    
},
{
  name: 'Edit',
  selector: '',
   
},
{
  name: 'Create',
  selector: '',
     
},
{
  name: 'Transfer', 
  selector: '',
  
}
]; 
const columns3 = [
  {
 name: 'Access User',
 selector: 'unSharedUserName',
 sortable: true,   
},
{
name: 'View',
selector: '',
  
},
{
name: 'Edit',
selector: '',
 
},
{
name: 'Create',
selector: '',
   
},
{
name: 'Transfer',
selector: '',

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
    const newSelectedRows1 = selectAll1 ? [] : [...data2];
    setSelectedRows1(newSelectedRows1);
    setSelectAll1(!selectAll1);
  };  

  const handleDropdownClick = () => {
    setShowTable(!showTable);
  };
  const handleSelectAll2 = () => {
    const newSelectedRows2 = selectAll2 ? [] : [...data3];
    setSelectedRows2(newSelectedRows2);
    setSelectAll2(!selectAll2);
  };
  const handleDropdownClick1 = () => {

    setShowTable1(!showTable1);
  };
  const handleRowSelecteddrop = (row) => {
   if (selectedRow === row) {
      // If the selected row is already expanded, close it
      setSelectedRow(null);
    } else {
      // Otherwise, expand the selected row
      setSelectedRow(row); 
    }
  };
  const renderDropdown2 = (row) => {
    if (selectedRow === row) {
       // If the selected row is already expanded, close it
       setSelectedRow(null);
     } else {
       // Otherwise, expand the selected row
       setSelectedRow(row); 
     }
     return (
      <>
        <div className='seconddrop'>test</div>
        </>
     )
   };

 const expandedRows2 = selectedRowsTable.map((row) => ( 
   <tr key={`${row.id}-expanded`}>            
      <td colSpan={columns2.length + 1}>{renderDropdown2(row)}</td>
 </tr>
  )); 
 


  const renderDropdown = (row) => {    
    var rowId;  
    var index;   
    if(row.data){      
     rowId=row.data.id;
    setSelectedRowId(row.data.id);  
     index = data2.findIndex((element) => element.ownerId === row.data.ownerId);
    }    
    else if(!row.data){
      rowId=row.id;
      setSelectedRowId(row.id);
      index = data2.findIndex((element) => element.ownerId === row.ownerId);
    }
    var rowId2;  
    var index2;   
    if(row.data){      
     rowId2=row.data.id; 
     index2 = data3.findIndex((element) => element.ownerId === row.data.ownerId);
    }    
    else if(!row.data){
      rowId2=row.id;
      index2 = data3.findIndex((element) => element.ownerId === row.ownerId);
    }
    console.log(data3)
    console.log(index2)
    console.log(data3[index2].unSharedUsersList)
    const remainingItems = data.filter((item) => item.id !== rowId);
    return (
      <> 
      <div className='emptyheight1'></div>
      <div className='tableSelectAll2'>
      <div className="line3"></div>
      <input className="selectall1" type="checkbox" checked={selectAll1} onChange={handleSelectAll1} />
        <img className={showTable?"dropdownrotate1" : "dropdown1"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick} />
        <span className='access1'>Access User</span>
        <span className='view1'>View</span>
        <span className='edit1'>Edit</span>
        <span className='create1'>Create</span>
        <span className='transfer1'>Transfer</span>
        </div>   
        {showTable && (
      <DataTable      
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
              <button className='plustodown' onClick={() => handleRowSelecteddrop(row)}>+</button>
              </div>
            ),
            allowOverflow: true,
            button: true,
            //width: "5%"
          },
          ...columns2,
        ]}
        data={data2[index].sharedUsersList}
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
        selectableRowsClear={() => setSelectedRows1([])}
        className="my-custom-tableinside"
        expandableRows 
        expandableRowsComponent={renderDropdown2}
        expandableRowsVisibleOnly
        expandableRowsExpanded={expandedRows2} 
        onRowExpandToggled={(expanded, row) => {
          if (!expanded) {
            // do something when the dropdown is collapsed
            setSelectedRowId(null)
            console.log(`The dropdown for row ${row.id} is now collapsed.`);
          }
        }}      
        /> 
        )}
        <div className='emptyheight2'></div>
        <div className='tableSelectAll3'>
        <div className="line4"></div> 
      <input className="selectall2" type="checkbox" checked={selectAll2} onChange={handleSelectAll2} />
      <img className={showTable1?"dropdownrotate2" : "dropdown2"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick1} />
        <span className='access2'>User you want to share with</span>
        <span className='view2'>View</span>
        <span className='edit2'>Edit</span>
        <span className='create2'>Create</span>
        <span className='transfer2'>Transfer</span>
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
        expandableRows
        className="my-custom-tableinside2"
        />       
        )}
        <div className='emptyheight3'></div>
   </>
    ); 
   
  }; 
   
 const expandedRows = selectedRowsTable.map((row) => ( 
   <tr key={`${row.id}-expanded`}>            
      <td colSpan={columns.length + 1}>{renderDropdown(row)}</td>
 </tr>
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
            console.log(`The dropdown for row ${row.id} is now collapsed.`);
          }
        }}
        className="my-custom-table"
        />  
 
    

    </div>
  );
}

export default Useraccess;

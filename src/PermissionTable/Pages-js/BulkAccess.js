import React, { useState,useEffect  } from 'react';
import '../Pages-css/BulkAccess.css';
import DataTable from "react-data-table-component";
import Select, { components } from 'react-select'; 
import dropdown from '../Logos/dropdown.svg'
import userpagelogo from '../Logos/userpagelogo.svg'
import searchlogo from '../Logos/searchlogo.svg'
import checkboxsymbol from '../Logos/checkboxsymbol.svg'
import BAModal from 'react-modal';
import {BulkAccess_URL,BulkAccessPost_URL} from '../Pages-js/URL';
import  requiredstar from'../Logos/requiredstar.svg'
import axios from 'axios';



function BulkAccess() {
  const [selectedRowsTable, setSelectedRowsTable] = useState([]);
  const [selectedRowsTable2, setSelectedRowsTable2] = useState([]);
  const [selectedRowsTable3, setSelectedRowsTable3] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRows1, setSelectedRows1] = useState([]);
  const [selectedRows2, setSelectedRows2] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAll2, setSelectAll2] = useState(false);
  const [selectAll3, setSelectAll3] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [filterText2, setFilterText2] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectOptions, setSelectOptions] = useState([]);
  const [selectOptionsValue, setSelectOptionsValue] = useState("");
  const [selectedOptionsIndex, setSelectedOptionsIndex] = useState("");
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showData, setShowData] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTable1, setShowTable1] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState("");
  const [isSelectValue, setIsSelectValue] = useState(true);
  const [isSelectRow, setIsSelectRow] = useState(true);
  const [isSelectRow2, setIsSelectRow2] = useState(true);
  const [dataHoldingList,setDataHoldingList]=useState([]);
  const [accessGroupList,setAccessGroupList]=useState([]);



  const options = [
    { value: '0', label: 'View' },
    { value: '1', label: 'Edit' },
    { value: '2', label: 'Create' },
    { value: '3', label: 'Transfer' }
    // Add more options as needed
  ];
  useEffect(() => {
     // Call the API using Axios for AdminName
     const url=`${BulkAccess_URL}`;
     axios.get(url)
     .then(response => { 
       console.log(response.data)
           const dataholdingusers = response.data.dataHoldingUsersList.map(({userid,username}) => ({
                id: userid,
                name: username,
      }))
      const accessgroupusers = response.data.accessOnlyUsersList.map(({userid,username}) => ({
        id: userid,
        name: username,
}))
      setDataHoldingList(dataholdingusers)
      setAccessGroupList(accessgroupusers)
     })
     .catch(error => {
     console.error(error);
     }) 
   }, []);

  /* Select option*/
const handleChange = (selectedOptions) => {
  setSelectedOptions(selectedOptions);
  if(selectedOptions.length!==0){
    setIsSelectValue(true);
  } 
    const Options=selectedOptions.map(options => options.label);
    setSelectOptions(selectedOptions.map(options => options.value));
    setSelectedOptionsIndex(selectedOptions.index);
    setSelectOptionsValue(Options);
  };
  
  /* select arrow style change*/
  const handleMenuOpen = () => {
    setMenuIsOpen(true);
  };
  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };
  /* custom styles for React-Select*/
  const customStyles = (menuIsOpen) => ({
    indicatorSeparator: () => ({ display: 'none' }),
    control: (provided, state) => ({
        ...provided,
        height:'auto',
        overflow:'visible',
        marginTop:'-26px',
        borderColor: isSelectValue === true ?  '#E3E3E3 !important' : '#E43626 !important',             
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#000000',
        boxShadow: 'none !important',
        ':hover': {
            boxShadow: 'none !important'
          }
      }),
    placeholder: (provided, state) => ({
        ...provided,
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#000000'
      }),
      menu: (provided, state) => ({
        ...provided,
        top:'5px',
        position: 'absolute',     
      }),
      menuList: (provided, state) => ({
        ...provided,
      // reduce the width of the scrollbar on the Y-axis
      '&::-webkit-scrollbar': {
        width: '5px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '10px',
      },
      }),
    option: (provided, state) => ({
      ...provided,
      borderBottom: '2px solid #F5F5F5',
      borderRadius:0,
      backgroundColor:'white',
      ':hover': {
        backgroundColor: '#F5F5F5',
      },
      color: state.isSelected ? '#000000' : '#000000',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '19px',     
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      color:'transparent !important',
      //content: "'\\25BC'",
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display:'none',
    }),
    dropdownIndicator: (provided,state) => ({
      ...provided,
      color: state.isFocused ? 'transparent' : 'transparent',
      cursor: 'pointer',
    transition: 'all 0.2s',
    ':hover': {
      color: 'transparent',
    },
    ':active': {
      color: 'transparent',
    },
      '&:before': {
        content: "'\\25BC'",
        color: '#25213B',
        width: '18px',
        height: '5px',
        //fontSize: '1.5rem',
        marginRight: '-18px',
        transform: menuIsOpen ? 'rotate(180deg)' : null,
        transformOrigin: 'center',
        marginTop: menuIsOpen ? '14px' : '1px',
        marginBottom: menuIsOpen ? '4px' : '0',        
      },
    }),
  });

  const data = dataHoldingList;
  const data2 = dataHoldingList;
  const data3=accessGroupList;
  const columns = [
         {
        name: 'Name',
        selector: 'name',
        sortable: true,  
        
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
    if(newSelectedRows.length !==0){
      setIsSelectRow(true);
      }
    if (newSelectedRows.length === data.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  };  

  
  const isRowSelected = (row) => {
    return selectedRowsTable.findIndex((r) => r.id === row.id) > -1;
    setIsClicked(true);
  };
  const handleSelectAll = () => {
    const newSelectedRows = selectAll ? [] : [...data];
        if(newSelectedRows.length !==0){
      setIsSelectRow(true);
      }
    setSelectedRowsTable(newSelectedRows);
    setSelectAll(!selectAll);
  };
  const filteredData2 = data2.filter(row =>
    row.name.toLowerCase().includes(filterText2.toLowerCase())
  );
  const filteredData3 = data3.filter(row =>
    row.name.toLowerCase().includes(filterText2.toLowerCase())
  );

  const handleFilter2 = (e) => {
    const value = e.target.value;
    setFilterText2(value);
  };

  const handleRowSelected2 = (row) => {
    const newSelectedRows = [...selectedRowsTable2];
    const index = newSelectedRows.findIndex((r) => r.id === row.id);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRowsTable2(newSelectedRows);
    if(newSelectedRows.length !==0){
      setIsSelectRow2(true);
      }
      else{
        setIsSelectRow2("");
      }
    if (newSelectedRows.length === data2.length) {
      setSelectAll2(true);
    } else {
      setSelectAll2(false);
    }
  };  

  
  const isRowSelected2 = (row) => {
    return selectedRowsTable2.findIndex((r) => r.id === row.id) > -1;
  };
  const handleSelectAll2 = () => {
    const newSelectedRows = selectAll2 ? [] : [...data2];
    if(newSelectedRows.length !==0){
      setIsSelectRow2(true);
      }
      else{
        setIsSelectRow2("");
      }
    setSelectedRowsTable2(newSelectedRows);
    setSelectAll2(!selectAll2);
  };


  const handleRowSelected3 = (row) => {
    const newSelectedRows = [...selectedRowsTable3];
    const index = newSelectedRows.findIndex((r) => r.id === row.id);    
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRowsTable3(newSelectedRows);
    if(newSelectedRows.length !==0){
      setIsSelectRow2(true);
      }
      else{
        setIsSelectRow2("");
      }
    if (newSelectedRows.length === data3.length) {
      setSelectAll3(true);
    } else {
      setSelectAll3(false);
    }
  };  

  
  const isRowSelected3 = (row) => {
    return selectedRowsTable3.findIndex((r) => r.id === row.id) > -1;
  };
  const handleSelectAll3 = () => {
    const newSelectedRows = selectAll3 ? [] : [...data3];
    if(newSelectedRows.length !==0){
      setIsSelectRow2(true);
      }
      else{
        setIsSelectRow2("");
      }
    setSelectedRowsTable3(newSelectedRows);
    setSelectAll3(!selectAll3);
   };

  const handleDropdownClick = () => {
    setShowTable(!showTable);
  };
 
  const handleDropdownClick2 = () => {
    setShowTable1(!showTable1);
  };
  const renderDropdown = (row) => {    
    var rowId;     
    if(row.data){      
     rowId=row.data.id;
    setSelectedRowId(row.data.id);    
    }    
    else if(!row.data){
      rowId=row.id;
      setSelectedRowId(row.id);
    }

  
    const remainingItems = data.filter((item) => item.id !== rowId);
 
   
  }; 
 const expandedRows = selectedRowsTable.map((row) => ( 
   {/* <tr key={`${row.id}-expanded`}>            
      <td colSpan={columns.length + 1}>{renderDropdown(row)}</td>
 </tr>*/}
  )); 

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
        <div className='selections'>Are you sure want to grant these permissions</div>
        <div className='options'>
         <span className='optionslabel'> 
                  <ul className="items-list">
                    {selectOptionsValue.map((item) => (
                      <li className='items' key={item}>{item}</li>
                    ))}
                  </ul>
          </span>
          </div>
        <div className='from'>From</div>
        <div className="popuptable-container">
        <table className='popuptable1'>
      <tbody>
        {selectedRowsTable.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
        <div className='to'>To</div>
        <div className="popuptable-container">
        <table className='popuptable1'>
      <tbody>
        {selectedRowsTable2.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
          </tr>
        ))}
          {selectedRowsTable3.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
        <button className='yesbutton' onClick={onConfirm}>Yes</button>
        <button className='nobutton' onClick={onClose}>No</button>
        </BAModal>
    );
    };

    const handleSubmit = () => {
    /*  setIsSelectValue(true);
      setIsSelectRow(true);
      setIsSelectRow2(true);*/
        if(selectOptions.length===0 && selectedRowsTable2.length ===0 && selectedRowsTable3.length ===0 && selectedRowsTable.length ===0){
        setIsSelectValue(false);
        setIsSelectRow(false);
        setIsSelectRow2(false);
        }
        else {        
        if(selectOptions.length ===0)
        {
            setIsSelectValue(false);
            if(selectedRowsTable.length ===0){
              setIsSelectRow(false);
            }
            if((selectedRowsTable2.length ===0 && selectedRowsTable3.length ===0)){
              setIsSelectRow2(false);
            }

        }
        if(selectedRowsTable.length ===0)
        {
          setIsSelectRow(false);
            if(selectOptions.length ===0){
              setIsSelectValue(false);
            }
            if(selectedRowsTable2.length ===0 && selectedRowsTable3.length ===0){
              setIsSelectRow2(false);
            }
        }
        if(selectedRowsTable2.length ===0 && selectedRowsTable3.length ===0)
        {
          setIsSelectRow2(false);
            if(selectOptions.length ===0){
              setIsSelectValue(false);
            }
            if(selectedRowsTable.length ===0){
              setIsSelectRow(false);
            }
        }
      }
      if(selectOptions.length!==0 && (selectedRowsTable2.length !==0 || selectedRowsTable3.length !==0) && selectedRowsTable.length !==0){
          setIsConfirmationOpen(true);
          setIsSelectValue(true);
          setIsSelectRow(true);
          setIsSelectRow2(true);
          window.scrollTo(0, window.pageYOffset + 400);
        }
      };
    
      const handleConfirm = () => {
       // setIsUpdateSuccessful(true);
        setIsConfirmationOpen(false);
        // Perform submit action
         // Call the API using Axios
         const ownerids = selectedRowsTable.map(item => item.id);
         const dataHoldingUserIds = selectedRowsTable2.map(item => item.id);
          const accessUserIds = selectedRowsTable3.map(item => item.id);
          const mergedArrayUserIds = [...dataHoldingUserIds, ...accessUserIds];
            const permissions =selectOptions;       
         const url=`${BulkAccessPost_URL}`;
         axios.post(url,{
        ownerIds:ownerids,
        accessUserIds:mergedArrayUserIds,
        permissions:permissions
      }) 
         .then(response => {
          console.log(response.data)
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
         });
      };
    
      const handleClose = () => {
        setIsConfirmationOpen(false);
      };

  return (
    <div className='bulkpanel'>
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
    <Select
    options={options}
    isMulti
    value={selectedOptions}
    className={"my-select-class"}
    placeholder="Select User Permission"
    onChange={handleChange}
    styles={customStyles(menuIsOpen)}
    onMenuOpen={handleMenuOpen}
    onMenuClose={handleMenuClose}
    />
    <div className={isSelectValue?'selectnotrequire':'selectrequire'}>
    <img className='requirelogo'src={`${process.env.PUBLIC_URL}js/permissions/media/requirelogo.8cf0c0632507087b71a289a8b2a8285b.svg`} alt="requirelogo" />
    <div className='requirelabel'>This field is required</div>
    </div> 
    <button  onClick={handleSubmit} className='submitbutton'>
    <span className='submitlabel'>
     Submit
     </span>
    </button>
    { isConfirmationOpen ?
    <div className='confirmationpopup'>
    <ConfirmationDialog
        isOpen={isConfirmationOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>:null
    }
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
        <span className='searchlogo'>
        <img src={`${process.env.PUBLIC_URL}js/permissions/media/searchlogo.71d32400eb7b53ffda5d.svg`} alt="upload" />
        </span>
      </div>
      <div className="tableSelectAll">
        <input className={selectAll?"selectall":"noselectall"} type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <label>{selectAll ? '' : '-'}</label>
        <img className='requiredstar' src={`${process.env.PUBLIC_URL}js/permissions/media/requiredstar.269148425daa552fffa152749bb7b46b.svg`} alt="requiredstar" />
        <span className='header' >Select the User whose data you wish to share :</span>
        <div className={isSelectRow?'rownotrequire':'rowrequire'}>
        <img className='requirelogo'src={`${process.env.PUBLIC_URL}js/permissions/media/requirelogo.8cf0c0632507087b71a289a8b2a8285b.svg`} alt="requirelogo" />
        <div className='requirelabel'>This field is required</div>
        </div>       
    </div>
    </div>
    
      <DataTable      
        columns={[
            
          {
            cell: (row) => (
              <div style={{ display: selectedRowId === row.id ? 'none' : 'block' }}>
              <input
              className={isClicked?'itemcheckboxtabel1clicked' :'itemcheckboxtabel1'}             
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
        highlightOnHover
        paginationTotalRows={(data.length)}
        pagination={true}
        //paginationPerPage={10}
        paginationRowsPerPageOptions={[5,10,15]}
        paginationComponentOptions={{
          rowsPerPageText: 'Records per page:',
          rangeSeparatorText: 'out of',
        }}
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRowsTable([])}
        //expandableRows
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
    


   
    <div className='tablepanel2'>        
    <div className='tablesearch2'>
        <input
          type="text"
          placeholder="search"
          value={filterText2}
          onChange={handleFilter2}
          className='tablesearchbox'
        />
        <span className='searchlogo'>
        <img src={`${process.env.PUBLIC_URL}js/permissions/media/searchlogo.71d32400eb7b53ffda5d.svg`} alt="upload" />
        </span>
      </div>
      <div className='tabletitle1'>
      <img className='requiredstar' src={`${process.env.PUBLIC_URL}js/permissions/media/requiredstar.269148425daa552fffa152749bb7b46b.svg`} alt="requiredstar" />
       <span className='tabletitle1label'> Select the User you want to share with :</span>
      </div>

      <div className="tableSelectAll">
      <img className={showTable?"dropdownrotate1" : "dropdown1"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick} />
        <input style={{ visibility: showTable? 'visible' : 'hidden' }} className={selectAll2?"selectall2":"noselectall2"} type="checkbox" checked={selectAll2} onChange={handleSelectAll2} />
        <label>{selectAll2 ? '' : '-'}</label>              
        <span className='header' >Data Holding Group</span>
        <div className={(isSelectRow2===false)?'row2require':'row2notrequire'}>
      <img className='requirelogo'src={`${process.env.PUBLIC_URL}js/permissions/media/requirelogo.8cf0c0632507087b71a289a8b2a8285b.svg`} alt="requirelogo" />
      <div className='requirelabel'>This field is required</div>
      </div> 
    </div>
    </div>
    {showTable && (
      <div className='table2'>
      <DataTable      
        columns={[
            
          {
            cell: (row) => (
              <div style={{ display: selectedRowId === row.id ? 'none' : 'block' }}>
              <input
              className='itemcheckbox'              
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
          ...columns,
        ]}
        conditionalRowStyles={[
          {
            when: row => selectedRowId === row.id,
            style: {
              backgroundColor: '#E5E5E5',
            }
          },
          {
            when: row => (row.name === "Me" ), 
            style: {
              display: "none"
              
            }
          }
        ]}
        data={filteredData2}
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRowsTable([])}
       // expandableRows
        expandableRowsComponent={renderDropdown}
        expandableRowsVisibleOnly
        expandableRowsExpanded={expandedRows} 
        onRowExpandToggled={(expanded, row) => {
          if (!expanded) {
            // do something when the dropdown is collapsed
            setSelectedRowId(null)
          }
        }}
        className="my-custom-table2"
        />  
        </div>
        )}


      <div className={showTable?'tablepanel3':'tablepanel3less'}>   
      <div className="tabletitle"></div>      
      <div className="tableSelectAll">
      <img className={showTable1?"dropdownrotate2" : "dropdown2"} src={`${process.env.PUBLIC_URL}js/permissions/media/dropdown.54f3e29fc5039e44a7463745979b0cfe.svg`} alt="Dropdown" onClick={handleDropdownClick2} />
        <input style={{ visibility: showTable1? 'visible' : 'hidden' }} className={selectAll3?"selectall3":"noselectall3"} type="checkbox" checked={selectAll3} onChange={handleSelectAll3} />
        <label>{selectAll3 ? '' : '-'}</label>      
        <span className='header' >Access Only Group</span>       
    </div>
    </div>
    <div className={!showTable1?'borderclass':'noborderclass'}></div>
    {showTable1 &&(
      <div className='table3'>
      <DataTable      
        columns={[
            
          {
            cell: (row) => (
              <div style={{ display: selectedRowId === row.id ? 'none' : 'block' }}>
              <input
              className='itemcheckbox'              
                type="checkbox"
                onChange={() => handleRowSelected3(row)}
                checked={isRowSelected3(row)}
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
        data={filteredData3}      
        noHeader={false}
        persistTableHead
        dense
        selectableRowsVisibleOnly
        selectableRowsHighlight
        selectableRowsSingle
        selectableRowsClear={() => setSelectedRowsTable([])}
        //expandableRows
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
        className={showTable?"my-custom-table3":"my-custom-table3less"}
        />  
        </div>  
    )}
        <div className='tablepanel4'></div>
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

export default BulkAccess;

import React, { useState,useEffect,useMemo  } from 'react';
import '../Pages-css/Useraccess.css';
import DataTable from "react-data-table-component";
import Select from 'react-select'; 
import dropdown from '../Logos/dropdown.svg'
import userpagelogo from '../Logos/userpagelogo.svg'
import searchlogo from '../Logos/searchlogo.svg'

function Useraccess() {
  const [selectedRowsTable, setSelectedRowsTable] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
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
  const [options, setOptions] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [showData, setShowData] = useState(true);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [showTable1, setShowTable1] = useState(false);

 


  /* Select option*/
const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectOption(selectedOption.value);
    setSelectedOptionIndex(selectedOption.index);
     
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
        height:'35px',
        borderColor: '#E3E3E3 !important',             
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
        top:'38px',
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
      borderBottom: '1px solid #F5F5F5',
      borderRadius:0,
      backgroundColor:'white',
      ':hover': {
        backgroundColor: '#F5F5F5',
      },
      color: state.isSelected ? '#000000' : '#000000',
      fontFamily: 'Roboto',
      fontStyle: 'normal',
      fontWeight: '400',
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

  const data = [
    { id: "i1", name: "John" },
    { id: "i2", name: "Jane" },
    { id: "i3", name: "Bob" },
    { id: "i4", name: "Alice" }
  ];
  const data2 = [
    { accessuserid:"i1",name: "Bob" },
    {accessuserid:"i2",name: "Jane" }
  ];
  const data3 = [
    { accessuserid:"i3",name: "John" },
    {accessuserid:"i4",name: "Alice" }
  ];
  
  const columns = [
         {
        name: 'Name',
        selector: 'name',
        sortable: true,  
        
      }

  ];
  const columns2 = [
    {
   name: 'Access User',
   selector: 'name',
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
const columns3 = [
  {
 name: 'Access User',
 selector: 'name',
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
    console.log(selectedRowsTable)
    return selectedRowsTable.findIndex((r) => r.id === row.id) > -1;
  };
  const handleSelectAll = () => {
    const newSelectedRows = selectAll ? [] : [...data];
    setSelectedRowsTable(newSelectedRows);
    setSelectAll(!selectAll);
  };



  const handleRowSelected1 = (row) => {
    const newSelectedRows = [...selectedRows1];
    const index = newSelectedRows.findIndex((r) => r.accessuserid === row.accessuserid);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRows1(newSelectedRows);
   
  };  
  const isRowSelected1 = (row) => {
    return selectedRows1.findIndex((r) => r.accessuserid === row.accessuserid) > -1;
  };


  const handleRowSelected2 = (row) => {
    const newSelectedRows = [...selectedRows2];
    const index = newSelectedRows.findIndex((r) => r.accessuserid === row.accessuserid);
    if (index > -1) {
      newSelectedRows.splice(index, 1);
    } else {
      newSelectedRows.push(row);
    }
    setSelectedRows2(newSelectedRows);
  };  
  const isRowSelected2 = (row) => {
    console.log(selectedRows2)
    return selectedRows2.findIndex((r) => r.accessuserid === row.accessuserid) > -1;
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
    return (
      <> 
      <div className='emptyheight1'></div>
      <div className='tableSelectAll2'>
      <div className="line3"></div>
      <input className="selectall1" type="checkbox" checked={selectAll1} onChange={handleSelectAll1} />
        <img className={showTable?"dropdownrotate1" : "dropdown1"} src={dropdown} alt="Dropdown" onClick={handleDropdownClick} />
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
              </div>
            ),
            allowOverflow: true,
            button: true,
            //width: "5%"
          },
          ...columns2,
        ]}
        data={data2}
        defaultSortField="accessuserid"
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
        /> 
        )}
        <div className='emptyheight2'></div>
        <div className='tableSelectAll3'>
        <div className="line4"></div> 
      <input className="selectall2" type="checkbox" checked={selectAll2} onChange={handleSelectAll2} />
      <img className={showTable1?"dropdownrotate2" : "dropdown2"} src={dropdown} alt="Dropdown" onClick={handleDropdownClick1} />
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
          ...columns2,
        ]}
        data={data3}
        defaultSortField="accessuserid"
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
   {/* <tr key={`${row.id}-expanded`}>            
      <td colSpan={columns.length + 1}>{renderDropdown(row)}</td>
 </tr>*/}
  )); 

  return (
    <div className='userpanel'>
    <div className='submitsection'>
        <div className='userlogo'>
        <img src={userpagelogo} alt="upload" />
        <span className='userlogolabel'>Users Access</span>
        </div>
    </div>
    <div className='selectandsubmit'> 
    <div className='title'>
     <span className='titlelabel'> Grant Permission To Users:</span>
    </div>
    <Select
    options={options}
    value={selectedOption}
    className={"my-select-class"}
    placeholder="Select User Permission"
    onChange={handleChange}
    styles={customStyles(menuIsOpen)}
    onMenuOpen={handleMenuOpen}
    onMenuClose={handleMenuClose}
    />
    <button  href="#" className='submitbutton' data-id="file-upload">
    <span className='submitlabel'>
     Submit
     </span>
    </button>
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
        <span className='searchlogo'></span>
      </div>
      <div className="tableSelectAll">
        <input className="selectall" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
        <span className='header' >Users Name</span>       
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

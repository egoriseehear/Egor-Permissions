import React,{ useState,useEffect}from 'react'
import Select from 'react-select';
import '../Pages-css/GeneralAccess.css';
import generalaccessblack from'../Logos/generalaccessblack.svg'
import requirelogo from'../Logos/requirelogo.svg'
import GAModal from 'react-modal';
import axios from 'axios';
import {GeneralAccess_URL} from '../Pages-js/URL';


function GeneralAccess() {
    const [selectedOption, setSelectedOption] = useState("");
    const [selectOption, setSelectOption] = useState("");
    const [selectedOptionIndex, setSelectedOptionIndex] = useState("");
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isUpdateSuccessful, setIsUpdateSuccessful] = useState(false);
    const [isSelectValue, setIsSelectValue] = useState(true);


    const options = [
        { value: '0', label: 'Private' },
        { value: '1', label: 'View Only' },
        { value: '2', label: 'Edit' },
        { value: '3', label: 'Edit+Create' },
        { value: '4', label: 'Edit+Create+Transfer'},
      ];

  /* Select option*/
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectOption(selectedOption.value);
    setSelectedOptionIndex(selectedOption.index);
    if(selectedOption!==""){
        setIsSelectValue(true);
        }
        else{
            setIsSelectValue(false);
        }     
  };
  console.log(selectOption)
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
        borderColor: isSelectValue === true ?  '#E3E3E3 !important' : 'red !important',             
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
        borderWidth: '2px 2px',
        borderStyle: 'solid',
        borderColor: '#D5D5D5'
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
      borderBottom: '2px solid #D4D4D4',
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

  /*Submit Button Popup*/
  GAModal.setAppElement('#root'); // Set the root element for accessibility

    const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
    return (
        <GAModal
        className="GAModal"
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Confirmation Dialog"
        >
        <p>Are you sure to save all changes?</p>
        <button className='yesbutton' onClick={onConfirm}>Yes</button>
        <button className='nobutton' onClick={onClose}>No</button>
        </GAModal>
    );
    };

    const handleSubmit = () => {
        console.log(selectOption);
        if(selectedOption!==""){
        setIsConfirmationOpen(true);
        setIsSelectValue(true);
        }
        else{
            setIsSelectValue(false);
        }
      };
    
      const handleConfirm = () => {
        // Perform submit action
         // Call the API using Axios
         const url=`${GeneralAccess_URL}/${selectOption}`;
         axios.get(url)
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
    <div className='userpanelGA'>
    <div className='submitsection'>
        <div className='generalaccessblacklogo'>
        <img src={`${process.env.PUBLIC_URL}js/permissions/media/generalaccessblack.4cf1611eaf2fb682abd750f36a35c162.svg`} alt="generalaccessblacklogo" />
        <span className='generalaccessblacklogolabel'>General Access</span>
        </div>
    </div>
    <div className='selectandsubmitboxGA'>
    <div className='selectandsubmit'> 
    <div className='title'>
     <span className='titlelabel'> Set the default sharing permission</span>
     <span className='titlelabel2'> for all users in the Group:</span>
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
    </div>
    {isUpdateSuccessful && (
        <div className="success-modal">
          <span className="close-symbol" onClick={() => setIsUpdateSuccessful(false)}>X</span>
          <h1>Update successful</h1>
          <h2>The update operation completed successfully</h2>
        </div>
      )}
    </div>
  )
}

export default GeneralAccess
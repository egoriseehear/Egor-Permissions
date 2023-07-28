import React from "react";
import protocolaccessnoborderlogo from "../Logos/protocolaccessblack.svg";
import infoLogo from "../Logos/info.svg";
import infoBigLogo from "../Logos/infoBig.svg";
import viewLogo from "../Logos/view.svg";
import viewWhiteLogo from "../Logos/viewWhite.svg";
import greenCheckLogo from "../Logos/greenChecked.svg";
import grayUncheckLogo from "../Logos/grayUnchecked.svg";
import Switch from "@mui/material/Switch";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import EditOffIcon from "@mui/icons-material/EditOff";
import WidgetsIcon from "@mui/icons-material/Widgets";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { IconButton } from "@mui/material";
import DataTable from "react-data-table-component";
import api from "../SetFieldAccess/userHolder";
import apiUrl from "./protocolUrl";
import "../SCSS/main.scss";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const ProtocolAccess = () => {
  const [userHolder, setUserHolder] = React.useState([]);
  const [protocols, setProtocols] = React.useState([]);
  const [protocolAccessId, setProtocolAccessId] = React.useState([]);
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const [editButton, setEditButton] = React.useState(1);
  const [viewButton, setViewButton] = React.useState(1);
  const [notesButton, setNotesButton] = React.useState(1);
  const [assignButton, setAssignButton] = React.useState(1);
  const [createButton, setCreateButton] = React.useState(1);
  const [adminButton, setAdminButton] = React.useState({});

  const [noteMessage, setNoteMessage] = React.useState(false);
  //   console.log(editButton, "Edit");
  //   console.log(viewButton, "View");
  //   console.log(notesButton, "Notes");
  //   console.log(assignButton, "Assign");
  //   console.log(adminButton, "Admin");
  //   console.log(createButton, "Create");
  const [adminRowIds, setAdminRowIds] = React.useState([]);
  const [createRowIds, setCreateRowIds] = React.useState([]);
  const [adminAccessMessage, setAdminAccessMessage] = React.useState(false);

  const [openProtocolAccessBtn, setOpenProtocolAccessBtn] = React.useState({});
  const [openProtocolAccessBtnId, setOpenProtocolAccessBtnId] =
    React.useState(null);
  const [accessProtocolRowId, setAccessProtocolRowId] = React.useState();
  const [deleteFrame, setDeleteFrame] = React.useState(false);
  //   console.log(adminRowIds);
  //   console.log(createRowIds);
  const [searchName, setSearchName] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(userHolder);

  //   Get All data User Holser
  //   React.useEffect(() => {
  //     const getAllUserData = async () => {
  //       const userHolder = await GetUserDataHolder();
  //       if (userHolder) setUserHolder(userHolder);
  //     };
  //     getAllUserData();
  //   }, []);

  //   const GetUserDataHolder = async () => {
  //     const response = await api
  //       .get("/userDataHolder")
  //       .then((res) => res.data)
  //       .catch((err) => console.log(err));
  //     setUserHolder(response);
  //     const accessProtocolId = response.reduce(
  //       (acc, adminAccess) => ({ ...acc, [adminAccess.id]: adminAccess.admin }),
  //       {}
  //     );
  //     setAdminButton(accessProtocolId);
  //   };

  //   Get All Protocols
  React.useEffect(() => {
    const getAllProtocols = async () => {
      const protocols = await GetProtocols();
      if (protocols) setProtocols(protocols);
    };
    getAllProtocols();
  }, []);

  const GetProtocols = async () => {
    const res = await apiUrl.get("/protocols");
    return res.data;
  };

  //   Handler Switch Buttons Style
  React.useEffect(() => {
    if (editButton === 0) {
      setViewButton(1);
      setNotesButton(1);
    }
  }, [editButton]);

  React.useEffect(() => {
    if (viewButton === 0) {
      setEditButton(1);
    } else {
      setNotesButton(1);
    }
  }, [viewButton]);

  const handleEditButtonClick = () => {
    setEditButton((prevState) => (prevState === 0 ? 1 : 0));
  };
  const handleViewButtonClick = () => {
    setViewButton((prevState) => (prevState === 0 ? 1 : 0));
  };
  const handleNotesButtonClick = () => {
    setNotesButton((prevState) => (prevState === 0 ? 1 : 0));
  };
  const handleAssignButtonClick = () => {
    setAssignButton((prevState) => (prevState === 0 ? 1 : 0));
  };
  const handleResetButtonClick = () => {
    setEditButton(1);
    setViewButton(1);
    setNotesButton(1);
    setAssignButton(1);
    setCreateButton(1);
    setAdminButton(1);
    setAdminRowIds([]);
    setCreateRowIds([]);
  };
  const handleAdminMessage = () => {
    setTimeout(() => {
      setAdminAccessMessage(true);
    }, 500);
    setTimeout(() => {
      setAdminAccessMessage(false);
    }, 3000);
  };
  const handleNoToAdminButtonClick = (row) => {
    handleAdminMessage(row);
    setAdminRowIds((prevSelectedRowIds) => {
      if (prevSelectedRowIds.includes(row.id)) {
        return prevSelectedRowIds.filter((id) => id !== row.id); // Remove the clicked row from the selected rows
      } else {
        return [row.id]; // Add the clicked row to the selected rows
      }
    });

    setAdminButton((prevAdminButton) => ({
      ...prevAdminButton,
      [row.id]: prevAdminButton[row.id] === 0 ? 1 : 0,
    }));
  };

  const handleCreateButtonClick = (row) => {
    setCreateButton((prevState) => (prevState === 0 ? 1 : 0));
    setCreateRowIds((prevSelectedRowIds) => {
      if (prevSelectedRowIds.includes(row.id)) {
        return prevSelectedRowIds.filter((id) => id !== row.id); // Remove the clicked row from the selected rows
      } else {
        return [...prevSelectedRowIds, row.id]; // Add the clicked row to the selected rows
      }
    });
  };

  // Access Users Delete Opening Button
  const HandleProtocolAccessBtn = (row) => {
    setOpenProtocolAccessBtn((prevState) => {
      const updatedState = { ...prevState };
      updatedState[row.id] = !prevState[row.id];

      // Check if another button is currently open and close it
      if (openProtocolAccessBtnId !== false) {
        updatedState[openProtocolAccessBtnId] = false;
      }

      return updatedState;
    });

    if (row.id === openProtocolAccessBtnId) {
      setOpenProtocolAccessBtnId(null);
    } else {
      setOpenProtocolAccessBtnId(row.id);
    }
  };

  // PopUp Delete Scrine
  const HandleFrameClose = () => {
    setDeleteFrame(false);
  };

  const HandleFrameDelete = () => {
    // deleteUsersAccess(accessUserRowId);
    setDeleteFrame(false);
  };

  // Filtering Search Box for Data Holder Users
  const handleSearch = (name) => {
    setSearchName(name);

    const filtered = userHolder.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );

    setFilteredData(filtered);
  };

  React.useEffect(() => {
    const filtered = userHolder.filter((user) =>
      user.name.toLowerCase().includes(searchName.toLowerCase())
    );

    setFilteredData(filtered);
  }, [searchName, userHolder]);

  // Create a Blue Line between Rows
  const generateStylesAccessUser = (row) => {
    if (row.id === protocolAccessId.id) {
      const styles = [];
      for (let i = 0; i < row.protocolAccess.length; i++) {
        styles.push(<div key={i} className="blueStringLine"></div>);
      }
      return styles;
    }
    return null;
  };

  // Columns for Data Holder Users
  const protocolAccess = [
    {
      maxWidth: "0%",
      position: "absolute",
      name: (
        <input
          style={{ position: "absolute", top: "19px", left: "43px" }}
          type="checkbox"
          //   onChange={toggleMasterCheckbox}
          //   checked={isMasterCheckboxSelected}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          className={adminButton[row.id] === 0 ? "hide" : ""}
          //   checked={selectedCheckboxes && selectedCheckboxes.includes(row.id)}
          //   onChange={() => handleCheckBoxChange(row)}
        />
      ),
    },
    {
      width: "1px",
      padding: 0,
      cell: (row) => (
        <div className="blueBorderBranch">{generateStylesAccessUser(row)}</div>
      ),
    },
    {
      marginLeft: "45px",
      name: "Users Name",
      cell: (row) => row.name,
    },
    {
      name: "Protocol Administrators",
      cell: (row) => {
        const isAdmin = adminButton[row.id] === 0;
        return (
          <Button
            style={{ marginLeft: "8rem", zIndex: 1 }}
            checked={adminRowIds.includes(row.id)}
            onClick={() => handleNoToAdminButtonClick(row)}
            className={isAdmin ? "" : "buttonGroup"}
            size="small"
            variant={isAdmin ? "contained" : "outlined"}
            color="success"
          >
            {isAdmin ? "Admin" : "No"}
          </Button>
        );
      },
    },
    {
      name: "Permission",
      cell: (row) => (
        <Button
          style={{ minWidth: "90px", marginLeft: "16rem", zIndex: 1 }}
          onClick={() => handleCreateButtonClick(row)}
          className={
            adminButton[row.id] === 1 && createRowIds.includes(row.id)
              ? ""
              : "buttonGroup" && adminButton[row.id] === 0
              ? "hide"
              : "buttonGroup"
          }
          size="small"
          variant={createRowIds.includes(row.id) ? "contained" : "outlined"}
          color="success"
        >
          {createRowIds.includes(row.id) ? (
            <WidgetsIcon className="iconSize" />
          ) : (
            ""
          )}
          Create
        </Button>
      ),
    },
    {
      cell: (row) => {
        const isAdmin =
          adminButton[row.id] === 0 && adminRowIds.includes(row.id);

        return (
          <div className="fullAccess">
            {adminAccessMessage && isAdmin ? (
              <p className="text">
                Full <span>EDIT, CREATE, ASSIGN</span> access to all Protocols
                in the account
              </p>
            ) : (
              <></>
            )}
          </div>
        );
      },
    },
  ];

  // Columns for Access Protocol
  const accessProtocol = [
    {
      position: "absolute",
      name: (
        <input
          style={{ position: "absolute", top: "19px", left: "44px" }}
          type="checkbox"
          //   onChange={toggleMasterCheckbox}
          //   checked={isMasterCheckboxSelected}
        />
      ),
      cell: (row) => (
        <input
          style={{ justifyContent: "center !important" }}
          type="checkbox"
          //   checked={selectedCheckboxes && selectedCheckboxes.includes(row.id)}
          //   onChange={() => handleCheckBoxChange(row)}
        />
      ),
    },
    {
      name: "Access Protocol",
      cell: (row) => row.name,
    },
    {
      name: "Edit",
      cell: (row) =>
        row.edit === 0 ? (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/greenChecked.3f7f6562ef915c4bc5d351d497fc5b04.svg`} alt="greenCheckLogo" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/grayUnchecked.d9b78781813618118e286b486a2f36ea.svg`} alt="grayUncheckLogo" />
        ),
    },
    {
      name: "View",
      cell: (row) =>
        row.view === 0 ? (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/greenChecked.3f7f6562ef915c4bc5d351d497fc5b04.svg`} alt="greenCheckLogo" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/grayUnchecked.d9b78781813618118e286b486a2f36ea.svg`} alt="grayUncheckLogo" />
        ),
    },
    {
      name: "Notes",
      cell: (row) =>
        row.notes === 0 ? (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/greenChecked.3f7f6562ef915c4bc5d351d497fc5b04.svg`} alt="greenCheckLogo" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/grayUnchecked.d9b78781813618118e286b486a2f36ea.svg`} alt="grayUncheckLogo" />
        ),
    },
    {
      name: "Assign",
      cell: (row) =>
        row.assign === 0 ? (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/greenChecked.3f7f6562ef915c4bc5d351d497fc5b04.svg`} alt="greenCheckLogo" />
        ) : (
          <img src={`${process.env.PUBLIC_URL}js/permissions/media/grayUnchecked.d9b78781813618118e286b486a2f36ea.svg`} alt="grayUncheckLogo" />
        ),
    },
    {
      position: "absolute",
      right: 0,
      cell: (row) => (
        <div className="userHolderBtn">
          {openProtocolAccessBtnId === row.id ? (
            <Button
              onClick={() => {
                setDeleteFrame(true);
                setAccessProtocolRowId(row);
              }}
              className="deleteBtn"
              variant="outlined"
              color="error"
            >
              <DeleteForeverOutlinedIcon className="trashIcon" />
              Delete
            </Button>
          ) : (
            <div></div>
          )}
          <DeleteForeverOutlinedIcon
            className="trashIcon"
            variant="outlined"
            color="error"
            onClick={() => {
              setDeleteFrame(true);
              setAccessProtocolRowId(row);
            }}
          >
            <MoreVertIcon />
          </DeleteForeverOutlinedIcon>
        </div>
      ),
    },
  ];

  const ExpandableAllProtocolAccess = ({ data }) => {
    const allProtocolAccess = data.protocolAccess.map((prot) => {
      return {
        id: prot.id,
        name: prot.protocol,
        edit: prot.edit,
        view: prot.view,
        notes: prot.notes,
        create: prot.create,
        assign: prot.assign,
      };
    });

    React.useEffect(() => {
      UserId(data);
    }, [data]);

    const UserId = (userData) => {
      setProtocolAccessId(userData);
    };

    return (
      <pre className="text">
        {
          <DataTable
            columns={accessProtocol}
            data={allProtocolAccess}
            keyField="id"
            highlightOnHover
          />
        }
      </pre>
    );
  };

  const isRowDisabled = (row) => {
    return !row.protocolAccess || row.protocolAccess.length === 0;
  };

  return (
    <section className="protocolAccess">
      <div className="container">
        <div className="captionTitle">
          <img
            className="protocolaccessblack"
            src={`${process.env.PUBLIC_URL}js/permissions/media/protocolaccessblack.fc014adc64c973b0afdfe9ca4fd9f3a6.svg`}
            alt="protocolaccessblack"
          />
          <h1 className="mainCaption">Protocol Access</h1>
        </div>
        <div className="permissionBox">
          <div className="setProtocolAccess">
            <h2 className="text">Set Protocol Access</h2>
          </div>
          <div className="setProtocolFilter">
            <div className="setProtocolFilterGtoup">
              <div className="filterBox">
                <label className="text" htmlFor="search">
                  Select protocols:
                </label>
                <Autocomplete
                  multiple
                  id="checkboxes-tags-demo"
                  options={protocols}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.title}
                    </li>
                  )}
                  style={{ maxWidth: "500px", minWidth: "190px" }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={"Search options"}
                      placeholder="Protocols"
                    />
                  )}
                />
              </div>
              <div className="SetPermissionButtons">
                {noteMessage ? (
                  <div className="noteDescription">
                    <div className="iconBox">
                      <img
                        src={`${process.env.PUBLIC_URL}js/permissions/media/infoBig.21704e931a5e7ab5be0c11ff32b4278d.svg`}
                        alt="infoBigLogo"
                        className="noteIcon"
                      />
                    </div>
                    <p className="text">
                      If no protocol is selected, and the following permission
                      are chosen, then the selected users will have
                      Assign/Edit/view access to all protocols by default.
                    </p>
                  </div>
                ) : (
                  <></>
                )}
                <h2 className="text">
                  Set permissions:{" "}
                  <img
                    src={`${process.env.PUBLIC_URL}js/permissions/media/info.e6cc76b468fcc2bd9e2f5f637c9ce73d.svg`}
                    alt="infoLogo"
                    onMouseEnter={() => setNoteMessage(true)}
                    onMouseLeave={() => setNoteMessage(false)}
                    className="note iconSize"
                  />
                </h2>
                <Button
                  onClick={handleEditButtonClick}
                  className={editButton === 1 ? "buttonGroup" : ""}
                  size="small"
                  variant={editButton === 1 ? "outlined" : "contained"}
                  color="success"
                >
                  <EditOffIcon className="iconSize" />
                  Edit
                </Button>
                <Button
                  onClick={handleViewButtonClick}
                  className={viewButton === 1 ? "buttonGroup" : ""}
                  size="small"
                  variant={viewButton === 1 ? "outlined" : "contained"}
                  color="success"
                >
                  <img
                    src={
                      viewButton === 1
                        ? `${process.env.PUBLIC_URL}js/permissions/media/view.c63b4c1fa3584e301845f05a99f335e8.svg`
                        : `${process.env.PUBLIC_URL}js/permissions/media/viewWhite.4d604cd4621d71a3c94794ea75e6bd53.svg`
                    }
                    alt="viewLogo"
                    className="iconSize viewLogo"
                  />
                  View
                </Button>
                <div
                  className={viewButton ? "hideOpasity notesBtn" : "notesBtn"}
                >
                  <p className="text">Notes</p>
                  <Switch
                    onChange={handleNotesButtonClick}
                    checked={notesButton === 0}
                  />
                </div>
                <Button
                  onClick={handleAssignButtonClick}
                  className={assignButton === 1 ? "buttonGroup" : ""}
                  size="small"
                  variant={assignButton === 1 ? "outlined" : "contained"}
                  color="success"
                >
                  Assign
                </Button>
              </div>
            </div>
            <div className="resetSuccessBtn">
              <Button
                className="buttonGroup"
                variant="outlined"
                color="success"
                onClick={() => handleResetButtonClick()}
              >
                Reset
              </Button>
              <Button variant="contained" color="success">
                Save
              </Button>
            </div>
          </div>
        </div>
        <div className="filter">
          <SearchIcon className="loupe" />
          <input
            type="text"
            placeholder="Search..."
            value={searchName}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <DataTable
          expandableRows
          expandableRowDisabled={isRowDisabled}
          expandableRowsComponent={ExpandableAllProtocolAccess}
          columns={protocolAccess}
          data={filteredData}
          keyField="id"
          pagination
          highlightOnHover
          onRowExpandToggled={(expanded, row) => {
            if (!expanded) {
              // Collapse the current row
              setExpandedRowId(null);
              setProtocolAccessId([]);
            } else {
              // Expand the current row and collapse the previously expanded row (if any)
              setExpandedRowId(row.id);
              setProtocolAccessId([]);
            }
          }}
          expandableRowExpanded={(row) => expandedRowId === row.id}
        />
        {deleteFrame && (
          <div className="deleteFrame">
            <h3 className="mainCaption">Delete</h3>
            <p className="text">
              Are you sure want to delete all this protocol access ?
            </p>
            <div className="deleteFrameButtons">
              <Button
                onClick={HandleFrameDelete}
                variant="contained"
                color="error"
              >
                Delete
              </Button>
              <Button onClick={HandleFrameClose} variant="outlined">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

import React from "react";
import DataTable from "react-data-table-component";
import fieldaccessnoborderlogo from "../Logos/fieldaccessblack.svg";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
// import { IconButton } from "@mui/material";
// import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
// import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import api from "./userHolder";
// import { v4 as uuidv4 } from "uuid";
import "../SCSS/main.scss";
import axios from "axios";

export const SetFieldAccess = () => {
  const [userHolder, setUserHolder] = React.useState([]);
  const [genotypeUsers, setGenotypeUsers] = React.useState({});
  const [commentUsers, setCommentUsers] = React.useState({});
  const [physicalTagUsers, setPhysicalTagUsers] = React.useState({});
  const [earMarkUsers, setEarMarkUsers] = React.useState({});
  const [endMiceUsers, setEndMiceUsers] = React.useState({});
  const [switchAllUsers, setSwitchAllUsers] = React.useState({});
  const [switcherAll, setSwitcherAll] = React.useState(0);
  const [selectedCheckboxes, setSelectedCheckboxes] = React.useState([]);
  const [userHolderId, setUserHolderId] = React.useState([]);
  const [accessUserRowId, setAccessUserRowId] = React.useState();
  const [expandedRowId, setExpandedRowId] = React.useState(null);
  const [isMasterCheckboxSelected, setIsMasterCheckboxSelected] =
    React.useState(false);
  const [allAccessUserCheckboxesId, setAllAccessUserCheckboxesId] =
    React.useState([]);
  const [unsavedChanges, setUnsavedChanges] = React.useState(false);
  const [genotypeValue, setGenotypeValue] = React.useState({});
  const [commentValue, setCommentValue] = React.useState({});
  const [physicalTagValue, setPhysicalTagValue] = React.useState({});
  const [earMarkValue, setEarMarkValue] = React.useState({});
  const [endMiceValue, setEndMiceValue] = React.useState({});
  const [ignored, forceUpdate] = React.useReducer((x) => x + 1, 0);

  console.log(selectedCheckboxes);
  const [searchName, setSearchName] = React.useState("");
  const [filteredData, setFilteredData] = React.useState(userHolder);

  React.useEffect(() => {
    const getAllUserData = async () => {
      const userHolder = await GetUserDataHolder();
      if (userHolder) setUserHolder(userHolder);
    };
    getAllUserData();
  }, [ignored]);

  const GetUserDataHolder = async () => {
    try {
      const response = await axios.request({
        method: "get",
        url: "http://localhost:8080/SMDB/fieldAccess",
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  // React.useEffect(() => {
  //   const unloadHandler = (event) => {
  //     if (unsavedChanges) {
  //       // Call the function to update data before leaving the page
  //       // updateAllUserDataHolder();
  //       event.preventDefault(); // Cancel the default behavior of leaving the page
  //       event.returnValue = ""; // For Chrome and modern browsers
  //     }
  //   };

  //   // Register the unload event listener
  //   window.addEventListener("beforeunload", unloadHandler);

  //   // Unregister the event listener on component unmount
  //   return () => {
  //     window.removeEventListener("beforeunload", unloadHandler);
  //   };
  // }, [unsavedChanges]);

  // const updateAllUserDataHolder = async () => {
  //   try {
  //     const updatedUser = userHolder.find(
  //       (user) => user.ownerId === userHolderId.ownerId
  //     );

  //     if (updatedUser) {
  //       // Convert the updated data to JSON format
  //       const jsonData = JSON.stringify(updatedUser);

  //       // Make the Axios call to send the updated data
  //       const response = await api.put(
  //         `/userDataHolder/${userHolderId.id}`,
  //         jsonData,
  //         {
  //           headers: {
  //             "Content-type": "application/json; charset=UTF-8",
  //           },
  //         }
  //       );

  //       console.log("Data sent successfully!", response.data);
  //       setUnsavedChanges(false); // Reset the unsavedChanges flag after successful update
  //     }
  //   } catch (error) {
  //     console.error("Error updating genotype flag:", error);
  //   }
  // };

  // const handleSubmit = () => {
  //   // Call the function to update data when the user clicks the Submit button
  //   updateAllUserDataHolder();
  // };

  // Unique UUID
  // const assignUniqueIds = (data) => {
  //   return data.map((user) => {
  //     // Generate a unique ID using uuidv4
  //     return { ...user, id: uuidv4() };
  //   });
  // };

  // const updateUserDataHolder = async () => {
  //   try {
  //     const updatedUserHolder = assignUniqueIds(userHolder);
  //     const userObjId = userHolder.map((user) => user);
  //     const userId = userObjId.map((userId) => userId.id);
  //     await api.put(`/userDataHolder/${userId}`, updatedUserHolder);
  //     console.log("Updated JSON data successfully");
  //   } catch (error) {
  //     console.error("Error updating JSON data:", error);
  //   }
  // };

  // React.useEffect(() => {
  //   updateUserDataHolder();
  // }, [userHolder]);

  // Create a Blue Line between Rows
  const generateStylesAccessUser = (row) => {
    if (row.ownerId === userHolderId.ownerId) {
      const styles = [];
      for (let i = 0; i < row.sharedUsersList.length; i++) {
        styles.push(<div key={i} className="blueStringLine"></div>);
      }
      return styles;
    }
    return null;
  };

  // Delete All Access User From Data User  Holder
  // const deleteUsersAccess = async (accessUserRowId) => {
  //   console.log(accessUserRowId);
  //   const selectedUsers = userHolderId.sharedUsersList?.filter((user) =>
  //     selectedCheckboxes.includes(user.sharedUserId)
  //   );
  //   if (selectedUsers.length > 0) {
  //     const userToUpdate = userHolderId.sharedUsersList?.filter(
  //       (user) => !selectedCheckboxes.includes(user.sharedUserId)
  //     );
  //     if (userToUpdate) {
  //       const updatedUser = { ...userHolderId, sharedUsersList: userToUpdate };
  //       try {
  //         const updateResponse = await api.put(
  //           `/userDataHolder/${userHolderId.ownerId}`,
  //           updatedUser
  //         );
  //         console.log("API update response:", updateResponse.data);
  //         // Update the state with the updated userHolder
  //         setUserHolder((prevUserHolder) => {
  //           const updatedUserHolder = prevUserHolder.map((user) => {
  //             if (user.ownerId === userHolderId.ownerId) {
  //               return updatedUser;
  //             }
  //             return user;
  //           });
  //           return updatedUserHolder;
  //         });
  //         HandleApiDeleteSuccessful();
  //       } catch (error) {
  //         console.log("API Error", error);
  //         HandleApiDeleteError();
  //       }
  //     } else {
  //       console.log("User not found");
  //       HandleApiDeleteError();
  //     }
  //   } else {
  //     // Delete only the current user by accessUserRowId
  //     const userToUpdate = userHolderId.sharedUsersList?.filter(
  //       (user) => user.sharedUserId !== accessUserRowId.sharedUserId
  //     );
  //     if (userToUpdate) {
  //       const updatedUser = { ...userHolderId, sharedUsersList: userToUpdate };
  //       try {
  //         const updateResponse = await api.put(
  //           `/userDataHolder/${userHolderId.ownerId}`,
  //           updatedUser
  //         );
  //         console.log("API update response:", updateResponse.data);
  //         // Update the state with the updated userHolder
  //         setUserHolder((prevUserHolder) => {
  //           const updatedUserHolder = prevUserHolder.map((user) => {
  //             if (user.ownerId === userHolderId.ownerId) {
  //               return updatedUser;
  //             }
  //             return user;
  //           });
  //           return updatedUserHolder;
  //         });
  //         HandleApiDeleteSuccessful();
  //       } catch (error) {
  //         console.log("API Error", error);
  //         HandleApiDeleteError();
  //       }
  //     } else {
  //       console.log("User not found");
  //       HandleApiDeleteError();
  //     }
  //   }
  // };

  // Switchers for Access Users Data
  const handleGenotypeChange = async (row, updatedFlagValue) => {
    setGenotypeUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };

      if (selectedCheckboxes.length > 0) {
        // If there are selected checkboxes, toggle the switcher only for the selected rows
        selectedCheckboxes.forEach((selectedId) => {
          updatedUsers[selectedId] = !updatedUsers[selectedId];
        });
      } else {
        // If no checkboxes are selected, toggle the switcher only for the current row
        updatedUsers[row.id] = !updatedUsers[row.id];
      }
      return updatedUsers;
    });

    let updatedGenotypeFlag = row?.genotypeFlag === 0 ? 1 : -1;
    
    const updatedData = userHolder.map((user) => {
      if (user.id === userHolderId.id) {
        const updatedSharedUsersList = user.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, genotypeFlag: updatedGenotypeFlag };
            }
            return sharedUser;
          }
        );

        return { ...user, sharedUsersList: updatedSharedUsersList };
      }
      return user;
    });

    // Update the state with the updated data
    setUserHolder(updatedData);
    // setUnsavedChanges(true); // Indicate that there are unsaved changes
    try {
      // Find the specific user by ownerId
      const userToUpdate = userHolder.find(
        (user) => user.id === userHolderId.id
      );

      if (userToUpdate) {
        const updatedSharedUsersList = userToUpdate.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, genotypeFlag: updatedGenotypeFlag };
            }
            return sharedUser;
          }
        );

        // Create the object for the API request
        const requestData = {
          sharedUserDataIds:
            selectedCheckboxes.length > 0 ? selectedCheckboxes : [row.id],
          editField: updatedGenotypeFlag, // Assuming updatedFlagValue will be one of the allowed values: 1, -1, 2, -2, 3, -3, 4, -4, 5, -5
        };
        console.log(requestData);
        console.log(typeof updatedGenotypeFlag);
        // Update the sharedUsersList for the specific user
        userToUpdate.sharedUsersList = updatedSharedUsersList;

        // Convert the updated data to JSON format
        const jsonData = JSON.stringify(requestData);

        // Make a single Axios call to send the updated data
        const response = await axios.request({
          method: "POST",
          data: jsonData,
          url: "http://localhost:8080/SMDB/fieldAccess/save",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("Data sent successfully!", response.data);
        forceUpdate();
      }
    } catch (error) {
      console.error("Error updating genotype flag:", error);
    }
  };

  const handleCommentChange = async (row, updatedFlagValue) => {
    setCommentUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };

      if (selectedCheckboxes.length > 0) {
        // If there are selected checkboxes, toggle the switcher only for the selected rows
        selectedCheckboxes.forEach((selectedId) => {
          updatedUsers[selectedId] = !updatedUsers[selectedId];
        });
      } else {
        // If no checkboxes are selected, toggle the switcher only for the current row
        updatedUsers[row.id] = !updatedUsers[row.id];
      }

      return updatedUsers;
    });

    let updatedCommentFlag = row?.commentFlag === 0 ? 2 : -2;
    
    const updatedData = userHolder.map((user) => {
      if (user.id === userHolderId.id) {
        const updatedSharedUsersList = user.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, commentFlag: updatedCommentFlag };
            }
            return sharedUser;
          }
        );

        return { ...user, sharedUsersList: updatedSharedUsersList };
      }
      return user;
    });

    // Update the state with the updated data
    setUserHolder(updatedData);
    // setUnsavedChanges(true); // Indicate that there are unsaved changes

    try {
      // Find the specific user by ownerId
      const userToUpdate = userHolder.find(
        (user) => user.id === userHolderId.id
      );

      if (userToUpdate) {
        const updatedSharedUsersList = userToUpdate.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, commentFlag: updatedCommentFlag };
            }
            return sharedUser;
          }
        );

        // Create the object for the API request
        const requestData = {
          sharedUserDataIds:
            selectedCheckboxes.length > 0 ? selectedCheckboxes : [row.id],
          editField: updatedCommentFlag, // Assuming updatedFlagValue will be one of the allowed values: 1, -1, 2, -2, 3, -3, 4, -4, 5, -5
        };
        console.log(requestData);
        // Update the sharedUsersList for the specific user
        userToUpdate.sharedUsersList = updatedSharedUsersList;

        // Convert the updated data to JSON format
        const jsonData = JSON.stringify(requestData);

        // Make a single Axios call to send the updated data
        const response = await axios.request({
          method: "POST",
          data: jsonData,
          url: "http://localhost:8080/SMDB/fieldAccess/save",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("Data sent successfully!", response.data);
        forceUpdate();
      }
    } catch (error) {
      console.error("Error updating Comment flag:", error);
    }
  };

  const handlePhysicalTagChange = async (row, updatedFlagValue) => {
    setPhysicalTagUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };

      if (selectedCheckboxes.length > 0) {
        // If there are selected checkboxes, toggle the switcher only for the selected rows
        selectedCheckboxes.forEach((selectedId) => {
          updatedUsers[selectedId] = !updatedUsers[selectedId];
        });
      } else {
        // If no checkboxes are selected, toggle the switcher only for the current row
        updatedUsers[row.id] = !updatedUsers[row.id];
      }

      return updatedUsers;
    });

    let updatedPhysicalTagFlag = row?.physicalTagFlag === 0 ? 3 : -3;
    
    const updatedData = userHolder.map((user) => {
      if (user.id === userHolderId.id) {
        const updatedSharedUsersList = user.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, physicalTagFlag: updatedPhysicalTagFlag };
            }
            return sharedUser;
          }
        );

        return { ...user, sharedUsersList: updatedSharedUsersList };
      }
      return user;
    });

    // Update the state with the updated data
    setUserHolder(updatedData);
    // setUnsavedChanges(true); // Indicate that there are unsaved changes
    try {
      // Find the specific user by ownerId
      const userToUpdate = userHolder.find(
        (user) => user.id === userHolderId.id
      );

      if (userToUpdate) {
        const updatedSharedUsersList = userToUpdate.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, physicalTagFlag: updatedPhysicalTagFlag };
            }
            return sharedUser;
          }
        );

        // Create the object for the API request
        const requestData = {
          sharedUserDataIds:
            selectedCheckboxes.length > 0 ? selectedCheckboxes : [row.id],
          editField: updatedPhysicalTagFlag, // Assuming updatedFlagValue will be one of the allowed values: 1, -1, 2, -2, 3, -3, 4, -4, 5, -5
        };
        console.log(requestData);
        // Update the sharedUsersList for the specific user
        userToUpdate.sharedUsersList = updatedSharedUsersList;

        // Convert the updated data to JSON format
        const jsonData = JSON.stringify(requestData);

        // Make a single Axios call to send the updated data
        const response = await axios.request({
          method: "POST",
          data: jsonData,
          url: "http://localhost:8080/SMDB/fieldAccess/save",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("Data sent successfully!", response.data);
        forceUpdate();
      }
    } catch (error) {
      console.error("Error updating PhysicalTag flag:", error);
    }
  };

  const handleEarMarkChange = async (row, updatedFlagValue) => {
    setEarMarkUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };

      if (selectedCheckboxes.length > 0) {
        // If there are selected checkboxes, toggle the switcher only for the selected rows
        selectedCheckboxes.forEach((selectedId) => {
          updatedUsers[selectedId] = !updatedUsers[selectedId];
        });
      } else {
        // If no checkboxes are selected, toggle the switcher only for the current row
        updatedUsers[row.id] = !updatedUsers[row.id];
      }

      return updatedUsers;
    });

    let updatedEarMarkFlag = row?.earMarkFlag === 0 ? 4 : -4;
    
    const updatedData = userHolder.map((user) => {
      if (user.id === userHolderId.id) {
        const updatedSharedUsersList = user.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, earMarkFlag: updatedEarMarkFlag };
            }
            return sharedUser;
          }
        );

        return { ...user, sharedUsersList: updatedSharedUsersList };
      }
      return user;
    });

    // Update the state with the updated data
    setUserHolder(updatedData);
    // setUnsavedChanges(true); // Indicate that there are unsaved changes
    try {
      // Find the specific user by ownerId
      const userToUpdate = userHolder.find(
        (user) => user.id === userHolderId.id
      );

      if (userToUpdate) {
        const updatedSharedUsersList = userToUpdate.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, earMarkFlag: updatedEarMarkFlag };
            }
            return sharedUser;
          }
        );

        // Create the object for the API request
        const requestData = {
          sharedUserDataIds:
            selectedCheckboxes.length > 0 ? selectedCheckboxes : [row.id],
          editField: updatedEarMarkFlag, // Assuming updatedFlagValue will be one of the allowed values: 1, -1, 2, -2, 3, -3, 4, -4, 5, -5
        };
        console.log(requestData);
        // Update the sharedUsersList for the specific user
        userToUpdate.sharedUsersList = updatedSharedUsersList;

        // Convert the updated data to JSON format
        const jsonData = JSON.stringify(requestData);

        // Make a single Axios call to send the updated data
        const response = await axios.request({
          method: "POST",
          data: jsonData,
          url: "http://localhost:8080/SMDB/fieldAccess/save",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("Data sent successfully!", response.data);
        forceUpdate();
      }
    } catch (error) {
      console.error("Error updating EarMark flag:", error);
    }
  };

  const handleEndMiceChange = async (row, updatedFlagValue) => {
    setEndMiceUsers((prevUsers) => {
      const updatedUsers = { ...prevUsers };

      if (selectedCheckboxes.length > 0) {
        // If there are selected checkboxes, toggle the switcher only for the selected rows
        selectedCheckboxes.forEach((selectedId) => {
          updatedUsers[selectedId] = !updatedUsers[selectedId];
        });
      } else {
        // If no checkboxes are selected, toggle the switcher only for the current row
        updatedUsers[row.id] = !updatedUsers[row.id];
      }

      return updatedUsers;
    });

    let updatedEndMiceFlag = row?.endMiceFlag === 0 ? 5 : -5;
    
    const updatedData = userHolder.map((user) => {
      if (user.id === userHolderId.id) {
        const updatedSharedUsersList = user.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, endMiceFlag: updatedEndMiceFlag };
            }
            return sharedUser;
          }
        );

        return { ...user, sharedUsersList: updatedSharedUsersList };
      }
      return user;
    });

    // Update the state with the updated data
    setUserHolder(updatedData);
    // setUnsavedChanges(true); // Indicate that there are unsaved changes
    try {
      // Find the specific user by ownerId
      const userToUpdate = userHolder.find(
        (user) => user.id === userHolderId.id
      );

      if (userToUpdate) {
        const updatedSharedUsersList = userToUpdate.sharedUsersList.map(
          (sharedUser) => {
            if (sharedUser.sharedUserId === row.id) {
              return { ...sharedUser, endMiceFlag: updatedEndMiceFlag };
            }
            return sharedUser;
          }
        );

        // Create the object for the API request
        const requestData = {
          sharedUserDataIds:
            selectedCheckboxes.length > 0 ? selectedCheckboxes : [row.id],
          editField: updatedEndMiceFlag, // Assuming updatedFlagValue will be one of the allowed values: 1, -1, 2, -2, 3, -3, 4, -4, 5, -5
        };
        console.log(requestData);
        // Update the sharedUsersList for the specific user
        userToUpdate.sharedUsersList = updatedSharedUsersList;

        // Convert the updated data to JSON format
        const jsonData = JSON.stringify(requestData);

        // Make a single Axios call to send the updated data
        const response = await axios.request({
          method: "POST",
          data: jsonData,
          url: "http://localhost:8080/SMDB/fieldAccess/save",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });

        console.log("Data sent successfully!", response.data);
        forceUpdate();
      }
    } catch (error) {
      console.error("Error updating EndMice flag:", error);
    }
  };

  const handleSwitchAllChange = async (row) => {
    setSwitchAllUsers((prevSwitches) => {
      const updatedSwitches = { ...prevSwitches };

      if (selectedCheckboxes.length > 0) {
        // If there are selected checkboxes, toggle the switcher only for the selected rows
        selectedCheckboxes.forEach((selectedId) => {
          updatedSwitches[selectedId] = !updatedSwitches[selectedId];
        });
      } else {
        // If no checkboxes are selected, toggle the switcher only for the current row
        updatedSwitches[row.id] = !updatedSwitches[row.id];
      }
      return updatedSwitches;
    });

    let updatedAllFlag = row?.allFlag === false ? 6 : -6;

    try {
      // Create the object for the API request
      const requestData = {
        sharedUserDataIds:
          selectedCheckboxes.length > 0 ? selectedCheckboxes : [row.id],
        editField: updatedAllFlag, // Assuming updatedFlagValue will be one of the allowed values: 1, -1, 2, -2, 3, -3, 4, -4, 5, -5
      };
      console.log(requestData);
      console.log(typeof updatedAllFlag);

      // Convert the updated data to JSON format
      const jsonData = JSON.stringify(requestData);

      // Make a single Axios call to send the updated data
      const response = await axios.request({
        method: "POST",
        data: jsonData,
        url: "http://localhost:8080/SMDB/fieldAccess/save",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      console.log("Data sent successfully!", response.data);
      forceUpdate();
    } catch (error) {
      console.error("Error updating genotype flag:", error);
    }
  };

  // const HandleSwitchAllChange = (row) => {
  //   setSwitcherAll((prevValue) => !prevValue);

  //   setSwitchAllUsers((prevSwitches) => {
  //     const updatedSwitches = { ...prevSwitches };
  //     if (selectedCheckboxes.length > 0) {
  //       // If there are selected checkboxes, toggle the switcher only for the selected rows
  //       selectedCheckboxes.forEach((selectedId) => {
  //         updatedSwitches[selectedId] = !updatedSwitches[selectedId];
  //       });
  //     } else {
  //       // If no checkboxes are selected, toggle the switcher only for the current row
  //       updatedSwitches[row.id] = !updatedSwitches[row.id];
  //     }

  //     // Handle the "All" switcher
  //     if (updatedSwitches[row.id]) {
  //       // Switch "All" is turned ON
  //       handleGenotypeChange(row, 1);
  //       handleCommentChange(row, 1);
  //       handlePhysicalTagChange(row, 1);
  //       handleEarMarkChange(row, 1);
  //       handleEndMiceChange(row, 1);
  //       // Add more handlers here if needed
  //     } else {
  //       // Switch "All" is turned OFF
  //       handleGenotypeChange(row, 0);
  //       handleCommentChange(row, 0);
  //       handlePhysicalTagChange(row, 0);
  //       handleEarMarkChange(row, 0);
  //       handleEndMiceChange(row, 0);
  //       // Add more handlers here if needed
  //     }

  //     return updatedSwitches;
  //   });
  // };

  // Switchers ALL access Users
  // const HandleSwitchAllChange = (row) => {
  // setSwitchAllUsers((prevSwitches) => {
  //   const updatedSwitches = { ...prevSwitches };
  //   if (selectedCheckboxes.length > 0) {
  //     // If there are selected checkboxes, toggle the switcher only for the selected rows
  //     selectedCheckboxes.forEach((selectedId) => {
  //       updatedSwitches[selectedId] = !updatedSwitches[selectedId];
  //     });
  //   } else {
  //     // If no checkboxes are selected, toggle the switcher only for the current row
  //     updatedSwitches[row.id] = !updatedSwitches[row.id];
  //   }

  //   setGenotypeUsers((prevUsers) => {
  //     const updatedUsers = { ...prevUsers };
  //     selectedCheckboxes.forEach((selectedId) => {
  //       updatedUsers[selectedId] = updatedSwitches[selectedId];
  //     });
  //     if (selectedCheckboxes.length === 0) {
  //       updatedUsers[row.id] = updatedSwitches[row.id];
  //     }
  //     return updatedUsers;
  //   });

  //   setCommentUsers((prevUsers) => {
  //     const updatedUsers = { ...prevUsers };
  //     selectedCheckboxes.forEach((selectedId) => {
  //       updatedUsers[selectedId] = updatedSwitches[selectedId];
  //     });
  //     if (selectedCheckboxes.length === 0) {
  //       updatedUsers[row.id] = updatedSwitches[row.id];
  //     }
  //     return updatedUsers;
  //   });

  //   setPhysicalTagUsers((prevUsers) => {
  //     const updatedUsers = { ...prevUsers };
  //     selectedCheckboxes.forEach((selectedId) => {
  //       updatedUsers[selectedId] = updatedSwitches[selectedId];
  //     });
  //     if (selectedCheckboxes.length === 0) {
  //       updatedUsers[row.id] = updatedSwitches[row.id];
  //     }
  //     return updatedUsers;
  //   });

  //   setEarMarkUsers((prevUsers) => {
  //     const updatedUsers = { ...prevUsers };
  //     selectedCheckboxes.forEach((selectedId) => {
  //       updatedUsers[selectedId] = updatedSwitches[selectedId];
  //     });
  //     if (selectedCheckboxes.length === 0) {
  //       updatedUsers[row.id] = updatedSwitches[row.id];
  //     }
  //     return updatedUsers;
  //   });

  //   setEndMiceUsers((prevUsers) => {
  //     const updatedUsers = { ...prevUsers };
  //     selectedCheckboxes.forEach((selectedId) => {
  //       updatedUsers[selectedId] = updatedSwitches[selectedId];
  //     });
  //     if (selectedCheckboxes.length === 0) {
  //       updatedUsers[row.id] = updatedSwitches[row.id];
  //     }
  //     return updatedUsers;
  //   });

  //   return updatedSwitches;
  // });
  // };

  // Access Users CheckBoxes
  const handleCheckBoxChange = (row) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      if (prevSelectedCheckboxes.includes(row.id)) {
        // If the checkbox is already selected, remove it from the selected checkboxes
        setIsMasterCheckboxSelected(false);
        return prevSelectedCheckboxes.filter((id) => id !== row.id);
      } else {
        // If the checkbox is not selected, add it to the selected checkboxes
        return [...prevSelectedCheckboxes, row.id];
      }
    });
  };

  // Master Checkbox for Activating All Checkboxes
  const toggleMasterCheckbox = () => {
    setIsMasterCheckboxSelected(!isMasterCheckboxSelected);
    const checkBoxesId =
      allAccessUserCheckboxesId &&
      allAccessUserCheckboxesId.sharedUsersList &&
      allAccessUserCheckboxesId.sharedUsersList.map(
        (user) => user.sharedUserDataId
      );
    if (isMasterCheckboxSelected) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(checkBoxesId);
    }
  };

  // Filtering Search Box for Data Holder Users
  const handleSearch = (ownerName) => {
    setSearchName(ownerName);

    const filtered = userHolder.filter((user) =>
      user.ownerName?.toLowerCase().includes(ownerName?.toLowerCase())
    );

    setFilteredData(filtered);
  };

  React.useEffect(() => {
    const filtered = userHolder.filter((user) =>
      user.ownerName?.toLowerCase().includes(searchName?.toLowerCase())
    );

    setFilteredData(filtered);
  }, [searchName, userHolder]);

  // Columns for Data Holder Users
  const userDataHolder = [
    {
      width: "1px !important",
      padding: 0,
      cell: (row) => (
        <div className="blueBorderBranch">{generateStylesAccessUser(row)}</div>
      ),
    },
    {
      name: "Users Name",
      cell: (row) => (
        <Box sx={{ p: 1, width: 200, marginLeft: 2 }}>{row.ownerName}</Box>
      ),
    },
  ];

  // Columns for Access Users
  const userAccess = [
    {
      width: "0px",
      display: "none",
    },
    {
      position: "absolute",
      name: (
        <input
          style={{ position: "absolute", top: "17px", left: "47px" }}
          type="checkbox"
          onChange={toggleMasterCheckbox}
          checked={isMasterCheckboxSelected}
        />
      ),
      cell: (row) => (
        <input
          type="checkbox"
          checked={selectedCheckboxes && selectedCheckboxes.includes(row.id)}
          onChange={() => handleCheckBoxChange(row)}
        />
      ),
    },
    {
      paddingLeft: "60px",
      name: "Access User",
      cell: (row) => <Box sx={{ p: 1, width: 90 }}>{row.name}</Box>,
    },
    {
      name: "Genotype",
      cell: (row) => (
        <Switch
          checked={row?.genotypeFlag === 1}
          onChange={() => handleGenotypeChange(row)}
        />
      ),
    },
    {
      name: "Comment",
      cell: (row) => (
        <Switch
          checked={row?.commentFlag === 1}
          onChange={() => handleCommentChange(row)}
        />
      ),
    },
    {
      name: "Physical Tag",
      cell: (row) => (
        <Switch
          checked={row?.physicalTagFlag === 1}
          onChange={() => handlePhysicalTagChange(row)}
        />
      ),
    },
    {
      name: "Ear Mark",
      cell: (row) => (
        <Switch
          checked={row?.earMarkFlag === 1}
          onChange={() => handleEarMarkChange(row)}
        />
      ),
    },
    {
      name: "End Mice",
      cell: (row) => (
        <Switch
          checked={row?.endMiceFlag === 1}
          onChange={() => handleEndMiceChange(row)}
        />
      ),
    },
    {
      name: "All",
      cell: (row) => (
        <Switch
          checked={row?.allFlag}
          onChange={() => handleSwitchAllChange(row)}
        />
      ),
      selector: (row) => row.id,
    },
  ];

  const ExpandableAllAccessUsers = ({ data }) => {
    const allAccessUsers = data.sharedUsersList.map((user) => {
      return {
        ownerId: data.id,
        id: user.sharedUserDataId,
        name: user.sharedUserName,
        genotypeFlag: user.genotypeFlag,
        commentFlag: user.commentFlag,
        physicalTagFlag: user.physicalTagFlag,
        earMarkFlag: user.earMarkFlag,
        endMiceFlag: user.endMiceFlag,
        allFlag:
          user.genotypeFlag === 1 &&
          user.commentFlag === 1 &&
          user.physicalTagFlag === 1 &&
          user.earMarkFlag === 1 &&
          user.endMiceFlag === 1
            ? true
            : false,
      };
    });

    React.useEffect(() => {
      UserId(data);
    }, [data]);

    const UserId = (userData) => {
      setUserHolderId(userData);
    };

    return (
      <pre className="text">
        {
          <DataTable
            columns={userAccess}
            data={allAccessUsers}
            keyField="id"
            highlightOnHover
          />
        }
      </pre>
    );
  };

  const isRowDisabled = (row) => {
    return row.sharedUsersList.length === 0; // Disable rows with no accessUser
  };

  return (
    <section className="setFieldAccess">
      <div className="container">
        {/* <button onClick={handleSubmit}>Submit Changes</button> */}
        <div className="captionTitle">
          <img
            className="fieldaccessnoborderlogo"
            src={`${process.env.PUBLIC_URL}js/permissions/media/fieldaccessblack.f171dd3c7152ae389677096c577625ee.svg`}
            alt="fieldaccessnoborderlogo"
          />
          <h1 className="mainCaption">Set Field Access</h1>
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
          expandableRowsComponent={ExpandableAllAccessUsers}
          columns={userDataHolder}
          data={filteredData}
          keyField="id"
          pagination
          highlightOnHover
          onRowExpandToggled={(expanded, row) => {
            if (!expanded) {
              // Collapse the current row
              setExpandedRowId(null);
              setUserHolderId([]);
              setIsMasterCheckboxSelected(false);
              setSelectedCheckboxes([]);
            } else {
              // Expand the current row and collapse the previously expanded row (if any)
              setExpandedRowId(row.ownerId);
              setUserHolderId([]);
              setIsMasterCheckboxSelected(false);
              setSelectedCheckboxes([]);
              setAllAccessUserCheckboxesId(row);
            }
          }}
          expandableRowExpanded={(row) => expandedRowId === row.ownerId}
        />
      </div>
    </section>
  );
};

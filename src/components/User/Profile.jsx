import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AuthService from "../../services/auth.service";
import PersonalDetails from "./PersonalDetails";
import ChangePassword from "./ChangePassword";
import SkeletonLoader from "../../common/SkeletonLoader";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoader, setCurrentUserLoader] = React.useState(true);
  const [currentUserError, setCurrentUserError] = React.useState(false);
  const [value, setValue] = React.useState(0);

  const getUserDetails = async () => {
    try {
      setCurrentUserLoader(true);
      const userDetails = await AuthService.getCurrentUserDetails();
      if (userDetails.status === 200) {
        setCurrentUser(userDetails.data);
      } else {
        setCurrentUserError(true);
      }
    } catch (err) {
      console.error('error getting user details', err.message);
      setCurrentUserError(true);
    } finally {
      setCurrentUserLoader(false);
    }
  }

  useEffect(() => {
    getUserDetails();
  }, []);
  
  if (currentUserLoader) {
    return <SkeletonLoader count={15} />
  }

  if (currentUserError) {
    return <>There was an error fetching user details....</>;
  }

  if (!currentUser) {
    return <>User details not found!!</>
  }

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <header className="jumbotron">
        <h4> User Profile </h4>
      </header>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleTabChange}
            aria-label="basic tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Change Password" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <PersonalDetails currentUser={currentUser} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ChangePassword currentUser={currentUser} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          You don't have any personalized settings
        </CustomTabPanel>
      </Box>
    </>
  );
};

export default Profile;

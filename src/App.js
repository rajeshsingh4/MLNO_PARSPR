import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";
import AuthService from "./services/auth.service";
import Header from "./components/MenuBar/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/User/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import CardTracks from "./components/CardTrack/CardTracks";
import BureauComparisionDashBoard from "./components/BureauComparision/BureauComparisionDashBoard"
import { ErrorBoundary } from "./components/ErrorBoundary";
import { FilesMaster } from "./components/BureauFileListing/FilesMaster";
import { FileTATReport } from "./components/BureauFileListing/FileTATReport";
import { BureauReportDashboard } from "./components/BureauDashboard/BureauReportDashboard";
import CreatePullRequestList from "./components/BankPullRequest/CreatePullRequestList";
import PullRequestList from "./components/BankPullRequest/BankPullRequestList";
import ViewPullRequestDetails from "./components/BankPullRequest/ViewPullRequestDetails";
import SnackbarMessage from "./common/SnackbarMessage";
import BureauPullRequestList from "./components/BureauPullRequest/BureauPullRequestList";
import UserService from "./services/user.service";
import SkeletonLoader from "./common/SkeletonLoader";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [menuRoles, setMenuRoles] = useState(null);
  const [snackBarOpen, setSnackBarOpen] = React.useState({
    open: false,
    type: 'info',
    message: null
  });

  const location = useLocation();
  const navigate = useNavigate();

  const getMenuRoles = async () => {
    try {
      const menu = await UserService.getMenu();
      setMenuRoles(menu);
    } catch (error) {
      console.error('Error fetching roles for user', error.message);
    }
  }

  useEffect(() => {
    if (!(location.pathname.includes('/login') || location.pathname.includes('/register'))) {
      getMenuRoles();
    }
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const handleSnackBarOpen = (type, message) => {
    setSnackBarOpen({
      open: true,
      type: type,
      message: message
    });
  }

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen({
      open: false,
      type: 'info',
      message: null
    });
  };

  if (location.pathname.includes('/login') || location.pathname.includes('/register')) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    )
  }

  if (!menuRoles) {
    return <SkeletonLoader count={25} />
  }

  return (
    <>
      <SnackbarMessage handleCloseSnackBar={handleCloseSnackBar} {...snackBarOpen} />
      <Routes>
        <Route path='/' errorElement={<ErrorBoundary />} element={<Header handleSnackBarOpen={handleSnackBarOpen} />}>
          <Route index element={<BureauComparisionDashBoard />} />
          <Route path="bureau-comparision" element={<BureauComparisionDashBoard />} />
          <Route path="files" element={<Outlet context={[handleSnackBarOpen, currentUser]} />}>
            <Route index element={<FilesMaster />} />
            <Route path=":id" element={<CardTracks fileDetails={location.state} navigate={navigate} />} />
          </Route>
          <Route path="file-tat-report" element={<FileTATReport />} />
          <Route path="bureau-reports" element={<BureauReportDashboard />} />
          <Route path="bank-pull-request" element={<Outlet context={[handleSnackBarOpen, currentUser]} />}>
            <Route index element={<Navigate to='create' replace />} />
            <Route path='create' element={<CreatePullRequestList />} />
            <Route path='manage' element={<PullRequestList />} />
            <Route path='view' element={<Outlet context={[handleSnackBarOpen, currentUser]} />}>
              <Route index element={<Navigate to='/pull-request/manage' replace />} />
              <Route path=':id' element={<ViewPullRequestDetails />} />
            </Route>
          </Route>
          <Route path="bureau-pull-request" element={<Outlet context={[handleSnackBarOpen, currentUser]} />}>
            {/* <Route path='create' index element={<CreatePullRequestList />} /> */}
            <Route index element={<Navigate to='manage' replace />} />
            <Route path='manage' element={<BureauPullRequestList />} />
            <Route path='view' element={<Outlet context={[handleSnackBarOpen, currentUser]} />}>
              <Route index element={<Navigate to='/bureau-pull-request/manage' replace />} />
              <Route path=':id' element={<ViewPullRequestDetails />} />
            </Route>
          </Route>
          <Route path="profile" element={<Profile />} />
          <Route path="admin" element={<BoardAdmin />} />
          <Route path="user" element={<BoardUser />} />
          <Route path="mod" element={<BoardModerator />} />
          <Route path='/home' element={<Home />} />
        </Route>
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;

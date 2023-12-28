import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { red } from "@mui/material/colors";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const PersonalDetails = (props) => {
    const { currentUser } = props;
    const { user } = currentUser;
    return (
        <Grid container spacing={2}>
            <Grid xs={12} sm={3} className="user-details-section">
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="user-profile"
                            >
                                {user.username.substring(0, 1).toUpperCase()}
                            </Avatar>
                        }
                        title={user.username}
                        subheader={"September 14, 2016"}
                    />
                    <Divider />
                    <CardContent>
                        <List
                            sx={{
                                width: "100%",
                                maxWidth: 360,
                                bgcolor: "background.paper",
                            }}
                            disablePadding
                        >
                            <ListItem
                                secondaryAction={
                                    <Typography>{user.username}</Typography>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} sx={{ p: 1 }}>
                                    <ListItemText primary={<strong>Username</strong>} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem
                                secondaryAction={
                                    <Typography>{user.email}</Typography>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} sx={{ p: 1 }}>
                                    <ListItemText primary={<strong>Email</strong>} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem
                                secondaryAction={
                                    <Typography>{currentUser.phone}</Typography>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} sx={{ p: 1 }}>
                                    <ListItemText primary={<strong>Phone</strong>} />
                                </ListItemButton>
                            </ListItem>
                            <Divider />
                            <ListItem
                                secondaryAction={
                                    <ul>
                                        {currentUser.roles && currentUser.roles.map((role, index) => (<li key={index}>{role}</li>))}
                                    </ul>
                                }
                                disablePadding
                            >
                                <ListItemButton role={undefined} sx={{ p: 1 }}>
                                    <ListItemText primary={<strong>Authorities</strong>} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid xs={12} sm={9} className="about-me-section">
                <Card variant="outlined">
                    <CardHeader
                        title={
                            <Typography component="h4">
                                <strong>About Me</strong>
                            </Typography>
                        }
                    />
                    <Divider />
                    <CardContent>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                            {currentUser.bio}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Personal Details</strong>
                        </Typography>
                        <TableContainer>
                            <Table>
                                <TableBody
                                    sx={{
                                        ".MuiTableCell-root": { borderBottom: "none", p: 1 },
                                    }}
                                >
                                    <TableRow>
                                        <TableCell>Full Name</TableCell>
                                        <TableCell>{`${currentUser.firstname}${currentUser.middlename ? `${currentUser.middlename}` : ''} ${currentUser.lastname}`}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Address</TableCell>
                                        <TableCell>{currentUser.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>{currentUser.phone}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default PersonalDetails;
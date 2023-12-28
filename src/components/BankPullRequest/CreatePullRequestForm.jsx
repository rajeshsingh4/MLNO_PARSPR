import React, { useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import IconButton from '@mui/material/IconButton';
import CloseIcon from "@mui/icons-material/Close";
import { actionList, modeList } from "../../common/constants";
import PullRequestService from '../../services/pull-request.service';
import { useNavigate, useOutletContext } from "react-router-dom";

const initialFormData = () => ({
    action: "",
    changeCommunicatedTo: 1,
    field: "",
    originalValue: "",
    newValue: "",
    mode: "",
    ipaddress: '127.0.0.0',
    comment: '',
    cardId: '',
    fileMasterId : '',
});

const CreatePullRequestForm = (props) => {
    const { handleClose, pullRequestModal } = props;
    const { tableMeta: { rowIndex, tableData } } = pullRequestModal;
    
    const [formData, setFormData] = useState({
        ...initialFormData(),
        cardId: tableData[rowIndex].id,
        fileMasterId: tableData[rowIndex].fileMasterId,
    });

    const navigate = useNavigate();
    const [handleSnackBarOpen] = useOutletContext();

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        const updatedData = {
            ...formData,
            [name]: value,
        }
        switch(name) {
            case 'field': updatedData.originalValue = tableData[rowIndex][value];
                break;
            default:
                break;
        }
        setFormData(updatedData);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log("submit pull request Data", formData);
        try {
            const data = await PullRequestService.createPullRequest(formData);
            console.log(data);
            if (data.status !== 200 || data.data.status) {
                handleSnackBarOpen('error', 'Error creating pull request');
                console.error('There was an error creating the Pull Request. Please try again!!');
            } else {
                handleSnackBarOpen('success', 'Pull request created successfully');
                handleClose();
                setTimeout(() => {
                    navigate('/pull-request/manage');
                }, 500);
            }
        } catch(error) {
            console.error('There was an error creating the Pull Request. Please try again!!', error);
        }
    };

    return (
        <Dialog
            open={true}
            fullScreen
            onClose={handleClose}
            id="create-pull-request-item"
            aria-labelledby="pull-request-item"
            aria-describedby="pull-request-item-description"
        >
            <DialogTitle id="scroll-dialog-title">
                Create Pull Request for {pullRequestModal.rowData && pullRequestModal.rowData[3]}
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                    position: "absolute",
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent dividers={true}>
                <Box
                    component="form"
                    id="card-form-container"
                    noValidate
                    autoComplete="off"
                    sx={{ mt: 2, mb: 1 }}
                >
                    <Grid container spacing={3} id="card-form-element-container">
                        <Grid xs={12} sm={4}>
                            <TextField
                                id="action-to-take-item"
                                label="Action"
                                InputLabelProps={{
                                    htmlFor: "action-to-take-item",
                                }}
                                name="action"
                                select
                                value={formData.action}
                                required
                                fullWidth
                                onChange={(e) => handleFormChange(e)}
                            >
                                {actionList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid xs={12} sm={4}>
                            <TextField
                                id="change-communicated-to-item"
                                label="Change Communicate To"
                                name="changeCommunicatedTo"
                                type="text"
                                value={formData.changeCommunicatedTo}
                                required
                                fullWidth
                                onChange={(e) => handleFormChange(e)}
                            />
                        </Grid>
                        {formData.action === "newvalue" && (
                            <>
                                <Grid xs={12} sm={4}>
                                    <TextField
                                        id="field-item"
                                        label="Field"
                                        name="field"
                                        select
                                        value={formData.field}
                                        required
                                        fullWidth
                                        onChange={(e) => handleFormChange(e)}
                                    >
                                        {tableData && Object.keys(tableData[rowIndex]).map((rowKey, index) => (
                                            <MenuItem key={index} value={rowKey}>
                                                {rowKey}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid xs={12} sm={4}>
                                    <TextField
                                        id="original-value-item"
                                        label="Original Value"
                                        name="originalValue"
                                        type="text"
                                        value={formData.originalValue}
                                        required
                                        fullWidth
                                        onChange={(e) => handleFormChange(e)}
                                    />
                                </Grid>
                                <Grid xs={12} sm={4}>
                                    <TextField
                                        id="new-value-item"
                                        label="New Value"
                                        name="newValue"
                                        type="text"
                                        value={formData.newValue}
                                        required
                                        fullWidth
                                        onChange={(e) => handleFormChange(e)}
                                    />
                                </Grid>
                            </>
                        )}
                        <Grid xs={12} sm={4}>
                            <TextField
                                id="mode-item"
                                label="Mode"
                                InputLabelProps={{
                                    htmlFor: "mode-item",
                                }}
                                name="mode"
                                select
                                value={formData.mode}
                                required
                                fullWidth
                                onChange={(e) => handleFormChange(e)}
                            >
                                {modeList.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid xs={12}>
                            <TextField
                                id="outlined-multiline-static"
                                label="Comment"
                                name='comment'
                                multiline
                                fullWidth
                                rows={4}
                                onChange={(e) => handleFormChange(e)}
                                value={formData.comment}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    id="pull-request-form-close-button"
                    onClick={handleClose}
                    variant="outlined"
                    sx={{
                        mr: 1,
                    }}
                >
                    Close
                </Button>
                <Button
                    type="submit"
                    id="pull-request-form-submit-button"
                    onClick={(e) => handleUpdate(e)}
                    variant="contained"
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreatePullRequestForm;

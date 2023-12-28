import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PullRequestService from '../../services/pull-request.service';
import { useOutletContext } from "react-router-dom";

const confirmActionList = [
    {
        label: 'Complete',
        value: 1
    },
    {
        label: 'Reject',
        value: 2
    }
]

export default function BureauPullRequestConfirmationDialog(props) {
  const { handleClose, getPullRequestList, pullId } = props;
  const [formData, setFormData] = useState({
    comment: '',
    status: ''
  });

  const [handleSnackBarOpen] = useOutletContext();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
  }

  const handleUpdate = async () => {
    // update Pull request
    const data = {...formData, status: Number(formData.status)};
    try {
        const updatePullResponse = await PullRequestService.updatePullRequest(pullId, data);
        if (updatePullResponse.status === 200) {
            // success message
            handleSnackBarOpen('success', 'Pull request updated successfully');
        } else {
            // error message
            handleSnackBarOpen('error', 'Error updating pull request');
        }
    } catch(error) {
        console.error('Error updating pull request: ', pullId);
        // error message
        handleSnackBarOpen('error', 'Error creating pull request');
    } finally {
        handleClose();
        setTimeout(() => {
            getPullRequestList();
        }, [300]);
    }
  }

  return (
    <>
      <Dialog open={true} onClose={handleClose} maxWidth='md'>
        <DialogTitle>Action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill the below fields to confirm your action.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="status-field"
            label="Action"
            name='status'
            select
            fullWidth
            required
            onChange={(e) => handleFormChange(e)}
            value={formData.status}
          >
            {
                confirmActionList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))
            }
          </TextField>
          <TextField
            id='comment-field'
            name='comment'
            label='Comment'
            multiline
            fullWidth
            required
            rows={4}
            onChange={(e) => handleFormChange(e)}
            value={formData.comment}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={formData.status === '' || formData.comment === ''} onClick={handleUpdate}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

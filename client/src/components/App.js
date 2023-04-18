import React, { useState } from "react";
import UserList from "./UserList/UserList";
import UserForm from "./UserForm/UserForm";
import { Button, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAddUser = () => {
    setSelectedUser(null);
    setDialogOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
    console.log("User", user);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="App">
      <UserList onEditUser={handleEditUser} />
      <Button
        className={classes.addButton}
        variant="contained"
        color="primary"
        onClick={handleAddUser}
        startIcon={<AddIcon />}
      >
        Add User
      </Button>
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{selectedUser ? "Edit User" : "Add User"}</DialogTitle>
        <DialogContent>
          <UserForm user={selectedUser} onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;

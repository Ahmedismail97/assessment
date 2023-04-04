import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser } from "../../redux/user/userSlice";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const classes = useStyles();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  let content;
  if (status === "loading") {
    content = <div>Loading...</div>;
  } else if (status === "succeeded") {
    content = (
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="user table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell>Skillsets</TableCell>
              <TableCell>Hobby</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.skillsets.join(", ")}</TableCell>
                <TableCell>{user.hobby}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else if (status === "failed") {
    content = <div>{error}</div>;
  }

  return <div>{content}</div>;
}

export default UserList;

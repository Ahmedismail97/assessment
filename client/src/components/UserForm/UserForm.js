import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../redux/user/userSlice";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function UserForm({ user = null, onClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    phoneNumber: user ? user.phoneNumber : "",
    skillsets: user ? user.skillsets.join(", ") : "",
    hobby: user ? user.hobby : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phoneNumber, skillsets, hobby } = formData;
    const userData = {
      username,
      email,
      phoneNumber,
      skillsets: skillsets.split(",").map((skill) => skill.trim()),
      hobby,
    };
    if (user) {
      dispatch(updateUser({ id: user.id, userData }));
    } else {
      dispatch(createUser(userData));
    }
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        name="phoneNumber"
        label="Phone number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <TextField
        name="skillsets"
        label="Skillsets (comma separated)"
        value={formData.skillsets}
        onChange={handleChange}
        required
      />
      <TextField
        name="hobby"
        label="Hobby"
        value={formData.hobby}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {user ? "Update" : "Create"}
      </Button>
      <Button onClick={onClose} variant="contained" color="secondary">
        Cancel
      </Button>
    </form>
  );
}

export default UserForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser, updateUser } from "../../redux/user/userSlice";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      padding: "10",
      width: "100vh",
      display: "flex",
      flexDirection: "column",
    },
  },
  button: {
    padding: "10px",
    margin: "5px",
  },
  text_field: {
    padding: "10px 0px",
    margin: "5px",
  },
}));

function UserForm({ user = null, onClose }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [formData, setFormData] = useState({
    username: user ? user.username : "",
    email: user ? user.email : "",
    phone: user ? user.phone : "",
    skillsets: user ? user.skillsets.join(", ") : "",
    hobby: user ? user.hobby : "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, phone, skillsets, hobby } = formData;
    const userData = {
      username,
      email,
      phone,
      skillsets: skillsets.split(",").map((skill) => skill.trim()),
      hobby,
    };
    if (user) {
      dispatch(updateUser({ _id: user._id, userData }));
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
    <Box className={classes.root}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="username"
          label="Username"
          className={classes.text_field}
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          name="email"
          label="Email"
          type="email"
          className={classes.text_field}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          name="phone"
          label="Phone number"
          className={classes.text_field}
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <TextField
          name="skillsets"
          label="Skillsets (comma separated)"
          className={classes.text_field}
          value={formData.skillsets}
          onChange={handleChange}
          required
        />
        <TextField
          name="hobby"
          label="Hobby"
          className={classes.text_field}
          value={formData.hobby}
          onChange={handleChange}
          required
        />
        <Box className={classes.item}>
          <Button
            className={classes.button}
            type="submit"
            variant="contained"
            color="primary"
          >
            {user ? "Update" : "Create"}
          </Button>
          <Button
            className={classes.button}
            onClick={onClose}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default UserForm;

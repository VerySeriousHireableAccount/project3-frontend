import React, { Component } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      open: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };
    this.setState({
      open: true,
    });
    console.log(user);

    axios
      .post("https://pe-tracker.herokuapp.com/users/add", user)
      .then((res) => console.log(res.data));

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <Typography variant="h6">Add New Student</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={this.onSubmit}>
            <div>
              <TextField
                required
                id="outlined"
                label="Student Name"
                className="form-group"
                value={this.state.username}
                onChange={this.onChangeUsername}
                error={!this.state.username}
                style={{ backgroundColor: "#f8d7e8" }}
              ></TextField>
            </div>
            <Button
              variant="contained"
              type="submit"
              style={{ margin: "1% 0.5%", backgroundColor: "#f8d7e8" }}
            >
              <Typography
                sx={{
                  color: "#666378",
                }}
              >
                Add Student
              </Typography>
              <Snackbar
                open={this.state.open}
                autoHideDuration={6000}
                onClose={(reason) => {
                  if (reason === "clickaway") {
                    return;
                  }
                  this.setState({
                    open: false,
                  });
                }}
              >
                <Alert
                  onClose={(reason) => {
                    if (reason === "clickaway") {
                      return;
                    }
                    this.setState({
                      open: false,
                    });
                  }}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  New Student Added Successfully!
                </Alert>
              </Snackbar>
            </Button>
          </form>
        </Box>
      </div>
    );
  }
}

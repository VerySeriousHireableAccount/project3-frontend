import React, { Component } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
      open: false,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
            username: response.data[0].username,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value,
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    if (typeof this.state.duration == "number") {
      this.setState({
        open: true,
      });
    }
    console.log(exercise);

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <Typography variant="h6">Create New Exercise Log</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <TextField
                id="outlined-select-currency"
                label="Student"
                ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                select
                style={{ backgroundColor: "#c2d5a8" }}
              >
                {this.state.users.map((user) => (
                  <MenuItem key={user} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div>
              <TextField
                required
                id="outlined"
                label="Description"
                className="form-group"
                value={this.state.description}
                onChange={this.onChangeDescription}
                error={!this.state.description}
                style={{ backgroundColor: "#f8d7e8" }}
              ></TextField>
            </div>
            <div>
              <TextField
                required
                id="outlined"
                label="Duration"
                className="form-group"
                value={this.state.duration || ""}
                onChange={this.onChangeDuration}
                error={!this.state.duration}
                style={{ backgroundColor: "#f8d7e8" }}
              ></TextField>
            </div>
            <label style={{ margin: "0 0.5%" }}>Date</label>
            <div style={{ margin: "1% 0.5%" }}>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
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
                  if (reason === "clickaway") return;
                  this.setState({
                    open: false,
                  });
                }}
                severity="success"
                sx={{ width: "100%" }}
              >
                Exercise Log Added Successfully!
              </Alert>
            </Snackbar>
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
                Create Exercise Log
              </Typography>
            </Button>
          </form>
        </Box>
      </div>
    );
  }
}

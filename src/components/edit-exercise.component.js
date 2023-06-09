import React, { Component } from "react";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default class EditExercise extends Component {
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
      .get(
        "https://pe-tracker.herokuapp.com/exercises/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          duration: response.data.duration,
          date: new Date(response.data.date),
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get("https://pe-tracker.herokuapp.com/users/")
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map((user) => user.username),
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
      .post(
        "https://pe-tracker.herokuapp.com/exercises/update/" +
          this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <Typography variant="h6">Edit Exercise Log</Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
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
              ></TextField>
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
                Exercise Log Edited Successfully!
              </Alert>
            </Snackbar>
            <Button
              variant="contained"
              type="submit"
              style={{ margin: "1% 0.5%", backgroundColor: "#f8d7e8" }}
              onClick={this.onSubmit}
            >
              <Typography
                sx={{
                  color: "666378",
                }}
              >
                Save Exercise Log
              </Typography>
            </Button>
          </div>
        </Box>
      </div>
    );
  }
}

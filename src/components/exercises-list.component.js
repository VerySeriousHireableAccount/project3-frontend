import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#f3b1cd",
    color: "#666378",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "#666378",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#f8efe6",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Exercise = (props) => (
  <StyledTableRow key="a">
    <StyledTableCell component="th" scope="row">
      {props.exercise.username}
    </StyledTableCell>
    <StyledTableCell align="center">
      {props.exercise.description}
    </StyledTableCell>
    <StyledTableCell align="center">{props.exercise.duration}</StyledTableCell>
    <StyledTableCell align="center">
      {props.exercise.date.substring(0, 10)}
    </StyledTableCell>
    <StyledTableCell align="center">
      <ButtonGroup aria-label="button group">
        <Button
          startIcon={<EditIcon />}
          style={{ backgroundColor: "#c2d5a8", color: "#666378" }}
        >
          <Link to={"/edit/" + props.exercise._id}>
            <Typography noWrap sx={{ color: "#666378" }}>
              Update
            </Typography>
          </Link>
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => {
            props.deleteExercise(props.exercise._id);
          }}
          style={{ backgroundColor: "#bad5f0", color: "#666378" }}
        >
          <Typography noWrap sx={{ color: "#666378" }}>
            Delete
          </Typography>
        </Button>
      </ButtonGroup>
    </StyledTableCell>
  </StyledTableRow>
);

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("https://pe-tracker.herokuapp.com/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise(id) {
    axios
      .delete("https://pe-tracker.herokuapp.com/exercises/" + id)
      .then((response) => {
        console.log(response.data);
      });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  }

  exerciseList() {
    return this.state.exercises.map((currentexercise) => {
      return (
        <Exercise
          exercise={currentexercise}
          deleteExercise={this.deleteExercise}
          key={currentexercise._id}
        />
      );
    });
  }

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Student</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Duration</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.exerciseList()}</TableBody>
        </Table>
      </TableContainer>
    );
  }
}

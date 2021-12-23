import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./navbar";
import { db } from "../firebase";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Book_Appointment from "./book_appointment";
import { container, paper, typography } from "./styles";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("doctors").onSnapshot((snapshot) => {
      setDoctors(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {doctors.map((doctor) => {
          if (doctor.uid === uid)
            return (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h4" sx={typography}>
                    {doctor.name}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={paper}>
                    <Avatar
                      alt="Doctor's Profile Picture"
                      src={doctor.imageURL}
                      sx={{ width: 100, height: 100, m: 2 }}
                    />
                    <Book_Appointment doctorUID={uid} />
                  </Paper>
                </Grid>

                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <>
                      <Typography>Name: {doctor.name}</Typography>
                      <Typography>Age: {doctor.age}</Typography>
                      <Typography>Gender: {doctor.gender}</Typography>
                      <Typography>
                        Speciality: {doctor.medicalSpeciality}
                      </Typography>
                      <Typography>
                        Address: {doctor.address1}, {doctor.address2},{" "}
                        {doctor.city}, {doctor.state}, {doctor.country},{" "}
                        {doctor.pincode}
                      </Typography>
                    </>
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </div>
  );
};

export default Doctor;

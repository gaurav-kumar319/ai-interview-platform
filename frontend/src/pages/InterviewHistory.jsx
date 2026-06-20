import {
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Paper
} from "@mui/material";

import { useEffect, useState } from "react";

import API from "../api/axios";


function InterviewHistory(){

  const [interviews,setInterviews] = useState([]);


  const fetchHistory = async()=>{

    try{

      const res = await API.get("/interviews/history");

      setInterviews(res.data);

    }
    catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchHistory();

  },[]);



  return (

    <Container sx={{mt:5}}>

      <Card sx={{borderRadius:4}}>

        <CardContent>

          <Typography
            variant="h4"
            fontWeight="bold"
            mb={3}
          >
            Interview History
          </Typography>


          <TableContainer component={Paper}>

            <Table>

              <TableHead>

                <TableRow>

                  <TableCell>Role</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Tech Stack</TableCell>
                  <TableCell>Score</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>

                </TableRow>

              </TableHead>


              <TableBody>


                {
                  interviews.map((item)=>(

                    <TableRow key={item.id}>

                      <TableCell>
                        {item.role}
                      </TableCell>


                      <TableCell>
                        {item.level}
                      </TableCell>


                      <TableCell>
                        {item.tech_stack}
                      </TableCell>


                      <TableCell>

                        {
                          item.score ?

                          <Chip
                            label={`${item.score}/10`}
                            color="primary"
                          />

                          :

                          "Not Evaluated"
                        }

                      </TableCell>


                      <TableCell>

                        {
                          new Date(item.created_at)
                          .toLocaleDateString()
                        }

                      </TableCell>


                      <TableCell>

                        {
                          item.score ?

                          <Chip
                            label="Completed"
                            color="success"
                          />

                          :

                          <Chip
                            label="Pending"
                            color="warning"
                          />

                        }

                      </TableCell>


                    </TableRow>

                  ))
                }


              </TableBody>


            </Table>


          </TableContainer>


        </CardContent>


      </Card>


    </Container>

  );

}


export default InterviewHistory;
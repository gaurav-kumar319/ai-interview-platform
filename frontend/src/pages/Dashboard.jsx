import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Container,
  List,
  ListItem,
  Divider,
  Chip,
} from "@mui/material";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState({
    totalInterviews: 0,
    averageScore: 0,
    bestScore: 0,
  });

  const [questions, setQuestions] = useState([]);

  const [interviewId, setInterviewId] = useState(null);

  const [answers, setAnswers] = useState({});

  const [results, setResults] = useState({});

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    role: "",
    level: "",
    techstack: "",
  });

  // temporary chart data
  const chartData = [
    { name: "1", score: 5 },
    { name: "2", score: 8 },
    { name: "3", score: 6 },
    { name: "4", score: 9 },
  ];

  // Fetch analytics
  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");

      setAnalytics(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/");
  };

  // Handle form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Generate Questions
  const generateQuestions = async () => {
    try {
      setLoading(true);

      const res = await API.post("/ai/questions", formData);

      setQuestions(res.data.questions);

      setInterviewId(res.data.interview.id);

      setResults({});

      setAnswers({});

      fetchAnalytics();

    } catch (error) {
      console.log(error);

      alert("Failed to generate questions");

    } finally {
      setLoading(false);
    }
  };

  // Handle answers
  const handleAnswerChange = (index, value) => {
    setAnswers({
      ...answers,
      [index]: value,
    });
  };

  // Evaluate answer
  const evaluateAnswer = async (question, answer, index) => {
    try {
      const res = await API.post("/ai/evaluate", {
        interview_id: interviewId,
        question,
        answer,
      });

      setResults((prev) => ({
        ...prev,
        [index]: res.data.result,
      }));

      fetchAnalytics();

    } catch (error) {
      console.log(error);

      alert("Evaluation failed");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: "#f4f6f8" }}>

      {/* Navbar */}
      <AppBar position="static">
        <Toolbar>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            AI Interview Platform
          </Typography>

          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>

        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 5 }}>

        {/* Analytics */}
        <Grid container spacing={3}>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>

                <Typography variant="h6">
                  Total Interviews
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  {analytics.totalInterviews}
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>

                <Typography variant="h6">
                  Average Score
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  {analytics.averageScore}
                </Typography>

              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4 }}>
              <CardContent>

                <Typography variant="h6">
                  Best Score
                </Typography>

                <Typography
                  variant="h3"
                  fontWeight="bold"
                >
                  {analytics.bestScore}
                </Typography>

              </CardContent>
            </Card>
          </Grid>

        </Grid>

        {/* Generate Interview */}
        <Card
          sx={{
            mt: 5,
            borderRadius: 4,
          }}
        >
          <CardContent>

            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              Generate AI Interview
            </Typography>

            <Grid container spacing={2}>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Role"
                  name="role"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Level"
                  name="level"
                  onChange={handleChange}
                >
                  <MenuItem value="Beginner">
                    Beginner
                  </MenuItem>

                  <MenuItem value="Intermediate">
                    Intermediate
                  </MenuItem>

                  <MenuItem value="Advanced">
                    Advanced
                  </MenuItem>

                </TextField>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tech Stack"
                  name="techstack"
                  onChange={handleChange}
                />
              </Grid>

            </Grid>

            <Button
              variant="contained"
              size="large"
              sx={{
                mt: 3,
                borderRadius: 3,
              }}
              onClick={generateQuestions}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Questions"}
            </Button>

          </CardContent>
        </Card>

        {/* Questions */}
        {questions.length > 0 && (
          <Card
            sx={{
              mt: 5,
              borderRadius: 4,
            }}
          >
            <CardContent>

              <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
              >
                Interview Questions
              </Typography>

              <List>

                {questions.map((question, index) => (
                  <Box key={index} sx={{ mb: 4 }}>

                    <ListItem>

                      <Typography fontWeight="bold">
                        {index + 1}. {question}
                      </Typography>

                    </ListItem>

                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="Write your answer here..."
                      value={answers[index] || ""}
                      onChange={(e) =>
                        handleAnswerChange(
                          index,
                          e.target.value
                        )
                      }
                    />

                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() =>
                        evaluateAnswer(
                          question,
                          answers[index],
                          index
                        )
                      }
                    >
                      Evaluate Answer
                    </Button>

                    {/* Results */}
                    {results[index] && (
                      <Card
                        sx={{
                          mt: 2,
                          background: "#f9fafb",
                          borderRadius: 3,
                        }}
                      >
                        <CardContent>

                          <Chip
                            label={`Score: ${results[index].score}/10`}
                            color="primary"
                            sx={{ mb: 2 }}
                          />

                          <Typography>
                            {results[index].feedback}
                          </Typography>

                        </CardContent>
                      </Card>
                    )}

                    <Divider sx={{ mt: 4 }} />

                  </Box>
                ))}

              </List>

            </CardContent>
          </Card>
        )}

        {/* Chart */}
        <Card
          sx={{
            mt: 5,
            mb: 5,
            borderRadius: 4,
          }}
        >
          <CardContent>

            <Typography
              variant="h5"
              fontWeight="bold"
              mb={3}
            >
              Score Trends
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="score"
                />
              </LineChart>
            </ResponsiveContainer>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

export default Dashboard;
const getTest = (req, res) => {
  res.json({
    message: "Backend is working 🚀",
  });
};

module.exports = {
  getTest,
};
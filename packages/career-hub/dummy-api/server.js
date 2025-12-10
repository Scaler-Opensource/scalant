const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Basic CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Middleware to parse JSON body
app.use(express.json());

// Helper function to read JSON file
const readJsonFile = (filename) => {
  const filePath = path.join(__dirname, 'data', filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent);
};

// POST /job-tracker/fetch-all-jobs/
app.post('/job-tracker/fetch-all-jobs/', (req, res) => {
  const data = readJsonFile('fetch-all-jobs.json');
  res.status(200).json(data);
});

// POST /job-tracker/fetch-pipeline-jobs/
app.post('/job-tracker/fetch-pipeline-jobs/', (req, res) => {
  const data = readJsonFile('fetch-pipeline-jobs.json');
  res.status(200).json(data);
});

// POST /job-tracker/relevancy/
app.post('/job-tracker/relevancy/', (req, res) => {
  const data = readJsonFile('relevancy.json');
  res.status(200).json(data);
});

// GET /job-tracker/fetch-process-counts/
app.get('/job-tracker/fetch-process-counts/', (req, res) => {
  const data = readJsonFile('fetch-process-counts.json');
  res.status(200).json(data);
});

// GET /job-tracker/job_profile/:id
app.get('/job-tracker/job_profile/:id', (req, res) => {
  const id = req.params.id;
  const data = readJsonFile('job_profile.json');
  data.data.id = id;

  res.status(200).json(data);
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Dummy API running at http://localhost:${PORT}`);
});

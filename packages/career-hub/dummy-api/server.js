const express = require('express');
const fs = require('fs');
const path = require('path');
const { manipulateJobData } = require('./utils/dataManipulator');
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
  const pageNumber = req.body?.page_number || 1;
  const perPage = req.body?.page_size || req.body?.per_page || 18;
  const jobIds = req.body?.filters?.job_ids;

  // Filter by job_ids if provided
  let filteredData = data;
  let shouldSkipPagination = false;

  if (jobIds && Array.isArray(jobIds) && jobIds.length > 0) {
    const hasJobsDataEnvelope = !!data?.jobs_data;
    const payload = hasJobsDataEnvelope ? data.jobs_data : data;

    // Filter jobs by job_ids - check both id and job_profile_id
    if (payload.data && Array.isArray(payload.data)) {
      const filteredJobs = payload.data.filter((job) => {
        // Check both id (string) and job_profile_id (number) fields
        const jobIdString = String(job.id || '');
        const jobProfileId = job.attributes?.job_profile_id
          ? String(job.attributes.job_profile_id)
          : '';
        // Match against any of the provided job_ids
        return jobIds.some((id) => {
          const idString = String(id);
          return idString === jobIdString || idString === jobProfileId;
        });
      });

      // Filter included companies to only those referenced by filtered jobs
      const referencedCompanyIds = new Set();
      filteredJobs.forEach((job) => {
        if (job.relationships?.company?.data?.id) {
          referencedCompanyIds.add(job.relationships.company.data.id);
        }
      });

      const filteredIncluded = (payload.included || []).filter((item) => {
        if (item.type === 'company') {
          return referencedCompanyIds.has(item.id);
        }
        return true; // Keep non-company included items
      });

      // Update total_entries to match filtered jobs count
      const filteredTotalEntries = filteredJobs.length;

      filteredData = hasJobsDataEnvelope
        ? {
            ...data,
            jobs_data: {
              ...payload,
              data: filteredJobs,
              included: filteredIncluded,
              total_entries: filteredTotalEntries,
            },
            total_entries: filteredTotalEntries,
          }
        : {
            ...payload,
            data: filteredJobs,
            included: filteredIncluded,
            total_entries: filteredTotalEntries,
          };

      // Skip pagination when filtering by job_ids (we want only the specific job(s))
      shouldSkipPagination = true;
    }
  }

  // Only apply pagination if not filtering by job_ids
  const manipulatedData = shouldSkipPagination
    ? filteredData
    : manipulateJobData(filteredData, pageNumber, perPage);
  res.status(200).json(manipulatedData);
});

// POST /job-tracker/fetch-pipeline-jobs/
app.post('/job-tracker/fetch-pipeline-jobs/', (req, res) => {
  const data = readJsonFile('fetch-pipeline-jobs.json');
  const pageNumber = req.body?.page_number || 1;
  const perPage = req.body?.page_size || req.body?.per_page || 18;
  const manipulatedData = manipulateJobData(data, pageNumber, perPage);
  res.status(200).json(manipulatedData);
});

// POST /job-tracker/relevancy/
app.post('/job-tracker/relevancy/', (req, res) => {
  const data = readJsonFile('relevancy.json');
  const pageNumber = req.body?.page_number || 1;
  const perPage = req.body?.page_size || req.body?.per_page || 18;
  const manipulatedData = manipulateJobData(data, pageNumber, perPage);
  res.status(200).json(manipulatedData);
});

// POST /job-tracker/fetch-process-counts/
app.post('/job-tracker/fetch-process-counts/', (req, res) => {
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

// GET /job-tracker/filters/
app.get('/job-tracker/filters/', (req, res) => {
  const { query_type, q } = req.query;

  if (query_type === 'companies') {
    // Return companies data
    const companiesData = readJsonFile('companies.json');
    // Filter by search query if provided
    if (q) {
      const filtered = companiesData.data.filter((company) =>
        company.attributes.name.toLowerCase().includes(q.toLowerCase())
      );
      res.status(200).json({ data: filtered });
    } else {
      res.status(200).json(companiesData);
    }
  } else if (query_type === 'title') {
    // Return titles data
    const titlesData = readJsonFile('titles.json');
    // Handle both array and object with data property
    const titlesArray = Array.isArray(titlesData)
      ? titlesData
      : titlesData.data || [];

    // Filter by search query if provided
    if (q) {
      const filtered = titlesArray.filter((title) =>
        (title.attributes?.title || title.attributes?.name || '')
          .toLowerCase()
          .includes(q.toLowerCase())
      );
      res.status(200).json({ data: filtered });
    } else {
      res.status(200).json({ data: titlesArray });
    }
  } else {
    res.status(400).json({ error: 'Invalid query_type' });
  }
});

// GET /user/skills/all
app.get('/user/skills/all', (req, res) => {
  const { prefix_q, format } = req.query;
  const skillsData = readJsonFile('experience_skills.json');

  // Filter by search query if provided
  if (prefix_q) {
    if (format === 'items') {
      // Filter items array if format is 'items'
      const filtered = (skillsData.items || []).filter((item) =>
        item.text.toLowerCase().includes(prefix_q.toLowerCase())
      );
      res.status(200).json({ items: filtered });
    } else {
      // Default: filter all_skills array
      const filtered = (skillsData.all_skills || []).filter((skill) =>
        skill.key.toLowerCase().includes(prefix_q.toLowerCase())
      );
      res.status(200).json({ all_skills: filtered });
    }
  } else {
    // Return full data structure with both all_skills and items
    res.status(200).json(skillsData);
  }
});

// POST /api/v3/careers-hub/screening-call/
app.post('/api/v3/careers-hub/screening-call/', (req, res) => {
  const data = {
    url: 'https://www.google.com',
  };
  res.status(200).json(data);
});

// PATCH /job-tracker/update-application/
app.patch('/job-tracker/update-application/', (req, res) => {
  const data = {
    success: true,
    data: req.body,
  };
  res.status(200).json(data);
});

// POST /job-tracker/v1/alerts/
app.post('/job-tracker/v1/alerts/', (req, res) => {
  const data = readJsonFile('alerts.json');
  // Optionally generate a new ID for each request
  if (data.alert && data.alert.id) {
    // Generate a random ID between 10000000 and 99999999
    data.alert.id = Math.floor(Math.random() * 90000000) + 10000000;
  }
  res.status(200).json(data);
});

// GET /job-tracker/v1/alerts/list
app.get('/job-tracker/v1/alerts/list', (req, res) => {
  const data = readJsonFile('alerts-list.json');
  res.status(200).json(data);
});

// PATCH /job-tracker/v1/alerts/update-status
app.patch('/job-tracker/v1/alerts/update-status', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { id, status } = req.body;
  // Dummy endpoint - just returns success
  res.status(200).json({ success: true });
});

// DELETE /job-tracker/v1/alerts/:id
app.delete('/job-tracker/v1/alerts/:id', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const id = req.params.id;
  // Dummy endpoint - just returns success
  res.status(200).json({ success: true });
});

// PUT /job-tracker/v1/alerts/:id
app.put('/job-tracker/v1/alerts/:id', (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const id = req.params.id;
  // eslint-disable-next-line no-unused-vars
  const { alert } = req.body;
  // Dummy endpoint - just returns success
  res.status(200).json({ success: true });
});

// Start server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Dummy API running at http://localhost:${PORT}`);
});

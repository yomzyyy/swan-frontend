import { getStorageData, setStorageData, updateStorageItem, deleteStorageItem, generateId } from '../../../utils/localStorage';

const STORAGE_KEY = 'swan_admin_careers';

export const getAllJobs = () => {
  return getStorageData(STORAGE_KEY) || [];
};

export const getJobById = (id) => {
  const jobs = getAllJobs();
  return jobs.find(job => job.id === parseInt(id));
};

export const createJob = (jobData) => {
  const jobs = getAllJobs();
  const newId = generateId(jobs);

  const newJob = {
    ...jobData,
    id: newId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  jobs.push(newJob);
  setStorageData(STORAGE_KEY, jobs);

  return { success: true, data: newJob };
};

export const updateJob = (id, jobData) => {
  const jobs = getAllJobs();
  const existingJob = getJobById(id);

  if (!existingJob) {
    return { success: false, error: 'Job not found' };
  }

  const updatedJob = {
    ...existingJob,
    ...jobData,
    id: parseInt(id),
    createdAt: existingJob.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const updatedJobs = jobs.map(job =>
    job.id === parseInt(id) ? updatedJob : job
  );

  setStorageData(STORAGE_KEY, updatedJobs);

  return { success: true, data: updatedJob };
};

export const deleteJob = (id) => {
  return deleteStorageItem(STORAGE_KEY, parseInt(id));
};

export const initializeCareersData = (defaultJobs) => {
  const existing = getAllJobs();
  if (existing.length === 0 && defaultJobs && defaultJobs.length > 0) {
    const jobsWithIds = defaultJobs.map((job, index) => ({
      ...job,
      id: index + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    setStorageData(STORAGE_KEY, jobsWithIds);
    return jobsWithIds;
  }
  return existing;
};

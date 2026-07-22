import { api } from '../../../services/api';
import type { Submission, ServiceResult } from '../../../types';

export const getAllSubmissions = async (): Promise<Submission[]> => {
  const response = await api.submissions.getAll();
  return response.data.data;
};

export const setSubmissionRead = async (id: string, isRead: boolean): Promise<ServiceResult<Submission>> => {
  try {
    const response = await api.submissions.setRead(id, isRead);
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const deleteSubmission = async (id: string): Promise<ServiceResult<Submission>> => {
  try {
    const response = await api.submissions.remove(id);
    return { success: true, data: response.data.data };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
};

export const downloadSubmissionAttachment = async (fileId: string): Promise<Blob> => {
  const response = await api.submissions.downloadAttachment(fileId);
  return response.data;
};

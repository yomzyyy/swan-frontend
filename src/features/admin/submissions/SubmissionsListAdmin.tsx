import { useState } from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '../../../components/admin';
import { getAllSubmissions, setSubmissionRead, deleteSubmission, downloadSubmissionAttachment } from './submissionsAdminService';
import { useApiQuery } from '../../../hooks';
import type { Submission } from '../../../types';

type FilterKey = 'all' | 'contact' | 'job' | 'quote';

const TYPE_LABELS: Record<string, string> = {
  contact: 'General Contact',
  job: 'Job Application',
  quote: 'Quote Request'
};

const TYPE_BADGES: Record<string, string> = {
  contact: 'bg-blue-100 text-blue-800',
  job: 'bg-green-100 text-green-800',
  quote: 'bg-amber-100 text-amber-800'
};

const HIDDEN_DETAIL_KEYS = ['fullName', 'firstName', 'lastName', 'contactPerson', 'companyName', 'email', 'resumeFileId', 'resumeFilename'];

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString('en-PH', { dateStyle: 'medium', timeStyle: 'short' });
}

function humanize(key: string): string {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase()).trim();
}

interface DetailRowProps {
  label: string;
  value: string;
}

function DetailRow({ label, value }: DetailRowProps) {
  if (!value) {
    return null;
  }
  return (
    <div>
      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      <p className="text-sm text-gray-900 whitespace-pre-wrap break-words">{value}</p>
    </div>
  );
}

function SubmissionsListAdmin() {
  const { data: submissions, loading, refetch } = useApiQuery<Submission[]>(
    () => getAllSubmissions(),
    { initialData: [] }
  );
  const [filter, setFilter] = useState<FilterKey>('all');
  const [selected, setSelected] = useState<Submission | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Submission | null>(null);

  const list = submissions!;
  const filtered = filter === 'all' ? list : list.filter((s) => s.type === filter);
  const unreadCount = list.filter((s) => !s.isRead).length;

  const openDetail = async (submission: Submission) => {
    setSelected(submission);
    if (!submission.isRead) {
      const result = await setSubmissionRead(submission.id, true);
      if (result.success) {
        refetch();
      }
    }
  };

  const toggleRead = async (submission: Submission) => {
    const result = await setSubmissionRead(submission.id, !submission.isRead);
    if (result.success) {
      refetch();
    } else {
      toast.error(result.error || 'Failed to update');
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    const result = await deleteSubmission(deleteTarget.id);
    if (result.success) {
      refetch();
      if (selected?.id === deleteTarget.id) {
        setSelected(null);
      }
    } else {
      toast.error(result.error || 'Failed to delete');
    }
    setDeleteTarget(null);
  };

  const downloadResume = async (fileId: string, filename: string) => {
    try {
      const blob = await downloadSubmissionAttachment(fileId);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Failed to download file');
    }
  };

  const filters: Array<{ key: FilterKey; label: string }> = [
    { key: 'all', label: 'All' },
    { key: 'contact', label: 'General Contact' },
    { key: 'job', label: 'Job Applications' },
    { key: 'quote', label: 'Quote Requests' }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
        <p className="text-gray-600 mt-1">
          Messages from the website contact, quote, and job application forms
          {unreadCount > 0 && (
            <span className="ml-2 text-[#207dff] font-semibold">({unreadCount} unread)</span>
          )}
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-[#207dff] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-500">Loading submissions...</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          No submissions yet.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 w-8"></th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((s) => (
                  <tr key={s.id} className={s.isRead ? '' : 'bg-blue-50/40'}>
                    <td className="px-4 py-3">
                      {!s.isRead && <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#207dff]" />}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${TYPE_BADGES[s.type]}`}>
                        {TYPE_LABELS[s.type]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-sm ${s.isRead ? 'text-gray-700' : 'font-semibold text-gray-900'}`}>
                        {s.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{formatDate(s.createdAt)}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openDetail(s)} className="text-[#207dff] hover:underline text-sm font-medium mr-3">
                        View
                      </button>
                      <button onClick={() => toggleRead(s)} className="text-gray-500 hover:underline text-sm mr-3">
                        {s.isRead ? 'Mark unread' : 'Mark read'}
                      </button>
                      <button onClick={() => setDeleteTarget(s)} className="text-red-600 hover:underline text-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${TYPE_BADGES[selected.type]}`}>
                  {TYPE_LABELS[selected.type]}
                </span>
                <p className="text-xs text-gray-400 mt-1">{formatDate(selected.createdAt)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">
                &times;
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              <DetailRow label="Name" value={selected.name} />
              <DetailRow label="Email" value={selected.email} />
              {typeof selected.data.resumeFileId === 'string' && (
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Resume</p>
                  <button
                    onClick={() => downloadResume(selected.data.resumeFileId as string, (selected.data.resumeFilename as string) || 'resume')}
                    className="mt-1 inline-flex items-center gap-2 text-sm text-[#207dff] hover:underline font-medium"
                  >
                    Download {(selected.data.resumeFilename as string) || 'file'}
                  </button>
                </div>
              )}
              {Object.entries(selected.data)
                .filter(([k]) => !HIDDEN_DETAIL_KEYS.includes(k))
                .map(([k, v]) => (
                  <DetailRow key={k} label={humanize(k)} value={v == null ? '' : String(v)} />
                ))}
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t">
              <a
                href={`mailto:${selected.email}`}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
              >
                Reply via email
              </a>
              <button
                onClick={() => setDeleteTarget(selected)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete Submission"
        message={`Delete the ${deleteTarget ? TYPE_LABELS[deleteTarget.type] : ''} submission from "${deleteTarget?.name}"? This action cannot be undone.`}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </div>
  );
}

export default SubmissionsListAdmin;

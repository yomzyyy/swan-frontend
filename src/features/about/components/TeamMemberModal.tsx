import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Close from '@mui/icons-material/Close';
import { ContentImage } from '../../../components/common';
import type { TeamMember } from '../../../types';

interface TeamMemberModalProps {
  member: TeamMember | null;
  open: boolean;
  onClose: () => void;
}

export default function TeamMemberModal({ member, open, onClose }: TeamMemberModalProps) {
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || !member) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal content */}
      <div
        className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="bg-[#003366] px-6 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <Close />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col sm:flex-row gap-6">
          {/* Image */}
          <div className="sm:w-48 flex-shrink-0">
            <ContentImage
              src={member.image}
              alt={member.name}
              className="w-full h-64 sm:h-56"
            />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-[#003366] font-medium mt-1">{member.position}</p>
            {member.description && (
              <p className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line break-words">
                {member.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

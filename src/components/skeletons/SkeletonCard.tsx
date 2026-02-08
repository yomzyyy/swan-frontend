import SkeletonBase from './SkeletonBase';

interface SkeletonCardProps {
  variant?: 'news' | 'fleet' | 'career';
}

const SkeletonCard = ({ variant = 'news' }: SkeletonCardProps) => {
  if (variant === 'news') {
    return (
      <div className="bg-white overflow-hidden shadow-lg flex flex-col">
        <SkeletonBase height="h-48" rounded="rounded-none" />
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex gap-2 mb-4">
            <SkeletonBase width="w-24" height="h-4" />
            <SkeletonBase width="w-32" height="h-4" />
          </div>
          <SkeletonBase width="w-full" height="h-6" className="mb-2" />
          <SkeletonBase width="w-3/4" height="h-6" className="mb-4" />
          <SkeletonBase width="w-full" height="h-4" className="mb-2" />
          <SkeletonBase width="w-full" height="h-4" className="mb-2" />
          <SkeletonBase width="w-2/3" height="h-4" className="mb-6" />
          <SkeletonBase width="w-32" height="h-12" />
        </div>
      </div>
    );
  }

  if (variant === 'fleet') {
    return (
      <div className="bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="relative h-52">
          <SkeletonBase height="h-full" rounded="rounded-none" />
          <div className="absolute top-4 left-4">
            <SkeletonBase width="w-20" height="h-6" rounded="rounded-full" />
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <SkeletonBase width="w-3/4" height="h-6" className="mb-4" />

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <SkeletonBase width="w-16" height="h-3" className="mb-1" />
              <SkeletonBase width="w-20" height="h-4" />
            </div>
            <div>
              <SkeletonBase width="w-12" height="h-3" className="mb-1" />
              <SkeletonBase width="w-14" height="h-4" />
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-gray-200 flex justify-between">
            <SkeletonBase width="w-20" height="h-4" />
            <SkeletonBase width="w-24" height="h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'career') {
    return (
      <div className="bg-white shadow-lg p-8 flex flex-col">
        <SkeletonBase width="w-3/4" height="h-6" className="mb-2" />
        <SkeletonBase width="w-1/2" height="h-6" className="mb-6" />

        <div className="flex gap-3 mb-6">
          <SkeletonBase width="w-32" height="h-6" rounded="rounded-full" />
          <SkeletonBase width="w-28" height="h-6" rounded="rounded-full" />
          <SkeletonBase width="w-36" height="h-6" rounded="rounded-full" />
        </div>

        <SkeletonBase width="w-full" height="h-4" className="mb-2" />
        <SkeletonBase width="w-full" height="h-4" className="mb-2" />
        <SkeletonBase width="w-full" height="h-4" className="mb-2" />
        <SkeletonBase width="w-5/6" height="h-4" className="mb-6" />

        <SkeletonBase width="w-36" height="h-12" />
      </div>
    );
  }

  return null;
};

export default SkeletonCard;

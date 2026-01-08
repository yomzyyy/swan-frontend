import SkeletonBase from './SkeletonBase';

const SkeletonStats = () => {
  return (
    <div className="bg-white shadow-sm p-6 border-l-4 border-blue-600">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <SkeletonBase width="w-32" height="h-4" className="mb-2" />
          <SkeletonBase width="w-16" height="h-8" />
        </div>
        <SkeletonBase width="w-12" height="h-12" rounded="rounded-full" />
      </div>
    </div>
  );
};

export default SkeletonStats;

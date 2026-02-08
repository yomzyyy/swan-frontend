import SkeletonBase from './SkeletonBase';
import SkeletonCard from './SkeletonCard';

const SkeletonArticle = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div
        style={{ backgroundColor: '#003366' }}
        className="text-white py-24 pt-32"
      >
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-3 mb-6">
            <SkeletonBase
              width="w-32"
              height="h-6"
              rounded="rounded-full"
              className="bg-white/20"
            />
            <SkeletonBase
              width="w-40"
              height="h-6"
              rounded="rounded-full"
              className="bg-white/20"
            />
          </div>
          <SkeletonBase
            width="w-3/4"
            height="h-12"
            className="bg-white/20 mb-4"
          />
          <SkeletonBase
            width="w-1/2"
            height="h-12"
            className="bg-white/20 mb-6"
          />
          <SkeletonBase width="w-48" height="h-6" className="bg-white/20" />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              <SkeletonBase
                height="h-96"
                rounded="rounded-none"
                className="mb-8"
              />

              {/* Content Card */}
              <div className="bg-white shadow-lg p-12">
                {Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="mb-4">
                      <SkeletonBase width="w-full" height="h-4" />
                    </div>
                  ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <SkeletonBase
                  width="w-48"
                  height="h-6"
                  className="mb-6"
                />
                <div className="space-y-6">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="bg-white shadow-lg p-4">
                        <SkeletonBase height="h-32" className="mb-4" />
                        <SkeletonBase width="w-full" height="h-5" className="mb-2" />
                        <SkeletonBase width="w-3/4" height="h-5" className="mb-3" />
                        <SkeletonBase width="w-32" height="h-4" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonArticle;

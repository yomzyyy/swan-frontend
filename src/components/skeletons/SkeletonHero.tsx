import SkeletonBase from './SkeletonBase';

const SkeletonHero = () => {
  return (
    <section className="min-h-screen relative flex items-center pt-24 pb-16 bg-grey-800">
      <div className="absolute inset-0 bg-navy-900/85 z-10"></div>

      <div className="relative z-20 max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6">
            <SkeletonBase
              width="w-3/4"
              height="h-12"
              className="bg-grey-700"
            />
            <SkeletonBase
              width="w-1/2"
              height="h-12"
              className="bg-grey-700"
            />
            <SkeletonBase
              width="w-2/3"
              height="h-12"
              className="bg-grey-700"
            />
            <div className="pt-4 space-y-3">
              <SkeletonBase
                width="w-full"
                height="h-6"
                className="bg-grey-700"
              />
              <SkeletonBase
                width="w-5/6"
                height="h-6"
                className="bg-grey-700"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
        {[0, 1, 2].map((i) => (
          <SkeletonBase
            key={i}
            width="w-3"
            height="h-3"
            className="bg-white/50"
          />
        ))}
      </div>
    </section>
  );
};

export default SkeletonHero;

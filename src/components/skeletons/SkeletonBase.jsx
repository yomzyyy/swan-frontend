const SkeletonBase = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded',
  className = ''
}) => {
  return (
    <div
      className={`${width} ${height} ${rounded} bg-grey-300 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
};

export default SkeletonBase;

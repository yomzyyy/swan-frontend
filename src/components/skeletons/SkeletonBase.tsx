interface SkeletonBaseProps {
  width?: string;
  height?: string;
  rounded?: string;
  className?: string;
}

const SkeletonBase = ({
  width = 'w-full',
  height = 'h-4',
  rounded = 'rounded',
  className = ''
}: SkeletonBaseProps) => {
  return (
    <div
      className={`${width} ${height} ${rounded} bg-grey-300 animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
};

export default SkeletonBase;

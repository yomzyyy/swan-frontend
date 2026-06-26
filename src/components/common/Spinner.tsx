interface SpinnerProps {
  className?: string;
}

const Spinner = ({ className = 'w-6 h-6' }: SpinnerProps) => (
  <div
    className={`${className} border-2 border-[#207dff] border-t-transparent rounded-full animate-spin`}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;

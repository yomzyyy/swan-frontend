interface SpinnerProps {
  /** Tailwind size classes for the spinner circle (default `w-6 h-6`). */
  className?: string;
}

/**
 * Brand-blue loading spinner. Matches the upload spinner used elsewhere in the
 * app (e.g. FleetFormAdmin), and is the placeholder shown while images load.
 */
const Spinner = ({ className = 'w-6 h-6' }: SpinnerProps) => (
  <div
    className={`${className} border-2 border-[#207dff] border-t-transparent rounded-full animate-spin`}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;

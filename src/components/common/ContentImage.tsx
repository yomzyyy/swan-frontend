import { useState, useEffect } from 'react';
import { resolveImageUrl } from '../../utils';
import Spinner from './Spinner';

interface ContentImageProps {
  /** Raw image URL as stored in the DB; resolved internally via resolveImageUrl. */
  src: string;
  alt: string;
  /**
   * True while the page is still fetching its content from the API.
   * While loading we render ONLY the spinner placeholder — never the (default)
   * src — so the real uploaded image is the first picture the user ever sees.
   * This is what prevents the "flash of fallback image".
   */
  loading?: boolean;
  /**
   * Fill the nearest positioned ancestor (absolute inset-0). Use for hero
   * banners and card backgrounds. When false, the wrapper is `relative` and the
   * caller sizes it via `className` (e.g. a fixed `w-full h-64` portrait slot).
   */
  fill?: boolean;
  /** Classes for the wrapper: sizing when not `fill`, plus rounding (clipped via overflow-hidden). */
  className?: string;
  /** Extra classes for the <img> (e.g. hover transforms). object-cover is applied by default. */
  imgClassName?: string;
}

/**
 * An <img> that never flashes a placeholder/default picture.
 *
 * It covers the two distinct loading windows that cause the flicker:
 *   1. Content fetch in flight (`loading`) — we don't yet know the real URL, so
 *      we withhold the src entirely and show a spinner.
 *   2. Image download in flight — the real <img> mounts at opacity-0 and fades
 *      in only once its `onLoad` fires.
 *
 * On error it settles on a static neutral fill rather than spinning forever.
 */
function ContentImage({
  src,
  alt,
  loading = false,
  fill = false,
  className = '',
  imgClassName = '',
}: ContentImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const resolved = resolveImageUrl(src);
  // We may render the real image only once content has loaded and we have a URL.
  const ready = !loading && Boolean(resolved);

  // Reset the fade state whenever the image we intend to show changes.
  useEffect(() => {
    setLoaded(false);
    setErrored(false);
  }, [resolved, ready]);

  const showSpinner = !ready || (!loaded && !errored);

  return (
    <div className={`${fill ? 'absolute inset-0' : 'relative'} overflow-hidden ${className}`}>
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner className="w-8 h-8" />
        </div>
      )}

      {ready && errored && <div className="absolute inset-0 bg-gray-200" aria-hidden="true" />}

      {ready && !errored && (
        <img
          src={resolved}
          alt={alt}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
    </div>
  );
}

export default ContentImage;

import { useState, useLayoutEffect, useRef } from 'react';
import { resolveImageUrl } from '../../utils';
import Spinner from './Spinner';

interface ContentImageProps {
  src: string;
  alt: string;
  loading?: boolean;
  fill?: boolean;
  className?: string;
  imgClassName?: string;
}

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
  const imgRef = useRef<HTMLImageElement>(null);

  const resolved = resolveImageUrl(src);
  const hasImage = Boolean(resolved);
  const ready = !loading && hasImage;

  useLayoutEffect(() => {
    setErrored(false);
    const node = imgRef.current;
    setLoaded(Boolean(node && node.complete && node.naturalWidth > 0));
  }, [resolved, ready]);

  const showSpinner = loading || (ready && !loaded && !errored);
  const showEmpty = (!loading && !hasImage) || errored;

  return (
    <div className={`${fill ? 'absolute inset-0' : 'relative'} overflow-hidden ${className}`}>
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Spinner className="w-8 h-8" />
        </div>
      )}

      {showEmpty && <div className="absolute inset-0 bg-gray-100" aria-hidden="true" />}

      {ready && !errored && (
        <img
          ref={imgRef}
          src={resolved}
          alt={alt}
          loading="lazy"
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

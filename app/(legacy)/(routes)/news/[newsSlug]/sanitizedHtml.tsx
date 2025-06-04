'use client';

import { useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';

export const SanitizedHtml = ({ html }: { html: string }) => {
  const cleanHtml = useMemo(() => DOMPurify.sanitize(html), [html]);

  return (
    <h3
      className="news-content text-base text-black pb-8"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

'use client';

import DOMPurify from 'dompurify';

export const SanitizedHtml = ({ html }: { html: string }) => {
  return (
    <div
      className="news-content text-base text-black pb-8"
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
    />
  );
};
'use client';

import DOMPurify from 'isomorphic-dompurify';

export const SanitizedHtml = ({ html }: { html: string }) => {
  const cleanHtml = DOMPurify.sanitize(html, {
                  ADD_TAGS: ['iframe'],
                  ADD_ATTR: ['allowfullscreen', 'frameborder', 'scrolling', 'src', 'width', 'height', 'class'],
                }).replace(
                  /<iframe([^>]*)><\/iframe>/g,
                  `<div class="responsive-iframe-wrapper"><iframe$1></iframe></div>`
                )

  return (
    <h3
      className="news-content text-base text-black pb-8"
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
};

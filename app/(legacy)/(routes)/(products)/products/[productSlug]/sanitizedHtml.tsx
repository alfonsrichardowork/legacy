'use client';

import DOMPurify from 'isomorphic-dompurify';
import { useEffect, useState } from 'react';

export const SanitizedHtml = ({ html }: { html: string }) => {
  const eachlistHtml = html.split('\n')
  const [cleanHtml, setcleanHtml] = useState<string[]>([])

    useEffect(() => {
        const fetchData =() => {
          try {
            let temp : string[] = []
            eachlistHtml.forEach((val) => {
              temp.push(DOMPurify.sanitize(val , {
                ALLOWED_TAGS: [
                    'a', 'b', 'i', 'u', 'em', 'strong', 'p', 'div', 'span', 'ul', 'ol', 'li', 'br'
                ],
                ALLOWED_ATTR: [
                    'href', 'target', 'rel', 'class', 'id', 'style'
                ],
              }))
            })
            setcleanHtml(temp)
          } catch (error) {
              console.error('Error fetching desc:', error);
          }
        };
      fetchData();
    }, []);

  return (
    <>
      {cleanHtml.map((val, idx) => (
        <h3 key={idx} className="text-base text-black" dangerouslySetInnerHTML={{ __html: val }} />
      ))}
    </>
  );
};

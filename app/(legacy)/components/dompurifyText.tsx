"use client"

import DOMPurify from "isomorphic-dompurify";
import "@/app/css/styles.scss";

type Props = {
    text: string
};

export default function DompurifyContent ({ text }: Props) {
    return (
        <div
            className="tiptap [&>iframe]:max-w-full"
            dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(text, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['allowfullscreen', 'frameborder', 'scrolling', 'src', 'width', 'height', 'class'],
            }).replace(
                /<iframe([^>]*)><\/iframe>/g,
                `<div class="responsive-iframe-wrapper"><iframe$1></iframe></div>`
            ),
            }}
        />
    )
}
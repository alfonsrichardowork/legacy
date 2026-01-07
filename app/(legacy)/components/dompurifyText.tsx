"use client"

import DOMPurify from "isomorphic-dompurify";
import "@/app/css/styles.scss";

type Props = {
    text: string
};

export default function DompurifyContent ({ text }: Props) {

    const purifier = DOMPurify.sanitize;

    DOMPurify.addHook("uponSanitizeElement", (node) => {
        if (node.nodeName === "IMG") {
            const img = node as Element;

            if (!img.getAttribute("alt")) {
            img.setAttribute("alt", "Image");
            }
        }
    });
    return (
        <div
            className="tiptap [&>iframe]:max-w-full"
            dangerouslySetInnerHTML={{
            __html: purifier(text, {
                ADD_TAGS: ['iframe'],
                ADD_ATTR: ['allowfullscreen', 'frameborder', 'scrolling', 'src', 'width', 'height', 'class', 'alt'],
            }).replace(
                /<iframe([^>]*)><\/iframe>/g,
                `<div class="responsive-iframe-wrapper"><iframe$1></iframe></div>`
            ),
            }}
        />
    )
}
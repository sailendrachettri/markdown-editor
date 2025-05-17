import React, { useState } from "react";
import { marked } from "marked";
import DOMPurify from 'dompurify';

const Editor = () => {
    
const renderer = new marked.Renderer();

renderer.image = function (href, title, text) {
  return `<img src="${href}" alt="${text}" title="${title || ''}" class="max-w-[100px] max-h-[100px] object-contain mx-auto block" />`;
};

// Then use it like:
marked.setOptions({ renderer });


    const [markdown, setMarkdown] = useState(`
 
`);

   const getSanitizedHtml = (markdownText) => {
    const rawHtml = marked(markdownText); // Convert Markdown to HTML
    const cleanHtml = DOMPurify.sanitize(rawHtml); // Sanitize the HTML
    return cleanHtml;
};

const handleTab = (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();

    const textarea = e.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Insert 4 spaces at cursor position
    const newValue = 
      markdown.substring(0, start) + 
      '    ' + 
      markdown.substring(end);

    setMarkdown(newValue);

    // Move cursor after inserted spaces
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + 4;
    }, 0);
  }
};



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen gap-4 p-4">
            {/* Markdown Input */}
            <div className="h-full w-full border-r-2 border-slate-400 overflow-hidden flex flex-col">
                <textarea
                 onKeyDown={handleTab}
                    className="flex-grow w-full hide-scrollbar p-4 resize-none border-none outline-none text-slate-800"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type Markdown here..."
                />
            </div>

            {/* Preview Output */}
            <div className="
            hide-scrollbar
         text-slate-800 border border-white flex flex-col
            overflow-auto
            w-full h-full p-4 
            [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl
            [&_h1]:font-bold [&_h2]:font-semibold
            [&_h1]:my-4 [&_h2]:my-3 [&_h3]:my-2 [&_h4]:my-2
            [&_h1]:mb-4 [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-gray-300
            [&_h2]:mb-3 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-gray-300
            [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2
            [&_pre]:my-4 [&_img]:h-10 [&_img]:w-10 [&_img]:mx-auto [&_img]:block
            [&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-4
            [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:border-gray-300
            [&_a]:font-semibold
            [&_a]:transition [&_a]:duration-150 [&_a]:underline-offset-4
            [&_a:hover]:text-blue-800 [&_a:hover]:decoration-wavy
            [&_ul]:list-disc [&_ul]:pl-6
            [&_ul>li]:mb-2 [&_ul>li]:text-gray-700
             [&_ol]:list-decimal [&_ol]:pl-6
            [&_ol>li]:mb-2 [&_ol>li]:text-gray-700
             [&_a]:text-blue-600 [&_a]:no-underline
            [&_a:hover]:underline
             [&_table]:w-full [&_table]:border [&_table]:border-collapse [&_table]:table-auto
            [&_th]:border [&_th]:border-gray-300 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold [&_th]:bg-gray-200 [&_th]:text-left
            [&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:text-left
            [&_tr:nth-child(even)]:bg-gray-50/50
              [&_pre]:bg-gray-100 [&_pre]:text-slate-800 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-auto [&_pre]:mb-4
            [&_code]:font-mono [&_code]:text-sm
            [&_code]:bg-gray-200 [&_code]:text-red-600 [&_code]:px-1 [&_code]:py-[2px] [&_code]:rounded-sm
            [&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:px-0 [&_pre_code]:py-0 [&_pre_code]:rounded-none
            [&_img]:max-w-full [&_img]:rounded-md [&_img]:shadow-md [&_img]:my-4

            

  
            ">
                <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: getSanitizedHtml(markdown) }}
                />

            </div>
        </div>
    );
};

export default Editor;

import React, { useState } from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const Editor = () => {
    const [markdown, setMarkdown] = useState(`
        
# 🚀 Markdown Editor for Hackathons

## ✨ Features
**Bold text** to highlight key ideas.  
*Italic text* to emphasize something important.  
[Visit our project site](https://hackathon.dev) for more info.

## 🧪 Syntax Examples
\`Inline code\` looks like this.  
\`\`\`js
// Code block (JavaScript)
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

## 📝 Lists
- Create bullet points
- Organize your ideas
- Collaborate easily

1. First step
2. Second step
3. Final step

## 🧩 Quotes & Tips
> “Code is like humor. When you have to explain it, it’s bad.” – Cory House

## 🖼️ Image
![Hackathon Logo](https://placekitten.com/300/200)

## ✅ Task List
- [x] Write Markdown input
- [x] Render sanitized preview
- [ ] Add export feature
- [ ] Submit to judges

## 🎯 Heading Levels
# H1 – Project Title  
## H2 – Section  
### H3 – Subsection  
#### H4 – Detail  
##### H5 – Small Note  
###### H6 – Footnote

Made with ❤️ at Hackathon 2025
`);

    const getSanitizedHtml = (markdownText) => {
        const rawHtml = marked.parse(markdownText);
        return sanitizeHtml(rawHtml, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                img: ["src", "alt"],
                a: ["href", "target"],
            },
        });
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen gap-4 p-4 bg-gray-100">
            {/* Markdown Input */}
            <div className="h-full w-full border rounded-lg overflow-hidden flex flex-col">
                <textarea
                    className="flex-grow w-full p-4 resize-none border-none outline-none bg-white text-gray-800"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type Markdown here..."
                />
            </div>

            {/* Preview Output */}
            <div className="
  w-full h-full p-4 bg-white rounded-lg border overflow-auto
  [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl
  [&_h1]:font-bold [&_h2]:font-semibold
  [&_a]:text-blue-600 [&_a]:underline [&_a]:font-semibold
  [&_a]:transition [&_a]:duration-150 [&_a]:underline-offset-4
  [&_a:hover]:text-blue-800 [&_a:hover]:decoration-wavy
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

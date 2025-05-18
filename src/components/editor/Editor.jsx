import  { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from 'dompurify';
import { useRef } from 'react';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import getReadingTime from "../../utility/functions/GetReadingTime";

const options = {
   // default is `save`
   method: 'open',
   // default is Resolution.MEDIUM = 3, which should be enough, higher values
   // increases the image quality but also the size of the PDF, so be careful
   // using values higher than 10 when having multiple pages generated, it
   // might cause the page to crash or hang.
   resolution: Resolution.HIGH,
   page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: 'letter',
      // default is 'portrait'
      orientation: 'portrait',
   },
   canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: 'image/jpeg',
      qualityRatio: 1
   },
   // Customize any value passed to the jsPDF instance and html2canvas
   // function. You probably will not need this and things can break, 
   // so use with caution.
   overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
         compress: true
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
         useCORS: true
      }
   },
};

// you can use a function to return the target element besides using React refs
const getTargetElement = () => document.getElementById('content-id');

const Editor = () => {
	const [wordsCount, setWordsCount] = useState(0);
  	const [charactersCount, setCharactersCount] = useState(0);  
 	const [markdown, setMarkdown] = useState(`# 🌟 Welcome to My Markdown Editor

Welcome to **_your very own_** Markdown editor. This sample document will help you test all major Markdown features!

---

## 📚 Table of Contents

1. [Headings](#headings)
2. [Text Styles](#text-styles)
3. [Lists](#lists)
4. [Links & Images](#links--images)
5. [Code Blocks](#code-blocks)
6. [Tables](#tables)
7. [Blockquotes](#blockquotes)
8. [Horizontal Rule](#horizontal-rule)
9. [Task List](#task-list)
10. [Emoji Test](#emoji-test)

---

## 🅰️ Headings

# H1
## H2
### H3
#### H4
##### H5
###### H6

---

## ✍️ Text Styles

- **Bold**
- _Italic_
- ~~Strikethrough~~
- **_Bold & Italic_**

---

## 📋 Lists

### ✅ Unordered List
- Item One
  - Nested Item
    - Sub-nested Item
- Item Two
- Item Three

### 🔢 Ordered List
1. First
2. Second
3. Third

---

## 🔗 Links & Images

### 🌐 Link

[Visit OpenAI](https://openai.com)

### 🖼️ Image

![Markdown Logo](https://picsum.photos/400/200)

---

## 💻 Code Blocks

### Inline Code
Here is some inline code: \`console.log("Hello, Markdown!")\`

### JavaScript Example

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet("World"));
\`\`\`

### Python Example

\`\`\`python
def greet(name):
    return f"Hello, {name}!"
print(greet("Markdown"))
\`\`\`

---

## 📊 Tables

| Feature       | Supported | Notes                   |
|---------------|-----------|--------------------------|
| Bold          | ✅         | Use \`**text**\`           |
| Images        | ✅         | Must be a valid URL      |
| Nested Lists  | ✅         | Indentation required     |

---

## 💬 Blockquotes

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

---

## ⬇️ Horizontal Rule

---

## 📌 Task List

- [x] Write markdown example
- [x] Test in editor
- [ ] Submit feedback
- [ ] Add dark mode toggle

---

## 😀 Emoji Test

✅ 👍 💡 🚀 ✨ 😍 🔥 🎉 🛠️ 🎯 📝
`);

	const [generateStatus, setGenerateStatus] = useState(false);

  // Calculate sanitized HTML once per markdown change
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  useEffect(() => {
    const rawHtml = marked(markdown);
    const cleanHtml = DOMPurify.sanitize(rawHtml);

    setSanitizedHtml(cleanHtml);

    // Count words in clean HTML text content
    const textOnly = cleanHtml.replace(/<[^>]*>?/gm, ""); // strip HTML tags
    const words = textOnly.trim().split(/\s+/).filter(Boolean).length;
    setWordsCount(words);

    setCharactersCount(textOnly.length);
  }, [markdown]);

  const lineCount = markdown.split('\n').length;

  const handleTab = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();

      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newValue = 
        markdown.substring(0, start) + 
        '    ' + 
        markdown.substring(end);

      setMarkdown(newValue);

      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

const handleGeneratePDF = async () => {
	try {
		setGenerateStatus(true);
		await generatePDF(getTargetElement, options);
		setGenerateStatus(false);

	} catch (error) {
		console.error('PDF generation failed:', error);
		setGenerateStatus(false);
	} 
};



    return (
        <>
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 min-h-[93vh] p-4 ">
            {/* Markdown Input */}
            <div>
				<h2 className="border-t border-l border-r border-slate-400 ps-5 py-3 text-slate-600 uppercase tracking-[1px]">Markdown</h2>
				<div className="h-full w-full border-r border-t border-l border-slate-400 overflow-hidden flex flex-col">
                <textarea
                 onKeyDown={handleTab}
                    className="flex-grow w-full hide-scrollbar p-4 resize-none border-none outline-none text-slate-800"
                    value={markdown}
                    onChange={(e) => setMarkdown(e.target.value)}
                    placeholder="Type Markdown here..."
                />
                {/* Line count display */}
              <div className="text-right text-sm text-gray-500 p-1 pe-3 select-none">
                Lines: {lineCount}
              </div>
            </div>
			</div>

            {/* Preview Output */}
           <div>
				<div className="flex  justify-between px-5 py-3 border-t border-r border-slate-400  text-slate-600 ">
					<h2 className=" uppercase tracking-[1px]">Preview</h2>
					<div className=""
						onClick={()=> {handleGeneratePDF()}}
					>
						{generateStatus ? <div>
							<div className="flex gap-x-1 text-sm cursor-pointer w-fit">
							<div>Generating...</div>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 animate-spin">
								<path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
							</svg>

						</div>
						</div> :
							<div className="flex gap-x-1 text-sm cursor-pointer w-fit">
							<div>Export as PDF</div>

							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
							</svg>
						</div>
						}
					</div>
				</div>
				<div 
				id="content-id"
				className="
				hide-scrollbar  border-t border-r border-slate-400
			text-slate-800  flex flex-col bg-slate-50/20
				overflow-auto
				w-full h-full
				[&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl
				[&_h1]:font-bold [&_h2]:font-semibold
				[&_h1]:my-4 [&_h2]:my-3 [&_h3]:my-2 [&_h4]:my-2
				[&_h1]:mb-4 [&_h1]:pb-2 [&_h1]:border-b [&_h1]:border-gray-300
				[&_h2]:mb-3 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-gray-300
				[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2
				[&_pre]:my-4 [&_img]:h-full [&_img]:w-full [&_img]:mx-auto [&_img]:block
				[&_img]:rounded-md [&_img]:shadow-md [&_img]:my-4
				[&_blockquote]:my-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-4
				[&_blockquote]:italic [&_blockquote]:bg-slate-50 [&_blockquote]:text-gray-600 [&_blockquote]:border-gray-300
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
				
	
				">
					<div
						className="h-full bg-white p-4 w-full overflow-hidden flex flex-col"
						dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
					/>
					<div className="text-right text-sm text-gray-500 p-1 select-none">
					Reading Time: {getReadingTime(wordsCount || '')} <span className="px-1">•</span> Words: {wordsCount} <span className="px-1">•</span> Characters : {charactersCount}
				</div>

				</div>
		   </div>
        </div>
		</div>
		</>
    );
};

export default Editor;

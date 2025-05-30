import  { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from 'dompurify';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import getReadingTime from "../../utility/functions/GetReadingTime";
import { IoCopyOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";


const options = {
   
   method: 'open',
   
   resolution: Resolution.HIGH,
   page: {
      margin: Margin.SMALL,
      format: 'letter',
      orientation: 'portrait',
   },
   canvas: {
      mimeType: 'image/jpeg',
      qualityRatio: 1
   },
   overrides: {
      pdf: {
         compress: true
      },
      canvas: {
         useCORS: true
      }
   },
};

const containerHeight = "h-[86.3vh]";

const getTargetElement = () => document.getElementById('content-id');

const Editor = ({themeMode}) => {
	const [wordsCount, setWordsCount] = useState(0);
  	const [charactersCount, setCharactersCount] = useState(0);  
	const [copyToClipboard, setCopyToClipboard] = useState(false);
 	const [markdown, setMarkdown] = useState(`# 🌟 Online Markdown Editor

Welcome to **_your very own_** Markdown editor. This sample document will help you test all major Markdown features. Start writing your own Markdown below, and see the preview on the right.

<!-- You can write comment like this for your reference -->

---


## 💬 Blockquotes

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.


## 🅰️ Headings

# H1
## H2
### H3
#### H4
##### H5
###### H6

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

Open [Browser](https://openai.com) and type [google.com](https://google.com)

### 🖼️ Image

![Picture](https://picsum.photos/400/200)

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
	const [fullScreenMode, setFullScreenMode] = useState(false);

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
	const element = getTargetElement();

	// Temporarily expand the div to show all content
	const originalStyle = {
		height: element.style.height,
		overflow: element.style.overflow,
	};
	element.style.height = 'auto';
	element.style.overflow = 'visible';

	try {
		setGenerateStatus(true);
		await generatePDF(getTargetElement, options);
		setGenerateStatus(false);

	} catch (error) {
		console.error('PDF generation failed:', error);
		setGenerateStatus(false);
	} finally {
		// Restore original styles
		element.style.height = originalStyle.height;
		element.style.overflow = originalStyle.overflow;
	}
	};

	function fallbackCopyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;

  // Avoid scrolling to bottom
  textarea.style.top = "0";
  textarea.style.left = "0";
  textarea.style.position = "fixed";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  try {
    document.execCommand("copy");
    console.log("Fallback: Text copied to clipboard");
  } catch (err) {
    console.error("Fallback: Unable to copy", err);
  }

  document.body.removeChild(textarea);
}


function handleCopyText() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(markdown)
      .then(() => console.log('Copied with Clipboard API'))
      .catch(err => console.error('Clipboard API failed', err));
	
	  setCopyToClipboard(true);
  } else {
    fallbackCopyToClipboard(markdown);
  }

  setTimeout(() => {
	setCopyToClipboard(false);
  }, 3000);
}


    return (
        <>
		<div>
			<div className={`grid grid-cols-1 ${fullScreenMode ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-y-10 md:gap-0 min-h-[100vh] px-4 pt-2 pb-0`}>
            {/* Markdown Input */}
            <div className="w-full">
				<div className={`flex justify-between border-t border-l ${themeMode==='dark' ? 'bg-dark border-slate-100 ' : 'bg-light border-slate-400'} border-r  px-5 py-3`}>
					<h2 className={` ${themeMode ==='dark' ? 'text-white' : 'text-slate-600'} uppercase tracking-[1px]`}>Markdown</h2>
					<div
					className={`${themeMode=='dark'? 'text-white' : 'text-slate-500'} md:block hidden`}
						onClick={()=>{setFullScreenMode(prev => !prev)}}
					>
						{
							fullScreenMode ?
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer hover:text-blue-500">
								<path strokeLinecap="round" strokeLinejoin="round" d="M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25" />
							</svg>
								:
							
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 cursor-pointer hover:text-blue-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
							</svg>

						}
					</div>
				</div>
				<div className={`${containerHeight} overflow-auto w-full border-r border-t border-l ${themeMode==='dark' ? 'border-slate-100' : 'border-slate-400'} flex flex-col`}>
					<textarea
					onKeyDown={handleTab}
						className={`flex-grow w-full hide-scrollbar p-4 resize-none border-none outline-none ${themeMode === 'dark' ? 'text-white bg-dark' : 'text-slate-800 bg-white'}`}
						value={markdown}
						onChange={(e) => setMarkdown(e.target.value)}
						placeholder="Type Markdown here..."
					/>
					{/* Line count display */}
				<div className={`text-right bg-slate-100 text-sm text-gray-500 p-1 pe-4 select-none`}>
					Lines: {lineCount} 
				</div>
				
            </div>
			</div>

            {/* Preview Output */}
           {!fullScreenMode ?
				<div className="overflow-auto group">
					<div className={`flex justify-between ${themeMode==='dark' ? 'bg-dark text-light' : 'bg-slate-100 text-slate-600 border-slate-400'}  px-5 py-3 border-t border-r    `}>
						<h2 className=" uppercase tracking-[1px]">Preview</h2>
						<div 
							onClick={()=> {handleCopyText()}}
							className=" group-hover:block hidden">
							{copyToClipboard ? 
							<span className="text-sm flex gap-x-1 items-center justify-center cursor-pointer min-w-20"><IoCheckmarkDoneOutline size={18} />  Copied  </span> :
							<span className="text-sm flex gap-x-1 items-center justify-center cursor-pointer min-w-20"><IoCopyOutline /> Copy </span>}
						</div>
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
								<div className="flex gap-x-1 items-center text-sm cursor-pointer w-fit">
								<div title="If not generating, clear and retry with new input." className="me-2">
									<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
									<path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
								</svg>
								</div>

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
						className={`hide-scrollbar border-t border-r flex flex-col ${containerHeight} w-full overflow-scroll
								[&_h1]:text-xl [&_h1]:sm:text-xl [&_h1]:md:text-2xl [&_h1]:lg:text-4xl
								[&_h1]:text-xl [&_h1]:sm:text-xl [&_h1]:md:text-2xl [&_h1]:lg:text-4xl
								[&_h2]:text-lg [&_h2]:sm:text-lg [&_h2]:md:text-xl [&_h2]:lg:text-2xl
								[&_h3]:text-base [&_h3]:sm:text-base [&_h3]:md:text-lg [&_h3]:lg:text-xl
								[&_h4]:text-sm [&_h4]:sm:text-sm [&_h4]:md:text-base [&_h4]:lg:text-lg
								[&_h5]:text-xs [&_h5]:md:text-sm [&_h5]:lg:text-base
								[&_h6]:text-[0.65rem] [&_h6]:md:text-xs [&_h6]:lg:text-sm

								 [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl
								[&_h1]:font-bold [&_h2]:font-semibold
								[&_h1]:my-4 [&_h2]:my-3 [&_h3]:my-2 [&_h4]:my-2
								[&_h1]:mb-4 [&_h1]:pb-2 [&_h1]:border-b 
								[&_h2]:mb-3 [&_h2]:pb-1 [&_h2]:border-b 
								[&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2
								[&_pre]:my-4 [&_img]:h-full [&_img]:w-full [&_img]:mx-auto [&_img]:block
								[&_img]:rounded-md [&_img]:shadow-md [&_img]:my-0
								[&_p]:text-justify [&_p]:lg:text-start
								[&_blockquote]:my-4 [&_blockquote]:text-justify [&_blockquote]:pe-4 [&_blockquote]:border-l-4 [&_blockquote]:pl-4
								[&_blockquote]:italic [&_blockquote]:bg-slate-50 [&_blockquote]:text-gray-600 [&_blockquote]:border-gray-300
								[&_a]:font-semibold [&_a]:transition [&_a]:duration-150 [&_a]:underline-offset-4
								[&_a]:text-blue-600 [&_a]:no-underline [&_a:hover]:text-blue-800 [&_a:hover]:decoration-wavy [&_a:hover]:underline
								[&_ul]:list-disc [&_ul]:pl-6 [&_ul>li]:mb-2 [&_ul>li]:text-gray-700
								[&_ol]:list-decimal [&_ol]:pl-6 [&_ol>li]:mb-2 [&_ol>li]:text-gray-700
								[&_table]:w-full [&_table]:border [&_table]:border-collapse [&_table]:table-auto
								[&_th]:border [&_th]:border-gray-300 [&_th]:px-4 [&_th]:py-2 [&_th]:font-semibold  [&_th]:text-left
								[&_td]:border [&_td]:border-gray-300 [&_td]:px-4 [&_td]:py-2 [&_td]:text-left
								[&_input[type="checkbox"]]:accent-blue-600
								[&_input[type="checkbox"]]:h-4
								[&_input[type="checkbox"]]:w-4
								[&_input[type="checkbox"]]:mr-2
								[&_input[type="checkbox"]]:align-middle
								[&_input[type="checkbox"]]:rounded
								[&_pre]:bg-gray-100 [&_pre]:text-slate-800 [&_pre]:p-4 [&_pre]:rounded-md [&_pre]:overflow-auto [&_pre]:mb-4 [&_pre]:max-h-96 [&_pre]:min-h-fit
								[&_code]:font-mono [&_code]:text-sm [&_code]:bg-gray-200 [&_code]:text-red-600 [&_code]:px-1 [&_code]:py-[2px] [&_code]:rounded-sm
								[&_pre_code]:bg-transparent [&_pre_code]:text-inherit [&_pre_code]:px-0 [&_pre_code]:py-0 [&_pre_code]:rounded-none
								${themeMode === 'dark' 
								? 'border-slate-400 [&_ul>li]:text-slate-50 [&_ol>li]:text-slate-50 [&_tr:nth-child(even)]:bg-[#1a1a1a] [&_th]:bg-[#252424] [&_th]:text-[#e7e4e4]   [&_blockquote]:border-gray-400  [&_pre]:bg-slate-100 bg-slate-50/5 text-slate-800 [&_h1]:border-gray-300 [&_h2]:border-gray-300' 
								: 'bg-dark text-light [&_h1]:border-dark   [&_h2]:border-dark'
								}
							`}
						> 	

						<div
							className={`h-full ${themeMode==='dark' ? 'bg-dark text-white' :'bg-white text-slate-800'} p-4 w-full overflow-auto flex flex-col`}
							dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
						/>
						<div className={`text-right flex item-center justify-center md:justify-end bg-slate-100 text-sm text-gray-500 p-1 pe-4 select-none`}>
						<div>
						Reading Time: {getReadingTime(wordsCount || '')} <span className="px-1">•</span>
						</div>
						 <div>
						 Words: {wordsCount}
						 </div>
						 <div className="hidden mini:block">
							<span className="px-1">•</span> 
							Characters : {charactersCount}
							</div>
						</div>

					</div>
			</div> : null
		   }
        </div>
		</div>
		</>
    );
};

export default Editor;

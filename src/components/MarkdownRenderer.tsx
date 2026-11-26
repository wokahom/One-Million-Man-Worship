import React from "react";

/**
 * Custom Markdown Parser & Renderer for One Million Man Worship
 * Parses headers (#, ##, ###), bold (**text**), italic (*text*), blockquotes (> quote),
 * bullet lists (- item), numbered lists (1. item), code blocks (```), inline code (`code`),
 * links ([text](url)), and paragraphs with beautiful styling.
 */
export default function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBuffer: string[] = [];
  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = () => {
    if (currentList) {
      if (currentList.type === "ul") {
        elements.push(
          <ul
            key={`list-${elements.length}`}
            className="my-5 space-y-2.5 pl-6 list-disc list-outside text-slate-300"
          >
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ul>
        );
      } else {
        elements.push(
          <ol
            key={`list-${elements.length}`}
            className="my-5 space-y-2.5 pl-6 list-decimal list-outside text-slate-300"
          >
            {currentList.items.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInlineFormatting(item)}
              </li>
            ))}
          </ol>
        );
      }
      currentList = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = rawLine.trim();

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        // closing code block
        elements.push(
          <div
            key={`code-${elements.length}`}
            className="my-6 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-amber-300 font-mono text-sm overflow-x-auto shadow-inner"
          >
            <pre className="whitespace-pre">{codeBuffer.join("\n")}</pre>
          </div>
        );
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    // Empty lines
    if (!line) {
      flushList();
      continue;
    }

    // Bullet lists
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const itemText = line.substring(2);
      if (currentList && currentList.type === "ul") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      }
      continue;
    }

    // Numbered lists
    const numMatch = line.match(/^(\d+)\.\s+(.+)$/);
    if (numMatch) {
      const itemText = numMatch[2];
      if (currentList && currentList.type === "ol") {
        currentList.items.push(itemText);
      } else {
        flushList();
        currentList = { type: "ol", items: [itemText] };
      }
      continue;
    }

    // Any other element ends lists
    flushList();

    // Headers
    if (line.startsWith("#### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl md:text-2xl font-bold text-amber-400 mt-8 mb-4 tracking-tight"
        >
          {renderInlineFormatting(line.substring(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl md:text-2xl font-bolder text-amber-400 mt-8 mb-4 tracking-tight"
        >
          {renderInlineFormatting(line.substring(4))}
        </h3>
      );
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl md:text-3xl font-extrabold text-white mt-10 mb-5 tracking-tight border-b border-slate-800/80 pb-3"
        >
          {renderInlineFormatting(line.substring(3))}
        </h2>
      );
      continue;
    }

    if (line.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${i}`}
          className="text-3xl md:text-4xl font-black text-white mt-12 mb-6 tracking-tight"
        >
          {renderInlineFormatting(line.substring(2))}
        </h1>
      );
      continue;
    }

    // Blockquotes
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={`quote-${i}`}
          className="my-6 pl-5 py-3 border-l-4 border-amber-400 bg-amber-500/5 rounded-r-2xl italic text-slate-200 text-lg leading-relaxed"
        >
          {renderInlineFormatting(line.substring(2))}
        </blockquote>
      );
      continue;
    }

    // Divider
    if (line === "---" || line === "***") {
      elements.push(
        <hr key={`hr-${i}`} className="my-8 border-slate-800" />
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p
        key={`p-${i}`}
        className="text-slate-300 text-base md:text-lg leading-relaxed my-4 font-normal"
      >
        {renderInlineFormatting(line)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{elements}</div>;
}

/**
 * Handles inline bold (**text**), italics (*text*), inline code (`code`), and markdown links [text](url)
 */
function renderInlineFormatting(text: string): React.ReactNode {
  // Pattern matching links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(parseBoldItalic(text.substring(lastIndex, match.index)));
    }
    const linkText = match[1];
    const linkUrl = match[2];
    parts.push(
      <a
        key={`link-${match.index}`}
        href={linkUrl}
        target={linkUrl.startsWith("http") ? "_blank" : undefined}
        rel="noopener noreferrer"
        className="text-amber-400 hover:text-amber-300 underline underline-offset-4 font-medium transition"
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(parseBoldItalic(text.substring(lastIndex)));
  }

  return parts;
}

function parseBoldItalic(text: string): React.ReactNode {
  // Split tokens by bold (`**...**`), inline code (``` `...` ```), and italics (`*...*`)
  const boldParts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

  return boldParts.map((segment, index) => {
    if (segment.startsWith("**") && segment.endsWith("**")) {
      return (
        <strong key={index} className="font-bold text-white">
          {segment.slice(2, -2)}
        </strong>
      );
    }
    if (segment.startsWith("`") && segment.endsWith("`")) {
      return (
        <code
          key={index}
          className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-amber-300 font-mono text-sm"
        >
          {segment.slice(1, -1)}
        </code>
      );
    }
    if (segment.startsWith("*") && segment.endsWith("*")) {
      return (
        <em key={index} className="italic text-slate-200">
          {segment.slice(1, -1)}
        </em>
      );
    }
    return segment;
  });
}

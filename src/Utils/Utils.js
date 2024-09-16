import katex from "katex";
import "katex/dist/katex.min.css";
import React from "react";
import { BlockMath, InlineMath } from "react-katex";

export const idProvider = (location) => {
  const partParts = location.pathname.split("/");
  const id = partParts[partParts.length - 1];
  return id;
};

export const parseMathSolution = (content) => {
  // Ensure content is a string before proceeding
  if (typeof content !== "string") {
    console.error(
      "parseMathSolution expects a string content, but received:",
      typeof content
    );
    return []; // Return an empty array to prevent further processing
  }

  // Replace escaped newlines with actual newlines
  content = content.replace(/\\n/g, "\n");

  // Regex patterns
  const mathRegex = /\\\[([^]*?)\\\]|\$\$([^]*?)\$\$|\\\((.*?)\\\)|\$(.*?)\$/g;
  const boldRegex = /\*\*(.*?)\*\*/gs;
  const listRegex = /^(\s*)(\d+\.)\s+(.*)$|^(\s*)-\s+(.*)$/gm;
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const hrRegex = /^---$/gm;

  // Function to safely render KaTeX
  const safeKatexRender = (tex, isBlock) => {
    try {
      return isBlock ? <BlockMath math={tex} /> : <InlineMath math={tex} />;
    } catch (error) {
      console.error("KaTeX rendering error:", error);
      return <span style={{ color: "red" }}>{tex}</span>; // Fallback to plain text if rendering fails
    }
  };

  // Function to process the content blocks
  const processContentBlocks = (text) => {
    const blocks = text.split(/\n\s*\n/); // Split by double newlines
    const processedBlocks = blocks.map((block, index) => {
      // Process headings and horizontal rules
      let processedBlock = processHeadingsAndRules(block.trim());
      return <div key={index}>{processedBlock}</div>;
    });
    return processedBlocks;
  };

  // Function to process headings and horizontal rules
  const processHeadingsAndRules = (text) => {
    const parts = [];
    let lastIndex = 0;

    text.replace(
      new RegExp(`${headingRegex.source}|${hrRegex.source}`, "gm"),
      (match, hashes, headingContent, offset) => {
        if (lastIndex < offset) {
          const textPart = text.substring(lastIndex, offset);
          parts.push(...processLists(textPart));
        }

        if (hashes) {
          const level = Math.min(hashes.length, 6); // Limit heading levels to h6
          const HeadingTag = `h${level}`;
          parts.push(
            <HeadingTag key={offset}>
              {processTextFormatting(headingContent.trim())}
            </HeadingTag>
          );
        } else if (match === "---") {
          parts.push(<hr key={offset} />);
        }

        lastIndex = offset + match.length;
      }
    );

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(...processLists(remainingText));
    }

    return parts;
  };

  // Function to process lists
  const processLists = (text) => {
    const parts = [];
    let lastIndex = 0;

    text.replace(
      listRegex,
      (
        match,
        numberIndent,
        numberedMarker,
        numberedContent,
        bulletIndent,
        bulletContent,
        offset
      ) => {
        if (lastIndex < offset) {
          const textPart = text.substring(lastIndex, offset);
          parts.push(...processTextFormatting(textPart));
        }

        const indentLevel = (numberIndent || bulletIndent || "").length / 2;

        if (numberedMarker) {
          parts.push(
            <div
              key={offset}
              style={{
                marginLeft: `${indentLevel * 20}px`,
                marginTop: "5px",
              }}
            >
              {numberedMarker} {processTextFormatting(numberedContent.trim())}
            </div>
          );
        } else if (bulletContent) {
          parts.push(
            <div
              key={offset}
              style={{
                marginLeft: `${indentLevel * 20}px`,
                marginTop: "5px",
              }}
            >
              • {processTextFormatting(bulletContent.trim())}
            </div>
          );
        }

        lastIndex = offset + match.length;
      }
    );

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(...processTextFormatting(remainingText));
    }

    return parts;
  };

  // Function to process text formatting (bold, math expressions)
  const processTextFormatting = (text) => {
    if (typeof text !== "string") return text;

    const parts = [];
    let lastIndex = 0;

    text.replace(boldRegex, (match, boldContent, offset) => {
      if (lastIndex < offset) {
        const textPart = text.substring(lastIndex, offset);
        parts.push(...processMathExpressions(textPart));
      }

      parts.push(
        <strong key={offset}>
          {processMathExpressions(boldContent.trim())}
        </strong>
      );

      lastIndex = offset + match.length;
    });

    if (lastIndex < text.length) {
      const remainingText = text.substring(lastIndex);
      parts.push(...processMathExpressions(remainingText));
    }

    return parts;
  };

  // Function to process math expressions within text
  const processMathExpressions = (text) => {
    if (typeof text !== "string") return text;

    const parts = [];
    let lastIndex = 0;

    text.replace(
      mathRegex,
      (
        match,
        blockMath,
        blockDollarMath,
        inlineMath,
        inlineDollarMath,
        offset
      ) => {
        if (lastIndex < offset) {
          parts.push(text.substring(lastIndex, offset));
        }

        const mathContent =
          blockMath || blockDollarMath || inlineMath || inlineDollarMath;
        const isBlock = !!(blockMath || blockDollarMath);

        // Center all equations, including inline math
        parts.push(
          <div
            key={offset}
            className="math"
            style={{ textAlign: "center", margin: "10px 0" }}
          >
            {safeKatexRender(mathContent, isBlock)}
          </div>
        );

        lastIndex = offset + match.length;
      }
    );

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts;
  };

  // Main processing
  const result = processContentBlocks(content);

  // Flatten result to ensure proper rendering
  return result.flat();
};

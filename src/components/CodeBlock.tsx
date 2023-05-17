import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import customStyle from "@/styles/syntax-highlighter.customStyle";
import React from "react";

interface CodeBlockInterface {
  language: string;
  children: string | string[];
}

const CodeBlock = ({ language, children }: CodeBlockInterface) => {
  const sample = children?.toString();
  console.log(sample);
  return (
    <SyntaxHighlighter
      wrapLines
      showLineNumbers
      customStyle={customStyle}
      language={language}
      style={atomOneDark}
    >
      {sample}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;

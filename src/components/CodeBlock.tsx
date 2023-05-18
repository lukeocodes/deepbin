import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Replacer } from "react-element-replace";
import { useProjectContext } from "@/components/context/project";
import customStyle from "@/styles/syntax-highlighter.customStyle";
import SyntaxHighlighter from "react-syntax-highlighter";

interface CodeBlockInterface {
  language: string;
  children: string | string[];
}

const CodeBlock = ({ language, children }: CodeBlockInterface) => {
  const { project, setProject } = useProjectContext();

  let sample: string = "";

  if (!Array.isArray(children) && typeof children === "string") {
    sample = children;
  }

  if (Array.isArray(children)) {
    children.forEach((child) => {
      sample += child;
    });
  }

  const matcher = (x: any) => typeof x === "string" && x.includes("<token>");

  const masker = (x: any) => (
    <span className="blur-sm hover:blur-none transition-all">
      {x.replace(/<token>/g, project)}
    </span>
  );

  const replacer = project ? masker : (x: any) => x;

  return (
    <Replacer match={matcher} replace={replacer}>
      <SyntaxHighlighter
        wrapLines
        showLineNumbers
        customStyle={customStyle}
        language={language}
        style={atomOneDark}
      >
        {sample}
      </SyntaxHighlighter>
    </Replacer>
  );
};

export default CodeBlock;

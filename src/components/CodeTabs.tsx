import { Tab } from "@headlessui/react";
import classNames from "@/util/classNames";
import { useLanguageContext } from "@/components/context/language";
import CodeBlock from "@/components/CodeBlock";

const CodeTabs = ({ samples }: { samples: { [key: string]: string } }) => {
  const { language, setLanguage } = useLanguageContext();
  const sampleKeys = Object.keys(samples);

  // console.log(sampleKeys, language);
  const sampleIndex = sampleKeys.findIndex((key) => {
    return key === language;
  });

  const updateLanguage = (index: number) => setLanguage(sampleKeys[index]);

  return (
    <Tab.Group selectedIndex={sampleIndex} onChange={updateLanguage}>
      <Tab.List className="flex -mb-px ml-4 gap-px">
        {Object.keys(samples).map((sample) => (
          <div
            key={sample}
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-t-lg overflow-hidden"
          >
            <Tab
              key={sample}
              className={({ selected }) =>
                classNames(
                  "px-4 pt-3 pb-2 border-2 border-transparent focus-visible:outline-none uppercase text-xs font-bold",
                  selected
                    ? "bg-zinc-800 border-b-0 pb-2"
                    : "bg-black border-b border-b-zinc-700"
                )
              }
            >
              {sample}
            </Tab>
          </div>
        ))}
      </Tab.List>
      <Tab.Panels>
        {Object.values(samples).map((sample, idx) => (
          <Tab.Panel key={idx} className={classNames("")}>
            <CodeBlock language={Object.keys(samples)[idx]}>{sample}</CodeBlock>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default CodeTabs;

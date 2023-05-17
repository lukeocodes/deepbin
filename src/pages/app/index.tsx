import AppLayout from "@/components/layouts/AppLayout";
import CodeTabs from "@/components/CodeTabs";
import CodeBlock from "@/components/CodeBlock";

import type { NextPage } from "next";

const samples: { [key: string]: string } = {
  javascript: `// pre-recorded.js
const fetch = require('node-fetch');

const url = 'https://deepbin.dev/api/proxy/v1/listen?model=nova';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token mkmerg'
  },
  body: JSON.stringify({
    url: 'https://dpgr.am/spacewalk.wav'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`,
  python: `// pre-recorded.py
const fetch = require('node-fetch');

const url = 'https://deepbin.dev/api/proxy/v1/listen?model=nova';
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Token mkmerg'
  },
  body: JSON.stringify({
    url: 'https://dpgr.am/spacewalk.wav'
  })
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));`,
};

const Stats = () => {
  const stats = [
    { name: "Number of deploys", value: "405" },
    { name: "Average deploy time", value: "3.65", unit: "mins" },
    { name: "Number of servers", value: "3" },
    { name: "Success rate", value: "98.5%" },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="bg-zinc-900 border-zinc-700 border rounded-md px-4 py-6 sm:px-6 lg:px-8"
        >
          <p className="text-sm font-medium leading-6 text-gray-400">
            {stat.name}
          </p>
          <p className="mt-2 flex items-baseline gap-x-2">
            <span className="text-4xl font-semibold tracking-tight text-white">
              {stat.value}
            </span>
            {stat.unit ? (
              <span className="text-sm text-gray-400">{stat.unit}</span>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  return (
    <AppLayout>
      <Stats />
      <h2>Getting started</h2>
      You can send pre-recorded{" "}
      <abbr title="Written text which is the result of converting speech from an audio file into text">
        transcription
      </abbr>{" "}
      requests straight to Deepbin. You can make almost all API requests
      documented for <code>api.deepgram.com</code> through to
      <code>deepbin.dev/api/proxy</code>.<h3>Send a file for transcription</h3>
      <CodeBlock language="bash">npm install node-fetch@2</CodeBlock>
      <CodeTabs samples={samples} />
      <CodeTabs samples={samples} />
    </AppLayout>
  );
};

export default Home;

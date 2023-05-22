import AppLayout from "@/components/layouts/AppLayout";
import CodeTabs from "@/components/CodeTabs";
import CodeBlock from "@/components/CodeBlock";
import PageSubtitle from "@/components/PageSubtitle";
import useSWR from "swr";

import type { NextPage } from "next";
import PageTitle from "@/components/PageTitle";

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

const fetcher = (body: string) =>
  fetch("/api/samples", { method: "POST", body: JSON.stringify(body) }).then(
    (res) => {
      return res.json();
    }
  );

const Home: NextPage = () => {
  const curl = `curl --request POST \\
     --url https://deepbin.dev/api/proxy/v1/listen  \\
     --header 'Authorization: Token <token>'  \\
     --header 'content-type: application/json'  \\
     --data '{ "url": "https://dpgr.am/spacewalk.wav" }'`;

  const { data, error }: { data?: any; error?: any } = useSWR(curl, fetcher);

  const samples: { [key: string]: string } = {
    bash: curl,
    ...(data ? data : {}),
  };

  return (
    <AppLayout>
      <PageTitle text="Dashboard" />

      <main className="p-8 max-w-none prose dark:prose-invert">
        <Stats />
        <PageSubtitle text="Getting started" />
        You can send pre-recorded{" "}
        <abbr title="Written text which is the result of converting speech from an audio file into text">
          transcription
        </abbr>{" "}
        requests straight to Deepbin. You can make almost all API requests
        documented for <code>api.deepgram.com</code> through to
        <code>deepbin.dev/api/proxy</code>.
        <h3>Send a file for transcription</h3>
        <CodeTabs samples={samples} />
      </main>
    </AppLayout>
  );
};

export default Home;

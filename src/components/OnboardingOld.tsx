import { useState, useEffect, Fragment } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  CheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  LinkIcon,
  PlusIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/20/solid";
import { MinusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";

import type { Database } from "@/types/supabase";

const OnboardingForm = () => {
  let [open, setOpen] = useState(true);

  return (
    <div className="m-8 mb-0 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 rounded-md p-px">
      <div className="rounded-md bg-zinc-900 p-8 max-w-none prose dark:prose-invert leading-tight">
        <h3>Hey, you're new!</h3>
        <p>
          Welcome to Deepbin, the fully-featured HTTP proxy service for{" "}
          <a href="https://deepgram.com" target="_blank">
            Deepgram
          </a>{" "}
          transcriptions. Before you can send us any requests, you need to set
          up a Deepgram project.
        </p>
        <p className="text-center leading-10">
          Don't have a Deepgram account yet!?
          <br />
          <a
            href="https://console.deepgram.com/signup"
            target="_blank"
            className="special-cta"
          >
            Sign up for free
          </a>
        </p>
        <p>To get started with Deepbin, follow these steps:</p>
        <ul className="list-number p-0">
          <li className="flex items-center gap-x-1">
            {/* <CheckCircleIcon className="w-8 h-8 m-0 fill-green-400" /> */}
            <XCircleIcon className="w-8 h-8 m-0 fill-red-400" />
            <MinusIcon className="w-3 h-3 m-0 stroke-slate-400" />
            Add a Deepgram project to get started.
            <a href="#" className="onboarding-cta text-xs ml-2 m-0 ">
              Click to add a Deepgram project
            </a>
          </li>
          <li className="flex items-center gap-x-1">
            <XCircleIcon className="w-8 h-8 m-0 fill-red-400" />
            <MinusIcon className="w-3 h-3 m-0 stroke-slate-400" />
            Send your first transcription.
            <a href="#" className="onboarding-cta text-xs ml-2 m-0 ">
              Learn how to send a transcription
            </a>
          </li>
          <li className="flex items-center gap-x-1">
            <svg
              className="mx-1 w-6 h-6 m-0 fill-[#1DA1F2]"
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
            <MinusIcon className="w-3 h-3 m-0 stroke-slate-400" />
            Tell the world.
            <a href="#" className="onboarding-cta text-xs ml-2 m-0 ">
              Share on Twitter
            </a>
          </li>
        </ul>
        <p>
          Want to set it up yourself?{" "}
          <a href="#" className="">
            Skip these steps
          </a>
          .
        </p>
      </div>

      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-90 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-md text-left transition-all rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[0.125rem]">
                  <div className="bg-zinc-950 px-4 pb-4 pt-5  sm:p-6 rounded-md sm:w-full sm:max-w-xl">
                    <div>
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                        <CheckIcon
                          className="h-6 w-6 text-green-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-100"
                        >
                          Payment successful
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Consequatur amet labore.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpen(false)}
                      >
                        Go back to dashboard
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

const Onboarding = () => {
  const supabase = useSupabaseClient<Database>();
  const [onboarded, setOnboarded] = useState(true);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    async function getOnboardingStatus() {
      try {
        setLoading(true);

        if (!user) return;

        let { data, error } = await supabase
          .from("profiles")
          .select(`onboarded`)
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setOnboarded(data.onboarded);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getOnboardingStatus();
  }, [user, supabase]);

  if (!onboarded) {
    return <OnboardingForm />;
  }

  return <></>;
};

export default Onboarding;

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import AppLayout from "@/components/layouts/AppLayout";
import PageTitle from "@/components/PageTitle";
import ProjectGrid from "@/components/projects/ProjectGrid";

import type { NextPage } from "next";

const Projects: NextPage = () => {
  const [open, setOpen] = useState(false);

  const AddProject = () => {
    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-zinc-900 border-l border-zinc-700 py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Panel title
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  return (
    <AppLayout>
      <PageTitle text="Projects">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="bg-zinc-200 hover:bg-white text-zinc-700 px-4 py-1 rounded border border-zinc-900"
        >
          Add project
        </button>
        <AddProject />
      </PageTitle>

      <main className="p-8 max-w-none prose dark:prose-invert">
        <ProjectGrid setOpen={setOpen} />
      </main>
    </AppLayout>
  );
};

export default Projects;

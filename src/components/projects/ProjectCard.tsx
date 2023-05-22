import DeepgramLogo from "@/images/deepgram";
import classNames from "@/util/classNames";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const statuses = {
  Paid: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

const ProjectCard = ({ project }) => {
  return (
    <li
      key={project.id}
      className="overflow-hidden rounded-lg border border-zinc-700 p-0 m-0 min-h-[10em]"
    >
      <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-zinc-800 p-6 m-0">
        <DeepgramLogo className="h-12 w-12 p-2 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10" />
        <div className="text-sm font-medium leading-6 text-zinc-400">
          <strong>{project.name}</strong>
          <br />
          Deepgram Project
        </div>
        <Menu as="div" className="relative ml-auto">
          <Menu.Button className="-m-2.5 block p-2.5 ">
            <span className="sr-only">Open options</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    View<span className="sr-only">, {project.name}</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-50" : "",
                      "block px-3 py-1 text-sm leading-6 text-gray-900"
                    )}
                  >
                    Edit<span className="sr-only">, {project.name}</span>
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <dl className="-my-3 divide-y divide-gray-600 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-400">Project ID</dt>
          <dd className="flex items-start gap-x-2">{project.project_id}</dd>
        </div>
      </dl>
    </li>
  );
};

export default ProjectCard;

import type { NextPage } from "next";
import { useSession } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import LoginLayout from "@/components/layouts/Login";
import LoginBox from "@/components/LoginBox";
import { BeakerIcon } from "@heroicons/react/24/outline";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

const isEmpty = (obj): boolean => {
  if (obj === null) return true;

  return Object.keys(obj).length === 0;
};

const Home: NextPage = () => {
  let [error, setError] = useState("");
  let [open, setOpen] = useState(false);
  const router = useRouter();
  const session = useSession();

  // if there is a session, get a user
  useEffect(() => {
    if (!isEmpty(session)) {
      router.push("/home");
    } else {
      setOpen(true);
    }
  }, [session]);

  return (
    <LoginLayout>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[0.125rem]">
          <div className="bg-black p-8 rounded">
            <div className="flex flex-col items-center">
              <BeakerIcon className="h-20 w-20 stroke-red-500 animate-spin mb-4" />
              {isEmpty(session) ? (
                <>
                  {open ? (
                    <span className="loading">Authenticating</span>
                  ) : (
                    <span className="loading">Loading</span>
                  )}
                </>
              ) : (
                <span className="loading">Signing in</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[0.125rem]">
                    <div className="bg-black p-8 rounded min-h-[12rem] flex flex-col justify-center">
                      {session ? (
                        <>
                          <BeakerIcon className="h-20 w-20 stroke-red-500 animate-spin mb-4 self-center" />
                          <span className="loading">Fetching user</span>
                        </>
                      ) : (
                        <LoginBox />
                      )}

                      {error && <p className="text-red-500">{error}</p>}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-md bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[0.125rem]">
          <div className="bg-black/90 p-8 rounded">
            {supabase && <LoginBox />}

            <Dialog open={isOpen} onClose={() => setOpen(false)}>
              <Dialog.Panel>
                <Dialog.Title>Deactivate account</Dialog.Title>
                <Dialog.Description>
                  This will permanently deactivate your account
                </Dialog.Description>

                <p>
                  Are you sure you want to deactivate your account? All of your
                  data will be permanently removed. This action cannot be
                  undone.
                </p>

                <button onClick={() => setOpen(false)}>Deactivate</button>
                <button onClick={() => setOpen(false)}>Cancel</button>
              </Dialog.Panel>
            </Dialog>
          </div>
        </div>
      </div> */}
    </LoginLayout>
  );
};

export default Home;

import { useErrorsContext } from "@/components/context/errors";
import { ToastContainer, toast } from "react-toastify";

type SharedLayout = {
  children: React.ReactNode;
};

const SharedLayout = ({ children }: SharedLayout) => {
  const { errors, shift } = useErrorsContext();

  errors.addListener("added", () => {
    const err = shift();
    toast.error(err);
  });

  return (
    <>
      {children}

      <ToastContainer limit={3} theme="dark" />
    </>
  );
};

export default SharedLayout;

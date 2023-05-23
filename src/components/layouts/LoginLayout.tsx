import SharedLayout from "./SharedLayout";

type LoginLayout = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: LoginLayout) => {
  return (
    <SharedLayout>
      <div className="min-h-screen min-w-full w-screen h-screen bg-zinc-900 flex flex-col justify-center">
        {children}
      </div>
    </SharedLayout>
  );
};

export default LoginLayout;

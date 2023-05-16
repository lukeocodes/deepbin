type LoginLayout = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: LoginLayout) => {
  return <div className="w-full h-full bg-black">{children}</div>;
};

export default LoginLayout;

type LoginLayout = {
  children: React.ReactNode;
};

const LoginLayout = ({ children }: LoginLayout) => {
  return <main className="w-full h-full">{children}</main>;
};

export default LoginLayout;

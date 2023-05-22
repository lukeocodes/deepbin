type PageTitle = {
  text: string;
  children?: React.ReactNode;
};

const PageTitle = ({ text, children }: PageTitle) => {
  return (
    <div className="p-8 md:flex md:items-center md:justify-between bg-zinc-800 border-b border-zinc-700">
      <div className="min-w-0 flex-1">
        <h1 className="text-3xl font-bold leading-7 sm:truncate sm:tracking-tight">
          {text}
        </h1>
      </div>
      {children && <div className="min-w-0 flex gap-x-5">{children}</div>}
    </div>
  );
};

export default PageTitle;

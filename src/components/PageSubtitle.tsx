import ProjectSelect from "./ProjectSelect";

const PageSubtitle = ({ text }: { text: string }) => {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
          {text}
        </h2>
      </div>
      <ProjectSelect />
    </div>
  );
};

export default PageSubtitle;

import { BoltIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useProjectContext } from "@/components/context/project";
import ProjectCard from "@/components/projects/ProjectCard";

const AddProject = (setOpen: any) => {
  return (
    <button
      type="button"
      onClick={() => {
        setOpen(true);
      }}
      className="min-h-[10em] flex flex-col justify-center items-center relative w-full rounded-lg border-2 border-dashed border-zinc-700 hover:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <BoltIcon className="mx-auto h-12 w-12 text-zinc-700" />
      <span className="mt-2 block text-sm font-semibold">
        Add a new project
      </span>
    </button>
  );
};

const LoadingProjects = () => {
  return (
    <span className="min-h-[10em] leading-[11em] rounded-lg border-2 border-dashed border-zinc-700 text-center text-sm font-semibold align-middle">
      Loading projects...
    </span>
  );
};

const ProjectGrid = ({ setOpen }: { setOpen: any }) => {
  const { projects } = useProjectContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(projects.length === 0);
  }, [projects]);

  return (
    <ul
      role="list"
      className="list-none p-0 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {loading && <LoadingProjects />}
      {!loading && (
        <>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </>
      )}
      <AddProject setOpen={setOpen} />
    </ul>
  );
};

export default ProjectGrid;

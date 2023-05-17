import { createContext, useContext, useState } from "react";

type ProjectContext = {
  project: string;
  setProject: (index: string) => void;
};

interface ProjectContextInterface {
  children: React.ReactNode;
}

const ProjectContext = createContext({} as ProjectContext);

const ProjectContextProvider = ({ children }: ProjectContextInterface) => {
  const [project, setProject] = useState("");

  return (
    <ProjectContext.Provider value={{ project, setProject }}>
      {children}
    </ProjectContext.Provider>
  );
};

function useProjectContext() {
  return useContext(ProjectContext);
}

export { ProjectContextProvider, useProjectContext };

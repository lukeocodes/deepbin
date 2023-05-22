import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type Project = Database["public"]["Tables"]["projects"];
type Projects = Project["Row"][];
type ProjectContext = {
  project: null | Project["Row"];
  selectProject: (project: Project["Row"]) => void;
  projects: Projects;
  setProjects: (projects: Projects) => void;
  deleteProject: (id: Project["Row"]["id"]) => void;
  updateProject: (project: Project["Update"]) => Promise<Project["Row"]>;
  addProject: (project: Project["Insert"]) => Promise<Project["Row"]>;
};

interface ProjectContextInterface {
  children: React.ReactNode;
}

const ProjectContext = createContext({} as ProjectContext);

const ProjectContextProvider = ({ children }: ProjectContextInterface) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [project, selectProject] = useState<Project["Row"] | null>(null);
  const [projects, setProjects] = useState([] as Projects);

  const deleteProject = async (id: Project["Row"]["id"]) => {
    if (!user) throw Error("No user");

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) throw error;
  };

  const updateProject = async (
    project: Project["Update"]
  ): Promise<Project["Row"]> => {
    if (!user) throw Error("No user");

    let { data, error, status } = await supabase
      .from("projects")
      .update(project)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw Error("No data");

    getProjects(supabase, user).then((a) => {
      if (!a) return;
      setProjects(a);
    });

    return data;
  };

  const addProject = async (
    project: Project["Insert"]
  ): Promise<Project["Row"]> => {
    if (!user) throw Error("No user");

    let { data, error, status } = await supabase
      .from("projects")
      .update(project)
      .select()
      .single();

    if (error) throw error;
    if (!data) throw Error("No data");

    getProjects(supabase, user).then((a) => {
      if (!a) return;
      setProjects(a);
    });

    return data;
  };

  const getProjects = async (supabase: SupabaseClient, user: User) => {
    let { data, error, status } = await supabase
      .from("projects")
      .select()
      .eq("user_id", user.id)
      .returns<Projects>();

    if (error) {
      throw error;
    }

    if (!data) return;

    return data;
  };

  useEffect(() => {
    if (!user) return;

    getProjects(supabase, user).then((a) => {
      if (!a) return;
      setProjects(a);
    });
  }, [supabase, user]);

  return (
    <ProjectContext.Provider
      value={{
        project,
        selectProject,
        projects,
        setProjects,
        deleteProject,
        updateProject,
        addProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

function useProjectContext() {
  return useContext(ProjectContext);
}

export type { Project, Projects };
export { ProjectContextProvider, useProjectContext };

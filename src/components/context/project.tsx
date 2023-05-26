import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import { useErrorsContext } from "@/components/context/errors";

type Project = Database["public"]["Tables"]["projects"];
type Projects = Project["Row"][];
type ProjectContext = {
  project: null | Project["Row"];
  selectProject: (project: Project["Row"]) => void;
  projects: Projects;
  setProjects: (projects: Projects) => void;
  deleteProject: (id: Project["Row"]["id"]) => void;
  updateProject: (project: Project["Update"]) => Promise<Project["Row"] | void>;
  addProject: (project: Project["Insert"]) => Promise<Project["Row"] | void>;
};

interface ProjectContextInterface {
  children: React.ReactNode;
}

const ProjectContext = createContext({} as ProjectContext);

const ProjectContextProvider = ({ children }: ProjectContextInterface) => {
  const { add: addError } = useErrorsContext();
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  const [project, selectProject] = useState<Project["Row"] | null>(null);
  const [projects, setProjects] = useState([] as Projects);

  const deleteProject = async (id: Project["Row"]["id"]) => {
    try {
      if (!user) throw Error("No user when deleting project");

      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
    } catch (err: unknown) {
      if (err instanceof Error) addError(err.message);
    }
  };

  const updateProject = async (
    project: Project["Update"]
  ): Promise<Project["Row"] | void> => {
    try {
      if (!user) throw Error("No user when updating project");

      let { data, error, status } = await supabase
        .from("projects")
        .update(project)
        .eq("user_id", user.id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw Error("No data when updating project");

      getProjects(supabase, user).then((a) => {
        if (!a) return;
        setProjects(a);
      });

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) addError(err.message);
    }
  };

  const addProject = async (
    project: Project["Insert"]
  ): Promise<Project["Row"] | void> => {
    try {
      if (!user) throw Error("No user when adding project");

      let { data, error, status } = await supabase
        .from("projects")
        .update(project)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw Error("No data adding project");

      getProjects(supabase, user).then((a) => {
        if (!a) return;
        setProjects(a);
      });

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) addError(err.message);
    }
  };

  const getProjects = async (supabase: SupabaseClient, user: User) => {
    try {
      if (!user) throw Error("No user when fetching projects");

      let { data, error } = await supabase
        .from("projects")
        .select()
        .eq("user_id", user.id)
        .returns<Projects>();

      if (error) throw error;
      if (!data) throw Error("No data when fetching projects");

      return data;
    } catch (err: unknown) {
      if (err instanceof Error) addError(err.message);
    }
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

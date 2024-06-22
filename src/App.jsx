import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectSidebar from "./components/ProjectSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [projectsState, setProjectsState] = useState({
    currentAction: "no-project-selected",
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleSelecteProject(id) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: id,
        currentAction: "project-selected",
      };
    });
  }
  function handleAddOrCreateProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: null,
        currentAction: "adding",
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        currentAction: "no-project-selected",
      };
    });
  }

  function handleSaveProject(projectData) {
    setProjectsState((prevState) => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        currentAction: "no-project-selected",
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleAddTask(text) {
    setProjectsState((prevState) => {
      const newTask = {
        text: text,
        taskId: Math.random(),
        projectId: prevState.selectedProjectId,
      };
      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask(taskId) {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((task) => task.taskId !== taskId),
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        currentAction: "no-project-selected",
        projects: prevState.projects.filter(
          (item) => item.id !== prevState.selectedProjectId
        ),
      };
    });
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedProjectId
  );
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      tasks={projectsState.tasks}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    ></SelectedProject>
  );
  if (projectsState.currentAction === "adding") {
    content = (
      <NewProject
        onSave={handleSaveProject}
        onCancel={handleCancelAddProject}
      ></NewProject>
    );
  } else if (projectsState.currentAction === "no-project-selected") {
    content = (
      <NoProjectSelected
        onStartAddProject={handleAddOrCreateProject}
      ></NoProjectSelected>
    );
  }
  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectSidebar
        onStartAddProject={handleAddOrCreateProject}
        projects={projectsState.projects}
        onSelectProject={handleSelecteProject}
        selectedProjectId={projectsState.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

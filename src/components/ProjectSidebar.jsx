import Button from "./Button";

export default function ProjectSidebar({
  onStartAddProject,
  projects,
  onSelectProject,
  selectedProjectId,
}) {
  return (
    <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
      <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
        Your Projects
      </h2>
      <div>
        <Button onClick={onStartAddProject}>+ Add Projects</Button>
      </div>
      <ul>
        {projects.map((item) => {
          let cssClasses =
            "w-full text-left px-2 py-1 rounded-sm  hover:text-stone-200 hover:bg-stone-800";
          if (item.id === selectedProjectId) {
            cssClasses += " bg-stone-800 text-stone-200";
          } else {
            cssClasses += " text-stone-400";
          }
          return (
            <li
              className={cssClasses}
              key={item.id}
              onClick={() => onSelectProject(item.id)}
            >
              {item.title}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

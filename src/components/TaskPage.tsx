import SectionTitle from './SectionTitle';
import { statusColumns } from '../data';
import { Task } from '../data';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
function TasksPage({ tasks: visibleTasks }: { tasks: Task[] }) {
  return (
    <section className="grid gap-5">
      <SectionTitle eyebrow="Mini-kanban" title="Командная доска" note="Карточки показывают источник, confidence, ответственного, дедлайн и внешний/fallback kanban provider." />
      <div className="grid gap-6 pb-3 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
        {statusColumns.map((column) => {
          const columnTasks = visibleTasks.filter((task) => task.status === column.key);
          return (
            <article key={column.key} className="min-w-64 rounded-[1.5rem] border border-white/10 bg-slate-950/45 p-3">
              <div className="mb-3 flex items-start justify-between gap-3 px-1">
                <div>
                  <h3 className="font-black text-white">{column.title}</h3>
                  <p className="text-xs leading-5 text-slate-500">{column.hint}</p>
                </div>
                <span className="grid size-8 place-items-center rounded-full bg-cyan-300/10 font-black text-cyan-200">{columnTasks.length}</span>
              </div>
              <div className="grid gap-3">
                {columnTasks.length ? columnTasks.map((task) => <TaskCard key={task.id} task={task} />) : <EmptyState text="Здесь появится карточка после AI extraction и confirmation." />}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
export default TasksPage;
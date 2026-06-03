import Badge from './Badge';
import { priorityLabels, priorityTone, sourceNames, sourceTone } from '../data';
import { Task } from '../data';
function TaskCard({ task }: { task: Task }) {
    return (
        <article className="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/85 shadow-xl shadow-black/20">
            <div className={`h-1.5 bg-gradient-to-r ${priorityTone[task.priority]}`} />
            <div className="grid gap-3 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge className={sourceTone[task.source]}>{sourceNames[task.source]}</Badge>
                    <Badge className="border-violet-300/25 bg-violet-400/10 text-violet-100">{Math.round(task.confidence * 100)}%</Badge>
                </div>
                <div>
                    <h4 className="text-base font-black text-white">{task.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{task.description}</p>
                </div>
                <div className="grid gap-2 text-sm text-slate-300">
                    <span> {task.assignee}</span>
                    <span> {task.deadline}</span>
                    <span> {priorityLabels[task.priority]} · {task.kanbanProvider === 'external' ? 'External kanban' : 'Internal fallback'}</span>
                </div>
                <blockquote className="rounded-2xl border-l-4 border-cyan-300 bg-cyan-300/5 px-3 py-2 text-xs leading-5 text-slate-300">{task.sourceExcerpt}</blockquote>
                <div className="flex flex-wrap gap-2">
                    <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-slate-200 transition hover:bg-white/10">В работу</button>
                    <button className="rounded-xl border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-bold text-emerald-100 transition hover:bg-emerald-300/15">Готово</button>
                    {task.externalUrl && <a className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 px-3 py-2 text-xs font-bold text-cyan-100" href={task.externalUrl} target="_blank" rel="noreferrer">Открыть ↗</a>}
                </div>
            </div>
        </article>
    );
}
export default TaskCard;
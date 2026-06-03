import { useMemo, useState } from 'react';
import { analytics, meeting, priorityLabels, profile, statusColumns, suggestions, tasks, type Priority, type Source, type Task } from './data';
import TasksPage from './components/TaskPage';
import SuggestionsPage from './components/SuggestionsPage';
import MeetingsPage from './components/MeetingsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';

const navItems = [
  { id: 'tasks', label: 'Tasks', icon: '▦' },
  { id: 'suggestions', label: 'AI Suggestions', icon: '✦' },
  { id: 'meetings', label: 'Meetings', icon: '🎙️' },
  { id: 'analytics', label: 'Analytics', icon: '▣' },
  { id: 'profile', label: 'Profile', icon: '◉' },
] as const;

type PageId = (typeof navItems)[number]['id'];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>('tasks');
  const [query, setQuery] = useState('');

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return tasks;
    return tasks.filter((task) => `${task.title} ${task.description} ${task.assignee}`.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <div className="grid min-h-screen grid-cols-1 text-slate-100 lg:grid-cols-[300px_minmax(0,1fr)]">
      <aside className="glass-panel z-10 flex flex-col gap-6 border-x-0 border-t-0 p-4 lg:sticky lg:top-0 lg:border-l-0 lg:border-y-0">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-400/15 to-fuchsia-400/10 p-5">
          <div className="mb-5 flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-2xl shadow-glow">К</div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">AI Project Manager</p>
              <h1 className="text-2xl font-black tracking-tight">Командус</h1>
            </div>
          </div>
        </div>

        <nav className="grid gap-2" aria-label="Основная навигация">
          {navItems.map((item) => (
            <button key={item.id} className={`nav-button ${activePage === item.id ? 'nav-button-active' : ''}`} onClick={() => setActivePage(item.id)}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto rounded-[1.75rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
          <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">End-to-end flow</p>
          <ol className="space-y-2 text-sm text-slate-300">
            {['Telegram message', 'AI extraction', 'Confirmation', 'Kanban card', 'Reminder + Dashboard'].map((step, index) => (
              <li key={step} className="flex gap-3"><span className="font-black text-cyan-200">{index + 1}</span>{step}</li>
            ))}
          </ol>
        </div>
      </aside>

      <main className="min-w-0 p-4 sm:p-6 lg:p-8">
        <header className="glass-panel mb-6 flex flex-col gap-6 rounded-[2rem] p-6 lg:flex-row lg:items-end lg:justify-between lg:p-8">
          <div className="max-w-4xl">
            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">Чаты и встречи превращаются в задачи, канбан и напоминания</h2>
          </div>
          <div className="grid min-w-0 gap-3 sm:min-w-80">
            <label className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-400">
              <span className="mr-2 text-cyan-200">⌕</span>
              <input className="w-[85%] bg-transparent text-slate-100 outline-none placeholder:text-slate-500" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Поиск по задачам" />
            </label>
            <span className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-center text-sm font-bold text-emerald-100">● Demo data synced</span>
          </div>
        </header>

        {activePage === 'tasks' && <TasksPage tasks={filteredTasks} />}
        {activePage === 'suggestions' && <SuggestionsPage />}
        {activePage === 'meetings' && <MeetingsPage />}
        {activePage === 'analytics' && <AnalyticsPage />}
        {activePage === 'profile' && <ProfilePage />}
      </main>
    </div>
  );
}




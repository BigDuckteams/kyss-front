import { useMemo, useState } from 'react';
import { analytics, meeting, priorityLabels, profile, statusColumns, suggestions, tasks, type Priority, type Source, type Task } from './data';

const sourceNames: Record<Source, string> = {
  telegram_text: 'Telegram text',
  telegram_voice: 'Voice',
  meeting_audio: 'Meeting',
};

const sourceTone: Record<Source, string> = {
  telegram_text: 'border-sky-300/25 bg-sky-400/10 text-sky-100',
  telegram_voice: 'border-violet-300/25 bg-violet-400/10 text-violet-100',
  meeting_audio: 'border-emerald-300/25 bg-emerald-400/10 text-emerald-100',
};

const priorityTone: Record<Priority, string> = {
  low: 'from-slate-400 to-slate-500',
  medium: 'from-cyan-300 to-blue-400',
  high: 'from-amber-300 to-orange-400',
  critical: 'from-rose-400 to-fuchsia-500',
};

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
      <aside className="glass-panel z-10 flex flex-col gap-6 border-x-0 border-t-0 p-5 lg:sticky lg:top-0 lg:h-screen lg:border-l-0 lg:border-y-0">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-sky-400/15 to-fuchsia-400/10 p-5">
          <div className="mb-5 flex items-center gap-4">
            <div className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-violet-400 text-2xl shadow-glow">🤖</div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-cyan-200">AI Project Manager</p>
              <h1 className="text-2xl font-black tracking-tight">Командус</h1>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-300">Дашборд Ивана для P0/P1 демо: задачи, suggestions, встречи, аналитика и личное рабочее место.</p>
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
            <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">React + Tailwind dashboard</p>
            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-6xl">Чаты и встречи превращаются в задачи, канбан и напоминания</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">Интерфейс следует ТЗ: mini-kanban, AI suggestions с confirmation flow, meeting summary, team analytics, личный профиль Ивана и roadmap-блоки для дополнительных возможностей.</p>
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

function TasksPage({ tasks: visibleTasks }: { tasks: Task[] }) {
  return (
    <section className="grid gap-5">
      <SectionTitle eyebrow="Mini-kanban" title="Командная доска" note="Карточки показывают источник, confidence, ответственного, дедлайн и внешний/fallback kanban provider." />
      <div className="grid gap-4 overflow-x-auto pb-3 xl:grid-cols-5">
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
          <span>👤 {task.assignee}</span>
          <span>🕒 {task.deadline}</span>
          <span>⚑ {priorityLabels[task.priority]} · {task.kanbanProvider === 'external' ? 'External kanban' : 'Internal fallback'}</span>
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

function SuggestionsPage() {
  return (
    <section className="grid gap-5">
      <SectionTitle eyebrow="Confirmation flow" title="AI Suggestions ожидают решения" note="Средняя уверенность ниже auto-create threshold, поэтому UI просит подтверждение, отклонение или уточнение." />
      <div className="grid gap-4 lg:grid-cols-3">
        {suggestions.map((suggestion) => (
          <article key={suggestion.id} className="glass-panel rounded-[1.75rem] p-5">
            <div className="mb-4 flex flex-wrap justify-between gap-2">
              <Badge className={sourceTone[suggestion.source]}>{sourceNames[suggestion.source]}</Badge>
              <Badge className="border-violet-300/25 bg-violet-400/10 text-violet-100">{Math.round(suggestion.confidence * 100)}%</Badge>
            </div>
            <h3 className="text-xl font-black text-white">{suggestion.title}</h3>
            <dl className="mt-4 grid gap-3 text-sm">
              <Field label="Ответственный" value={suggestion.assigneeRaw} />
              <Field label="Дедлайн" value={suggestion.deadlineRaw} />
              <Field label="Приоритет" value={priorityLabels[suggestion.priority]} />
            </dl>
            <blockquote className="my-4 rounded-2xl border-l-4 border-cyan-300 bg-cyan-300/5 px-3 py-2 text-sm leading-6 text-slate-300">{suggestion.sourceExcerpt}</blockquote>
            {suggestion.missingFields.length > 0 && <p className="mb-4 rounded-2xl border border-amber-300/20 bg-amber-300/10 px-3 py-2 text-sm text-amber-100">Нужно уточнить: {suggestion.missingFields.join(', ')}</p>}
            <div className="flex flex-wrap gap-2">
              <button className="rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-4 py-2 text-sm font-black text-slate-950">Создать</button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200">Отклонить</button>
              <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-slate-200">Изменить позже</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function MeetingsPage() {
  return (
    <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
      <article className="glass-panel rounded-[2rem] p-6">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Meeting summary</p>
        <h3 className="text-3xl font-black text-white">{meeting.title}</h3>
        <p className="mt-2 text-sm text-slate-400">{meeting.date} · transcript quality {Math.round(meeting.transcriptQuality * 100)}% · summarized</p>
        <p className="mt-6 text-lg leading-8 text-slate-200">{meeting.summary}</p>
        <InfoList title="Decisions" items={meeting.decisions} />
        <InfoList title="Action items" items={meeting.actionItems} />
      </article>
      <aside className="grid gap-5">
        <article className="glass-panel rounded-[2rem] p-5"><InfoList title="Risks & fallback" items={meeting.risks} compact /></article>
        <article className="glass-panel rounded-[2rem] p-5"><InfoList title="Open questions" items={meeting.openQuestions} compact /></article>
      </aside>
    </section>
  );
}

function AnalyticsPage() {
  return (
    <section className="grid gap-5">
      <SectionTitle eyebrow="Team analytics" title="Метрики для демо и защиты" note="Показывают скорость, качество AI extraction, voice processing и состояние confirmation flow." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {analytics.map((metric) => (
          <article key={metric.label} className="glass-panel rounded-[1.75rem] p-5">
            <span className="text-2xl">{metric.icon}</span>
            <p className="mt-4 text-sm font-bold text-slate-400">{metric.label}</p>
            <strong className="mt-1 block text-4xl font-black tracking-tight text-white">{metric.value}</strong>
            <p className="mt-2 text-sm text-cyan-100">{metric.note}</p>
          </article>
        ))}
      </div>
      <article className="glass-panel rounded-[2rem] p-6">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Roadmap / P2</p>
        <div className="grid gap-3 md:grid-cols-2">
          {['Knowledge Base: summaries встреч, решения, риски и action items.', 'Recommendations: skill tags по задачам и персональные зоны роста.', 'Gamification: XP, ачивки и leaderboard для мотивации статусов.', 'Government mode: поручения, сроки исполнения, аудит и отчетность.'].map((item) => (
            <div key={item} className="rounded-2xl border border-sky-300/15 bg-sky-300/10 p-4 text-sm leading-6 text-sky-50">› {item}</div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ProfilePage() {
  return (
    <section className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
      <article className="glass-panel rounded-[2rem] p-6 xl:sticky xl:top-8">
        <div className="mb-5 grid size-20 place-items-center rounded-[1.75rem] bg-gradient-to-br from-cyan-300 to-violet-400 text-3xl font-black text-slate-950">И</div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Personal workspace</p>
        <h3 className="text-3xl font-black text-white">{profile.name}</h3>
        <p className="mt-2 text-slate-400">{profile.telegram} · {profile.role}</p>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-700/60"><div className="h-full w-[72%] rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" /></div>
        <p className="mt-3 text-sm text-slate-300"><strong className="text-white">{profile.xp} XP</strong> · {profile.level}</p>
        <div className="mt-5 flex flex-wrap gap-2">{profile.skills.map((skill) => <Badge key={skill} className="border-sky-300/20 bg-sky-300/10 text-sky-100">{skill}</Badge>)}</div>
      </article>
      <div className="grid gap-5">
        <article className="glass-panel rounded-[2rem] p-5">
          <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">Мои задачи</p>
          <div className="max-w-xl">{tasks.filter((task) => task.assignee === 'Иван').map((task) => <TaskCard key={task.id} task={task} />)}</div>
        </article>
        <article className="glass-panel rounded-[2rem] p-5"><InfoList title="Notes" items={profile.notes} compact /></article>
        <article className="glass-panel rounded-[2rem] p-5">
          <h3 className="mb-4 text-xl font-black text-white">Achievements</h3>
          <div className="grid gap-3">
            {profile.achievements.map((achievement) => (
              <div key={achievement.title} className="flex gap-3 rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
                <span className="text-2xl">{achievement.icon}</span>
                <div><strong className="text-white">{achievement.title}</strong><p className="mt-1 text-sm text-slate-400">{achievement.text}</p></div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, note }: { eyebrow: string; title: string; note: string }) {
  return (
    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-black uppercase tracking-[0.28em] text-cyan-200">{eyebrow}</p>
        <h2 className="text-3xl font-black text-white">{title}</h2>
      </div>
      <p className="max-w-2xl text-sm leading-6 text-slate-400">{note}</p>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className: string }) {
  return <span className={`badge ${className}`}>{children}</span>;
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className="mt-1 font-black text-white">{value}</dd>
    </div>
  );
}

function InfoList({ title, items, compact = false }: { title: string; items: string[]; compact?: boolean }) {
  return (
    <div className={compact ? '' : 'mt-8'}>
      <h3 className="mb-4 text-xl font-black text-white">{title}</h3>
      <ul className="grid gap-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><span className="font-black text-cyan-200">→</span><span>{item}</span></li>
        ))}
      </ul>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="rounded-3xl border border-dashed border-white/15 px-4 py-6 text-center text-sm leading-6 text-slate-500">{text}</div>;
}

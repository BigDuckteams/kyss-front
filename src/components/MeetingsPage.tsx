import InfoList from './InfoList';
import { meeting } from '../data';

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
export default MeetingsPage;
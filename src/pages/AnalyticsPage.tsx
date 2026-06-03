
import SectionTitle from '../components/SectionTitle';
import { analytics } from '../data';

export default function AnalyticsPage() {
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
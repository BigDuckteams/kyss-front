import SectionTitle from './SectionTitle';
import Badge from './Badge';
import { suggestions, sourceNames, sourceTone, priorityLabels } from '../data';
import Field from './Field';

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
export default SuggestionsPage;
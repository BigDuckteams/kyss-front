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
export default InfoList;
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
export default SectionTitle;
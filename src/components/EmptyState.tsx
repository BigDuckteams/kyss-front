
function EmptyState({ text }: { text: string }) {
  return <div className="rounded-3xl border border-dashed border-white/15 px-4 py-6 text-center text-sm leading-6 text-slate-500">{text}</div>;
}
export default EmptyState;
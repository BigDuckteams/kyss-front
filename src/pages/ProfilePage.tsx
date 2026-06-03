import Badge from '../components/Badge';
import InfoList from '../components/InfoList';
import SectionTitle from '../components/SectionTitle';
import TaskCard from '../components/TaskCard';
import { profile, tasks } from '../data';
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
export default ProfilePage;
export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
export type Priority = 'low' | 'medium' | 'high' | 'critical';
export type Source = 'telegram_text' | 'telegram_voice' | 'meeting_audio';

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  deadline: string;
  status: TaskStatus;
  priority: Priority;
  source: Source;
  confidence: number;
  createdByAi: boolean;
  kanbanProvider: 'external' | 'internal';
  externalUrl?: string;
  sourceExcerpt: string;
  staleHours: number;
}

export interface Suggestion {
  id: string;
  title: string;
  assigneeRaw: string;
  deadlineRaw: string;
  priority: Priority;
  confidence: number;
  source: Source;
  missingFields: string[];
  sourceExcerpt: string;
}

export const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

export const statusColumns: Array<{ key: TaskStatus; title: string; hint: string }> = [
  { key: 'backlog', title: 'Backlog', hint: 'Найдено AI, ждет планирования' },
  { key: 'todo', title: 'Todo', hint: 'Подтверждено и создано в kanban' },
  { key: 'in_progress', title: 'In Progress', hint: 'Взято в работу из Telegram/dashboard' },
  { key: 'review', title: 'Review', hint: 'Готовится к демо-проверке' },
  { key: 'done', title: 'Done', hint: 'Закрыто и синхронизировано' },
];

export const tasks: Task[] = [
  {
    id: 'task-101',
    title: 'Сделать extraction pipeline',
    description: 'LangGraph flow: intent, task extraction, deadline normalization, assignee resolver и confidence scoring.',
    assignee: 'Павел',
    deadline: '03.06.2026 · 18:00',
    status: 'in_progress',
    priority: 'high',
    source: 'telegram_text',
    confidence: 0.93,
    createdByAi: true,
    kanbanProvider: 'external',
    externalUrl: 'https://kanban.example/card/task-101',
    sourceExcerpt: 'Павел, сделай extraction pipeline до завтра 18:00.',
    staleHours: 4,
  },
  {
    id: 'task-102',
    title: 'Подготовить UI канбана',
    description: 'Dashboard layout, mini-kanban, source/confidence badges, filters и demo-friendly карточки.',
    assignee: 'Иван',
    deadline: '02.06.2026 · 21:00',
    status: 'review',
    priority: 'high',
    source: 'telegram_text',
    confidence: 0.89,
    createdByAi: true,
    kanbanProvider: 'external',
    externalUrl: 'https://kanban.example/card/task-102',
    sourceExcerpt: 'Frontend, подготовь UI канбана сегодня до 21:00.',
    staleHours: 1,
  },
  {
    id: 'task-103',
    title: 'Проверить распознавание голосовых сообщений',
    description: 'Прогнать Telegram voice.ogg, вернуть transcript и quality_score для аналитики.',
    assignee: 'Алексей',
    deadline: '03.06.2026 · 12:00',
    status: 'todo',
    priority: 'medium',
    source: 'telegram_voice',
    confidence: 0.81,
    createdByAi: true,
    kanbanProvider: 'internal',
    sourceExcerpt: 'ML-инженер пусть проверит распознавание голосовых сообщений.',
    staleHours: 0,
  },
  {
    id: 'task-104',
    title: 'Подготовить защиту и финальную синхронизацию',
    description: 'Собрать presentation story, порядок live demo и fallback-сценарии.',
    assignee: 'Даниил',
    deadline: '04.06.2026 · 10:00',
    status: 'backlog',
    priority: 'critical',
    source: 'meeting_audio',
    confidence: 0.86,
    createdByAi: true,
    kanbanProvider: 'internal',
    sourceExcerpt: 'Даниил отвечает за защиту и финальную синхронизацию.',
    staleHours: 0,
  },
  {
    id: 'task-105',
    title: 'Зафиксировать demo story и decision log',
    description: 'Product vision, MVP scope, acceptance criteria и решения по adapter layer.',
    assignee: 'Артём',
    deadline: '02.06.2026 · 20:00',
    status: 'done',
    priority: 'medium',
    source: 'meeting_audio',
    confidence: 0.91,
    createdByAi: true,
    kanbanProvider: 'external',
    externalUrl: 'https://kanban.example/card/task-105',
    sourceExcerpt: 'Артём фиксирует demo story и помогает согласовать решения команды.',
    staleHours: 0,
  },
];

export const suggestions: Suggestion[] = [
  {
    id: 'cand-201',
    title: 'Собрать полный demo flow',
    assigneeRaw: 'Team',
    deadlineRaw: 'к вечеру',
    priority: 'critical',
    confidence: 0.74,
    source: 'meeting_audio',
    missingFields: ['точный ответственный'],
    sourceExcerpt: 'К вечеру нужно собрать полный demo flow.',
  },
  {
    id: 'cand-202',
    title: 'Настроить внешний kanban adapter',
    assigneeRaw: 'backend',
    deadlineRaw: 'до демо',
    priority: 'high',
    confidence: 0.68,
    source: 'telegram_text',
    missingFields: ['провайдер доски'],
    sourceExcerpt: 'Не забудьте подключить внешний kanban, fallback уже есть.',
  },
  {
    id: 'cand-203',
    title: 'Проверить reminder scheduler',
    assigneeRaw: 'Даниил',
    deadlineRaw: 'через 2 часа',
    priority: 'medium',
    confidence: 0.79,
    source: 'telegram_voice',
    missingFields: [],
    sourceExcerpt: 'Даниил, проверь напоминание за два часа до дедлайна.',
  },
];

export const meeting = {
  title: 'Daily sync: сборка MVP',
  date: '02.06.2026',
  transcriptQuality: 0.88,
  summary:
    'Команда распределила зоны ответственности для сборки MVP AI-PM бота. Основной фокус — собрать end-to-end demo flow: Telegram → AI extraction → Kanban → Reminder → Dashboard.',
  decisions: [
    'Используем InternalKanbanAdapter как надежный fallback.',
    'Для P0 показываем одну внешнюю kanban-интеграцию через adapter layer.',
    'Meeting audio для демо загружается как запись, live Telemost — roadmap.',
  ],
  actionItems: [
    'Павел — LLM pipeline и structured JSON.',
    'Алексей — voice/meeting transcript с quality score.',
    'Иван — dashboard, suggestions, meeting summary и analytics.',
    'Даниил — защита, backend и demo control.',
  ],
  risks: [
    'LLM может ошибиться — используем confidence threshold и confirmation flow.',
    'ASR может распознать плохо — держим backup transcript.',
    'Внешний Kanban API может упасть — показываем fallback-доску.',
  ],
  openQuestions: ['Какой внешний kanban провайдер быстрее подключить?', 'Government mode показываем как roadmap или mock-переключатель?'],
};

export const analytics = [
  { label: 'AI-задач создано', value: '12', note: '+4 сегодня', icon: '🤖' },
  { label: 'Auto-confirmed', value: '8', note: '67% без ручного ввода', icon: '✨' },
  { label: 'Waiting confirmation', value: '3', note: 'confidence 0.55–0.85', icon: '⏳' },
  { label: 'Voice обработано', value: '4', note: 'avg quality 0.89', icon: '🎙️' },
  { label: 'Meetings summarized', value: '1', note: '6 action items', icon: '📝' },
  { label: 'Average confidence', value: '0.87', note: '+0.05 после cleanup', icon: '✅' },
];

export const profile = {
  name: 'Иван',
  telegram: '@ivan_frontend',
  role: 'JavaScript / Dashboard / UI',
  xp: 1450,
  level: 'Delivery Hero',
  skills: ['React', 'Tailwind CSS', 'Kanban UI', 'Dashboard UX', 'Data visualization'],
  notes: [
    'Перед демо открыть вкладки Tasks → Suggestions → Meetings → Analytics.',
    'Показать source badge и confidence badge как объяснимость AI.',
    'Government mode оставить как roadmap card, не ломая core flow.',
  ],
  achievements: [
    { title: 'Kanban Cleaner', text: 'Собрал читаемую доску для live demo.', icon: '🏆' },
    { title: 'Fast Responder', text: 'Подготовил UI под контракты Backend ↔ Иван.', icon: '🔥' },
    { title: 'Team Driver', text: 'Сделал dashboard, который помогает Даниилу защищать проект.', icon: '👥' },
  ],
};

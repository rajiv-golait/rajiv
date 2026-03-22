export const SITE = {
  name: 'Rajiv Golait',
  alias: 'shot_by_f.a.l.c.o.n',
  tagline: 'ENGINEER BY LOGIC. shot_by_f.a.l.c.o.n BY INSTINCT.',
  degree: 'B.E. - Electronics & Telecommunication',
  college: 'MIT Academy Of Engineering',
  collegeYears: '2023-Present',
  stats: {
    nationalWins: '1',
    shippedProjects: '8+',
    hackathonHours: '36',
    graduatingYear: '2026',
  },
  coursework: ['Data Science', 'VLSI Design', 'IoT', 'DBMS', 'Probability & Statistics'],
  currentlyExploring: 'DSA - Deep Learning',
} as const

export const STATIC_STAT_CARDS = [
  { value: SITE.stats.nationalWins, label: 'National Win' },
  { value: SITE.stats.shippedProjects, label: 'Projects Shipped' },
  { value: SITE.stats.hackathonHours, label: 'Hour Hackathon' },
  { value: SITE.stats.graduatingYear, label: 'Graduating' },
] as const

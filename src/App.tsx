import { motion } from 'framer-motion';
import {
    ArrowRight,
    Bot,
    BrainCircuit,
    Briefcase,
    ChevronRight,
    Cpu,
    Github,
    Linkedin,
    Mail,
    MapPin,
    Radar,
    ShieldCheck,
    Sparkles,
    Trophy,
    UserRound,
} from 'lucide-react';
import portfolioData from './data/portfolio.json';

const serviceIcons = {
    'agentic-systems': Bot,
    'rag-architecture': Radar,
    'ai-strategy': Sparkles,
    modeling: BrainCircuit,
} as const;

const accentStyles = {
    current: 'border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan',
    core: 'border-accent-gold/35 bg-accent-gold/10 text-accent-gold',
    research: 'border-accent-rose/35 bg-accent-rose/10 text-accent-rose',
} as const;

const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.7, ease: 'easeOut' },
} as const;

const dockItems = [
    { label: 'Profile', href: '#top', icon: UserRound },
    { label: 'Education', href: '#education', icon: Trophy },
    { label: 'Journey', href: '#journey', icon: Briefcase },
    { label: 'Contact', href: '#contact', icon: Mail },
] as const;

function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
    return (
        <div className="max-w-2xl">
            <div className="section-kicker">{eyebrow}</div>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-none text-white md:text-5xl">{title}</h2>
            {copy ? <p className="mt-4 text-sm leading-7 text-slate-400 md:text-base md:leading-8">{copy}</p> : null}
        </div>
    );
}

function App() {
    const { profile, hero, manifesto, education, services, experience, skills } = portfolioData;

    const signalCards = [
        {
            title: 'Current Build',
            value: 'AI systems with human context',
            detail: 'A profile that mixes sociology, product thinking, and technical delivery.',
            icon: Cpu,
        },
        {
            title: 'Playstyle',
            value: 'Professional, curious, practical',
            detail: 'I like interfaces and systems that feel thoughtful rather than loud.',
            icon: ShieldCheck,
        },
        {
            title: 'Career Arc',
            value: 'Research -> delivery -> impact',
            detail: 'From academic depth to solutions that work in real environments.',
            icon: Trophy,
        },
    ];

    return (
        <div id="top" className="relative min-h-screen overflow-hidden bg-surface-950 pb-24 text-slate-100 md:pb-0">
            <div className="absolute inset-0 pointer-events-none">
                <div className="grid-overlay absolute inset-0 opacity-[0.16]" />
                <div className="noise-overlay absolute inset-0" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.08),transparent_35%),radial-gradient(circle_at_bottom,rgba(246,196,83,0.06),transparent_32%)]" />
                <div className="spotlight absolute left-[-18rem] top-[-12rem] h-[36rem] w-[36rem] rounded-full blur-3xl" />
                <div className="absolute bottom-[-14rem] right-[-10rem] h-[28rem] w-[28rem] rounded-full bg-accent-blue/10 blur-3xl" />
            </div>

            <header className="sticky top-0 z-40 border-b border-white/10 bg-surface-950/75 backdrop-blur-2xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-8">
                    <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/5 shadow-[0_0_30px_rgba(125,211,252,0.12)]">
                            <span className="font-display text-2xl font-bold text-shimmer">D</span>
                        </div>
                        <div className="min-w-0">
                            <div className="truncate text-sm font-medium tracking-wide text-white">{profile.name}</div>
                            <div className="text-xs text-slate-400">{profile.headline}</div>
                        </div>
                    </div>

                    <div className="hidden items-center gap-3 lg:flex">
                        {skills.badges.map((badge) => (
                            <div
                                key={badge.id}
                                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.08em] text-slate-300"
                            >
                                {badge.title}
                            </div>
                        ))}
                    </div>

                    <a
                        href={`mailto:${profile.socials.email}`}
                        className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-2 text-sm text-accent-cyan transition hover:border-accent-cyan/50 hover:bg-accent-cyan/15 md:px-4"
                    >
                        <Mail size={16} />
                        <span className="hidden sm:inline">Contact</span>
                    </a>
                </div>
            </header>

            <main className="relative z-10 mx-auto flex max-w-7xl flex-col gap-5 px-4 pb-16 pt-6 md:gap-8 md:px-8 md:pt-10">
                <section className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
                    <motion.div {...fadeInUp} className="panel-shell relative overflow-hidden rounded-[2rem] p-6 md:p-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(125,211,252,0.14),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(79,140,255,0.14),transparent_34%)]" />
                        <div className="relative z-10">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="section-kicker">{hero.eyebrow}</div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-3">
                                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-300 md:text-xs md:tracking-[0.24em]">
                                    <MapPin size={14} className="text-accent-cyan" />
                                    {profile.location}
                                </div>
                            </div>

                            <div className="mt-5 text-sm font-medium tracking-[0.14em] text-accent-cyan md:text-base">
                                {profile.headline}
                            </div>

                            <h1 className="mt-8 max-w-4xl text-[2.9rem] font-bold leading-[0.93] text-white sm:text-6xl md:text-7xl xl:text-[5.8rem]">
                                {hero.titleFirst}
                                <br />
                                <span className="text-shimmer">{hero.titleSecond}</span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8 md:text-xl">
                                {profile.tagline}
                            </p>

                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
                                {hero.intro}
                            </p>

                            <div className="mt-8 grid gap-3 md:grid-cols-3">
                                    {hero.metrics.map((item, index) => (
                                        <motion.div
                                            key={item.value}
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.1 * index, duration: 0.55 }}
                                            className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4"
                                        >
                                            <div className="text-xl font-semibold text-white">{item.value}</div>
                                            <div className="mt-2 text-sm leading-6 text-slate-400">{item.label}</div>
                                        </motion.div>
                                    ))}
                            </div>

                            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                                <a
                                    href={`mailto:${profile.socials.email}`}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-surface-950 transition hover:translate-y-[-1px]"
                                >
                                    Let's talk
                                    <ArrowRight size={16} />
                                </a>
                                <a
                                    href={profile.socials.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm text-slate-200 transition hover:border-accent-cyan/40 hover:text-white"
                                >
                                    <Linkedin size={16} />
                                    LinkedIn
                                </a>
                                <a
                                    href={profile.socials.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-3 text-sm text-slate-200 transition hover:border-accent-gold/40 hover:text-white"
                                >
                                    <Github size={16} />
                                    GitHub
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    <motion.aside
                        {...fadeInUp}
                        transition={{ duration: 0.75, delay: 0.15, ease: 'easeOut' }}
                        className="panel-shell relative overflow-hidden rounded-[2rem] p-4 md:p-5"
                    >
                        <div className="absolute inset-0">
                            <img
                                src={profile.cityVisual}
                                alt="Futuristic cityscape"
                                className="h-full w-full object-cover opacity-30 saturate-150"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-surface-950/10 via-surface-950/45 to-surface-950" />
                        </div>

                        <div className="relative z-10 flex h-full flex-col gap-4 lg:min-h-[38rem]">
                            <div className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4 backdrop-blur-md">
                                <div>
                                    <div className="section-kicker">Player Profile</div>
                                    <p className="mt-2 text-sm leading-7 text-slate-300">{profile.availability}</p>
                                </div>
                                <ShieldCheck className="mt-1 shrink-0 text-accent-gold" />
                            </div>

                            <div className="panel-shell relative overflow-hidden rounded-[1.8rem] p-3">
                                <div className="absolute inset-x-3 top-3 flex items-center justify-between rounded-full border border-white/10 bg-surface-950/70 px-4 py-2 text-[10px] tracking-[0.14em] text-slate-300 md:text-[11px] md:tracking-[0.18em]">
                                    <span>Current Build</span>
                                    <span className="text-accent-cyan">AI and Sociology</span>
                                </div>
                                <img
                                    src={profile.portrait}
                                    alt={profile.name}
                                    className="h-[16rem] w-full rounded-[1.45rem] object-cover object-top pt-10 sm:h-[20rem] lg:h-[24rem]"
                                />
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                                {signalCards.map((card) => {
                                    const Icon = card.icon;
                                    return (
                                        <div key={card.title} className="panel-shell relative rounded-[1.45rem] p-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="section-kicker">{card.title}</div>
                                                <Icon size={18} className="text-accent-cyan" />
                                            </div>
                                            <div className="mt-3 text-lg font-medium text-white">{card.value}</div>
                                            <p className="mt-2 text-sm leading-6 text-slate-400">{card.detail}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.aside>
                </section>

                <section id="education">
                    <SectionHeading
                        eyebrow="Achievements"
                        title="Education presented like milestones, with the tone kept clean."
                        copy="The academic path stays visible and easy to read, without letting the rest of the profile revolve around it."
                    />

                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {education.map((item, index) => (
                            <motion.article
                                key={item.degree}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ delay: index * 0.12, duration: 0.65 }}
                                className="panel-shell relative overflow-hidden rounded-[2rem] p-6"
                            >
                                <div className="absolute right-4 top-4 rounded-full border border-accent-gold/25 bg-accent-gold/10 px-4 py-1 text-sm font-medium text-accent-gold">
                                    {item.grade}
                                </div>
                                <div className="section-kicker pr-20">{item.label}</div>
                                <h3 className="mt-5 max-w-[15rem] font-display text-[2.15rem] font-semibold leading-none text-white md:text-4xl">
                                    {item.degree}
                                </h3>
                                <div className="mt-5 text-sm uppercase tracking-[0.22em] text-accent-cyan md:tracking-[0.24em]">{item.school}</div>
                                <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">{item.detail}</p>
                            </motion.article>
                        ))}
                    </div>
                </section>

                <section className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr] xl:gap-6">
                    <motion.article {...fadeInUp} className="panel-shell relative overflow-hidden rounded-[2rem] p-6 md:p-8">
                        <img
                            src={profile.heroVisual}
                            alt="Cyber renaissance visual"
                            className="absolute inset-0 h-full w-full object-cover opacity-15"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-surface-900/80 via-surface-900/62 to-surface-950/92" />
                        <div className="relative z-10">
                            <SectionHeading
                                eyebrow="Worldview"
                                title="A different profile, built with a nerd-coded interface language and grounded in real work."
                                copy="The visual system borrows from control panels, HUDs, dashboards, and gaming culture, but the message remains simple: clarity, craft, and useful outcomes."
                            />

                            <div className="mt-8 space-y-5 text-[15px] leading-8 text-slate-300">
                                {manifesto.map((paragraph) => (
                                    <p key={paragraph}>{paragraph}</p>
                                ))}
                            </div>
                        </div>
                    </motion.article>

                    <motion.section {...fadeInUp} transition={{ duration: 0.72, delay: 0.1, ease: 'easeOut' }} className="panel-shell relative rounded-[2rem] p-6 md:p-8">
                        <SectionHeading
                            eyebrow="Loadout"
                            title="Professional capabilities, framed like a clean game interface."
                            copy="The goal is to feel distinctive on mobile and desktop without losing seriousness."
                        />

                        <div className="mt-8 grid gap-4 md:grid-cols-2">
                                {services.map((service, index) => {
                                    const Icon = serviceIcons[service.slug as keyof typeof serviceIcons] ?? Sparkles;

                                    return (
                                        <motion.div
                                            key={service.slug}
                                            initial={{ opacity: 0, y: 18 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.1, duration: 0.55 }}
                                            className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition hover:border-accent-cyan/30 hover:bg-white/[0.06]"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-surface-900/80 text-accent-cyan">
                                                    <Icon size={22} />
                                                </div>
                                                <ChevronRight className="text-slate-500 transition group-hover:translate-x-1 group-hover:text-accent-gold" />
                                            </div>
                                            <h3 className="mt-5 text-xl font-medium text-white">{service.title}</h3>
                                            <p className="mt-3 text-sm leading-7 text-slate-400">{service.desc}</p>
                                        </motion.div>
                                    );
                                })}
                        </div>
                    </motion.section>
                </section>

                <section id="journey" className="grid gap-5 xl:grid-cols-[1.05fr_0.95fr] xl:gap-6">
                    <motion.section {...fadeInUp} className="panel-shell relative rounded-[2rem] p-6 md:p-8">
                        <SectionHeading
                            eyebrow="Campaign Log"
                            title="A professional journey shown like missions and progression."
                            copy="The gaming influence is visual, but the content stays concrete and readable."
                        />

                        <div className="relative mt-8 space-y-4 pl-6">
                            <div className="timeline-line absolute bottom-0 left-0 top-0 w-px" />
                            {experience.map((item) => (
                                <div key={item.id} className="relative rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5">
                                    <div className="absolute left-[-1.9rem] top-6 h-4 w-4 rounded-full border-4 border-surface-950 bg-accent-cyan" />
                                    <div className="flex flex-wrap items-start justify-between gap-3">
                                        <div>
                                            <div className="text-sm uppercase tracking-[0.22em] text-slate-400">{item.company}</div>
                                            <h3 className="mt-2 text-2xl font-medium text-white">{item.role}</h3>
                                        </div>
                                        <div className={`rounded-full border px-3 py-1 text-xs uppercase tracking-[0.2em] ${accentStyles[item.accent as keyof typeof accentStyles]}`}>
                                            {item.period}
                                        </div>
                                    </div>
                                    <div className="mt-4 space-y-3">
                                        {item.impact.map((point) => (
                                            <div key={point} className="flex gap-3 text-sm leading-7 text-slate-300">
                                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-gold" />
                                                <span>{point}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.section>

                    <div className="grid gap-6">
                        <motion.section {...fadeInUp} transition={{ duration: 0.72, delay: 0.08, ease: 'easeOut' }} className="panel-shell relative rounded-[2rem] p-6 md:p-8">
                            <SectionHeading eyebrow="Core Stats" title="Strengths displayed like a HUD, not a spreadsheet." />

                            <div className="mt-6 space-y-4">
                                {skills.primary.map((skill, index) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, x: 24 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.12, duration: 0.55 }}
                                        className="rounded-[1.5rem] border border-white/10 bg-surface-900/65 p-4"
                                    >
                                        <div className="flex items-center justify-between gap-3 text-sm">
                                            <span className="font-medium text-white">{skill.name}</span>
                                            <span className="font-mono text-slate-400">{skill.level}%</span>
                                        </div>
                                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/8">
                                            <div
                                                className="h-full rounded-full bg-[linear-gradient(90deg,#7dd3fc,#4f8cff,#f6c453)]"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section {...fadeInUp} transition={{ duration: 0.72, delay: 0.12, ease: 'easeOut' }} className="panel-shell relative rounded-[2rem] p-6 md:p-8">
                            <SectionHeading eyebrow="Inventory" title="Tools, platforms, and methods that support the work." />

                            <div className="mt-6 grid gap-3">
                                {skills.inventory.map((item) => (
                                    <div key={item.name} className="rounded-[1.25rem] border border-white/8 bg-surface-950/60 p-4">
                                        <div className="text-sm font-medium uppercase tracking-[0.22em] text-accent-gold">{item.name}</div>
                                        <div className="mt-2 text-sm leading-7 text-slate-400">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    </div>
                </section>

                <motion.section
                    id="contact"
                    {...fadeInUp}
                    transition={{ duration: 0.72, delay: 0.12, ease: 'easeOut' }}
                    className="panel-shell relative overflow-hidden rounded-[2.2rem] p-6 md:p-10"
                >
                    <img
                        src={profile.cityVisual}
                        alt="Cinematic portfolio background"
                        className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-surface-900/90 to-surface-950/80" />
                    <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div>
                            <SectionHeading
                                eyebrow="Open Channel"
                                title="A distinctive profile with a gaming edge, still ready for serious work."
                                copy="If the goal is to stand out without losing professionalism, this is the direction: memorable, mobile-friendly, and clearly personal."
                            />
                        </div>

                        <div className="grid gap-3">
                            <a
                                href={`mailto:${profile.socials.email}`}
                                className="inline-flex items-center justify-between rounded-[1.4rem] border border-accent-cyan/25 bg-accent-cyan/10 px-5 py-4 text-sm text-white transition hover:border-accent-cyan/45"
                            >
                                <span className="flex min-w-0 items-center gap-3 overflow-hidden">
                                    <Mail size={18} className="shrink-0 text-accent-cyan" />
                                    <span className="truncate">{profile.socials.email}</span>
                                </span>
                                <ArrowRight size={18} className="shrink-0" />
                            </a>
                            <a
                                href={profile.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-slate-200 transition hover:border-white/20"
                            >
                                <span className="flex items-center gap-3">
                                    <Linkedin size={18} className="text-accent-gold" />
                                    LinkedIn profile
                                </span>
                                <ArrowRight size={18} />
                            </a>
                            <a
                                href={profile.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-white/[0.05] px-5 py-4 text-sm text-slate-200 transition hover:border-white/20"
                            >
                                <span className="flex items-center gap-3">
                                    <Github size={18} className="text-accent-cyan" />
                                    GitHub profile
                                </span>
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </div>
                </motion.section>
            </main>

            <motion.nav
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
                className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 lg:hidden"
            >
                <div className="panel-shell mobile-dock relative rounded-[1.8rem] px-2 py-2">
                    <div className="flex items-center justify-between gap-1">
                        {dockItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    whileTap={{ scale: 0.94 }}
                                    className="flex min-w-0 flex-1 flex-col items-center gap-1 rounded-[1.2rem] px-2 py-2 text-center text-[11px] text-slate-300 transition hover:bg-white/8 hover:text-white"
                                >
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                                        <Icon size={16} />
                                    </div>
                                    <span className="truncate">{item.label}</span>
                                </motion.a>
                            );
                        })}
                    </div>
                </div>
            </motion.nav>
        </div>
    );
}

export default App;

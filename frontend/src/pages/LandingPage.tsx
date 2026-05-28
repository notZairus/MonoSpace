import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  FileText,
  Search,
  Sparkles,
  Target,
} from "lucide-react";
import { Show, UserButton } from "@clerk/react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const features = [
  {
    icon: FileText,
    title: "Lecture Notes",
    description:
      "Upload PDFs or paste text and let AI do the heavy lifting. Get clean summaries, organized by subject and week, searchable in seconds.",
    tags: ["PDF import", "AI summarize", "Full-text search"],
  },
  {
    icon: CalendarDays,
    title: "Student Planner",
    description:
      "Add assignments, exams, and deadlines. Link tasks to subjects, track status, and switch between calendar and list view.",
    tags: ["Calendar", "Status tracking", "Link to subject"],
  },
  {
    icon: Check,
    title: "Stay on top of deadlines",
    description:
      "Track every assignment and exam with a clear status line, visual calendar views, and daily reminders that keep the week calm.",
    tags: ["Todo", "In progress", "Deadline alerts"],
  },
  {
    icon: BookOpenText,
    title: "Everything you need",
    description:
      "Notes, tasks, and summaries live together, so you can move from reading to planning without jumping between tabs.",
    tags: ["One dashboard", "Study flow", "Fast access"],
  },
];

const steps = [
  {
    number: "01",
    title: "Upload your notes",
    text: "Drag in a PDF or paste your lecture text. Organize by subject and week as you go.",
  },
  {
    number: "02",
    title: "Get AI summaries",
    text: "StudyBase reads and condenses your notes into sharp, review-ready summaries instantly.",
  },
  {
    number: "03",
    title: "Plan and conquer",
    text: "Add deadlines to the planner, link them to subjects, and track progress all the way to done.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf8f3] text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-114 bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.12),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(244,114,182,0.10),_transparent_24%),linear-gradient(to_bottom,_rgba(255,255,255,0.92),_rgba(250,248,243,0))]" />
      <div className="pointer-events-none absolute left-0 top-0 h-112 w-1/2 bg-[radial-gradient(circle_at_10%_10%,_rgba(99,102,241,0.06),_transparent_42%)]" />

      <header className="relative z-10 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex size-7 items-center justify-center rounded-lg bg-indigo-600 text-sm font-semibold text-white shadow-sm shadow-indigo-500/20">
              S
            </span>
            <span className="font-serif text-lg tracking-tight text-slate-950">
              StudyBase
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
            <a
              className="transition-colors hover:text-slate-950"
              href="#features"
            >
              Features
            </a>
            <a
              className="transition-colors hover:text-slate-950"
              href="#how-it-works"
            >
              How it works
            </a>
            <a
              className="transition-colors hover:text-slate-950"
              href="#pricing"
            >
              Pricing
            </a>
          </nav>

          <Show when="signed-out">
            <div>
              <Button size="lg">
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          </Show>

          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </header>

      <main className="relative z-10">
        <section
          id="home"
          className="mx-auto grid max-w-6xl gap-14 px-4 pb-20 pt-12 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-indigo-700">
              <Sparkles className="size-3.5" />
              AI-powered student productivity
            </div>

            <h1 className="mt-6 font-serif text-6xl leading-[0.92] tracking-tight text-slate-950 sm:text-7xl lg:text-[4.8rem]">
              Study <span className="italic text-indigo-600">smarter,</span> not
              harder.
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
              Turn lecture notes into clear summaries and intelligent task
              planning so you can actually understand your coursework - not just
              survive it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(79,70,229,0.24)] transition hover:-translate-y-0.5 hover:bg-indigo-500"
              >
                Start for free
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 transition hover:text-slate-950"
              >
                See how it works
                <span className="inline-block h-px w-10 bg-slate-300" />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-3 text-sm text-slate-600">
              <div className="flex -space-x-2">
                <span className="grid size-7 place-items-center rounded-full bg-indigo-600 text-[10px] font-semibold text-white ring-2 ring-[#faf8f3]">
                  AK
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white ring-2 ring-[#faf8f3]">
                  BT
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-amber-500 text-[10px] font-semibold text-white ring-2 ring-[#faf8f3]">
                  MC
                </span>
                <span className="grid size-7 place-items-center rounded-full bg-rose-500 text-[10px] font-semibold text-white ring-2 ring-[#faf8f3]">
                  JR
                </span>
              </div>
              <p>
                Trusted by{" "}
                <span className="font-semibold text-slate-900">2,000+</span>{" "}
                students worldwide
              </p>
            </div>
          </div>

          <div className="relative mx-auto h-112 w-full max-w-124 sm:h-128">
            <div className="absolute left-0 top-10 h-80 w-[18rem] rounded-[1.6rem] border border-slate-200/80 bg-white/90 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:left-8 sm:top-8 sm:h-96 sm:w-[20rem]">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-700">
                  <BookOpenText className="size-3" />
                  Lecture notes
                </div>
                <span className="text-sm font-medium text-slate-500">
                  Intro to learning
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-indigo-50 p-4 ring-1 ring-indigo-100">
                  <p className="text-sm font-semibold text-indigo-700">
                    AI summary
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Covers supervised vs unsupervised learning, gradient
                    descent, optimization, and bias-variance tradeoff.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                    <Search className="size-3.5 text-slate-400" />
                    Search notes
                  </div>
                  <div className="mt-3 inline-flex rounded-lg bg-amber-50 px-3 py-2 text-sm text-slate-700">
                    "gradient descent"
                  </div>
                  <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <Target className="size-3.5" />
                    Found in 4 notes
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-20 h-40 w-68 rounded-[1.3rem] border border-slate-200/70 bg-white p-4 shadow-[0_18px_46px_rgba(15,23,42,0.10)]">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">
                <CalendarDays className="size-3.5 text-indigo-500" />
                Upcoming
              </div>
              <ul className="mt-3 space-y-3 text-sm text-slate-700">
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-sm bg-indigo-600 text-center text-[10px] leading-4 text-white">
                      ✓
                    </span>
                    Read Ch. 4
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-sm border border-indigo-500/40" />
                    Stats problem set
                  </span>
                  <span className="text-[11px] font-semibold text-orange-500">
                    Tomorrow
                  </span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="size-4 rounded-sm border border-indigo-500/40" />
                    Midterm prep
                  </span>
                  <span className="text-[11px] font-semibold text-orange-500">
                    Fri
                  </span>
                </li>
              </ul>
            </div>

            <div className="absolute bottom-10 left-0 w-60 rounded-[1.25rem] border border-slate-200/70 bg-white p-4 shadow-[0_18px_46px_rgba(15,23,42,0.10)] sm:left-5">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
                <Search className="size-3.5 text-sky-500" />
                Search notes
              </div>
              <div className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-slate-700">
                "gradient descent"
              </div>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                <Target className="size-3.5" />
                Found in 4 notes
              </div>
            </div>

            <div className="absolute left-20 top-0 hidden h-10 w-20 rounded-full bg-indigo-100/70 blur-2xl sm:block" />
            <div className="absolute right-8 bottom-0 hidden h-12 w-28 rounded-full bg-fuchsia-100/70 blur-2xl sm:block" />
          </div>
        </section>

        <section
          id="features"
          className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600">
              Everything you need
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-950 sm:text-5xl">
              Two modules. One place.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Everything you need to turn raw lectures into structured knowledge
              and clear deadlines into achievable goals.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {features.slice(0, 2).map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="rounded-[1.6rem] border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-[1.6rem] border border-slate-200/90 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
                <Check className="size-5" />
              </div>
              <h3 className="mt-5 font-serif text-2xl text-slate-950">
                Stay on top of deadlines
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600">
                Track every assignment and exam with a clear status line, visual
                calendar views, and daily reminders that keep the week calm.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Todo
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  In progress
                </span>
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  Deadline alerts
                </span>
              </div>
            </article>

            <article className="rounded-[1.6rem] border border-slate-200/90 bg-[#f8f4ea] p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]">
              <div className="space-y-3 rounded-[1.2rem] bg-white p-4 shadow-sm">
                {[
                  ["Essay outline", "English", "May 20", "emerald"],
                  ["Problem Set 5", "Math", "May 28", "amber"],
                  ["ML midterm review", "CS", "Jun 3", "slate"],
                  ["Final project draft", "English", "Jun 10", "slate"],
                ].map(([title, tag, date, tone], index) => (
                  <div
                    key={title}
                    className={`flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-2 text-sm shadow-sm ${
                      index === 0 ? "ring-1 ring-emerald-100" : ""
                    }`}
                  >
                    <span
                      className={`size-2.5 rounded-full ${
                        tone === "emerald"
                          ? "bg-emerald-500"
                          : tone === "amber"
                            ? "bg-amber-500"
                            : "bg-slate-300"
                      }`}
                    />
                    <span className="min-w-0 flex-1 truncate text-slate-700">
                      {title}
                    </span>
                    <span className="rounded-full bg-indigo-50 px-2 py-1 text-[10px] font-semibold text-indigo-700">
                      {tag}
                    </span>
                    <span className="text-[11px] text-slate-500">{date}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600">
            Simple as that
          </p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-tight text-slate-950 sm:text-5xl">
            Up in under 2 minutes.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <article key={step.number} className="relative">
                <div className="mb-5 font-serif text-6xl italic text-slate-200">
                  {step.number}
                </div>
                <h3 className="font-serif text-2xl text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="border-y border-indigo-100 bg-[#ece8fb]"
        >
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-indigo-600">
              Ready to ace this semester?
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-tight text-slate-950 sm:text-5xl">
              Ready to <span className="italic text-indigo-600">ace</span> this
              semester?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Join thousands of students who already use StudyBase to study
              smarter.
            </p>
            <a
              href="#home"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-[0_14px_28px_rgba(79,70,229,0.24)] transition hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              Create your free account
              <ArrowRight className="size-4" />
            </a>
          </div>
        </section>
      </main>

      <footer className="bg-[#1f1d33] text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 text-sm text-white/70 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <a
            href="#home"
            className="font-serif text-lg tracking-tight text-white"
          >
            StudyBase
          </a>
          <div className="flex gap-6">
            <a href="#privacy" className="transition hover:text-white">
              Privacy
            </a>
            <a href="#terms" className="transition hover:text-white">
              Terms
            </a>
            <a href="#contact" className="transition hover:text-white">
              Contact
            </a>
          </div>
          <p>© 2025 StudyBase. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

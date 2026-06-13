import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  FileText,
  Sparkles,
  Menu,
  X,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { Show, UserButton } from "@clerk/react";

import { Link } from "react-router";

import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const features = [
  {
    icon: FileText,
    title: "Lecture notes",
    description:
      "Upload PDFs or paste text, then turn dense class material into clean summaries you can scan in seconds.",
  },
  {
    icon: CalendarDays,
    title: "Student planner",
    description:
      "Keep assignments, exams, and reminders in one calm view so deadlines stay visible without feeling noisy.",
  },
  {
    icon: Check,
    title: "Track progress",
    description:
      "See what is done, what is next, and what still needs work with a layout that stays readable on every screen.",
  },
  {
    icon: BookOpenText,
    title: "Study in context",
    description:
      "Notes, summaries, and tasks sit beside each other so you can move from reading to planning without switching tabs.",
  },
];

const steps = [
  {
    number: "01",
    title: "Bring in your notes",
    text: "Drop in lecture files or paste in class content to start organizing the material by subject and week.",
  },
  {
    number: "02",
    title: "Let AI condense the page",
    text: "Get crisp summaries that pull out the important concepts, terminology, and examples without the fluff.",
  },
  {
    number: "03",
    title: "Turn insight into action",
    text: "Plan tasks, set deadlines, and keep your next study block visible right where you need it.",
  },
];

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header
        className={cn(
          "relative z-10 border-b border-border/80 bg-background/80 backdrop-blur",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-3">
            <span className="font-heading text-2xl tracking-tight text-foreground">
              StudyBase
            </span>
          </a>

          <nav className="hidden items-center gap-2 text-sm text-muted-foreground md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-full px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-header-menu"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition hover:bg-accent hover:text-accent-foreground md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="size-4" />
              ) : (
                <Menu className="size-4" />
              )}
            </button>

            <Show when="signed-out">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="hidden sm:inline-flex"
                >
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button size="lg" className="text-white" asChild>
                  <Link to="/register">
                    <Sparkles className="size-4" />
                    Get started
                  </Link>
                </Button>
              </div>
            </Show>

            <Show when="signed-in">
              <div className="flex items-center gap-3">
                <Button variant="outline" size="lg" asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <UserButton />
              </div>
            </Show>
          </div>
        </div>

        <div
          id="mobile-header-menu"
          className={cn(
            "border-t border-border/80 bg-background/95 px-4 py-4 shadow-sm backdrop-blur md:hidden",
            mobileMenuOpen ? "block" : "hidden",
          )}
        >
          <nav className="flex flex-col gap-1 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <a
                key={item.href}
                className="rounded-xl px-3 py-2 transition-colors hover:bg-accent hover:text-accent-foreground"
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 flex flex-col gap-2">
            <Show when="signed-out">
              <Button variant="outline" size="lg" asChild>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  Sign in
                </Link>
              </Button>
              <Button size="lg" asChild>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Sparkles className="size-4" />
                  Get started
                </Link>
              </Button>
            </Show>

            <Show when="signed-in">
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
              </Button>
            </Show>
          </div>
        </div>
      </header>

      <main>
        <section
          id="home"
          className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-16"
        >
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl tracking-tight text-foreground sm:text-6xl lg:text-7xl lg:leading-[0.92]">
              Study smarter with one place for notes, tasks, and deadlines.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              StudyBase keeps your lectures, summaries, and planner together in
              a calm interface so it is easier to review, stay organized, and
              actually finish the week on time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" className="text-white" asChild>
                <a href="#pricing">
                  Start for free
                  <ArrowRight className="size-4" />
                </a>
              </Button>

              <Button variant="outline" size="lg" asChild>
                <a href="#features">Explore features</a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <div className="rounded-full border border-border bg-card px-4 py-2 shadow-sm">
                Built for quick review
              </div>
              <div className="rounded-full border border-border bg-card px-4 py-2 shadow-sm">
                Notes and tasks together
              </div>
              <div className="rounded-full border border-border bg-card px-4 py-2 shadow-sm">
                Mobile-friendly workflow
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 scale-80 gap-4 rounded-[2.5rem] bg-[#f0f0f2] p-5 shadow-inner dark:bg-neutral-900/40">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col justify-between rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm min-h-80">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                      TASKS
                    </span>
                    <div className="flex size-5 items-center justify-center rounded-full bg-[#000a80] text-white">
                      <Plus className="size-3" />
                    </div>
                  </div>

                  <div className="mt-4 flex gap-1.5 overflow-x-auto pb-1 text-[10px] text-neutral-400">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-medium text-neutral-700">
                      Today
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-medium text-neutral-700">
                      Upcoming
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-medium text-neutral-700">
                      Overdue
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-0.5 font-medium text-neutral-700">
                      Completed
                    </span>
                  </div>

                  <div className="mt-16 text-center">
                    <p className="text-xs text-neutral-400 font-medium">
                      No tasks for today!
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm min-h-40 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 block mb-3">
                    NOTES
                  </span>
                  <p className="text-[10px] font-bold text-neutral-700 mb-1.5">
                    Subjects:
                  </p>
                  <div className="space-y-1 max-w-30">
                    <div className="rounded-full bg-[#000a80] text-white text-[10px] font-medium px-3 py-1 text-center">
                      All
                    </div>
                    <div className="rounded-full border border-neutral-100 text-neutral-600 text-[10px] font-medium px-3 py-1 text-center bg-white">
                      SE101
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm min-h-55 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                      SUBJECTS
                    </span>
                    <div className="flex size-5 items-center justify-center rounded-full bg-[#000a80] text-white">
                      <Plus className="size-3" />
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {[
                      "A",
                      "ANT",
                      "ES101",
                      "Hello",
                      "Math",
                      "SE101",
                      "THS1AAAAA",
                      "dsadsdas",
                      "fsaxc",
                      "puta",
                      "tologo bo?",
                    ].map((sub) => (
                      <span
                        key={sub}
                        className={cn(
                          "rounded-full border border-neutral-200 px-2.5 py-1 text-[10px] font-medium transition-colors bg-white text-neutral-600",
                        )}
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] bg-[#000a80] p-6 shadow-sm text-white flex flex-col justify-between items-center text-center min-h-65">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-80 mt-1">
                  STUDYBASE
                </span>

                <div className="my-auto">
                  <p className="text-[13px] font-medium opacity-90">
                    Sat, June 13
                  </p>
                  <p className="font-serif text-4xl tracking-wide mt-1">
                    05:19 PM
                  </p>
                </div>

                <p className="text-[10px] leading-relaxed opacity-80 max-w-50 border-t border-white/10 pt-3 w-full">
                  "Ang di mag-mahal sa sariling wika, ay mas mabaho pa sa
                  bagoong."
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm min-h-45 flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                  PROFILE
                </span>
                <div className="flex items-center gap-3 mt-auto">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-purple-600 text-sm font-bold text-white">
                    Z
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-800 truncate">
                      Zairus
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      zairussocials@gmail.com
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm min-h-35">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400">
                  EMPTY FOR NOW
                </span>
              </div>

              <div className="rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm flex flex-col justify-between items-center text-center min-h-40">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-400 self-start">
                  POMODORO
                </span>

                <div className="my-auto">
                  <p className="text-3xl font-bold tracking-tight text-neutral-800">
                    24:39
                  </p>
                </div>

                <button className="w-full rounded-full bg-[#000a80] py-2 text-xs font-medium text-white transition hover:opacity-90">
                  Pause Work
                </button>
              </div>
            </div>

            <div className="md:col-span-3 rounded-[1.8rem] border border-black/5 bg-white p-5 shadow-sm -mt-2 min-h-3o">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-neutral-700">Notes:</p>
                <div className="flex size-5 items-center justify-center rounded-full bg-[#000a80] text-white">
                  <Plus className="size-3" />
                </div>
              </div>
              <div className="mt-2">
                <div className="inline-block rounded-xl border border-neutral-100 bg-white p-2 shadow-sm min-w-25">
                  <p className="text-xs font-bold text-neutral-700 leading-tight">
                    Note 1
                  </p>
                  <p className="text-[9px] text-neutral-400 mt-0.5">SE101</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                Features
              </p>
              <h2 className="mt-3 font-heading text-4xl tracking-tight text-foreground sm:text-5xl">
                A cleaner way to keep up with class.
              </h2>
              <p className="mt-4 text-lg leading-8 text-muted-foreground">
                Built around the shadcn color system, the page stays soft,
                balanced, and easy to scan while still feeling designed.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <article
                    key={feature.title}
                    className="rounded-3xl border border-border bg-card p-6 shadow-sm"
                  >
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-heading text-2xl tracking-tight text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">
              How it works
            </p>
            <h2 className="mt-3 font-heading text-4xl tracking-tight text-foreground sm:text-5xl">
              Three steps from notes to momentum.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <p className="font-heading text-5xl tracking-tight text-primary/80">
                  {step.number}
                </p>
                <h3 className="mt-5 font-heading text-2xl tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="pricing"
          className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
        >
          <div className="rounded-[2rem] border border-border bg-primary p-8 shadow-sm sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white">
                  Ready to start
                </p>
                <h2 className="mt-3 font-heading text-4xl tracking-tight text-white sm:text-5xl">
                  Make your next study session feel organized.
                </h2>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                  Start with a simple dashboard that keeps your notes, planner,
                  and reminders aligned so it is easier to stay on track.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button
                  size="lg"
                  className="bg-foreground text-white hover:bg-foreground"
                  asChild
                >
                  <a href="#home">
                    Create account
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;

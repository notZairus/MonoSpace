import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Check,
  FileText,
  Menu,
  X,
} from "lucide-react";
import HeroImage from "../assets/Bibliophile.gif";
import { useState } from "react";
import { Show, SignIn, SignUp, UserButton } from "@clerk/react";
import { useNavigate } from "react-router";

import { Link } from "react-router";

import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { motion, useReducedMotion } from "motion/react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
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
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const reduceMotion = useReducedMotion();

  const navigate = useNavigate();

  return (
    <>
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent
          className="p-0 bg-transparent shadow-none border-none ring-0 flex items-center justify-center"
          showCloseButton={false}
        >
          <SignIn
            fallbackRedirectUrl="/dashboard"
            signUpUrl="/register"
            appearance={{
              variables: {
                colorPrimary: "#00087a",
                borderRadius: "12px",
              },
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showRegister} onOpenChange={setShowRegister}>
        <DialogContent
          className="p-0 bg-transparent shadow-none border-none ring-0 flex items-center justify-center"
          showCloseButton={false}
        >
          <SignUp
            fallbackRedirectUrl="/dashboard"
            signInUrl="/login"
            appearance={{
              variables: {
                colorPrimary: "#00087a",
                borderRadius: "12px",
              },
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={cn(
            "z-10 border-b border-border/80 bg-background/80 backdrop-blur fixed top-0 left-0 right-0",
          )}
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <a href="#home" className="flex items-center gap-3">
              <span className="font-heading text-2xl tracking-tight text-foreground">
                MonoSpace
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
                <div className="md:flex hidden items-center gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    className="hidden sm:inline-flex"
                    onClick={() => {
                      setShowLogin(true);
                      setShowRegister(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    size="lg"
                    className="text-white"
                    onClick={() => {
                      setShowRegister(true);
                      setShowLogin(false);
                    }}
                  >
                    Get started
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
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    setShowLogin(true);
                    setShowRegister(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  size="lg"
                  className="text-white"
                  onClick={() => {
                    setShowRegister(true);
                    setShowLogin(false);
                  }}
                >
                  Get started
                </Button>
              </Show>

              <Show when="signed-in">
                <Button variant="outline" size="lg" asChild>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </Button>
              </Show>
            </div>
          </div>
        </motion.header>

        <main className="mt-12">
          <section
            id="home"
            className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-16"
          >
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, x: -40 }}
              animate={reduceMotion ? {} : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="font-heading text-5xl tracking-tight text-foreground sm:text-6xl lg:text-7xl lg:leading-[0.92]">
                Study smarter with one place for notes, tasks, and deadlines.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                MonoSpace keeps your lectures, summaries, and planner together
                in a calm interface so it is easier to review, stay organized,
                and actually finish the week on time.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button size="lg" className="text-white" asChild>
                  <a href="#ready">
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
            </motion.div>
            <div className=" w-full">
              <img className="w-full" src={HeroImage} alt="Hero" />
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
                {features.map((feature, i) => {
                  const Icon = feature.icon;

                  return (
                    <motion.article
                      key={feature.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
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
                    </motion.article>
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
              {steps.map((step, i) => (
                <motion.article
                  key={step.number}
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
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
                </motion.article>
              ))}
            </div>
          </section>

          <section
            id="ready"
            className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
          >
            <motion.div
              initial={reduceMotion ? false : { scale: 0.98, opacity: 0 }}
              whileInView={reduceMotion ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-border bg-primary p-8 shadow-sm sm:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white">
                    Ready to start
                  </p>
                  <h2 className="mt-3 font-heading text-4xl tracking-tight text-white sm:text-5xl">
                    Make your next study session feel organized.
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-8 text-white/80">
                    Start with a simple dashboard that keeps your notes,
                    planner, and reminders aligned so it is easier to stay on
                    track.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Button
                    size="lg"
                    className="bg-foreground text-white hover:bg-foreground"
                    onClick={() => navigate("/register")}
                  >
                    Create account
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </>
  );
}

export default LandingPage;

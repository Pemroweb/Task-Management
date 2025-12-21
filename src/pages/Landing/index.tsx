import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  KanbanSquare,
  Users,
  Zap,
} from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import heroBg from "../../assets/images/bg.jpg";
import logo from "../../assets/images/Task Flow.png";

const FEATURES = [
  {
    title: "Project-based collaboration",
    description:
      "Invite teammates into a project workspace. Everyone in the project can collaborate on boards and tasks.",
    icon: Users,
  },
  {
    title: "Trello-style boards",
    description:
      "Organize work with lists and cards, drag & drop tasks, and keep everyone aligned.",
    icon: KanbanSquare,
  },
  {
    title: "Lightweight analytics",
    description:
      "Track progress, workload, and time on tasks to keep delivery predictable.",
    icon: Zap,
  },
] as const;

const STEPS = [
  "Create a project",
  "Invite teammates",
  "Use the default board",
  "Create lists & tasks",
  "Move work to done",
] as const;

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;
    // Keep the landing page accessible, but make the primary CTA go to the app.
  }, [user]);

  const primaryHref = user ? "/home" : "/auth?mode=signup";
  const secondaryHref = user ? "/projects" : "/auth?mode=signin";

  return (
    <div className="h-screen overflow-y-auto bg-slate-950 text-white">
      <div
        className="relative"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.92), rgba(2,6,23,0.82)), url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-5">
          <header className="flex items-center justify-between py-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-3"
              aria-label="Task Flow"
            >
              <img
                src={logo}
                alt="Task Flow"
                className="h-9 w-auto object-contain"
              />
            </button>

            <div className="flex items-center gap-2">
              <Link
                to={secondaryHref}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white/90 hover:text-white hover:bg-white/10 transition"
              >
                {user ? "Projects" : "Sign in"}
              </Link>
              <Link
                to={primaryHref}
                className="px-4 py-2 rounded-lg text-sm font-semibold bg-orange-500 hover:bg-orange-600 transition inline-flex items-center gap-2"
              >
                {user ? "Open workspace" : "Get started"}
                <ArrowRight size={16} />
              </Link>
            </div>
          </header>

          <main className="py-14 sm:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  Modern Trello/Jira-inspired workflow
                </div>

                <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight">
                  Manage projects, boards, and tasks — together.
                </h1>
                <p className="mt-4 text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                  Task Flow helps your team collaborate per project. The project
                  creator becomes the owner, invites members, and everyone works
                  on the same board and tasks in real-time.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row gap-3">
                  <Link
                    to={primaryHref}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 font-semibold hover:bg-orange-600 transition"
                  >
                    {user ? "Go to Home" : "Create free account"}
                    <ArrowRight size={18} />
                  </Link>
                  <Link
                    to={secondaryHref}
                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 font-semibold text-white/90 hover:bg-white/15 transition"
                  >
                    {user ? "Open Projects" : "Sign in"}
                  </Link>
                </div>

                <div className="mt-8 grid gap-2 text-sm text-white/80">
                  {STEPS.map((step) => (
                    <div key={step} className="flex items-start gap-2">
                      <CheckCircle2
                        className="mt-0.5 text-lime-400"
                        size={18}
                      />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
                <div className="grid gap-4">
                  {FEATURES.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div
                        key={f.title}
                        className="rounded-xl border border-white/10 bg-slate-950/40 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl bg-orange-500/15 text-orange-300">
                            <Icon size={20} />
                          </div>
                          <div>
                            <div className="font-semibold">{f.title}</div>
                            <div className="text-sm text-white/70 mt-1">
                              {f.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      <section className="bg-slate-950">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-orange-300">
                Designed for teams
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold">
                Clean UI, fast workflow
              </h2>
              <p className="mt-2 text-white/70 max-w-2xl">
                A simple, modern interface with strong defaults — so you can
                focus on shipping.
              </p>
            </div>
            <Link
              to={primaryHref}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-semibold text-white/90 hover:bg-white/15 transition"
            >
              {user ? "Open workspace" : "Start now"}
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "Ownership & permissions",
                desc: "Project creators get full control. Members collaborate inside that project only.",
              },
              {
                title: "Real-time collaboration",
                desc: "Boards, tasks, and activity update live so everyone stays in sync.",
              },
              {
                title: "Keyboard-friendly",
                desc: "Clear actions, strong hierarchy, and consistent UI patterns.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <div className="font-semibold">{card.title}</div>
                <div className="mt-2 text-sm text-white/70">{card.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} Task Flow — project collaboration made
            simple.
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/auth?mode=signin"
              className="text-sm text-white/70 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              to="/auth?mode=signup"
              className="text-sm text-white/70 hover:text-white"
            >
              Create account
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

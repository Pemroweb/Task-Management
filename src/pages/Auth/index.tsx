import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import heroBg from "../../assets/images/bg.jpg";
import logo from "../../assets/images/Task Flow.png";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = useMemo(() => {
    const m = (searchParams.get("mode") || "").toLowerCase();
    return m === "signup" ? "signup" : "signin";
  }, [searchParams]);
  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) navigate("/home", { replace: true });
  }, [navigate, user]);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const setAuthMode = (next: "signin" | "signup") => {
    setMode(next);
    setSearchParams((prev) => {
      const p = new URLSearchParams(prev);
      p.set("mode", next);
      return p;
    });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await signIn(email.trim(), password);
      } else {
        await signUp(name.trim(), email.trim(), password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(2,6,23,0.88), rgba(2,6,23,0.84)), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-[460px] bg-white/95 backdrop-blur rounded-2xl shadow-xl border border-white/30 p-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Task Flow"
              className="h-8 w-auto object-contain"
            />
          </Link>
          <Link
            to="/"
            className="text-sm font-semibold text-gray-600 hover:text-gray-900"
          >
            Back
          </Link>
        </div>

        <div className="text-2xl font-bold text-gray-800">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </div>
        <div className="text-sm text-gray-600 mt-1">
          {mode === "signin"
            ? "Sign in to collaborate with your team."
            : "Start collaborating on tasks and projects."}
        </div>

        <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
          {mode === "signup" ? (
            <div>
              <label className="text-sm font-semibold text-gray-700">
                Full name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
                placeholder="Your name"
              />
            </div>
          ) : null}

          <div>
            <label className="text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              placeholder="you@email.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full h-11 px-3 rounded-xl bg-slate-50 border border-slate-200 outline-none text-sm focus:ring-2 focus:ring-orange-300 focus:border-orange-300"
              placeholder="Password"
            />
          </div>

          {error ? <div className="text-sm text-red-600">{error}</div> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600">
          {mode === "signin"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setAuthMode(mode === "signin" ? "signup" : "signin")}
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            {mode === "signin" ? "Create one" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

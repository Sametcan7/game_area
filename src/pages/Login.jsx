import { useState } from "react";
import { supabase } from "../supabase/api";
import { Link, useNavigate } from "react-router-dom";
import DocumentTitle from "../services/DocumentTitle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  DocumentTitle("Login");

  async function HandleLogin(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) setError(true);
    if (!error) navigate("/");
  }

  return (
    <div className="h-screen bg-zinc-700">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-md rounded-lg border-2 border-zinc-500 bg-zinc-800 shadow-lg shadow-zinc-800 lg:w-4/5">
          <h2 className="mt-1 text-center text-2xl font-bold text-zinc-300 lg:mt-6 lg:text-4xl">
            LOGIN
          </h2>
          <form
            onSubmit={(e) => HandleLogin(e)}
            className="text-md mx-auto w-full max-w-80 px-2 py-1 font-medium text-zinc-200 lg:py-20 lg:text-xl">
            <div>
              <label className="flex flex-col">
                Email
                <input
                  type="email"
                  required
                  placeholder="demo@demo.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="rounded-xl border-4 border-zinc-600 bg-zinc-500 px-2"
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col">
                Password
                <input
                  type="password"
                  required
                  placeholder="123456"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="rounded-xl border-4 border-zinc-600 bg-zinc-500 px-2"
                />
              </label>
            </div>
            {error ? (
              <span className="text-center text-sm text-red-600">
                Email or password wrong!
              </span>
            ) : null}
            <div className="mt-4 text-center">
              <button
                className="text-m rounded-lg bg-zinc-500 px-2 py-0.5 font-medium text-zinc-200 shadow-lg shadow-zinc-600 hover:bg-zinc-600 active:ring-2 active:ring-zinc-500 lg:px-5 lg:py-2"
                type="submit">
                Login
              </button>
            </div>
          </form>
          <p className="p-2 text-right text-zinc-400">
            <Link to={"/sign"}>Don't have an account? Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

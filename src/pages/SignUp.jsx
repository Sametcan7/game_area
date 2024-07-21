import { useState } from "react";
import { supabase } from "../supabase/api";
import { Link, useNavigate } from "react-router-dom";
import DocumentTitle from "../services/DocumentTitle";

function SignUp() {
  DocumentTitle("Sign Up");
  const [validate, setValidate] = useState(false);
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function navigates() {
    navigate("/");
  }

  async function HandleSignUp(e) {
    e.preventDefault();

    if (password.length <= 5) setValidate(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      setSuccess(true);
      setTimeout(navigates, 2000);
    }
  }

  return (
    <div className="h-screen bg-zinc-700">
      <div className="flex h-full items-center justify-center">
        <div className="w-full max-w-2xl rounded-lg border-2 border-zinc-500 bg-zinc-800 shadow-lg shadow-zinc-800 lg:w-4/5">
          <h2 className="mt-1 text-center text-2xl font-bold text-zinc-300 lg:mt-6 lg:text-4xl">
            SIGN UP
          </h2>
          {success ? (
            <div className="text-md mx-auto w-full px-2 py-1 text-center font-medium text-zinc-200 lg:py-20 lg:text-xl">
              <p>Successfully registered, redirecting to home page...</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => HandleSignUp(e)}
              className="text-md mx-auto w-full max-w-80 px-2 py-1 font-medium text-zinc-200 lg:py-20 lg:text-xl">
              <div>
                <label className="flex flex-col">
                  Email
                  <input
                    placeholder="Enter your email"
                    required
                    type="email"
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
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value >= 6) setValidate(false);
                    }}
                    className="rounded-xl border-4 border-zinc-600 bg-zinc-500 px-2"
                  />
                </label>
              </div>
              {validate ? (
                <span className="text-center text-sm text-red-600">
                  Password Should Be At Least 6 Digits
                </span>
              ) : null}
              <div className="mt-4 text-center">
                <button
                  className="text-m rounded-lg bg-zinc-500 px-2 py-0.5 font-medium text-zinc-200 shadow-lg shadow-zinc-600 hover:bg-zinc-600 active:ring-2 active:ring-zinc-500 lg:px-5 lg:py-2"
                  type="submit">
                  Sign Up
                </button>
              </div>
            </form>
          )}
          <p className="p-2 text-right text-zinc-400">
            <Link to={"/login"}>Already have an account? log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

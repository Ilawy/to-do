"use client";
import { GoalIcon } from "lucide-react";
import { createPBClient } from "@/lib/pb/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { USERS_COLLECTION } from "@/const";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <main className="min-h-screen p-3 flex flex-col">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex items-center justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            id="loading"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="48" cy="32" r="4" fill="black" id="c3" />
            <circle cx="43.3137" cy="43.3137" r="4" fill="black" id="c4" />
            <circle cx="32" cy="48" r="4" fill="black" id="c5" />
            <circle cx="20.6863" cy="43.3137" r="4" fill="black" id="c6" />
            <circle cx="16" cy="32" r="4" fill="black" id="c7" />
            <circle cx="20.6863" cy="20.6863" r="4" fill="black" id="c8" />
            <circle cx="32" cy="16" r="4" fill="black" id="c1" />
            <circle cx="43.3137" cy="20.6863" r="4" fill="black" id="c2" />
          </svg>
        </div>
      )}
      <div className="card bg-base-100 w-96 shadow-xl m-auto">
        <div className="card-body">
          <h2 className="card-title">Welcome back</h2>
          <form
            id="login"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              const client = createPBClient();
              const { email, password } = Object.fromEntries(
                new FormData(e.currentTarget)
              );
              client
                .collection(USERS_COLLECTION)
                .authWithPassword(email as string, password as string)
                .catch((e) => {
                  alert(e.message);
                })
                .then(() => {
                  router.push("/");
                  console.log("done");
                })
                .finally(() => setLoading(false));
            }}
            className="flex flex-col gap-3"
          >
            <input
              type="email"
              name="email"
              className="input input-bordered"
              placeholder="Email"
              autoFocus
              required
            />
            <input
              type="password"
              name="password"
              className="input input-bordered"
              placeholder="Password"
              required
            />
          </form>
          <details>
            <summary>Demo Account</summary>
            <p>
              Email: <code>demo@example.com</code>
            </p>
            <p>
              Password: <code>pa$$word</code>
            </p>
          </details>
          <div className="flex items-center justify-evenly">
            {/* <button className="btn btn-sm btn-outline">Use Google</button> */}
          </div>
          <div className="card-actions justify-end">
            <button type="submit" form="login" className="btn btn-primary">
              Login
            </button>
            <button disabled className="btn btn-ghost">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

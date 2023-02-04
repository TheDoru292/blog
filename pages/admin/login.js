import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import Head from "next/head";

export default function AdminLogin() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  function handleSubmit(e) {
    axios
      .post(
        "http://localhost:3000/api/auth/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.code == 400) {
          setError(true);
          setErrorMessage(response.data.title);
        }
        if (response.data.success == true) {
          Router.push("/admin/dashboard");
        }
      })
      .catch((error) => {
        setError(true);
        setErrorMessage(
          "Please check console for errors. If they persist please contact us."
        );
        console.log(error);
      });
    e.preventDefault();
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Login</title>
      </Head>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-3xl mt-6 font-bold tracking-tight text-gray-900">
            Sign in to your Author account
          </h1>
        </div>
        {error == true ? (
          <p className="text-center text-red-500 border py-1 bg-red-100 rounded-md">
            {errorMessage}
          </p>
        ) : (
          <></>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                required
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password:
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            type="submit"
          >
            Submit!
          </button>
        </form>
      </div>
    </div>
  );
}

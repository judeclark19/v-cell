import { signIn } from "next-auth/react";
import React, { useState } from "react";

function LoginForm() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password
        })
      });

      const data = await res.json();

      if (data.error) {
        console.error("Login error:", data.error);
        alert("Login credentials incorrect");
      } else {
        signIn();
        window.location.href = "/play";
      }
    } catch (error) {
      // Handle any unexpected errors during the fetch request
      console.error("Login failed:", error);
      alert("Login failed. Please try again."); // Example: replace with a more user-friendly method
    }
  };

  return (
    <>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username:</label>
        <input
          type="text"
          id="login-username"
          value={loginForm.username}
          onChange={(e) =>
            setLoginForm({ ...loginForm, username: e.target.value })
          }
          required
        />

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="login-password"
            id="login-password"
            value={loginForm.password}
            onChange={(e) =>
              setLoginForm({ ...loginForm, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginForm;

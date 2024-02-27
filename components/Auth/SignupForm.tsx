import { signIn } from "next-auth/react";
import React, { useState } from "react";

function SignupForm() {
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: signUpForm.username,
          password: signUpForm.password
        })
      });

      const data = await res.json();

      if (data.error) {
        console.error("Signup error:", data.error);
      } else {
        signIn();
        window.location.href = "/play";
      }
    } catch (error) {
      // Handle any unexpected errors during the fetch request
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again."); // Example: replace with a more user-friendly method
    }
  };

  return (
    <>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="signup-username">Username:</label>
        <input
          type="text"
          id="signup-username"
          value={signUpForm.username}
          onChange={(e) =>
            setSignUpForm({ ...signUpForm, username: e.target.value })
          }
          required
        />

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="signup-password"
            id="signup-password"
            value={signUpForm.password}
            onChange={(e) =>
              setSignUpForm({ ...signUpForm, password: e.target.value })
            }
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupForm;

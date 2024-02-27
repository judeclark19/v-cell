"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthComponent() {
  const { data: session } = useSession();
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
      console.log("DATA!!!!", data);

      if (data.error) {
        // Handle any errors, such as displaying them to the user
        console.error("Signup error:", data.error);
        alert(data.error); // Example: replace with a more user-friendly method
      } else {
        // Handle successful signup, such as redirecting or clearing the form
        console.log("Signup successful:", data);
        // Example redirection after successful signup
        // window.location.href = '/login'; // Or use a router if you're in a SPA
      }
    } catch (error) {
      // Handle any unexpected errors during the fetch request
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again."); // Example: replace with a more user-friendly method
    }
  };

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.email}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <p>You are not signed in</p>
          <button onClick={() => signIn()}>Sign in</button>

          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={signUpForm.username}
              onChange={(e) =>
                setSignUpForm({ ...signUpForm, username: e.target.value })
              }
              required
            />

            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
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
      )}
    </div>
  );
}

// Form throws error Warning: Did not expect server HTML to contain a <div> in <div> as soon as the second input is added in the code. No cause nor solution found at this time

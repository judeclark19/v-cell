"use client";

import LoginForm from "@/components/Auth/LoginForm";
import SignupForm from "@/components/Auth/SignupForm";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthComponent() {
  // const router = useRouter();
  const { data: session } = useSession();

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
          <SignupForm />
          <LoginForm />
        </>
      )}
    </div>
  );
}

// Form throws error Warning: Did not expect server HTML to contain a <div> in <div> as soon as the second input is added in the code. No cause nor solution found at this time

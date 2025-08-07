"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {signOut} = useAuthActions();
  return (
    <>
      <Button onClick={()=>signOut()}>
      Log out
      </Button>
    </>
  );
}

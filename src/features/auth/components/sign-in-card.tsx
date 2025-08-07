import { useAuthActions } from "@convex-dev/auth/react"
import { FcGoogle } from "react-icons/fc"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { FaGithub } from "react-icons/fa"
import { SignInFlow } from "../types"
import { useState } from "react"
import { TriangleAlert } from "lucide-react"
interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}
export const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState('');
  const { signIn } = useAuthActions();
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const onPasswordSignIn = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPending(true);
    signIn("password", { email, password, flow: "signIn" }).catch(() => {
      setError("Invalid Email or Password")
    }).finally(() => {
      setPending(false);
    })
  }
  const onProviderSignIn = (value: "google" | "github") => {
    setPending(true);
    signIn(value).finally(() => {
      setPending(false)
    })
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Login to Continue
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5">
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => { setEmail(e.target.value) }}
            type="email"
            placeholder="Email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            placeholder="Password"
            onChange={(e) => { setPassword(e.target.value) }}
            type="password"
            required
          />
          <Button
            type="submit"
            className="w-full"
            disabled={pending}
            size={"lg"}
          >
            Continue
          </Button>
          <Separator />
          <div className="flex flex-col gap-y-2.5">
            <Button
              disabled={pending}
              variant={"outline"}
              size={"lg"}
              onClick={() => { onProviderSignIn("google") }}
              className="w-full relative"
            >
              <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
              Continue with Google
            </Button>
            <Button
              disabled={pending}
              variant={"outline"}
              size={"lg"}
              onClick={() => onProviderSignIn("github")}
              className="w-full relative"
            >
              <FaGithub className="size-5 absolute top-2.5 left-2.5" />
              Continue with Github
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Don&apos;t have an account? <span onClick={() => setState("signUp")} className="text-sky-700 hover:underline cursor-pointer">Sign up</span>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

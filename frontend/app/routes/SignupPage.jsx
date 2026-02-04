import { SignupForm } from "~/components/ui/signup-form"
export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-t from-slate-50 via-neutral-400 to-slate-500">
      <div className="w-full max-w-md rounded-lg p-8 bg-white">
        <SignupForm/>
      </div>
    </div>
  )
}


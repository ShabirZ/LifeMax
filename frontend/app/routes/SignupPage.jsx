import { SignupForm } from "~/components/ui/signup-form"
export default function SignupPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 ">
      <div className="w-full max-w-md border-1 border-slate-50 shadow-lg rounded-lg p-8">
        <SignupForm/>
      </div>
    </div>
  )
}


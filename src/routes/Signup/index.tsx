import SignupForm from '../../components/Forms/SignupForm'

export default function Signup() {
  return (
    <div className="flex justify-center sm:px-12 sm:py-16">
      <div className="flex w-full flex-col gap-5 rounded-lg px-4 py-5 sm:p-16 md:max-w-screen-sm">
        <h1 className="text-2xl font-bold text-text">Welcome to Holidaze</h1>
        <SignupForm />
      </div>
    </div>
  )
}

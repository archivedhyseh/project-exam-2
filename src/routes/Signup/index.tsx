import SignupForm from '../../components/Forms/SignupForm'

export default function Signup() {
  return (
    <div className="flex justify-center md:px-12 md:py-16">
      <div className="flex w-full flex-col gap-5 rounded-lg px-4 py-5 md:p-16 lg:max-w-screen-md">
        <h1 className="text-2xl font-bold text-text">Welcome to Holidaze</h1>
        <SignupForm />
      </div>
    </div>
  )
}

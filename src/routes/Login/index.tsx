import LoginForm from '../../components/Forms/LoginForm'

export default function Login() {
  return (
    <div className="flex justify-center sm:px-12 sm:py-16">
      <div className="flex w-full flex-col gap-5 rounded-lg px-4 py-5 sm:p-16 md:max-w-screen-sm">
        <h1 className="text-2xl font-bold text-text">Welcome back</h1>
        <LoginForm />
      </div>
    </div>
  )
}

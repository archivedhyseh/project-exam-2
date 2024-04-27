import LoginForm from '../../components/Forms/LoginForm'

export default function Login() {
  return (
    <div className="flex justify-center md:px-12 md:py-16">
      <div className="flex w-full flex-col gap-5 rounded-lg px-4 py-5 md:p-16 lg:max-w-screen-md">
        <h1 className="text-2xl font-bold text-text">Welcome back</h1>
        <LoginForm />
      </div>
    </div>
  )
}

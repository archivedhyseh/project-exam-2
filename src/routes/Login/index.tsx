import { Link } from 'react-router-dom'
import LoginForm from '../../components/Forms/LoginForm'

export default function Login() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-5 lg:py-4">
      <div className="sm:p-10 lg:p-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <h2 className="text-3xl font-bold text-text">Welcome back</h2>

          <LoginForm />

          <div>
            <span className="text-text">Don't have an account? </span>
            <Link to="/signup" className="font-semibold text-text">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

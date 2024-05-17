import { Link } from 'react-router-dom'
import SignupForm from '../../components/Forms/SignupForm'

export default function Signup() {
  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 py-5 lg:py-4">
      <div className="sm:p-10 lg:p-20">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <h2 className="text-3xl font-bold text-text">Welcome to Holidaze</h2>

          <SignupForm />

          <div>
            <span className="text-text">Have an account? </span>
            <Link to="/login" className="font-semibold text-text">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

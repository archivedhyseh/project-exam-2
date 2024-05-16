export default function Footer() {
  return (
    <footer className="mt-5 bg-background-body lg:mt-4">
      <div className="mx-auto max-w-screen-2xl px-4 py-5 lg:py-20">
        <div className="grid gap-8">
          <div className="grid max-w-screen-md gap-8 sm:grid-flow-col">
            <div className="grid gap-4">
              <div>
                <span className="text-xl font-semibold text-text">Company</span>
              </div>

              <ul>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>About</span>
                </li>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Careers</span>
                </li>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Press</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4">
              <div>
                <span className="text-xl font-semibold text-text">Terms</span>
              </div>

              <ul>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Privacy policy</span>
                </li>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Terms of service</span>
                </li>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Cookie preferences</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4">
              <div>
                <span className="text-xl font-semibold text-text">Socials</span>
              </div>

              <ul>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Facebook</span>
                </li>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Instagram</span>
                </li>
                <li className="cursor-default py-1 text-text hover:underline">
                  <span>Twitter</span>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-black-alt" />

          <div>
            <span className="text-text">
              © Holidaze, Inc. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

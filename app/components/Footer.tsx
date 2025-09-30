import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="bg-[var(--color-text-primary)] text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          <div className="flex-1 min-w-0">
            <Link href="/" className="flex items-center gap-3"> 
              <Image src="/logo.png" alt="Finzy" width={48} height={48} />
              <span className="text-2xl" style={{ fontFamily: 'var(--font-family-semi-bold)' }}>Finzy</span>
            </Link>
            <p className="mt-4 text-sm text-gray-100 max-w-md">Finzy helps you make smarter mutual fund investments — curated research, transparent fees, and a secure, easy onboarding experience.</p>
          </div>

          <div className="flex-1 flex flex-col sm:flex-row gap-8">
            <div>
              <h4 className="text-sm font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-gray-100">
                <li><Link href="/investment" className="hover:underline">Investments</Link></li>
                <li><Link href="/services" className="hover:underline">Services</Link></li>
                <li><Link href="/page" className="hover:underline">Resources</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-gray-100">
                <li><Link href="/about" className="hover:underline">About</Link></li>
                <li><Link href="/page/login" className="hover:underline">Login</Link></li>
                <li><Link href="/page/register" className="hover:underline">Register</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-100">
                <li>Email: <a href="mailto:support@finzy.com" className="underline">support@finzy.com</a></li>
                <li>Phone: <a href="tel:+911234567890" className="underline">+91 12345 67890</a></li>
                <li className="pt-2">
                  <div className="flex items-center gap-3">
                    <a href="#" aria-label="Twitter" className="hover:opacity-90">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                        <path d="M22 5.92c-.63.28-1.3.47-2 .56.72-.43 1.27-1.12 1.53-1.94-.68.4-1.44.68-2.25.84A3.49 3.49 0 0016.5 4c-1.92 0-3.48 1.58-3.48 3.53 0 .28.03.56.09.83-2.9-.15-5.48-1.6-7.2-3.8-.3.52-.47 1.12-.47 1.76 0 1.22.62 2.3 1.56 2.93-.57-.02-1.1-.17-1.57-.43v.04c0 1.71 1.2 3.14 2.8 3.46-.29.08-.6.12-.92.12-.23 0-.47-.02-.7-.06.47 1.45 1.83 2.5 3.45 2.53A7.02 7.02 0 014 18.57c.98.62 2.14.98 3.4.98 8.12 0 12.56-6.94 12.56-12.96v-.59C20.6 7.3 21.37 6.7 22 5.92z" fill="currentColor"/>
                      </svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:opacity-90">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.74-2.6 5.07 0 6 3.34 6 7.68V24h-5V15.6c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24h-5V8z" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-gray-200 flex flex-col md:flex-row md:justify-between gap-3">
          <div>© {new Date().getFullYear()} Finzy. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:underline">Privacy</Link>
            <Link href="/terms" className="hover:underline">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
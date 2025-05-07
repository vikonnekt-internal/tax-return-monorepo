import { ReactNode } from 'react'
import Logo from '../Logo'

const AuthBox = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auth-box | flex flex-col items-center text-center w-full max-w-[600px]">
      <Logo />
      <div className="p-8">
        <h6 className="auth-box__top-description">Rafræn skilríki í síma</h6>
        <h1 className="auth-box__title">Skráðu þig inn</h1>
        <h2 className="auth-box__subtitle">á mínar síður Ísland.is</h2>
      </div>
      {children}
    </div>
  )
}
export default AuthBox

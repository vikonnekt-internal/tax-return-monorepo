import AuthBottom from "apps/return-tax/src/component/ui/AuthBottom"
import AuthBox from "apps/return-tax/src/component/ui/AuthBox"
import AuthWays from "apps/return-tax/src/component/ui/AuthWays"
import LoginForm from "apps/return-tax/src/module/LoginForm"

const LoginPage = () => {
  return (
    <div className="space-y-4 w-full h-[100vh] flex flex-col justify-center items-center">
      <AuthBox>
        <LoginForm />
        <AuthWays />
      </AuthBox>
      <AuthBottom />
    </div>
  )
}

export default LoginPage

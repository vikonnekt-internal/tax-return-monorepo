import AuthBottom from "../../../component/ui/AuthBottom"
import AuthBox from "../../../component/ui/AuthBox"
import AuthWays from "../../../component/ui/AuthWays"
import LoginForm from "../../../module/LoginForm"

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

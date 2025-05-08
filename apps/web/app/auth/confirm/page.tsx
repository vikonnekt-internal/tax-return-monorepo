'use client'


import Link from 'next/link'
import AuthBox from '../../../component/ui/AuthBox'
import ResultBox from '../../../component/ui/ResultBox'
import AuthBottom from '../../../component/ui/AuthBottom'

const LoginPage = () => {
  return (
    <div className="space-y-4 w-full h-[100vh] flex flex-col justify-center items-center">
      <AuthBox>
        <ResultBox label={'Öryggistalan þín er:'} result="6512" />
        <div className="pt-6 max-w-[500px] text-center justify-start text-slate-900 text-2xl font-light leading-loose">
          Staðfestu auðkenninguna ef öryggistalan er sú sama og birtist á
          símanum þínum.
          <br />
          Athugið að öryggistalan er ekki PIN-númerið á skilríkjunum þínum.
        </div>
        <Link
          href={''}
          className="pb-12 justify-end text-blue-600 text-2xl font-semibold leading-loose"
        >
          {' '}
          Til baka
        </Link>
      </AuthBox>
      <AuthBottom />
    </div>
  )
}

export default LoginPage

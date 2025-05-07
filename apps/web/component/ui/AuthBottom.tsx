import Link from 'next/link'

const AuthBottom = () => {
  return (
    <div className="w-full flex justify-between max-w-[600px] px-2">
      <Link
        href="/en"
        className="!text-blue-600 text-base font-semibold leading-tight"
      >
        English
      </Link>
      <Link
        href="/"
        className="!text-blue-600 text-base font-semibold leading-tight"
      >
        Þarftu aðstoð?
      </Link>
    </div>
  )
}

export default AuthBottom

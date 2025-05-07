import Link from 'next/link'

const AuthWays = () => {
  return (
    <div className="auth-ways">
      <h2 className="auth-ways__title">Fleiri leiðir</h2>
      <Link className="auth-ways__link" href={''}>
        Auðkenni-appið
      </Link>
      <Link className="auth-ways__link" href={''}>
        Skilríki á korti
      </Link>
    </div>
  )
}

export default AuthWays

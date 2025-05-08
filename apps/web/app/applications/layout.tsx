import { ReactNode } from 'react'
import MainLayout from '../../component/layout/MainLayout'

const Layout = ({ children }: { children: ReactNode }) => {
  return <MainLayout>{children}</MainLayout>
}
export default Layout

import { auth } from '@/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import TitleBreadcrumb from '@/components/ui/title-breadcrumb'

export default async function DashboardPage() {
  const session = await auth()
  return (
    <>
      <TitleBreadcrumb title='Dashboard' />
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>Halaman utama</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{session?.user?.name}</div>
        </CardContent>
      </Card>
    </>
  )
}

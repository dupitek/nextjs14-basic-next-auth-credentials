import { getUserById } from "@/actions/users"
import { auth } from "@/auth"
import ProfileForm from "@/components/admin/profile/profile-form"
import ProfileUser from "@/components/admin/profile/profile-user"
import TitleBreadcrumb from "@/components/ui/title-breadcrumb"

const ProfilePage = async () => {
  const session = await auth()
  const user = await getUserById(session?.user.id)
  return (
    <>
      <TitleBreadcrumb title="Profil" />
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <ProfileUser />
        <ProfileForm user={user} />
      </div>
    </>
  )
}

export default ProfilePage
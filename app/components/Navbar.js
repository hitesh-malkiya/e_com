import { authOptions } from "../api/auth/[...nextauth]/route"
import NavbarUi from "./NavbarUi"
import { getServerSession } from "next-auth"

async function Navbar() {

  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch {
    session = null
  }


  if (!session || !session?.user) {
    return <NavbarUi admin={false} user={null} session={null} logoSrc={'/image/logo.png'} />
  }

  const admin = session?.user.admin?.isAdmin || false
  const user = session?.user.admin?.userName || null

  const logoSrc = session?.user?.image || '/image/logo.png'

  return (
    <NavbarUi admin={admin} user={user} session={session?.user?.userName} logoSrc={logoSrc} />
  )
}


export default Navbar
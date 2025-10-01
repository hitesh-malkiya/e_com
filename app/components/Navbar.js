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


 const admin = session?.user.admin?.isAdmin
 const user = session?.user.admin?.userName
  
  const logoSrc = session?.user?.image || '/image/logo.png'

  return (
    <NavbarUi admin={admin} user={user} session={session?.user?.userName} logoSrc={logoSrc} />
  )
}

export default Navbar
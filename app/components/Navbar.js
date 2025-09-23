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

 
  
  const logoSrc = session?.user?.image || '/image/logo.png'

  return (
    <NavbarUi session={session?.user?.userName} logoSrc={logoSrc} />
  )
}

export default Navbar
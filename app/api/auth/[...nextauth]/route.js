import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import mongoose from 'mongoose'
import User from '@/modules/user'
import bcrypt from 'bcryptjs'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userName: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) return null
        try {
          await mongoose.connect(process.env.MONGODB_URI)
          const dbUser = await User.findOne({ userName: credentials.userName }).select('+password')
          if (!dbUser) return null
          const isPasswordValid = await bcrypt.compare(credentials.password, dbUser.password)
          if (!isPasswordValid) return null

          return {
            id: dbUser._id.toString(),
            email: dbUser.email || null,
            name: dbUser.name || dbUser.userName,
            userName: dbUser.userName || null,
            image: dbUser.image || null,
            isAdmin: !!dbUser.isAdmin,
            firstLogin: !!dbUser.firstLogin,
          }
        } catch (e) {
          console.log(e);
          
          return "not respos"
        }
      }
    }),
  ],

  // 🔹 Enrich tokens and sessions with DB fields
  callbacks: {
    async jwt({ token, account, profile, user, trigger, session }) {
      // Ensure DB connection
      try { await mongoose.connect(process.env.MONGODB_URI) } catch {}

      // If user just signed in (Google or Credentials), seed token from user
      if (user) {
        token.userId = user.id
        token.userName = user.userName || null
        token.isAdmin = !!user.isAdmin
        token.firstLogin = !!user.firstLogin
        token.name = user.name || token.name
        token.picture = user.image || token.picture
        token.email = user.email || token.email
      }

      // For existing sessions (mainly OAuth), load from DB by email to keep fresh
      if (!user && token?.email) {
        const dbUser = await User.findOne({ email: token.email }).lean()
        if (dbUser) {
          token.userId = dbUser._id.toString()
          token.userName = dbUser.userName || null
          token.isAdmin = !!dbUser.isAdmin
          token.firstLogin = !!dbUser.firstLogin
          token.name = dbUser.name || token.name
          token.picture = dbUser.image || token.picture
        }
      }

      // If session was updated client-side (rare path)
      if (trigger === 'update' && session?.user) {
        token.name = session.user.name ?? token.name
        token.picture = session.user.image ?? token.picture
      }
      return token
    },

    async session({ session, token }) {
      // Copy fields from token into session.user
      if (session?.user) {
        session.user.id = token.userId
        session.user.userName = token.userName || null
        session.user.isAdmin = token.isAdmin || false
        session.user.firstLogin = token.firstLogin || false
        // Keep these in sync as well
        session.user.name = token.name || session.user.name
        session.user.image = token.picture || session.user.image
        session.user.email = token.email || session.user.email
      }
      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
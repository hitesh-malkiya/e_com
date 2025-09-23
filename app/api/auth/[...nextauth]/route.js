import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'


import mongoose from 'mongoose'
import User from '@/modules/user'
import bcrypt from 'bcryptjs'
import Admin from '@/modules/admin'

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
        admin: { label: 'admin', type: 'object' }
      },
      async authorize(credentials) {
        if (!credentials?.userName || !credentials?.password) return null
        try {
          await mongoose.connect(process.env.MONGODB_URI)
          const dbUser = await User.findOne({ userName: credentials.userName }).select('+password')
          if (!dbUser) return null
          const isPasswordValid = await bcrypt.compare(credentials.password, dbUser.password)
          if (!isPasswordValid) return null
          // Check if user is an admin in Admin collection
          const admin = await Admin.findOne({ userName: credentials.userName })
          
          // Set isAdmin based on both User.isAdmin and Admin collection
          const isAdminUser = !!dbUser.isAdmin || !!admin
          
          return {
            id: dbUser._id.toString(),
            email: dbUser.email || null,
            name: dbUser.name || dbUser.userName,
            userName: dbUser.userName || null,
            image: dbUser.image || null,
            isAdmin: isAdminUser,
            firstLogin: !!dbUser.firstLogin,
            admin: admin || null
          }
        } catch (e) {
          console.error('Auth error:', e)
          return null
        }
      }
    }),
  ],

  // 🔹 Enrich tokens and sessions with DB fields
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Ensure DB connection
      try { await mongoose.connect(process.env.MONGODB_URI) } catch { }

      // If user just signed in (Google or Credentials), seed token from user
      if (user) {
        token.userId = user.id
        token.userName = user.userName || null
        token.isAdmin = !!user.isAdmin
        token.firstLogin = !!user.firstLogin
        token.name = user.name || token.name
        token.picture = user.image || token.picture
        token.email = user.email || token.email
        token.admin = user.admin || token.admin || null
      }

      // For existing sessions (mainly OAuth), load from DB by email to keep fresh
      if (!user && token?.email) {
        const dbUser = await User.findOne({ email: token.email }).lean()
        if (dbUser) {
          // Also check Admin collection for this user
          const admin = await Admin.findOne({ 
            $or: [
              { email: token.email },
              { userName: dbUser.userName }
            ]
          }).lean()
          
          token.userId = dbUser._id.toString()
          token.userName = dbUser.userName || null
          token.isAdmin = !!dbUser.isAdmin || !!admin
          token.firstLogin = !!dbUser.firstLogin
          token.name = dbUser.name || token.name
          token.picture = dbUser.image || token.picture
          token.admin = admin || null
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
        session.user.admin = token.admin || null
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
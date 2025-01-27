import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Replace with your actual auth logic
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", email: credentials.email }
        }
        return null
      }
    })
  ],
  pages: {
    signIn: '/'
  }
})

export { handler as GET, handler as POST }

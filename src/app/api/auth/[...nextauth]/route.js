import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import axios from "../../../../../axios/getApi";
import connectMondoDB from "../../../../../utils/mongoDB";
import Users from "../../../../../models/users";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    services: "/services",
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
    async signIn({ user, account }) {
      if (account.provider === "google") {
        const { name, email } = user;
        const userData = {
          name,
          email,
        };

        try {
          await connectMondoDB();
          const userExists = await Users.findOne({ email });

          if (!userExists) {
            const res = await axios.post("user", userData);

            if (res.status === 201) {
              return user;
            }
          }
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

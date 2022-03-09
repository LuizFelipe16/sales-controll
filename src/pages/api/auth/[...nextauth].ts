import NextAuth from "next-auth";
import Provider from "next-auth/providers";

interface RedirectProps {
  url: string;
  base_url: string;
}

export default NextAuth({
  providers: [
    Provider.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      // scope: 'read:user'
    }),

    // Provider.Discord({
    //   clientId: process.env.DISCORD_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_CLIENT_SECRET
    // }),

    // Provider.Facebook({
    //   clientId: process.env.FACEBOOK_CLIENT_ID,
    //   clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    // }),

    // Provider.Google({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),

    // Provider.LinkedIn({
    //   clientId: process.env.LINKEDIN_CLIENT_ID,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET
    // }),
  ],

  // jwt: {
  //   signingKey: process.env.JWT_SIGNING_PRIVATE_KEY
  // },

  callbacks: {
    redirect({ url, baseUrl }: any) {
      return `http://localhost:3000/Home`
    }
  }
});
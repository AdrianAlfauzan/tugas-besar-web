import { signIn, signInWithGoogle } from "@/lib/firebase/service";
// import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };
        const user: any = await signIn({ email });
        if (user) {
          // const passwordConfirm = await compare(password, user.password);
          const passwordConfirm = password === user.password;
          if (passwordConfirm) {
            return user;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "credentials") {
        const userTokenProperties = ["fullname", "email", "password", "nim", "jurusan", "role"];
        userTokenProperties.forEach((property) => {
          if (user[property]) {
            token[property] = user[property];
          }
        });
      }
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: "google",
          nim: "",
          jurusan: "",
          role: "",
          isGoogleLogin: true,
        };
        await signInWithGoogle(data, (result: { status: boolean; message: string; data: any }) => {
          if (result.status) {
            token.email = data.email;
            token.fullname = data.fullname;
            token.image = data.image;
            token.type = data.type;
            token.nim = data.nim;
            token.jurusan = data.jurusan;
            token.role = data.role;
            token.isGoogleLogin = data.isGoogleLogin;
          }
        });
      }
      return token;
    },
    async session({ session, token }: any) {
      const userSessionProperties = ["email", "fullname", "nim", "jurusan", "image", "role", "isGoogleLogin"];
      userSessionProperties.forEach((property) => {
        if (property in token) {
          session.user[property] = token[property] || "Tidak ada Data";
        }
      });

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
export { authOptions };

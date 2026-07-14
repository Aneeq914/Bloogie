import { LoginUser } from "@/components";

export default async function Login() {
  await new Promise((resolve=>setTimeout(resolve,1000)))
  return (
    <LoginUser/>
  );
}

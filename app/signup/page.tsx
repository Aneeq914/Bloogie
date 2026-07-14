import { CreateUser } from "@/components";

export default async function Signup() {
  await new Promise((resolve)=>setTimeout(resolve,1500))
  return <CreateUser />;
}

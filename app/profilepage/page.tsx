import { EditProfile } from "@/components";

export default async function ProfilePage() {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return (
    <div>
      <EditProfile />
    </div>
  );
}

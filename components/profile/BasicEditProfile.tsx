"use client";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "@/schemas/profileSchema";
import { useSession } from "../auth/SessionProvider";
import { updateUser } from "@/lib/actions/Auth.action";
import { useState } from "react";
import { toast } from "sonner";

type ProfileFormData = z.infer<typeof profileSchema>;

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500";

const BasicProfile = () => {
  const user = useSession();
  const [preview, setPreview] = useState(user?.image || "");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fname: user?.fname,
      lname: user?.lname,
      username: user?.username,
      image: "",
      bio: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    const { fname, lname, username, bio, image } = data;
    const result = await updateUser({
      fname,
      lname,
      username,
      image,
      bio,
    });

    if (result.success) toast.success(result.message);
    else toast.error(result.message);
  };

  return (
    <main className="flex-1 overflow-y-auto bg-gray-50 px-4 py-10 sm:px-6 lg:px-8 scrollbar-hidden">
      <div className="mx-auto max-w-2xl p-8 card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mb-1 text-2xl font-bold text-gray-900">
            Basic Information
          </h2>
          <p className="mb-8 border-b border-gray-200 pb-6 text-sm text-gray-500">
            Update your personal details and photo.
          </p>

          <div className="mb-8 flex flex-col items-center gap-3">
            <label
              htmlFor="profile"
              className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100 text-3xl text-gray-400 shadow-sm transition hover:border-brand-500"
            >
              <Controller
                name="image"
                control={control}
                render={({ field: { onChange } }) => (
                  <div>
                    <Image
                      src={preview || `/Profile.png`}
                      alt="profile"
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-[11px] font-semibold uppercase tracking-wide text-white opacity-0 transition group-hover:opacity-100">
                      Change
                    </span>
                    <input
                      id="profile"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) {
                          onChange("");
                          return;
                        }
                        const objectUrl = URL.createObjectURL(file);
                        setPreview(objectUrl);

                        const base64 = await fileToBase64(file);
                        onChange(base64);
                      }}
                    />
                  </div>
                )}
              />
            </label>
            <span className="text-xs text-gray-400">JPG or PNG, up to 2MB</span>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className={`${labelClass}`}>First Name</label>
              <Controller
                name="fname"
                control={control}
                render={({ field }) => (
                  <input type="text" className="input" {...field} />
                )}
              />
              {errors.fname && (
                <p className="error">{errors.fname.message}</p>
              )}
            </div>
            <div>
              <label className={`${labelClass}`}>Last Name</label>
              <Controller
                name="lname"
                control={control}
                render={({ field }) => (
                  <input type="text" className="input" {...field} />
                )}
              />
              {errors.lname && (
                <p className="error">{errors.lname.message}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label className={`${labelClass}`}>Username</label>
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <input type="text" className="input" {...field} />
              )}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className={`${labelClass}`}>
              Bio
            </label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <textarea
                  id="bio"
                  rows={5}
                  placeholder={user?.bio || "Enter bio"}
                  className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                  {...field}
                />
              )}
            />
            {errors.bio && (
              <p className="error">{errors.bio.message}</p>
            )}
          </div>

          <div className="mt-8 flex justify-end border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="btn-primary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default BasicProfile;

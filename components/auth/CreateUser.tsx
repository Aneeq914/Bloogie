"use client";

import { useForm, Controller } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "@/schemas/signupSchema";
import { registerUser } from "@/lib/actions/Auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SignUpFormData = z.infer<typeof signupSchema>;

const CreateUser = () => {
  const params = useSearchParams();
  const userType = params.get("userType") as "author" | "user";

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fname: "",
      lname: "",
      username: "",
      email: "",
      password: "",
      userType,
    },
  });

  const router = useRouter();

  const onSubmit = async (data: SignUpFormData) => {
    const { fname, lname, username, email, password, userType } = data;
    const res = await registerUser({
      fname,
      lname,
      username,
      email,
      password,
      userType,
    });

    if (!res.success) {
      if (res.field) {
        setError(res.field === "username" ? "username" : "email", {
          message: res.message,
        });
      } else {
        toast.error(res.message);
      }
      return;
    }

    toast.success(res.message);
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-lg sm:p-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign up to start creating and managing your blogs.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="label">
                First Name
              </label>
              <Controller
                name="fname"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    id="fname"
                    type="text"
                    placeholder="Enter your first name"
                    className="input"
                    {...field}
                  />
                )}
              />
              {errors.fname && (
                <p className="error">{errors.fname.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="label">
                Last Name
              </label>
              <Controller
                name="lname"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    id="lname"
                    type="text"
                    placeholder="Enter your last name"
                    className="input"
                    {...field}
                  />
                )}
              />
              {errors.lname && (
                <p className="error">{errors.lname.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="input"
                  {...field}
                />
              )}
            />
            {errors.username && (
              <p className="error">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="label">
              Email Address
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  id="email"
                  type="text"
                  placeholder="someone@example.com"
                  className="input"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className="error">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  className="input"
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className="mt-2 w-full btn-primary">
            Register
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center">
          <a
            href="/login"
            className="block text-sm font-medium text-brand-600 transition hover:text-brand-700"
          >
            Already have an account? Login
          </a>

          <a
            href="/"
            className="block text-sm font-medium text-gray-500 transition hover:text-gray-700"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;

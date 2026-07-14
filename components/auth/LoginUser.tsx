"use client";
import { loginUser } from "@/lib/actions/Auth.action";
import { LoginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { inputClass, labelClass, errorClass, primaryButton } from "@/lib/ui";

type LoginFormData = z.infer<typeof LoginSchema>;

const LoginUser = () => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await loginUser({
        email: data.email,
        password: data.password,
      });
      if (!res.success) {
        setError("root", { message: res.message });
        return;
      }
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label htmlFor="email" className={labelClass}>
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
                  className={inputClass}
                  {...field}
                />
              )}
            />
            {errors.email && (
              <p className={errorClass}>{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
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
                  className={inputClass}
                  {...field}
                />
              )}
            />
            {errors.password && (
              <p className={errorClass}>{errors.password.message}</p>
            )}
            {errors.root && <p className={errorClass}>{errors.root.message}</p>}
          </div>

          <button type="submit" className={`w-full ${primaryButton}`}>
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm font-medium text-gray-500 transition hover:text-gray-700"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;

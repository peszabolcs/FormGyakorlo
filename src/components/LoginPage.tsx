import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import {
  validationSchemas,
  mockLoginApi,
  type LoginFormValues,
} from "../formConfig";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { createSession } from "../utils/sessionManager";
import { useRouter } from "@tanstack/react-router";

export const LoginPage = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: mockLoginApi,
    onSuccess: (data) => {
      createSession(data.token, data.user);
      router.navigate({ to: "/step1" });
    },
    onError: (error: Error) => {
      alert(error.message);
    },
  });

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(validationSchemas.login),
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Bejelentkezés
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">
                Felhasználónév
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Felhasználónév"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.username}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Jelszó
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Jelszó"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.password}
                </div>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loginMutation.isPending ? "Bejelentkezés..." : "Bejelentkezés"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

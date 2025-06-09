import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginSchema } from "../../Schema/LoginSchema";
import LoginForm from "../../components/LoginForm/LoginForm";
import { apiPaths } from "../../constants/apiPath";
import { TOKEN } from "../../constants/global.constant";
import { axiosInstance } from "../../config/axios.config";
import { useMutation } from "@tanstack/react-query";

export type FormFields = z.infer<typeof loginSchema>;

const loginApi = async (data: { username: string; password: string }) => {
  const response = await axiosInstance.post(apiPaths.login, data);
  return response.data;
};
export default function Login() {
  const navigate = useNavigate();

  const { mutate, error, isPending } = useMutation({
    mutationFn: loginApi,
    onSuccess: (response) => {
      console.log(response);
      localStorage.setItem(TOKEN, response.data.accessToken);
      navigate("/");
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      mutate(data);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  const handleToggle = () => {
    navigate("/signup");
  };
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#3F5EFB]">
      <img
        src="/Colorful Abstract Online Shop Free Logo.png"
        alt="Logo"
        className="h-60 mb-2"
      />
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isLoading={isPending}
        isSubmitting={isSubmitting}
        onToggleSignup={handleToggle}
        errorMessage={error?.message}
      />
    </div>
  );
}

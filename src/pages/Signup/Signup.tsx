import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "../../Schema/SignupSchema";
import { useNavigate } from "react-router-dom";
import type { SignupApiPayload, SignupInput } from "../SignupTypes/SignupTypes";
import { useForm, type SubmitHandler } from "react-hook-form";
import SignupForm from "../../components/SIgnupForm/SignupForm";
import { apiPaths } from "../../constants/apiPath";
import { TOKEN } from "../../constants/global.constant";
import { axiosInstance } from "../../config/axios.config";
import { useMutation } from "@tanstack/react-query";

const signupApi = async (data: SignupApiPayload) => {
  const response = await axiosInstance.post(apiPaths.signup, data);
  return response.data;
};
interface SignupResponse {
  accessToken: string;
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: signupApi,
    onSuccess: (response: SignupResponse) => {
      localStorage.setItem(TOKEN, response.accessToken);
      navigate("/login");
    },
    onError: (error: Error) => {
      console.error("Signup failed:", error);
    },
  });

  const onSubmit: SubmitHandler<SignupInput> = async (data) => {
    const apiData: SignupApiPayload = {
      username: data.username,
      password: data.password,
      displayName: data.callName,
      mobileNumber: Number(data.phoneNumber),
      email: data.email,
    };

    await mutation.mutateAsync(apiData);
  };

  const handleToggle = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-[#3F5EFB]">
      <img
        src="/Colorful Abstract Online Shop Free Logo.png"
        alt="Logo"
        className="h-60 mb-1"
      />
      <SignupForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={mutation.isPending}
        isSubmitting={isSubmitting}
        onToggleSignup={handleToggle}
        errorMessage={mutation.error?.message}
      />
    </div>
  );
}

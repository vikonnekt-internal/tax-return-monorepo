"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../component/Button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import IDInput from "../component/core/IDInput";

const loginSchema = z.object({
  userId: z.string().regex(/^\d{6}$/, "ID must be exactly 6 digits"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    console.log("Form submitted with ID:", data.userId);
    alert(`Login successful with ID: ${data.userId}`);
    reset();
  };

  return (
    <form
      className="w-9/12 space-y-4 p-8 flex flex-col items-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <IDInput
        {...register("userId")}
        label="Símanúmer"
        placeholder="000 000"
      />
      {errors.userId && <p>{errors.userId.message}</p>}

      <Button type="submit">Auðkenna</Button>
    </form>
  );
};

export default LoginForm;

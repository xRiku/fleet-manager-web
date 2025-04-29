"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { useState } from "react";
import { Eye, EyeSlash, Warning } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { logIn } from "@/actions/actions";
import { useRouter } from "next/navigation";

const requestLoginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string(),
});

type RequestLoginSchema = z.infer<typeof requestLoginSchema>;

export default function LoginForm() {
  const [isView, setIsView] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<RequestLoginSchema>({
    resolver: zodResolver(requestLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RequestLoginSchema) => {
    try {
      await logIn(data);
      router.refresh();
    } catch (error) {
      // if (error.message) {
      if (error.message === "Invalid email or password") {
        setErrorMessage("Email ou senha inválidos");
        return;
      }
      setErrorMessage("Erro ao fazer login");
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-4 w-3/4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isView ? "text" : "password"}
                    placeholder="Senha"
                    {...field}
                  />
                  {isView ? (
                    <Eye
                      className="absolute right-4 top-[10px] z-10 cursor-pointer text-gray-500"
                      onClick={() => {
                        setIsView(!isView);
                      }}
                    />
                  ) : (
                    <EyeSlash
                      className="absolute right-4 top-[10px] z-10 cursor-pointer text-gray-500"
                      onClick={() => setIsView(!isView)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <Button type="submit" className="my-3">
            Entrar
          </Button>
          {errorMessage && (
            <p className="flex items-center gap-2 text-sm font-medium text-red-500 dark:text-red-400">
              <Warning /> {errorMessage}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}

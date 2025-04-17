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
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { Button } from "./ui/button";

const requestLoginScheme = z
  .object({
    email: z.string().email({ message: "Email inválido" }),
    password: z.string(),
  })

type RequestLoginScheme = z.infer<typeof requestLoginScheme>;


export default function LoginForm() {
  const [isView, setIsView] = useState(false);

  const form = useForm<RequestLoginScheme>({
    resolver: zodResolver(requestLoginScheme),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSubmit = async (data: RequestLoginScheme) => {
  //     try {
  //       await loginRequest(data);
  //       toggleIsRequestVehicleModalOpened();
  //       form.reset();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

      
  return (
    <section className="px-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => console.log(data))}
          className="flex flex-col gap-4"
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
                          setIsView(!isView), console.log(isView)
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
          <Button type="submit" className="my-3">Solicitar</Button>
        </form>
      </Form>
    </section>
  );
}
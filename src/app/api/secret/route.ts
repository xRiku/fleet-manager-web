import { auth } from "@/lib/auth";
import { isValidCPF } from "@/lib/utils";
import { z } from "zod";

const userSchema = z.object({
  name: z.string().trim().min(2, {
    message: "Nome deve ser maior que 2 caracteres",
  }),
  documentNumber: z
    .string()
    .refine((val) => val.replace(/\D/g, "").length === 11, {
      message: "CPF deve conter 11 dígitos",
    })
    .refine((val) => isValidCPF(val), {
      message: "CPF inválido",
    }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .refine((val) => val.trim() !== "", {
      message: "Email não pode ser vazio",
    }),
  password: z
    .string()
    .min(6, { message: "Senha deve conter pelo menos 6 caracteres" })
    .refine((val) => val.trim() !== "", {
      message: "Senha não pode ser vazia",
    }),
  role: z.string().refine((role) => role !== "", {
    message: "Escolha um cargo",
  }),
});

export async function POST(
  request: Request,
) {
  const body = await request.json();
  const parsedData = userSchema.safeParse(body);

  if (!parsedData.success) {
    return new Response(
      JSON.stringify({
        error: "Validation failed",
        details: parsedData.error.format(),
      }),
      { status: 400 }
    );
  }
  const { name, documentNumber, role, email, password } = parsedData.data;

  try {
    console.log({name, documentNumber, role, email, password});
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        documentNumber,
        role
      }
    });
    return new Response("User created successfully", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("INTERNAL SERVER ERROR", {
      status: 500,
    });
  }
}

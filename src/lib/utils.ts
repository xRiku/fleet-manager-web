import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(input: string) {
  return input[0].toUpperCase() + input.slice(1).toLowerCase();
}

export function isValidCPF(cpf: string) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i);
  let check1 = (sum * 10) % 11;
  if (check1 === 10) check1 = 0;
  if (check1 !== +cpf[9]) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i);
  let check2 = (sum * 10) % 11;
  if (check2 === 10) check2 = 0;
  return check2 === +cpf[10];
}

export function formatCPF(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  return digits
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export const mapVariant = (status: string) => {
  switch (status) {
    case "approved":
      return "success";
    case "rejected":
      return "destructive";
    default:
      return "inAnalysis";
  }
};

export const translateProgress = (progress?: string) => {
  if (progress) {
    switch (progress) {
      case "inProgress":
        return "Em trânsito";
      default:
        return "Finalizado";
    }
  }
};

export const translateStatus = (status: string) => {
  switch (status) {
    case "approved":
      return "Aprovado";
    case "rejected":
      return "Recusado";
    case "inAnalysis":
      return "Em análise";
  }
};

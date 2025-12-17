import { useForm } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";

interface UseFormWithSchemaProps<T> {
  schema: ZodSchema<T>;
  defaultValues?: Partial<T>;
}

export function useFormWithSchema<T extends Record<string, any>>({
  schema,
  defaultValues,
}: UseFormWithSchemaProps<T>): UseFormReturn<T> {
  return useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onChange",
  });
}
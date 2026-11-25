import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard shadcn/ui class combiner
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

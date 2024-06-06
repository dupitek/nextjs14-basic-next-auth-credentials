import { TriangleAlert } from "lucide-react"

interface FormErrorProps {
  message?: string;
};

export const FormError = ({
  message,
}: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center p-3 text-sm rounded-md bg-destructive/15 gap-x-2 text-destructive">
      <TriangleAlert className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

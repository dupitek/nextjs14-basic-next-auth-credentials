import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
  message?: string;
};

export const FormSuccess = ({
  message,
}: FormSuccessProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center p-3 text-sm rounded-md bg-emerald-500/15 gap-x-2 text-emerald-500">
      <CheckCircle className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
};

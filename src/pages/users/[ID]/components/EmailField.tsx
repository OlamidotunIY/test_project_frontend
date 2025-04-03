import { Label } from "@/components/ui/label";

interface props {
  email: string;
}

export const EmailField = ({ email }: props) => {
  return (
    <div className="grid gap-2 bg-sky-100 rounded-md p-3">
      <div className="flex w-full justify-between">
        <Label htmlFor="email">Email</Label>
      </div>
      <div className="bg-slate-50 p-2 rounded-lg">
        {email ? (
          <span className="text-sm">{email}</span>
        ) : (
          <span className="italic text-sm text-muted-foreground">
            No bio available
          </span>
        )}
      </div>
    </div>
  );
};

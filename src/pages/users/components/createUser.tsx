import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@/hooks/customUseMutationHook";
import { toast } from "sonner";
import { createUserResponse } from "@/types/user";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface props {
  refetch?: () => {};
}

const Schema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  name: Yup.string().min(3, "Name is too short"),
});

const initialValues = {
  email: "",
  name: "",
};

const CreateUser = ({ refetch }: props) => {
  const [open, setOpen] = useState(false);
  const { mutate, isLoading, error } = useMutation<createUserResponse, any>(
    "/user/create",
    "post",
    {
      refetchQuery: refetch,
      onSuccess: (data) => {
        console.log("data", data.user);
        setOpen(false);
      },
      onError: (error: any) => {
        toast.error(error.response.data.message as string);
      },
    }
  );

  // useEffect(() => {
  //   toast.error(error?.message);
  // }, [error]);

  const formik = useFormik({
    initialValues,
    validationSchema: Schema,
    onSubmit: async (values) => {
      console.log(values);
      await mutate({
        variables: {
          email: values.email,
          name: values.name,
        },
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Create User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
          <DialogDescription>
            Please fill in the form below to create a new user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} noValidate>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...formik.getFieldProps("email")}
                placeholder="m@example.com"
              />
              {formik.errors.email && (
                <Label className="text-red-600 text-xs">
                  {formik.errors.email}
                </Label>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Name</Label>
              <Input
                {...formik.getFieldProps("name")}
                placeholder="Jame lee."
                autoComplete="off"
              />
              {formik.errors.name && (
                <Label className="text-red-600 text-xs">
                  {formik.errors.name}
                </Label>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              Create User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateUser };

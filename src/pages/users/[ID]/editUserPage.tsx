import { useQuery } from "@/hooks/customUseQueryHook";
import { getUserResponse, updateUserResponse } from "@/types/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useParams } from "react-router";
import { useFormik } from "formik";
import { toast } from "sonner";
import { useMutation } from "@/hooks/customUseMutationHook";
import { EmailField } from "./components/EmailField";
import { NameField } from "./components/NameField";
import { BioField } from "./components/BioField";

const EditUserPage = () => {
  const params = useParams();
  const id = params["id"];

  const {
    data,
    error,
    isLoading: getUserLoading,
    refetch,
  } = useQuery<getUserResponse>("user", `/users/${id}`);

  const initialValues = {
    name: data?.user.name || "",
    bio: data?.user.bio || "",
  };

  const { mutate, isLoading: updateUserLoading } = useMutation<
    updateUserResponse,
    any
  >(`/users/${id}`, "put", {
    refetchQuery: refetch,
    onSuccess: (data) => {
      console.log("data", data.user);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message as string);
    },
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      await mutate({
        variables: {
          name: values.name,
          bio: values.bio,
        },
      });
    },
  });
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Edit User</CardTitle>
              <CardDescription>
                Please update the user information using the form below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-6">
                  <EmailField email={data?.user.email as string} />
                  <NameField
                    {...formik.getFieldProps("name")}
                    updateUserLoading={updateUserLoading}
                    data={data?.user.name as string}
                  />
                  <BioField
                    bio={data?.user.bio as string}
                    {...formik.getFieldProps("bio")}
                    className="resize-none outline-none"
                    updateUserLoading={updateUserLoading}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export { EditUserPage };

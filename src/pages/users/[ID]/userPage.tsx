import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@/hooks/customUseQueryHook";
import { getUserResponse } from "@/types/user";
import React from "react";
import { useNavigate, useParams } from "react-router";
import UserLoadingSkeleton from "./components/userLoadingSkeleton";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const UserPage = () => {
  const params = useParams();
  const id = params["id"];
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery<getUserResponse>(
    "user",
    `/users/${id}`
  );

  if (isLoading) {
    return <UserLoadingSkeleton />;
  }

  return (
    <div className="lg:p-16 md:p-10 p-5 h-screen">
      <div className="w-full h-full flex flex-col space-y-10">
        <div className="w-full bg-slate-300 h-1/2 rounded relative">
          <div className="absolute -bottom-1/12 left-5">
            <Avatar className="h-20 w-20 ">
              <AvatarImage
                src={data?.user?.profilePicture}
                alt={data?.user?.name}
              />
              <AvatarFallback className="uppercase text-3xl">
                {data?.user?.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <Button
            className="absolute w-8 h-8 right-5 top-5 flex items-center justify-center rounded-full"
            onClick={() => {
              navigate(`/users/${id}/edit`);
            }}
          >
            <Pencil size={16} />
          </Button>
        </div>
        <div>
          <div className="flex flex-col">
            <span className="text-2xl capitalize">{data?.user?.name}</span>
            <span className="text-lg">{data?.user?.email}</span>
          </div>
          <div className="border border-slate-300 mt-5 rounded-lg min-h-10 flex p-3 items-center">
            {data?.user.bio ? (
              <span>{data.user.bio}</span>
            ) : (
              <span className="text-muted-foreground">
                No bio available.....
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { UserPage };

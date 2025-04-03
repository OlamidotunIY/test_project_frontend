import React from "react";
import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

const UsersPage = () => {
  return (
    <div className="lg:p-16 md:p-10 p-5">
      <DataTable columns={columns} />
    </div>
  );
};

export { UsersPage };

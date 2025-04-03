"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@/hooks/customUseQueryHook";
import { deleteUserResponse, getUsersResponse, user } from "@/types/user";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { CreateUser } from "./createUser";
import { useMutation } from "@/hooks/customUseMutationHook";
import { toast } from "sonner";
import { useNavigate } from "react-router";

interface DataTableProps<TValue> {
  columns: ColumnDef<user, TValue>[];
}

export function DataTable<TValue>({ columns }: DataTableProps<TValue>) {
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // You can make this dynamic if needed
  const [search, setSearch] = useState("");

  const { data, isLoading, refetch } = useQuery<getUsersResponse>(
    "users",
    "/users",
    {
      enabled: true,
      params: {
        page,
        limit,
        search,
      },
    }
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize] = React.useState(10); // You can make this dynamic if needed
  const navigate = useNavigate();

  const { mutate, isLoading: deleteUserLoading } = useMutation<
    deleteUserResponse,
    any
  >(`/users/delete`, "post", {
    refetchQuery: refetch,
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data.message as string);
    },
  });

  const table = useReactTable<user>({
    data: (data?.users as user[]) ?? [],
    columns,
    manualPagination: true,
    manualFiltering: true, // Backend handles filtering
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex: page - 1, // Page is 1-based, but `useReactTable` expects it to be 0-based
        pageSize: limit,
      },
    },
    pageCount: data?.totalPages, // Pass the total page count to help with pagination
  });

  return (
    <div>
      <div className="flex items-center py-4 justify-between w-full">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div>
          {table.getFilteredSelectedRowModel().rows.length ? (
            <div className="gap-5">
              {table.getFilteredSelectedRowModel().rows.length < 2 && (
                <Button
                  variant={"ghost"}
                  className=""
                  onClick={() => {
                    navigate(
                      `/users/${
                        table.getFilteredSelectedRowModel().rows[0].original.id
                      }/edit`
                    );
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                variant={"destructive"}
                className="ms-2"
                onClick={async () => {
                  const selectedIds = table
                    .getFilteredSelectedRowModel()
                    .rows.map((row) => row.original?.id); // Ensure `row.original.id` exist

                  await mutate({
                    variables: {
                      userIds: selectedIds,
                    },
                  });
                }}
              >
                Delete ({table.getFilteredSelectedRowModel().rows.length})
              </Button>
            </div>
          ) : (
            <div>
              <CreateUser refetch={refetch} />
            </div>
          )}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5} className="p-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Skeleton key={i} className="w-full h-10 mb-2 rounded" />
                  ))}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
          disabled={page <= 1} // Disable if it's the first page
        >
          Previous
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (page < (data?.totalPages ?? 0)) setPage(page + 1);
          }}
          disabled={page >= (data?.totalPages ?? 0)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

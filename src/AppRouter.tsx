import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router";
import { EditUserPage, UserPage, UsersPage } from "./pages";

const AppRouter = (): ReactElement => {
  return (
    <Routes>
      <Route path="/" index element={<Navigate to={"/users"} />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/users/:id" element={<UserPage />} />
      <Route path="/users/:id/edit" element={<EditUserPage />} />
    </Routes>
  );
};

export { AppRouter };

import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Mainlayout from "../layouts/Mainlayout";
import AccountPage from "../pages/AccountPage";
import UserProfilePage from "../pages/UserProfilePage";
import LoginPage from "../pages/LoginPage";
import BlankLayout from "../layouts/BlankLayout";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AuthRequire from "./AuthRequire";

function index() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthRequire>
            <Mainlayout />
          </AuthRequire>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="user/:userId" element={<UserProfilePage />} />
      </Route>

      <Route element={<BlankLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default index;

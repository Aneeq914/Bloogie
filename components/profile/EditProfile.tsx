"use client";
import { useState } from "react";
import BasicProfile from "./BasicEditProfile";
import AccountEditProfile from "./AccountEditProfile";

const EditProfile = () => {
  const [tab, setTab] = useState<"basic" | "account">("basic");

  const tabClass = (active: boolean) =>
    `rounded-lg px-3 py-2 text-left text-sm font-medium transition ${
      active
        ? "bg-brand-50 text-brand-700"
        : "text-gray-700 hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-64 flex-col gap-1 border-r border-gray-200 bg-white p-4">
        <h1 className="mb-4 px-3 text-lg font-bold text-gray-900">Profile</h1>

        <button
          onClick={() => setTab("basic")}
          className={tabClass(tab === "basic")}
        >
          Basic Information
        </button>

        <button
          onClick={() => setTab("account")}
          className={tabClass(tab === "account")}
        >
          Account Information
        </button>
      </aside>

      {tab === "basic" ? (
        <BasicProfile/>
      ) : null}
      {tab === "account" ? (
        <AccountEditProfile/>
      ) : null}
    </div>
  );
};

export default EditProfile;

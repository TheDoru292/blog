import { useEffect } from "react";
import Router from "next/router";

export default function Logout() {
  useEffect(() => {
    sessionStorage.removeItem("token");

    Router.push("/admin/login");
  });

  return (
    <div>
      <p>Hi</p>
    </div>
  );
}

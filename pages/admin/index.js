import { useState, useEffect } from "react";
import Router from "next/router";

export default function AdminHome() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let accessToken = document.cookie;

    if (accessToken.includes("jwt")) {
      Router.push("/admin/login");
    } else {
      Router.push("/admin/dashboard");
    }
  });

  return <div>Loading...</div>;
}

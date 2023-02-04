import AdminNavBar from "@/components/AdminNavBar";
import AdminWelcome from "@/components/AdminWelcome";

export async function getServerSideProps(context) {
  if (context.req.cookies["jwt"] == undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
      props: {},
    };
  }

  const data = await fetch("http://localhost:3000/api/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${context.req.cookies["jwt"]}`,
      "Content-Type": "application/json",
    },
  }).then((data) => {
    return data.json();
  });

  if (data.success == false && data.code == 406) {
    return {
      redirect: {
        permanent: false,
        destination: "/admin/login",
      },
      props: {},
    };
  }

  console.log(data);

  return {
    props: {
      user: data.user,
    },
  };
}

function AdminDashboard({ user }) {
  return (
    <div>
      <AdminNavBar currentPage="dashboard" />
      <div className="mx-10 mt-5 max-w-7x1 px-2 sm:px-6 lg:px-8 flex flex-row">
        <AdminWelcome user={user} />
      </div>
    </div>
  );
}

export default AdminDashboard;

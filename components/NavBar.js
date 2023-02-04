import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar({ currentPage }) {
  const navigation = [
    {
      name: "Home",
      href: "/",
      current: currentPage === "home" ? true : false,
    },
    {
      name: "Posts",
      href: "/posts",
      current: currentPage === "page" ? true : false,
    },
    {
      name: "Random Post",
      href: "/random",
      current: currentPage === "random" ? true : false,
    },
  ];

  return (
    <nav>
      <>
        <div className="lg:px-32 flex bg-gray-800 p-2 h-16 items-center">
          <div>
            <h1 className="text-white">Blog</h1>
          </div>

          <div className="flex flex-grow justify-end gap-5">
            {navigation.map((item) => {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "text-white bg-gray-900"
                      : "hover:bg-gray-600 hover:text-white",
                    "text-gray-300 text-sm font-medium rounded-md py-2 px-3"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </>
    </nav>
  );
}

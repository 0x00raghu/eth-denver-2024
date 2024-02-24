import { notFound } from "next/navigation";
import "server-only";

export async function getUsers() {
  const users = [
    {
      name: "John Doe",
      email: "",
      phone: "",
    },
  ];

  if (users.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return users;
}

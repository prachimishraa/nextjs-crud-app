import Link from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
};

async function getUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    cache: "no-store",
  });
  return res.json();
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main style={{ maxWidth: 600, margin: "40px auto", padding: "0 20px" }}>
      <h1>Users</h1>

      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {users.map((user) => (
          <li
            key={user.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom: "1px solid #e5e5e5",
            }}
          >
            <div>
              <strong>{user.name}</strong>
              <p style={{ margin: "2px 0 0", color: "#666", fontSize: 14 }}>
                {user.email}
              </p>
            </div>

            <Link href={`/users/${user.id}`}>
              <button>View</button>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

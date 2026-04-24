"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    api.get(`/users/${id}`).then((res) => {
      setUser(res.data);
      setForm({ name: res.data.name, email: res.data.email });
    });
  }, [id]);

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    setUser((prev) => (prev ? { ...prev, ...form } : prev));
    setShowForm(false);

    api.put(`/users/${id}`, form).catch(() => {
      alert("Update failed. Please try again.");
    });
  }

  function handleDelete() {
    if (!confirm("Are you sure you want to delete this user?")) return;

    router.push("/users");

    api.delete(`/users/${id}`).catch(() => {
      alert("Delete failed.");
    });
  }

  if (!user) {
    return <p style={{ padding: 40 }}>Loading...</p>;
  }

  return (
    <main style={{ maxWidth: 500, margin: "40px auto", padding: "0 20px" }}>
      <a href="/users" style={{ fontSize: 14 }}>
        ← Back to users
      </a>

      <h1 style={{ marginTop: 16 }}>{user.name}</h1>
      <p style={{ color: "#555" }}>{user.email}</p>

      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Update"}
        </button>

        <button
          onClick={handleDelete}
          style={{ color: "red", borderColor: "red" }}
        >
          Delete
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleUpdate} style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", marginBottom: 4, fontSize: 14 }}>
              Name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              style={{ width: "100%", padding: "6px 8px", boxSizing: "border-box" }}
              required
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", marginBottom: 4, fontSize: 14 }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={{ width: "100%", padding: "6px 8px", boxSizing: "border-box" }}
              required
            />
          </div>

          <button type="submit">Save changes</button>
        </form>
      )}
    </main>
  );
}

export async function api(path, options = {}) {
  const { body, ...rest } = options;
  const res = await fetch(`/api/server${path}`, {
    credentials: "include",
    ...rest,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}
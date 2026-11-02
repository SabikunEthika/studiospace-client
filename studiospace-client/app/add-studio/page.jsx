"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";

function Inner() {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Add New Studio</h1>
      <StudioForm user={user} submitLabel="Publish Studio" onSubmit={async (payload) => {
        await api("/studios", { method: "POST", body: payload });
        toast.success("Studio listed successfully!");
        router.push("/my-listings");
      }} />
    </div>
  );
}
export default function AddStudioPage() { return <PrivateRoute><Inner /></PrivateRoute>; }
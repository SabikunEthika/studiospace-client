"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PrivateRoute from "@/components/PrivateRoute";
import StudioForm from "@/components/StudioForm";
import Spinner from "@/components/Spinner";
import { useAuth } from "@/components/AuthProvider";
import { api } from "@/lib/api";

function Inner() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    api(`/studios/${id}`).then((s) => {
      if (s.ownerEmail !== user.email) { toast.error("You can only edit your own studios"); router.replace("/my-listings"); return; }
      setStudio(s);
    }).catch((e) => { toast.error(e.message); router.replace("/my-listings"); });
  }, [id, router, user.email]);

  if (!studio) return <Spinner />;
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Update Studio</h1>
      <StudioForm initial={studio} user={user} submitLabel="Save Changes" onSubmit={async (payload) => {
        await api(`/studios/${id}`, { method: "PUT", body: payload });
        toast.success("Studio updated successfully!");
        router.push("/my-listings");
      }} />
    </div>
  );
}
export default function EditStudioPage() { return <PrivateRoute><Inner /></PrivateRoute>; }

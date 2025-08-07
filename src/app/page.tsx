"use client"
import { UserButton } from "@/features/auth/components/user-button";
import { useCreateWorkspaceModal } from "@/features/workspaces/store/use-create-workspace-modal";
import { useRouter } from "next/navigation";
import { useGetWorkSpaces } from "@/features/workspaces/api/use-get-workspaces";
import { useEffect, useMemo } from "react";
export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  const { data, isLoading } = useGetWorkSpaces();
  const workspaceId = useMemo(() => { return data?.[0]?._id }, [data]);
  useEffect(() => {
    if (isLoading) return;
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`)
    }
    else if (!open) {
      setOpen(true)
    }

  }, [workspaceId, isLoading, open, setOpen, router])

  return (
    <div>
      <UserButton />
    </div>
  );
}

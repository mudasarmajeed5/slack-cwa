"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useCreateWorkspaceModal } from "../store/use-create-workspace-modal"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

export const CreateWorkSpaceModal = () => {
    const [open, setOpen] = useCreateWorkspaceModal();
    const [name, setName] = useState("")
    const router = useRouter();
    const handleClose = () => {
        setOpen(false);
        setName("")
    }
    const { mutate, isPending } = useCreateWorkspace();
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({ name }, {
            onSuccess(Id) {
                router.push(`/workspace/${Id}`)
                toast.success("Workspace Created");
                handleClose();
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Add a worksapce
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        value={name}
                        disabled={isPending}
                        required
                        autoFocus
                        onChange={(e) => setName(e.target.value)}
                        minLength={3}
                        maxLength={50}
                        placeholder="Workspace name etc. 'Work', 'Personal', 'Home'"
                    />
                    <div className="flex justify-end">
                        <Button disabled={isPending}>
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

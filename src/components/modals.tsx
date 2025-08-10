"use client";
import { CreateWorkSpaceModal } from "@/features/workspaces/components/create-workspace-modal";
import { CreateChannelModal } from "@/features/channels/components/create-channel-modal";

import { useEffect, useState } from "react";
const Modals = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])
    if(!mounted) return null;
    return <>
        <CreateChannelModal/>
        <CreateWorkSpaceModal />
    </>
}
export default Modals
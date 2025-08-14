"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import WorkspaceSidebar from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import Thread from "@/features/messages/components/Thread";
import Profile from "@/features/members/components/Profile";
interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}
const WorkspaceLayout = ({ children }: WorkspaceIdLayoutProps) => {
    const { parentMessageId, onClose, profileMemberId } = usePanel();
    const showPanel = !!parentMessageId || !!profileMemberId;

    return (
        <div className="h-full">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                <ResizablePanelGroup direction="horizontal" >
                    <ResizablePanel defaultSize={25} minSize={11} className="bg-[#5E2C5F] ">
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={80} minSize={25}>
                        {children}
                    </ResizablePanel>
                    {showPanel && (
                        <>
                            <ResizableHandle withHandle />
                            <ResizablePanel minSize={25} defaultSize={25}>
                                {parentMessageId ?
                                    <Thread
                                        messageId={parentMessageId as Id<"messages">}
                                        onClose={onClose}
                                    /> :
                                    profileMemberId ? (
                                        <Profile
                                            memberId={profileMemberId as Id<"members">}
                                            onClose={onClose}
                                        />
                                    ) :
                                        (
                                            <div className="flex h-full justify-center items-center">
                                                <Loader className="size-5 animate-spin text-muted-foreground" />
                                            </div>
                                        )
                                }
                            </ResizablePanel>

                        </>
                    )}
                </ResizablePanelGroup >
            </div>
        </div >
    )
}
export default WorkspaceLayout
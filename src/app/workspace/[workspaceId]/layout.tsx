"use client"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import WorkspaceSidebar from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import Thread from "@/features/messages/components/Thread";
interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}
const WorkspaceLayout = ({ children }: WorkspaceIdLayoutProps) => {
    const { parentMessageId, onClose } = usePanel();
    const showPanel = !!parentMessageId;

    return (
        <div className="h-full">
            <Toolbar />
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar />
                <ResizablePanelGroup direction="horizontal" >
                    <ResizablePanel defaultSize={20} minSize={11} autoSave="left-panel" className="bg-[#5E2C5F] ">
                        <WorkspaceSidebar />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={20}>
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
                                    <div className="flex h-full justify-center items-center">
                                        <Loader className="size-5 animate-spin text-muted-foreground" />
                                    </div>
                                }
                            </ResizablePanel>

                        </>
                    )}
                </ResizablePanelGroup >
            </div>
        </div>
    )
}
export default WorkspaceLayout
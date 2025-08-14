import { useMemberId } from "@/hooks/use-member-id"
import { Id } from "../../../../../../convex/_generated/dataModel"
import { useGetMember } from "@/features/members/api/use-get-member";
import { useGetMessages } from "@/features/messages/api/use-get-messages";
import { Loader } from "lucide-react";
import Header from "./Header";
import ChatInput from "./chat-input";
import MessageList from "@/components/message-list";
import { usePanel } from "@/hooks/use-panel";
import { useCurrentMember } from "@/features/members/api/user-current-member";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

interface ConversationProps {
    id: Id<"conversations">
}
const Conversation = ({ id }: ConversationProps) => {
    const memberId = useMemberId();
    const { onOpenProfile } = usePanel();
    const workspaceId = useWorkspaceId();
    const { data: currentMember } = useCurrentMember({ workspaceId })
    const { data: member, isLoading: memberLoading } = useGetMember({ id: memberId });
    const isYou = currentMember?._id === memberId;
    const { results, status, loadMore } = useGetMessages({ conversationId: id })
    if (memberLoading || status === "LoadingFirstPage") {
        return <div className="h-full flex items-center justify-center">
            <Loader className="size-6 animate-spin text-muted-foreground" />
        </div>
    }
    return (
        <div className="flex flex-col h-full">
            <Header
                memberName={member?.user.name}
                memberImage={member?.user.image}
                onClick={() => { onOpenProfile(memberId) }}
                isYou={isYou}
            />
            <MessageList
                data={results}
                variant="conversation"
                memberImage={member?.user.image}
                memberName={member?.user.name}
                loadMore={loadMore}
                isLoadingMore={status === "LoadingMore"}
                canLoadMore={status === "CanLoadMore"}
            />
            <ChatInput
                placeholder={`Message ${member?.user.name}`}
                conversationId={id}
            />
        </div>
    )
}

export default Conversation
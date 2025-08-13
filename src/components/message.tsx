import React from 'react'
import { Doc, Id } from '../../convex/_generated/dataModel'
import dynamic from 'next/dynamic';
import { format, isToday, isYesterday } from "date-fns"
import { Hint } from './hint';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Thumbnail from './Thumbnail';
import Toolbar from './Toolbar';
import { useUpdateMessage } from '@/features/messages/api/use-update-message';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useRemoveMessage } from '@/features/messages/api/use-remove-message';
import { useConfirm } from '@/hooks/use-confirm';
import { useToggleReaction } from '@/features/reactions/api/use-toggle-reaction';
import Reactions from './Reactions';
import { usePanel } from '@/hooks/use-panel';
import { ThreadBar } from './thread-bar';
const Renderer = dynamic(() => import("@/components/Renderer"), { ssr: false })
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface MessageProps {
    id: Id<"messages">
    memberId: Id<"members">
    authorImage?: string;
    authorName?: string;
    isAuthor: boolean;
    reactions: Array<Omit<Doc<"reactions">, "memberId"> & {
        count: number,
        memberIds: Id<"members">[]
    }>
    body: Doc<"messages">["body"]
    image: string | null | undefined;
    createdAt: Doc<"messages">["_creationTime"]
    updatedAt: Doc<"messages">["updatedAt"]
    isEditing: boolean
    isCompact?: boolean
    setEditingId: (id: Id<"messages"> | null) => void;
    hideThreadButton?: boolean;
    threadCount?: number
    threadImage?: string;
    threadName?: string
    threadTimestamp?: number;
}
const formatFullTime = (date: Date) => {
    return `${isToday(date) ? "Today" : isYesterday(date) ? "Yesterday" : format(date, "MMM d, yyyy")} at ${format(date, "h:mm:ss a")}`
}

const Message = ({
    id,
    isAuthor,
    memberId,
    threadName,
    authorImage,
    authorName = "Member",
    reactions,
    body,
    image,
    createdAt,
    updatedAt,
    isEditing,
    isCompact,
    setEditingId,
    hideThreadButton,
    threadCount,
    threadImage,
    threadTimestamp

}: MessageProps) => {
    const { mutate: updateMessage, isPending: isUpdatingMessage } = useUpdateMessage();
    const { parentMessageId, onOpenMessage, onClose } = usePanel();
    const { mutate: removeMessage, isPending: isRemovingMessage } = useRemoveMessage();
    const [ConfirmDialog, confirm] = useConfirm("Delete message", "Are you sure you want to delete this message");
    const avatarFallback = authorName.charAt(0).toUpperCase();
    const isPending = isUpdatingMessage;
    const { mutate: toggleReaction, isPending: isTogglingReaction } = useToggleReaction();
    const handleReaction = (reaction: string) => {
        toggleReaction({ messageId: id, value: reaction }, {
            onError: () => {
                toast.error("Failed to toggle reaction")
            }
        })
    }

    const handleUpdate = ({ body }: { body: string }) => {
        updateMessage({
            id,
            body
        }, {
            onSuccess: () => {
                toast.success("Message updated")
                setEditingId(null);
            },
            onError: () => {
                toast.error("Failed to update message");
            }
        }
        )
    }
    const handleRemove = async () => {
        const okay = await confirm();
        if (!okay) return;
        removeMessage({ id },
            {
                onSuccess: () => {
                    toast.success("Message Deleted")
                    // close the thread if opened. 
                    if (parentMessageId === id) onClose();
                },
                onError: () => {
                    toast.error("Failed to delete message");
                }
            }
        )
    }

    if (isCompact)
        return (
            <>
                <ConfirmDialog />
                <div className={cn("flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
                    isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
                    isRemovingMessage && "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
                )}>
                    <div className='flex items-start gap-2'>
                        <Hint label={formatFullTime(new Date(createdAt))}>
                            <button className='text-xs text-muted-foreground opacity-0 group-hover:opacity-100 w-[40px] leading-[22px] text-center hover:underline'>
                                {format(new Date(createdAt), "hh:mm")}
                            </button>
                        </Hint>
                        {
                            isEditing ?
                                (
                                    <div className='w-full h-full'>
                                        <Editor
                                            onSubmit={handleUpdate}
                                            disabled={isPending}
                                            defaultValue={JSON.parse(body)}
                                            onCancel={() => setEditingId(null)}
                                            variant="update"
                                        />
                                    </div>
                                ) : (
                                    <div className='flex flex-col w-full'>
                                        <Renderer value={body} />
                                        <Thumbnail url={image} />
                                        {updatedAt && <span className='text-xs text-muted-foreground'>(edited)</span>}
                                        <Reactions
                                            data={reactions}
                                            onChange={handleReaction}
                                        />
                                        <ThreadBar count={threadCount}
                                            onClick={() => onOpenMessage(id)}
                                            image={threadImage}
                                            timestamp={threadTimestamp}
                                            name={threadName}
                                        />
                                    </div>
                                )
                        }

                    </div>
                    {!isEditing && (
                        <Toolbar
                            isAuthor={isAuthor}
                            isPending={isPending}
                            handleEdit={() => setEditingId(id)}
                            handleThread={() => onOpenMessage(id)}
                            handleDelete={handleRemove}
                            hideThreadButton={hideThreadButton}
                            handleReaction={handleReaction}
                        />
                    )}
                </div>
            </>
        )



    return (
        <>
            <ConfirmDialog />
            <div className={cn("flex flex-col gap-2 p-1.5 px-5 hover:bg-gray-100/60 group relative",
                isEditing && "bg-[#f2c74433] hover:bg-[#f2c74433]",
                isRemovingMessage && "bg-rose-500/50 transform transition-all scale-y-0 origin-bottom duration-200"
            )}>
                <div className='flex items-start gap-2'>
                    <button className=''>
                        <Avatar>
                            <AvatarImage src={authorImage} />
                            <AvatarFallback>
                                {avatarFallback}
                            </AvatarFallback>
                        </Avatar>
                    </button>
                    {isEditing ? (
                        <div className='w-full h-full'>
                            <Editor
                                onSubmit={handleUpdate}
                                disabled={isPending}
                                defaultValue={JSON.parse(body)}
                                onCancel={() => setEditingId(null)}
                                variant="update"
                            />
                        </div>
                    ) : (


                        <div className='flex flex-col w-full overflow-hidden'>
                            <div className='text-sm'>
                                <button onClick={() => { }} className='font-bold text-primary hover:underline'>
                                    {authorName}
                                </button>
                                <span>&nbsp;&nbsp;</span>
                                <Hint label={formatFullTime(new Date(createdAt))}>
                                    <button className="text-xs text-muted-foreground hover:underline">
                                        {format(new Date(createdAt), "h:mm a")}
                                    </button>
                                </Hint>
                            </div>
                            <Renderer value={body} />
                            <Thumbnail url={image} />
                            {updatedAt && <span className='text-xs text-muted-foreground'>(edited)</span>}
                            <Reactions
                                data={reactions}
                                onChange={handleReaction}
                            />
                            <ThreadBar count={threadCount}
                                image={threadImage}
                                onClick={() => onOpenMessage(id)}
                                name={threadName}
                                timestamp={threadTimestamp}
                            />
                        </div>
                    )}
                </div>

                {!isEditing && (
                    <Toolbar
                        isAuthor={isAuthor}
                        isPending={isPending}
                        handleEdit={() => setEditingId(id)}
                        handleThread={() => onOpenMessage(id)}
                        handleDelete={handleRemove}
                        hideThreadButton={hideThreadButton}
                        handleReaction={handleReaction}
                    />
                )}
            </div>
        </>
    )
}

export default Message
import { MessageSquareIcon, Pencil, SmileIcon, TrashIcon } from "lucide-react"
import { Button } from "./ui/button"

interface ToolbarProps {
    isAuthor: boolean,
    isPending: boolean,
    handleEdit: () => void,
    handleThread: () => void,
    handleDelete: () => void,
    handleReaction: (value: string) => void,
    hideThreadButton?: boolean,
}
import { Hint } from "./hint"
import EmojiPopOver from "./emoji-popover"
const Toolbar = ({ isAuthor, isPending, handleDelete, handleEdit, handleReaction, hideThreadButton, handleThread }: ToolbarProps) => {
    return (
        <div className="top-0 right-5 absolute">
            <div className="group-hover:opacity-100 opacity-0 transition-opacity border bg-white rounded-md shadow-sm">
                <EmojiPopOver
                    hint="Add reaction"
                    onEmojiSelect={(emoji: any) => handleReaction(emoji.native)}
                >
                    <Button variant={"ghost"} size={"iconSm"} disabled={isPending}>
                        <SmileIcon className="size-4" />
                    </Button>
                </EmojiPopOver>
                {!hideThreadButton &&
                    <Hint label="Reply in thread">
                        <Button variant={"ghost"} size={"iconSm"} onClick={handleThread} disabled={isPending}>
                            <MessageSquareIcon className="size-4" />
                        </Button>
                    </Hint>

                }
                {
                    isAuthor && (
                        <>
                            <Hint label="Edit message">
                                <Button variant={"ghost"} size={"iconSm"} onClick={handleEdit} disabled={isPending}>
                                    <Pencil className="size-4" />
                                </Button>
                            </Hint>
                            <Hint label="Delete message">
                                <Button variant={"ghost"} size={"iconSm"} onClick={handleDelete} disabled={isPending}>
                                    <TrashIcon className="size-4" />
                                </Button>
                            </Hint>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Toolbar
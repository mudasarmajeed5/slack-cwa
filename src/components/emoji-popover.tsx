import {
    Popover,
    PopoverContent,
    PopoverTrigger
}
    from "@/components/ui/popover"

import Picker from "@emoji-mart/react"
import data from "@emoji-mart/data"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react";
import { type EmojiPickerClick } from "../../types/emoji-picker-type"
interface EmojiPopOverProps {
    children: React.ReactNode;
    hint?: string;
    onEmojiSelect: (emoji: string) => void;
}
const EmojiPopOver = ({ children, hint = "Emoji", onEmojiSelect }: EmojiPopOverProps) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const onSelect = (value: EmojiPickerClick) => {
        onEmojiSelect(value.native)
        setPopoverOpen(false);
        setTimeout(() => {
            setTooltipOpen(false);
        }, 500);
    }

    return (
        <TooltipProvider>
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <Tooltip open={tooltipOpen} onOpenChange={setTooltipOpen} delayDuration={50}>
                    <PopoverTrigger asChild>
                        <TooltipTrigger asChild>
                            {children}
                        </TooltipTrigger>
                    </PopoverTrigger>
                    <TooltipContent className="bg-black text-white border border-white/5">
                        <p className="font-medium text-xs">{hint}</p>
                    </TooltipContent>
                </Tooltip>
                <PopoverContent className="p-0 w-full border-none shadow-none">
                    <Picker data={data} onEmojiSelect={onSelect} />
                </PopoverContent>
            </Popover>
        </TooltipProvider>
    )
}

export default EmojiPopOver
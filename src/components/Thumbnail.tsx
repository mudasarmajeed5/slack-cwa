/* eslint-disable @next/next/no-img-element */
import {
    DialogTrigger,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"
const Thumbnail = ({ url }: { url: string | null | undefined }) => {

    if (!url) return null;
    return (
        <Dialog>
            <DialogTrigger>
                <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
                    <img src={url} alt="Message image" className="rounded-md object-cover size-full" />
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
                <DialogTitle>{}</DialogTitle>
                <img src={url} alt="Message image" className="rounded-md object-cover size-full" />
            </DialogContent>
        </Dialog>
    )
}

export default Thumbnail
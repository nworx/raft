"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import Tiptap from "../common/text-editor/TipTap"





export default function TaskDialog({ task, open, onOpenChange, onAddComment }) {
  const [newComment, setNewComment] = useState("")
  const { toast } = useToast()

  const handleAddComment = () => {
    if (!newComment.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive",
      })
      return
    }

    onAddComment(newComment.trim())
    setNewComment("") // Reset the input

    toast({
      title: "Success",
      description: "Comment added successfully",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} >
        {/* //  max-w-2xl  */}
      <DialogContent className="
      min-w-[50vw]
      h-[80vh]
      flex flex-col 
      ">
        <DialogHeader
       
        >
          <DialogTitle
           className="mt-[18px]"
          >
            <Input
              className="text-lg font-semibold h-auto px-1 py-1 border-transparent hover:border-input focus:border-input transition-colors"
              defaultValue={task.title}
            />
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col flex-grow overflow-scroll">
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
            <Tiptap/>
              {/* <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                className="min-h-[100px] resize-none"
                placeholder="Add a more detailed description..."
                defaultValue={task.description}
              /> */}
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex-grow overflow-hidden">
            <Label className="mb-2 block">Comments</Label>
            <ScrollArea className="h-[calc(100%-2rem)] pr-4">
              <div className="space-y-4">
                {task.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 group">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{comment.user.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="mt-4 space-y-4">
          <Tiptap/>
            {/* <Textarea
              placeholder="Add a comment..."
              className="resize-none"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleAddComment()
                }
              }}
            /> */}
            <div className="flex items-center gap-2">
              <Button onClick={handleAddComment} disabled={!newComment.trim()}>
                Add Comment
              </Button>
              <p className="text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 rounded bg-muted">⌘/Ctrl + Enter</kbd> to comment
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


"use client";

import axios from "axios";
import {
  ChevronLeft,
  Edit,
  MessagesSquare,
  MoreVertical,
  Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Contact, Message } from "@prisma/client";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/app/_components/ui/button";
import { BotAvatar } from "@/app/_components/bot-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { useToast } from "@/app/_components/ui/use-toast";

interface ChatHeaderProps {
  messages: Message[];
  contact: Contact;
}

export const ChatHeader = ({ messages, contact }: ChatHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { toast } = useToast();
  const count = messages.length;

  console.log("count: ", count);

  const onDelete = async () => {
    try {
      await axios.delete(`/api/companion/${"ss"}`);
      toast({
        description: "Success.",
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <div className="flex w-full items-center justify-between border-b border-primary/10 pb-4">
      <div className="flex items-center gap-x-2">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="h-8 w-8" />
        </Button>
        {/* <BotAvatar src={companion.src} /> */}
        <div className="flex flex-col gap-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold">{contact.firstName}</p>
            <p className="font-bold">{contact.lastName}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <MessagesSquare className="mr-1 h-3 w-3" />
              {count}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Phone Number : {contact.phone}
          </p>
        </div>
      </div>
      {
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon">
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push(`/companion/${contact.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}>
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      }
    </div>
  );
};

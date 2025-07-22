"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { useState, useEffect } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useToast } from "@/components/ui/use-toast";


import { ScrollArea } from "@/components/ui/scroll-area";

export function SearchBox({ users, selectedUsernames, onChange, currentUserEmail }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const toggleUser = (username) => {
    const isSelected = selectedUsernames.includes(username);
    // const updated = isSelected
    //   ? selectedUsernames.filter((u) => u !== username)
    //   : [...selectedUsernames, username];
    let updated;

    if (isSelected) {
      if (username === currentUserEmail) {
        toast({
          title: "You cannot remove yourself.",
          variant: "destructive",
        });
        return;
      }
      updated = selectedUsernames.filter((u) => u !== username);
    } else {
      updated = [...selectedUsernames, username];
    }
    onChange(updated);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          style={{height: 100}}
          className="w-[300px] justify-between overflow-hidden p-1"
        >
            <ScrollArea className="h-[calc(100%-2rem)] pr-4 py-2">
                <div className="flex-1 overflow-x-auto flex-wrap flex gap-2 items-center">
                    {selectedUsernames.length > 0 ? (
                    users
                        .filter((user) => selectedUsernames.includes(user.username))
                        .map((user) => (
                        <span
                            key={user.username}
                            className="bg-muted text-sm px-2 py-0.5 rounded-full truncate max-w-[120px]"
                            title={user.email}
                        >
                            {user.email}
                        </span>
                        ))
                    ) : (
                    <span className="text-muted-foreground">Select users...</span>
                    )}
                </div>
            </ScrollArea>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 max-h-72">
        <Command className="flex-col h-full">
          <CommandInput placeholder="Search user..." className="h-9" />
          <CommandList className="flex-1 overflow-y-auto">
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => {
                const isSelected = selectedUsernames.includes(user.username);
                return (
                  <CommandItem
                    key={user.username}
                    value={user.username}
                    onSelect={() => toggleUser(user.username)}
                  >
                    {user.email}
                    <Check
                      className={cn(
                        "ml-auto",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>

  );
}


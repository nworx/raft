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

import getAllUsers from "@/services/profile/getAllUsers";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

// const users = [
//     { id: 1, username: "alice@example.com", email: "alice@example.com" },
//     { id: 2, username: "bob@example.com", email: "bob@example.com" },
//     { id: 3, username: "carol@example.com", email: "carol@example.com" },
//     { id: 4, username: "dave@example.com", email: "dave@example.com" },
//     { id: 5, username: "eve@example.com", email: "eve@example.com" },
//     { id: 6, username: "frank@example.com", email: "frank@example.com" },
//     { id: 7, username: "grace@example.com", email: "grace@example.com" },
//     { id: 8, username: "heidi@example.com", email: "heidi@example.com" },
//     { id: 9, username: "ivan@example.com", email: "ivan@example.com" },
//     { id: 10, username: "judy@example.com", email: "judy@example.com" },
//     { id: 11, username: "mallory@example.com", email: "mallory@example.com" },
//     { id: 12, username: "oscar@example.com", email: "oscar@example.com" },
//     { id: 13, username: "peggy@example.com", email: "peggy@example.com" },
//     { id: 14, username: "trent@example.com", email: "trent@example.com" },
//     { id: 15, username: "victor@example.com", email: "victor@example.com" },
//     { id: 16, username: "walter@example.com", email: "walter@example.com" },
//     { id: 17, username: "yasmin@example.com", email: "yasmin@example.com" },
//     { id: 18, username: "zach@example.com", email: "zach@example.com" },
//     { id: 19, username: "nina@example.com", email: "nina@example.com" },
//     { id: 20, username: "leo@example.com", email: "leo@example.com" },
//     { id: 21, username: "sara@example.com", email: "sara@example.com" },
//     { id: 22, username: "harry@example.com", email: "harry@example.com" },
//     { id: 23, username: "kim@example.com", email: "kim@example.com" },
//     { id: 24, username: "rob@example.com", email: "rob@example.com" },
//     { id: 25, username: "lara@example.com", email: "lara@example.com" },
//     { id: 26, username: "mike@example.com", email: "mike@example.com" },
//     { id: 27, username: "nora@example.com", email: "nora@example.com" },
//     { id: 28, username: "steve@example.com", email: "steve@example.com" },
//     { id: 29, username: "tina@example.com", email: "tina@example.com" },
//     { id: 30, username: "uma@example.com", email: "uma@example.com" },
// ];



// export function SearchBox() {

//     const { toast } = useToast();

//     const [open, setOpen] = useState(false)
//     const [value, setValue] = useState("")

//     const [selectedUsers, setSelectedUsers] = useState([]);

//     const [users, setUsers] = useState([]);
//     const getAllUsersFunc = async () => {

//         try {

//             const response = await getAllUsers();

//             if(Array.isArray(response) && response.length > 0){
//                 setUsers(response);
//             }
            
//         } catch (error) {
//             console.error("Error in get all users API:", error);
//             toast({
//                 title: "Get All Users Failed",
//                 description: "Something went wrong. Please try again.",
//                 variant: "destructive",
//             });
//         }
//     }

//     useEffect( async () => {
//         getAllUsersFunc();
//     }, [])

//     return (

//         <Popover open={open} onOpenChange={setOpen}>
//             <PopoverTrigger asChild>
//                 <Button
//                 variant="outline"
//                 role="combobox"
//                 aria-expanded={open}
//                 className="w-[300px] justify-between overflow-hidden"
//                 >
//                 {/* {selectedUsers.length > 0
//                     ? users
//                         .filter((user) => selectedUsers.includes(user.username))
//                         .map((user) => user.email)
//                         .join(", ")
//                     : "Select users..."} */}
//                     <div className="flex-1 overflow-x-auto whitespace-nowrap flex gap-1 items-center">
//                 {selectedUsers.length > 0 ? (
//                     users
//                     .filter((user) => selectedUsers.includes(user.username))
//                     .map((user) => (
//                         <span
//                         key={user.username}
//                         className="bg-muted text-sm px-2 py-0.5 rounded-full truncate max-w-[120px]"
//                         title={user.email}
//                         >
//                         {user.email}
//                         </span>
//                     ))
//                 ) : (
//                     <span className="text-muted-foreground">Select users...</span>
//                 )}
//                 </div>
//                 <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-[300px] p-0 max-h-72">
//                 <Command className="h-full">
//                     <CommandInput placeholder="Search user..." className="h-9" />
//                     <CommandList className="h-48 overflow-y-auto">
//                     <CommandEmpty>No user found.</CommandEmpty>
//                     <CommandGroup>
//                         {users.map((user) => {
//                         const isSelected = selectedUsers.includes(user.username);
//                         return (
//                             <CommandItem
//                             key={user.username}
//                             value={user.username}
//                             onSelect={() => {
//                                 setSelectedUsers((prev) =>
//                                 isSelected
//                                     ? prev.filter((u) => u !== user.username)
//                                     : [...prev, user.username]
//                                 );
//                             }}
//                             >
//                             {user.email}
//                             <Check
//                                 className={cn(
//                                 "ml-auto",
//                                 isSelected ? "opacity-100" : "opacity-0"
//                                 )}
//                             />
//                             </CommandItem>
//                         );
//                         })}
//                     </CommandGroup>
//                     </CommandList>
//                 </Command>
//             </PopoverContent>

//         </Popover>

//     )
// }




export function SearchBox({ users, selectedUsernames, onChange }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const toggleUser = (username) => {
    const isSelected = selectedUsernames.includes(username);
    const updated = isSelected
      ? selectedUsernames.filter((u) => u !== username)
      : [...selectedUsernames, username];
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


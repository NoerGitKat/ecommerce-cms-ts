import { ComponentPropsWithoutRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Store } from "@prisma/client";
import { useStoreSwitcher } from "@/hooks";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown, PlusCircle, StoreIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandItem,
  CommandSeparator,
} from "../ui/command";

type PopoverTriggerProps = ComponentPropsWithoutRef<typeof PopoverTrigger>;
interface StoreSwitcherProps extends PopoverTriggerProps {
  className?: string;
  stores: Store[];
}

export default function StoreSwitcher({
  className,
  stores = [],
}: StoreSwitcherProps): JSX.Element {
  const {
    isOpenPopover,
    setIsOpenPopover,
    storeItems,
    activeStore,
    onStoreSelect,
    onOpen,
  } = useStoreSwitcher(stores);

  return (
    <Popover open={isOpenPopover} onOpenChange={setIsOpenPopover}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpenPopover}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4" />
          <h1>{activeStore?.label}</h1>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search store..." />
            <CommandEmpty>No store found!</CommandEmpty>
            <CommandGroup>
              {storeItems.map((store) => (
                <CommandItem
                  key={store.id}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="mr-2 h-4 w-4" />
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      activeStore?.id === store.id
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpenPopover(false);
                  onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useGetCompanyTypes } from "../queries/use-get-company-types";

// Shape of company type data (based on your drizzle schema)
type CompanyType = {
  id: string;
  name: string;
  slug: string;
  thumbnail?: string | null;
  createdAt: string;
  updatedAt?: string | null;
};

type Props = {
  onSelect: (companyType: CompanyType | undefined) => void;
  placeholder?: string;
  className?: string;
  showHintText?: boolean;
};

export function CompanyTypesDropdown({
  onSelect,
  placeholder = "Select company type",
  className,
  showHintText = true,
}: Props) {
  const { data, isLoading } = useGetCompanyTypes();
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSelect = (currentValue: string) => {
    const selected = data?.find(
      (item: { id: string }) => item.id === currentValue
    )!;
    setSelectedValue(currentValue === selectedValue ? "" : currentValue);

    onSelect({
      ...selected,
      createdAt: new Date(selected.createdAt).toISOString(),
      updatedAt: selected.updatedAt
        ? new Date(selected.updatedAt).toISOString()
        : null,
    });

    setOpen(false);
  };

  const selectedItem = data?.find(
    (item: { id: string }) => item.id === selectedValue
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between pl-1", className)}
          disabled={isLoading}
        >
          {selectedItem ? (
            <span className="flex items-center">
              {selectedItem.thumbnail && (
                <Image
                  src={selectedItem.thumbnail}
                  alt={selectedItem.name}
                  width={50}
                  height={50}
                  className="rounded-md object-cover size-7 mr-2"
                />
              )}
              {showHintText && "Company Type: "} {selectedItem.name}
            </span>
          ) : (
            placeholder
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search company type..." />
          <CommandEmpty>No company type found.</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {data?.map(
              (companyType: {
                id: string;
                thumbnail: string | StaticImport;
                name:
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                  | null
                  | undefined;
              }) => (
                <CommandItem
                  key={companyType.id}
                  value={companyType.id}
                  onSelect={handleSelect}
                  className="flex items-center gap-2"
                >
                  {companyType.thumbnail && (
                    <div className="relative h-8 w-8 overflow-hidden rounded">
                      <Image
                        src={companyType.thumbnail}
                        alt={
                          typeof companyType.name === "string"
                            ? companyType.name
                            : String(companyType.name ?? "")
                        }
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <span>{companyType.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      selectedValue === companyType.id
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              )
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

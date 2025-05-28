"use client";

import { UserAvatar } from "@/components";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { cn, formatDate } from "@/lib/utils";
import { Models } from "node-appwrite";
import { User } from "@/types";

export const columns: ColumnDef<Models.Document>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-2 sm:gap-3 w-[150px] sm:w-[200px] text-left py-1 sm:py-2">
        {row.original.imageUrl ? (
          <Image
            width={32}
            height={32}
            src={row.original.imageUrl}
            alt={row.original.name}
            className="size-6 sm:size-8 min-w-6 sm:min-w-8 rounded-full aspect-square"
          />
        ) : (
          <UserAvatar
            user={row.original as unknown as User}
            size={28}
          />
        )}
        <span className="text-[var(--color-gray-900)] font-medium text-xs sm:text-sm">
          {row.original.name}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <button
          className="cursor-pointer text-[var(--color-gray-500)] text-xs sm:text-sm font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="text-[var(--color-gray-500)] text-xs sm:text-sm ">
        {row.original.email}
      </div>
    ),
    size: 150,
  },
  {
    accessorKey: "joinedAt",
    header: "Date Joined",
    cell: ({ row }) => (
      <div className="text-[var(--color-gray-500)] text-xs sm:text-sm">
        {formatDate(row.original.joinedAt)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Type",
    cell: ({ row }) => (
      <article
        className={cn(
          "flex items-center gap-1 sm:gap-2 px-1 sm:px-2 py-1 rounded w-fit",
          row.original.status === "user"
            ? "bg-[var(--color-success-50)]"
            : "bg-[var(--color-light-300)]"
        )}
      >
        <div
          className={cn(
            "size-1.5 sm:size-2 rounded-full",
            row.original.status === "user"
              ? "bg-[var(--color-success-500)]"
              : "bg-[var(--color-gray-500)]"
          )}
        />
        <h3
          className={cn(
            "font-inter text-xs sm:text-sm font-medium capitalize",
            row.original.status === "user"
              ? "text-[var(--color-success-700)]"
              : "text-[var(--color-gray-700)]"
          )}
        >
          {row.original.status}
        </h3>
      </article>
    ),
  },
];

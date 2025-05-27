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
      <div className="flex items-center gap-3 w-[200px] text-left py-2">
        {row.original.imageUrl ? (
          <Image
            width={32}
            height={32}
            src={row.original.imageUrl}
            alt={row.original.name}
            className="size-8 min-w-8 rounded-full aspect-square"
          />
        ) : (
          <UserAvatar user={row.original as unknown as User} size={32} />
        )}
        <span className="text-[var(--color-gray-900)] font-medium">
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
          className="cursor-pointer text-[var(--color-gray-500)] text-xs font-medium"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email Address
        </button>
      );
    },
    cell: ({ row }) => (
      <div className="text-[var(--color-gray-500)] text-sm">
        {row.original.email}
      </div>
    ),
    size: 200,
  },
  {
    accessorKey: "joinedAt",
    header: "Date Joined",
    cell: ({ row }) => (
      <div className="text-[var(--color-gray-500)] text-sm">
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
          "flex items-center gap-2 px-2 py-1 rounded w-fit",
          row.original.status === "user"
            ? "bg-[var(--color-success-50)]"
            : "bg-[var(--color-light-300)]"
        )}
      >
        <div
          className={cn(
            "size-2 rounded-full",
            row.original.status === "user"
              ? "bg-[var(--color-success-500)]"
              : "bg-[var(--color-gray-500)]"
          )}
        />
        <h3
          className={cn(
            "font-inter text-xs font-medium capitalize",
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

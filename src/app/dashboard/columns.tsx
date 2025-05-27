"use client";
import { UserAvatar } from "@/components";
import { Trip, User, UsersItineraryCount } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";

// Columns for Users Table
export const userColumns: ColumnDef<UsersItineraryCount>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="flex items-center gap-3 w-[150px] text-left py-2">
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
        <span className="text-gray-900">{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: "itineraryCount",
    header: "Trips Created",
    cell: ({ row }) => (
      <div className="text-gray-500 ">{row.original.count ?? 0}</div>
    ),
  },
];

// Columns for Trips Table
export const tripColumns: ColumnDef<Trip>[] = [
  {
    accessorKey: "name",
    header: "Trip Name",
    cell: ({ row }) => (
      <Link href={`/dashboard/trips/${row.original.id}`}>
        <div className="flex items-center gap-3 w-[450px]">
          {/* Show first image */}
          {Array.isArray(row.original.imageUrls) && (
            <Image
              src={row.original.imageUrls[0]}
              alt={row.original.name}
              width={40}
              height={40}
              className="size-10 rounded-md object-cover"
            />
          )}

          {/* Trip name */}
          <span className="text-gray-900 font-medium">{row.original.name}</span>
        </div>
      </Link>
    ),
  },
  {
    accessorKey: "interests",
    header: "Interests",
    cell: ({ row }) => (
      <div className="text-gray-500">{row.original.interests}</div>
    ),
  },
];

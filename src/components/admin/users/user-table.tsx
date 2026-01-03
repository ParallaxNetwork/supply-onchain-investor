"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { StatusBadge } from "./status-badge";
import { UserAvatar } from "./user-avatar";
import { TABLE_COLUMNS, COLUMN_COUNT } from "./constants";
import type { User } from "@/types/user";

type UserTableProps = {
  users: User[];
  initialSearchQuery?: string;
};

function filterUsers(users: User[], query: string): User[] {
  if (!query.trim()) return users;
  const lowerQuery = query.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery),
  );
}

export function UserTable({ users, initialSearchQuery = "" }: UserTableProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const filteredUsers = filterUsers(users, searchQuery);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
          <Icon name="group" className="text-primary text-[20px]" />
          Registered Investors
        </h2>
        <div className="relative grow max-w-sm sm:max-w-xs md:max-w-sm">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]"
          />
          <input
            className="block w-full rounded-lg border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 focus:border-primary focus:ring-primary placeholder:text-neutral-400"
            placeholder="Search investors..."
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-100">
          <thead>
            <tr>
              {TABLE_COLUMNS.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-bold text-neutral-600 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {filteredUsers.length === 0 ? (
              <tr>
                <td
                  colSpan={COLUMN_COUNT}
                  className="px-4 py-8 text-center text-sm text-neutral-500"
                >
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-neutral-50 transition-colors"
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={user} />
                      <span className="text-sm font-medium text-neutral-900">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={user.kycStatus} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-neutral-600">
                    {user.joinedDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-neutral-900">
                    {user.totalInvested}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


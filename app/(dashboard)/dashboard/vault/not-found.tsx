"use client";

import Link from "next/link";
import { IconLock, IconArrowLeft } from "@tabler/icons-react";

export default function VaultNotFound() {
  return (
    <div className="flex items-center justify-center h-screen w-full p-6">
      <div className="max-w-md w-full text-center">
        <div className="h-20 w-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <IconLock className="h-10 w-10 text-red-600 dark:text-red-400" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Item Not Found</h1>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          We couldn&apos;t find the vault item you&apos;re looking for. It may have been deleted or it doesn&apos;t exist.
        </p>
        <Link 
          href="/dashboard/vault" 
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <IconArrowLeft className="h-4 w-4 mr-2" />
          Return to Vault
        </Link>
      </div>
    </div>
  );
} 
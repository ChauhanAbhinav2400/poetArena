"use client";

import { useSearchParams as useNextSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Custom hook for managing URL search parameters in Next.js App Router.
 * 
 * @returns [searchParams, setSearchParams]
 */
export function useSearchParams() {
  const searchParams = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Function to update search parameters
  const setSearchParams = useCallback(
    (newParams) => {
      const currentParams = new URLSearchParams(searchParams.toString());

      Object.keys(newParams).forEach((key) => {
        if (newParams[key] === undefined || newParams[key] === null) {
          currentParams.delete(key);
        } else {
          currentParams.set(key, newParams[key]);
        }
      });

      router.push(`${pathname}?${currentParams.toString()}`);
    },
    [searchParams, pathname, router]
  );

  return [searchParams, setSearchParams];
}

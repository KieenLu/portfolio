"use client";

import { usePathname } from "next/navigation";

import { PAGE_CONCEPTS } from "@/constants/page-concept";

export const usePageConcept = () => {
    const pathname = usePathname();

    return PAGE_CONCEPTS[pathname];
};

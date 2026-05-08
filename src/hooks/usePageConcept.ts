import { usePathname } from "next/navigation";

import { PAGE_CONCEPTS } from "@/constants/page-concept";
import { PATH } from "@/constants/path";

export const usePageConcept = () => {
    const pathname = usePathname();

    return PAGE_CONCEPTS[pathname] ?? PAGE_CONCEPTS[PATH.HOME];
};

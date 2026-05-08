import ButtonIcon from "@/components/ButtonIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import ExpandIcon from "@/components/Icons/ExpandIcon";
import MinusIcon from "@/components/Icons/MinusIcon";

interface WindowHeaderProps {
    title: string;
    onPointerDown?: (e: React.PointerEvent) => void;
}

export function WindowHeader({ title, onPointerDown }: WindowHeaderProps) {
    return (
        <div
            onPointerDown={onPointerDown}
            className={`border-b border-base-300 px-4 py-2 flex items-center justify-between select-none transition-colors ${
                onPointerDown ? "cursor-grab active:cursor-grabbing" : ""
            }`}
        >
            <span className="text-white text-sm font-medium mr-6 pointer-events-none">{title}</span>
            <div className="window-controls flex gap-2">
                <ButtonIcon aria-label="Minimize window">
                    <MinusIcon />
                </ButtonIcon>
                <ButtonIcon aria-label="Expand window">
                    <ExpandIcon />
                </ButtonIcon>
                <ButtonIcon aria-label="Close window">
                    <CloseIcon />
                </ButtonIcon>
            </div>
        </div>
    );
}

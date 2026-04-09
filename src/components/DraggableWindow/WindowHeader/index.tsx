import ButtonIcon from "@/components/ButtonIcon";
import CloseIcon from "@/components/Icons/CloseIcon";
import ExpandIcon from "@/components/Icons/ExpandIcon";
import MinusIcon from "@/components/Icons/MinusIcon";

interface WindowHeaderProps {
    title: string;
    onMouseDown?: (e: React.MouseEvent) => void;
}

export function WindowHeader({ title, onMouseDown }: WindowHeaderProps) {
    return (
        <div
            onMouseDown={onMouseDown}
            className="border-b border-base-300 px-4 py-2 flex items-center justify-between select-none transition-colors"
        >
            <span className="text-white text-sm font-medium mr-6">{title}</span>
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

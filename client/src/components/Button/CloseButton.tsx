import type { FC } from "react";

interface CloseButtonProps {
    label: string;
    onClose: () => void;
    newClassName?: string;
    className?: string;
}

const CloseButton: FC<CloseButtonProps> = ({ label, onClose, newClassName, className }) => {
    return (
        <>
            <button type="submit" className={`
            ${newClassName
                    ? newClassName
                    : `px-4 py-3 bg-gray-400 hover:bg-gray-500 hover:border-gray-200  font-medium cursor-pointer rounded-lg shadow-lg 
                ${className}`
                }`}
                onClick={onClose}
            >
                {label}
            </button>
        </>
    )
}

export default CloseButton
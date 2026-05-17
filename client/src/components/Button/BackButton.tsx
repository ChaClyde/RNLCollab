import type { FC } from "react";
import { Link } from "react-router-dom";

interface BackButtonProps {
    label: string;
    path: string;
    newClassName?: string;
    className?: string;
}
const BackButton: FC<BackButtonProps> = ({
    label,
    path,
    newClassName,
    className,
}) => {
    return (
        <>
            <Link to={path}
            className={`
            ${newClassName
                    ? newClassName
                    : `px-4 py-3 bg-white hover:bg-gray-200 hover:border-gray-200 text-gray-500 hover:text-gray-700 font-medium cursor-pointer rounded-lg shadow-lg 
                ${className}`
                }`}>
                {label}
            </Link>
        </>
    )
}

export default BackButton
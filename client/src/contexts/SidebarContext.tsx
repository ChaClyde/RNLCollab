import { createContext, useContext, useState, type FC, type ReactNode } from "react";

type SideContextType = {
    isOpen: boolean;
    toggleSidebar: () => void;
}

const SidebarContext = createContext<SideContextType | undefined>(undefined)

export const useSidebar = () => {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
}

export const SidebarProvider: FC<{ children : ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
        // setIsOpen(!isOpen)
    }

    return (
        <SidebarContext.Provider value={{ isOpen, toggleSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};
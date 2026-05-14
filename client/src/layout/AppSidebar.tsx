import { useState } from "react"
import { useSidebar } from "../contexts/SidebarContext"
import { Link } from "react-router-dom"

const AppSidebar = () => {
    const { isOpen, toggleSidebar } = useSidebar()

    const [openMenus, setOpenMenus] = useState({})

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }))
    }

    const sidebarItems = [
        {
            text: "Dashboard",
            path: "/roles",
        },
        {
            text: "User Management",
            children: [
                {
                    text: "Roles & Permissions",
                    path: "/roles-permissions",
                    
                },
                {
                    text: "All Users",
                    path: "/users",
                },
            ],
        },
    ]

    return (
        <>
            {!isOpen && (
                <div
                    className="fixed inset-0 z-30 blur-lg sm:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform
                ${isOpen ? "-translate-x-full" : "translate-x-0"}
                sm:translate-x-0`}
            >
                <div className="h-full px-3 py-20 overflow-y-auto bg-blue-950">

                    <ul className="space-y-2 font-medium">

                        {sidebarItems.map((item, index) => (
                            <li key={index}>

                                {/* NORMAL LINK */}
                                {!item.children && (
                                    <Link
                                        to={item.path}
                                        className="flex items-center px-2 py-1.5 text-blue-200 rounded-lg hover:bg-blue-800"
                                    >
                                        <span>{item.text}</span>
                                    </Link>
                                )}

                                {/* DROPDOWN */}
                                {item.children && (
                                    <>
                                        <button
                                            onClick={() => toggleMenu(item.text)}
                                            className="
                                                w-full flex items-center justify-between
                                                px-2 py-1.5
                                                text-blue-200 rounded-lg
                                                hover:bg-blue-800
                                            "
                                        >
                                            <span>{item.text}</span>

                                            <svg
                                                className={`w-4 h-4 transition-transform duration-300
                                                ${openMenus[item.text] ? "rotate-180" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        <ul
                                            className={`
                                                overflow-hidden transition-all duration-300
                                                ${openMenus[item.text]
                                                    ? "max-h-40 mt-2"
                                                    : "max-h-0"}
                                            `}
                                        >
                                            {item.children.map((child, childIndex) => (
                                                <li key={childIndex}>
                                                    <Link
                                                        to={child.path}
                                                        className="
                                                            block pl-8 py-2 text-sm
                                                            text-blue-200
                                                            hover:bg-blue-800
                                                            rounded-lg
                                                        "
                                                    >
                                                        {child.text}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default AppSidebar
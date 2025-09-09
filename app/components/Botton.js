import Link from "next/link"

export const Button = ({ 
    link, 
    data, 
    variant = "primary", 
    size = "medium", 
    className = "",
    onClick,
    type = "link",
    disabled = false
}) => {
    
    // Base button styles
    const baseStyles = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    
    // Variant styles using CSS variables
    const variants = {
        primary: "bg-[var(--sec-accent-color)] text-white hover:bg-[var(--sec-accent-color)]/90 focus:ring-[var(--sec-accent-color)] shadow-lg hover:shadow-xl",
        secondary: "bg-[var(--accent-color)] text-white hover:bg-[var(--accent-color)]/90 focus:ring-[var(--accent-color)] shadow-lg hover:shadow-xl",
        outline: "border-2 border-[var(--sec-accent-color)] text-[var(--sec-accent-color)] hover:bg-[var(--sec-accent-color)] hover:text-white focus:ring-[var(--sec-accent-color)]",
        ghost: "text-[var(--text-color)] hover:bg-[var(--sec-bg-color)] focus:ring-[var(--accent-color)]",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl"
    }
    
    // Size styles
    const sizes = {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-8 py-4 text-lg",
        xlarge: "px-10 py-5 text-xl"
    }
    
    // Combine all styles
    const buttonStyles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`
    
    // Handle different button types
    if (type === "button" || onClick) {
        return (
            <button 
                className={buttonStyles}
                onClick={onClick}
                disabled={disabled}
                type={type}
            >
                {data}
            </button>
        )
    }
    
    // Default link button
    return (
        <button className={buttonStyles} disabled={disabled}>
            <Link href={link} className="w-full h-full flex items-center justify-center">
                {data}
            </Link>
        </button>
    )
}
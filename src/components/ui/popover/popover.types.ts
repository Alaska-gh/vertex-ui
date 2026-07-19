import type { ReactElement, ReactNode } from "react"

export type PopoverPlacement = 
| "top" 
| "top-start" 
| "top-end"
| "bottom"
| "bottom-start"
| "bottom-end"
| "left"
| "left-start"
| "left-end"
| "right"
| "right-start"
| "right-end"

export interface VPopoverProps {
    open?: boolean
    defaultOpen?: boolean  
    onOpenChange?: (open: boolean) => void
    trigger: ReactElement
    children: ReactNode
    placement?: PopoverPlacement
    offset?: number
    closeOnOutsideClick?: boolean
    closeOnEscape?: boolean
    className?: string
}
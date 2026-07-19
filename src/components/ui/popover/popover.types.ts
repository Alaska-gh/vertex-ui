import type { ReactElement, ReactNode } from "react"

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
    open?: boolean
    defaultOpen?: boolean  
    onOpenChange?: (open: boolean) => void
    trigger: ReactElement
    children: ReactNode
    side?: PopoverSide
    align?: PopoverAlign
    sideOffset?: number
    showArrow?: boolean
    className?: string
}
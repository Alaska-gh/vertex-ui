import { cva } from "class-variance-authority";


export const dropdownContentVariants = cva(
[
  "z-50",
  "min-w-[10rem]",
  "rounded-lg",
  "border",
  "border-border",
  "bg-background",
  "p-1",
  "text-foreground",
  "shadow-lg",
  "outline-none",

  // animation
  "animate-in",
  "fade-in-0",
  "zoom-in-95",
  "duration-200",

  // directional animation
  "data-[side=bottom]:slide-in-from-top-2",
  "data-[side=top]:slide-in-from-bottom-2",
  "data-[side=right]:slide-in-from-left-2",
  "data-[side=left]:slide-in-from-right-2",

],
);


export const dropdownItemVariants = cva(
[
  "flex",
  "items-center",
  "gap-2",
  "rounded-md",
  "px-2",
  "py-1.5",
  "text-sm",
  "outline-none",
  "transition-colors",

  "cursor-pointer",

  "focus:bg-muted",

  "data-[highlighted]:bg-muted",

  "data-[disabled]:pointer-events-none",
  "data-[disabled]:opacity-50",

],
{
 variants:{
   variant:{
     default:
       "text-foreground",

     destructive:
       "text-danger data-[highlighted]:bg-danger/10",
   },
 },

 defaultVariants:{
   variant:"default",
 },
}
);
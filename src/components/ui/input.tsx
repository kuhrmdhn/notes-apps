import React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, id, placeholder, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
          id={id}
          className={cn(
            "peer placeholder-transparent flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          placeholder={placeholder}
          {...props}
        />
        <label
          htmlFor={id}
          className="absolute -top-6 left-3 text-sm text-slate-800 peer-focus:text-red-main peer-focus:-top-6 peer-placeholder-shown:top-4 peer-placeholder-shown:text-slate-600 duration-200"
        >
          {placeholder}
        </label>
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }



"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import type * as LabelPrimitive from "@radix-ui/react-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type * as SelectPrimitive from "@radix-ui/react-select"

const SelectInputTile = ({
  label: { className: labelClassName, ...labelProps },
  select: {
    group,
    select: { onValueChange, value, ...selectProps } = {},
    trigger: { className: triggerClassName, error = "", touched = false, placeholder, ...triggerProps },
    value: valueProps,
    list,
  },
}: {
  label: React.ComponentProps<typeof LabelPrimitive.Root>
  select: {
    trigger: React.ComponentProps<typeof SelectPrimitive.Trigger> & { error?: string; touched?: boolean; placeholder?: string }
    value?: React.ComponentProps<typeof SelectPrimitive.Value>
    group?: React.ComponentProps<typeof SelectPrimitive.Group>
    select: React.ComponentProps<typeof SelectPrimitive.Root> & {
      onValueChange?: (value: string) => void
      value?: string
    }
    list: { value: string; textContent: string }[]
  }
}) => {
  return (
    <div className="space-y-2">
      <Label {...labelProps} className={`text-black text-[14px] font-medium ${labelClassName || ""}`}>
        {labelProps.children}
      </Label>
      <Select onValueChange={onValueChange} value={value} {...selectProps}>
        <SelectTrigger
          {...triggerProps}
          className={`h-[45px] rounded-[50px] bg-[#F9F9FF] border-[#F9F9FF] ${error !== "" && touched ? "border-red-500" : "border-none"} ${triggerClassName || ""}`}
        >
          <SelectValue placeholder={placeholder || "Select"} />
        </SelectTrigger>
        <SelectContent>
          {list?.map(({ textContent, value }, index) => (
            <SelectItem className="capitalize" value={value} key={index}>
              {textContent}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error !== "" && touched && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default SelectInputTile
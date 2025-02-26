import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
   className,
   ...props
}) {
   return (
      (<LabelPrimitive.Root
         data-slot="label"
         className={cn(
            "text-base text-gray-800 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
         )}
         {...props} />)
   );
}

export { Label }

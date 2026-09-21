import { FlaskConical } from 'lucide-react'

export const DemoNotice = () => (
  <div className="mt-4 flex items-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
    <FlaskConical className="h-4 w-4 shrink-0" />
    <span>
      Portfolio demo output is shown because the external AI provider is
      unavailable.
    </span>
  </div>
)

import { Telescope } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <Separator className="mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Telescope className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">EvalScope</span>
            <span className="text-xs text-muted-foreground">
              by Parsewave.ai
            </span>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Data sourced from official benchmark publications, HuggingFace
            datasets, and peer-reviewed papers. Last updated February 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}

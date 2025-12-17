
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const ControlledDialog = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = "xs",
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn("p-0 bg-gradient-to-br from-slate-800/95 via-slate-700/95 to-slate-900/95 backdrop-blur-xl border border-white/20 shadow-2xl shadow-black/50 text-white", {
          "max-w-lg": size === "xs",
          "max-w-screen-sm": size === "sm",
          "max-w-screen-md": size === "md",
          "max-w-screen-lg": size === "lg",
          "max-w-screen-xl": size === "xl",
        })}
      >
        <DialogHeader>
          <DialogTitle className="px-6 pt-6 pb-3 text-xl font-bold text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
            {title}
          </DialogTitle>

          {/* Custom gradient separator */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-6"></div>

          <DialogDescription className="px-6 py-4 text-white/90">
            {children}
          </DialogDescription>
        </DialogHeader>

        {footer && (
          <>
            {/* Another gradient separator */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-6"></div>
            
            <DialogFooter className="px-6 py-4 bg-white/5 rounded-b-lg border-t border-white/10">
              {footer}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ControlledDialog;
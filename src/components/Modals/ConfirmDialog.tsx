import { X } from "lucide-react";
import { useEffect } from "react";

export type ConfirmVariant = "default" | "danger";

export type ConfirmDialogOptions = {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
};

type ConfirmDialogProps = {
  open: boolean;
  options: ConfirmDialogOptions;
  busy?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmDialog = ({
  open,
  options,
  busy,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel, open]);

  if (!open) return null;

  const variant: ConfirmVariant = options.variant || "default";
  const confirmText = options.confirmText || (variant === "danger" ? "Delete" : "Confirm");
  const cancelText = options.cancelText || "Cancel";

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 backdrop-blur-[1px]"
        aria-label="Close dialog"
        onClick={onCancel}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-[480px] rounded-2xl border border-slate-200 bg-white shadow-xl"
      >
        <div className="flex items-start justify-between gap-3 p-5 border-b border-slate-200">
          <div>
            <div className="text-lg font-bold text-slate-900">
              {options.title}
            </div>
            {options.message ? (
              <div className="mt-1 text-sm text-slate-600 leading-relaxed">
                {options.message}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-100"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2 p-5">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-4 h-10 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 disabled:opacity-60"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className={`px-4 h-10 rounded-xl font-semibold text-white disabled:opacity-60 ${
              variant === "danger"
                ? "bg-red-600 hover:bg-red-700"
                : "bg-orange-500 hover:bg-orange-600"
            }`}
          >
            {busy ? "Please wait..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;


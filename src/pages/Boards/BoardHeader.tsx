import type { BoardMember } from "../../types/collaboration";
import { ChevronDown, ChevronUp, Mail, UserPlus, X } from "lucide-react";

type BoardHeaderProps = {
  title: string;
  description: string;
  sprintText: string;
  members: BoardMember[];
  roleLabel: string;
  collapsed: boolean;
  onToggleCollapsed: () => void;
  canInvite: boolean;
  inviteOpen: boolean;
  inviteEmail: string;
  inviteBusy: boolean;
  inviteMessage: string | null;
  onToggleInvite: () => void;
  onInviteEmailChange: (next: string) => void;
  onSendInvite: () => void;
};

const getInitials = (displayName: string) =>
  displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const BoardHeader = ({
  title,
  description,
  sprintText,
  members,
  roleLabel,
  collapsed,
  onToggleCollapsed,
  canInvite,
  inviteOpen,
  inviteEmail,
  inviteBusy,
  inviteMessage,
  onToggleInvite,
  onInviteEmailChange,
  onSendInvite,
}: BoardHeaderProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200">
      <div
        className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
          collapsed ? "p-4" : "p-5"
        }`}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div className="text-xl font-bold text-slate-900 truncate">
              {title}
            </div>
          </div>
          {!collapsed ? (
            <>
              <div className="text-sm text-slate-600">{description}</div>
              <div className="text-xs text-slate-500 mt-1">{sprintText}</div>
            </>
          ) : null}
        </div>

        <div className="flex items-center justify-between md:justify-end gap-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {members.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="w-8 h-8 rounded-full bg-indigo-600 text-white text-[11px] font-bold grid place-items-center border-2 border-white"
                  title={member.displayName}
                >
                  {getInitials(member.displayName)}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-slate-500 capitalize">
              {roleLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {canInvite ? (
              <button
                type="button"
                onClick={onToggleInvite}
                className={`inline-flex items-center gap-2 px-3 h-9 rounded-xl text-sm font-semibold border transition ${
                  inviteOpen
                    ? "bg-orange-50 text-orange-700 border-orange-200"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <UserPlus size={16} />
                Invite
              </button>
            ) : null}

            <button
              type="button"
              onClick={onToggleCollapsed}
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
              title={collapsed ? "Expand" : "Minimize"}
              aria-label={collapsed ? "Expand board header" : "Minimize board header"}
            >
              {collapsed ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </button>
          </div>
        </div>
      </div>

      {inviteOpen && canInvite && !collapsed ? (
        <div className="px-5 pb-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-bold text-slate-800">
                  Invite someone to this project
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  They will receive an invite and can accept it from Home.
                </div>
              </div>
              <button
                type="button"
                onClick={onToggleInvite}
                className="p-2 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-200/60"
                aria-label="Close invite panel"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 flex flex-col sm:flex-row gap-2">
              <div className="flex items-center gap-2 h-10 px-3 rounded-xl bg-white border border-slate-200 flex-1">
                <Mail size={16} className="text-slate-500" />
                <input
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => onInviteEmailChange(e.target.value)}
                  placeholder="Email user yang ingin diinvite"
                  className="w-full outline-none bg-transparent text-sm"
                  disabled={inviteBusy}
                />
              </div>
              <button
                type="button"
                onClick={onSendInvite}
                disabled={inviteBusy || !inviteEmail.trim()}
                className="h-10 px-4 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 disabled:opacity-60"
              >
                {inviteBusy ? "Sending..." : "Send invite"}
              </button>
            </div>

            {inviteMessage ? (
              <div className="mt-2 text-xs text-slate-700">{inviteMessage}</div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BoardHeader;

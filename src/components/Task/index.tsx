import { DraggableProvided } from "@hello-pangea/dnd";
import { CalendarClock, CheckSquare, Clock, Flag } from "lucide-react";
import { TaskT } from "../../types";
import type { UiPreferences } from "../../types/ui";
import type { BoardMember } from "../../types/collaboration";

interface TaskProps {
  task: TaskT;
  provided: DraggableProvided;
  onClick: (task: TaskT) => void;
  uiPreferences?: UiPreferences;
  assignee?: BoardMember;
}

const Task = ({ task, provided, onClick, uiPreferences, assignee }: TaskProps) => {
  const { title, description, priority, deadline, image, alt, tags } = task;
  const showImages = uiPreferences?.showImages ?? true;
  const showTags = uiPreferences?.showTags ?? true;
  const showDescriptions = uiPreferences?.showDescriptions ?? true;
  const compactMode = uiPreferences?.compactMode ?? false;
  const checklistItems = task.checklist || [];
  const checklistDone = checklistItems.filter((item) => item.done).length;
  const loggedMins = task.timeLoggedMins || 0;
  const dueDate = typeof task.dueDate === "string" ? task.dueDate : "";
  const initials = assignee?.displayName
    ? assignee.displayName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase()
    : "";

  const priorityLabel =
    priority === "high" ? "High" : priority === "medium" ? "Medium" : "Low";
  const priorityClass =
    priority === "high"
      ? "bg-red-50 text-red-700 ring-red-200"
      : priority === "medium"
        ? "bg-orange-50 text-orange-700 ring-orange-200"
        : "bg-blue-50 text-blue-700 ring-blue-200";

  const deadlineText =
    typeof deadline === "number" && deadline > 0 ? `${deadline}m` : "";

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onClick(task)}
      className={`w-full cursor-grab active:cursor-grabbing bg-white flex flex-col justify-between items-start rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all ${
        compactMode ? "gap-2 px-3 py-3" : "gap-3 px-3.5 py-4"
      }`}
    >
      {showImages && image && (
        <img
          src={image}
          alt={alt || "Task Image"}
          className="w-full h-[170px] rounded-xl object-cover"
        />
      )}

      {showTags ? (
        <div className="flex flex-wrap items-center gap-2">
          {tags?.map((tag) => (
            <span
              key={tag.title}
              className="px-2.5 py-1 text-[12px] font-semibold rounded-lg"
              style={{ backgroundColor: tag.bg, color: tag.text }}
            >
              {tag.title}
            </span>
          ))}
        </div>
      ) : null}
      <div className="w-full flex items-start flex-col gap-0">
        <span className="text-[15.5px] font-semibold text-slate-800 leading-snug">
          {title}
        </span>
        {showDescriptions ? (
          <span className="text-[13.5px] text-slate-500 leading-snug">
            {description}
          </span>
        ) : null}
      </div>
      <div className="w-full border-t border-dashed border-slate-200"></div>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2 py-1 ring-1 ${priorityClass}`}>
            <Flag size={14} />
            {priorityLabel}
          </span>
          {dueDate ? (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold rounded-full px-2 py-1 bg-slate-100 text-slate-700">
              <CalendarClock size={14} />
              {dueDate}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {checklistItems.length > 0 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
              <CheckSquare size={14} />
              {checklistDone}/{checklistItems.length}
            </span>
          ) : null}
          {loggedMins > 0 ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
              <Clock size={14} />
              {loggedMins}m
            </span>
          ) : null}
          {deadlineText ? (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
              <Clock size={14} />
              {deadlineText}
            </span>
          ) : null}
          {assignee ? (
            <div
              className="w-8 h-8 rounded-full bg-indigo-600 text-white text-[11px] font-bold grid place-items-center ring-2 ring-white"
              title={assignee.displayName}
            >
              {initials}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Task;

import { CATEGORIES } from "@/constants";
import { Checkbox } from "@/shared/ui/checkbox";
import { INote } from "@/types/note";
import clsx from "clsx";
import { Pencil, Trash2 } from "lucide-react";

const NoteCard = ({
  note,
  onToggleComplete,
  handleEdit,
  handleDelete,
}: {
  note: INote;
  onToggleComplete: (noteId: string) => void;
  handleEdit: (note: INote) => void;
  handleDelete: (noteId: string) => void;
}) => {
  const categoryObj = CATEGORIES.find(
    (category) => category.value === note.category,
  );

  return (
    <div
      className="
        group mt-4 flex flex-col gap-3 rounded-lg border border-athens-gray
        bg-white p-5 shadow-sm fade-in
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-3xl">{note.icon}</span>
        <div className="flex gap-1">
          <button
            className="
              flex size-8 cursor-pointer items-center justify-center rounded-md
              text-sm font-medium text-pale-sky
              hover:bg-athens-gray hover:text-black-pearl
            "
            onClick={() => handleEdit(note)}
          >
            <Pencil className="size-4" />
          </button>
          <button
            className="
              flex size-8 cursor-pointer items-center justify-center rounded-md
              text-sm font-medium text-flamingo
              hover:bg-athens-gray hover:text-black-pearl
            "
            onClick={() => handleDelete(note.id)}
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3
          className={clsx(
            "line-clamp-2 text-lg font-semibold text-black-pearl",
            note.isComplete && `text-pale-sky line-through`,
          )}
        >
          {note.title}
        </h3>
        <p className="line-clamp-3 text-sm text-pale-sky">{note.description}</p>
      </div>

      <div className="flex justify-between border-t border-athens-gray pt-3">
        <span
          className={`
            text-xs font-medium text-white
            ${categoryObj?.color}
            rounded-full px-2.5 py-1
          `}
        >
          {categoryObj?.label}
        </span>
        <div className="flex items-center gap-2">
          <Checkbox
            id={note.id}
            checked={note.isComplete}
            className="
              cursor-pointer rounded-sm text-white
              data-[state=checked]:border-salem data-[state=checked]:bg-salem
            "
            onCheckedChange={() => onToggleComplete(note.id)}
          />
          <label htmlFor={note.id}>
            {note.isComplete ? "Done" : "Mark done"}
          </label>
        </div>
      </div>
    </div>
  );
};
export default NoteCard;

import { Plus, StickyNote } from "lucide-react";

const Header = ({
  setShowAddNoteModal,
  totalNotes,
}: {
  setShowAddNoteModal: (open: boolean) => void;
  totalNotes: number;
}) => {
  return (
    <div className="border-b border-athens-gray py-4">
      <div className="m-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex size-10 items-center justify-center rounded-xl
              bg-cornflower-blue
            "
          >
            <StickyNote className="size-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold">Notes</h1>
            <p className="text-sm text-pale-sky">
              {totalNotes} {totalNotes > 1 ? "Notes" : "Note"}
            </p>
          </div>
        </div>

        <button
          className="
            flex cursor-pointer items-center justify-center gap-2 rounded-md
            bg-cornflower-blue px-4 py-2.5 text-sm font-medium text-white
            shadow-sm
          "
          onClick={() => setShowAddNoteModal(true)}
        >
          <Plus className="size-4" />
          Add Notes
        </button>
      </div>
    </div>
  );
};
export default Header;

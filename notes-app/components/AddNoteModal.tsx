import { CATEGORIES, DEFAULT_EMOJIS } from "@/constants";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Textarea } from "@/shared/ui/textarea";
import { INote } from "@/types/note";
import { clsx } from "clsx";
import { useState } from "react";

const AddNoteModal = ({
  showAddNoteModal,
  setShowAddNoteModal,
  handleAddNote,
  editingNote,
  setEditingNote,
}: {
  showAddNoteModal: boolean;
  setShowAddNoteModal: (open: boolean) => void;
  handleAddNote: (note: INote) => void;
  editingNote: INote | null;
  setEditingNote: (note: INote | null) => void;
}) => {
  const [formData, setFormData] = useState<INote>(
    editingNote
      ? editingNote
      : {
          id: "",
          icon: "📚",
          title: "",
          description: "",
          category: "work",
          isComplete: false,
        },
  );
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const dialogTitle = editingNote ? "Edit Note" : "Add Note";
  const dialogButtonTitle = editingNote ? "Update Note" : "Add Note";

  const onOpenChange = () => {
    setShowAddNoteModal(false);
    setEditingNote(null);
  };

  const onChange = (key: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "title" || key === "description") {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const onAddNoteClick = (note: INote) => {
    const newErrors: { title?: string; description?: string } = {};

    if (!note.title.trim()) newErrors.title = "Title is required.";
    if (!note.description.trim())
      newErrors.description = "Description is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    handleAddNote(note);
  };

  const onCancelButtonClick = () => {
    setShowAddNoteModal(false);
    setEditingNote(null);
  };

  return (
    <Dialog open={showAddNoteModal} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="mt-2 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Icon <span className="text-destructive">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {DEFAULT_EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  className={clsx(
                    `cursor-pointer rounded-lg p-2 text-xl`,
                    formData.icon === emoji
                      ? `bg-cornflower-blue/10 ring-2 ring-cornflower-blue`
                      : `hover:bg-athens-gray`,
                  )}
                  onClick={() => onChange("icon", emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Title <span className="text-destructive">*</span>
            </label>
            <Input
              className={clsx(
                "bg-alabaster",
                errors.title && "border-destructive",
              )}
              placeholder="Note title..."
              value={formData.title}
              onChange={(e) => onChange("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Description <span className="text-destructive">*</span>
            </label>
            <Textarea
              className={clsx(
                "min-h-24 resize-none bg-alabaster",
                errors.description && `border-destructive`,
              )}
              placeholder="Note description..."
              value={formData.description}
              onChange={(e) => onChange("description", e.target.value)}
            />
            {errors.description && (
              <p className="text-xs text-destructive">{errors.description}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">
              Category <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.category}
              onValueChange={(value) => onChange("category", value)}
            >
              <SelectTrigger className="w-full cursor-pointer bg-alabaster">
                <SelectValue />
              </SelectTrigger>
              <SelectContent position="popper">
                {CATEGORIES.map((category) => (
                  <SelectItem
                    key={category.value}
                    value={category.value}
                    className="cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`
                          size-2 rounded-full
                          ${category.color}
                        `}
                      />
                      {category.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between">
            <label className="text-sm font-medium">
              Mark as complete <span className="text-destructive">*</span>
            </label>
            <Switch
              checked={formData.isComplete}
              onCheckedChange={(value) => onChange("isComplete", value)}
              className="cursor-pointer"
            />
          </div>
        </div>
        <DialogFooter className="mt-8">
          <Button
            className="
              cursor-pointer border border-athens-gray bg-transparent text-black
              hover:bg-transparent
            "
            onClick={onCancelButtonClick}
          >
            Cancel
          </Button>
          <Button
            className="
              cursor-pointer bg-cornflower-blue text-white
              hover:bg-cornflower-blue
            "
            onClick={() => onAddNoteClick(formData)}
          >
            {dialogButtonTitle}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddNoteModal;

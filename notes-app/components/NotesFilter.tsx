import { CATEGORIES, COMPLETION_FILTER } from "@/constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface INotesFilterProps {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  completionFilter: string;
  setCompletionFilter: (value: string) => void;
}

const NotesFilter = ({
  categoryFilter,
  setCategoryFilter,
  completionFilter,
  setCompletionFilter,
}: INotesFilterProps) => {
  return (
    <div className="mt-4 flex gap-4">
      <Select
        value={categoryFilter}
        onValueChange={(value) => setCategoryFilter(value)}
      >
        <SelectTrigger className="cursor-pointer bg-alabaster">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="all" className="cursor-pointer">
            All categories
          </SelectItem>
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

      <Select
        value={completionFilter}
        onValueChange={(value) => setCompletionFilter(value)}
      >
        <SelectTrigger className="cursor-pointer bg-alabaster">
          <SelectValue />
        </SelectTrigger>
        <SelectContent position="popper">
          {COMPLETION_FILTER.map((completion) => (
            <SelectItem
              key={completion.value}
              value={completion.value}
              className="cursor-pointer"
            >
              {completion.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default NotesFilter;

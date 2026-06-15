import { useState } from "react";
import { cn } from "../lib/utils";
import { X } from "lucide-react";

const TagInput = ({
  className,
  items,
  addItem,
  removeItem,
  placeholder = "Add item",
}: {
  className?: string;
  items: string[];
  placeholder?: string;
  addItem: (newItem: string) => void;
  removeItem: (item: string) => void;
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <div
      className={cn(
        "border w-xs flex gap-2 px-2 py-1.5 rounded-2xl flex-wrap items-start ",
        className,
      )}
    >
      {items?.map((item) => (
        <>
          <div
            key={item}
            className={cn(
              "border bg-[#f9f9f9] flex items-center gap-1 rounded-2xl px-2 py-1.5 text-xs ",
            )}
          >
            {item}
            <X
              size={12}
              className="cursor-pointer"
              onClick={() => {
                removeItem(item);
              }}
            />
          </div>
        </>
      ))}
      <div className="flex-1 min-w-20 w-full ">
        <input
          id="input"
          type="text"
          placeholder={placeholder}
          className="w-full overflow-x-visible outline-none px-2 py-1.5 text-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim() !== "") {
              e.preventDefault();

              addItem(inputValue.trim());
              setInputValue("");
            }
          }}
        />
      </div>
    </div>
  );
};

export default TagInput;

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { TodoItemType } from "@utils/types";

const TodoItem: React.FC<TodoItemType> = ({
  id,
  checked,
  content,
  onDelete,
  onToggle,
}) => {
  return (
    <div
      className={`flex items-center justify-between bg-deep_grey rounded-lg p-4 px-8 shadow-md ${
        checked ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center">
        <Image
          className={`cursor-pointer transition-transform transform active:scale-95 mr-3 ${
            checked && "-ml-2"
          }`}
          src={checked ? "/checked.svg" : "/unchecked.svg"}
          alt={checked ? "Checked icon" : "Unchecked icon"}
          width={checked ? 26 : 17.45}
          height={checked ? 26 : 17.45}
          onClick={() => onToggle(id)}
        />
        <Link href={`/todo/${id}`}>
          <span className={`ml-2 ${checked ? "line-through" : ""}`}>
            {content}
          </span>
        </Link>
      </div>
      <div>
        <Image
          className="cursor-pointer transition-transform transform active:scale-95 ml-10"
          src="/trash.svg"
          alt="Trash icon"
          width={24}
          height={24}
          onClick={() => onDelete(id)}
        />
      </div>
    </div>
  );
};

export default TodoItem;

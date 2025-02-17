import React from "react";
import Image from "next/image";

const EmptyTodo: React.FC = () => {
  return (
    <div className="block justify-items-center">
      <Image src="/clipboard.svg" alt="Clipboard icon" width={56} height={56} />
      <p className="text-subtitle text-light_fade_grey py-4">
        You don&apos;t have any tasks registered yet.
      </p>
      <p className="text-subtitle text-light_grey py-2">
        Create tasks and organize your to-do items.
      </p>
    </div>
  );
};

export default EmptyTodo;

import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex justify-center bg-black items-center pt-20 pb-20">
      <Image
        className="mr-2"
        src="/rocket.svg"
        alt="TodoApp logomark"
        width={22}
        height={36}
      />
      <span className="text-light_blue text-title font-extrabold mr-2">
        Todo
      </span>{" "}
      <span className="text-purple font-extrabold text-title">App</span>
    </div>
  );
};

export default Navbar;

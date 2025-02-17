import React from "react";
import Link from "next/link";

import { BreadcrumbType } from "@utils/types";

const Breadcrumb: React.FC<BreadcrumbType> = ({
  leftContent,
  leftLink,
  rightContent,
  rightLink,
  extraStyles,
}) => {
  return (
    <div className={`flex items-center justify-between ${extraStyles}`}>
      {leftContent && (
        <div>
          {leftLink ? (
            <Link
              className="transition-transform transform active:scale-95"
              href={leftLink}
            >
              {leftContent}
            </Link>
          ) : (
            rightContent
          )}
        </div>
      )}
      {rightContent && (
        <div>
          {rightLink ? (
            <Link
              className="transition-transform transform active:scale-95"
              href={rightLink}
            >
              {rightContent}
            </Link>
          ) : (
            rightContent
          )}
        </div>
      )}
    </div>
  );
};

export default Breadcrumb;

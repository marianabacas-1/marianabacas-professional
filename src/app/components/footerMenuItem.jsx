import React from "react";
import Link from "next/link";

const FooterMenuItem = ({ href, item }) => {

  return (
    <li>
        <Link href={href} className="text-sm hover:text-gray-700 text-primary">
            {item}
        </Link>
    </li>
  );
};

export default FooterMenuItem;

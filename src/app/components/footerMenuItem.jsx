import React from "react";
import Link from "next/link";

const FooterMenuItem = ({ href, item }) => {

  return (
    <li>
        <Link href={href} className="text-sm hover:text-white text-gray-700">
            {item}
        </Link>
    </li>
  );
};

export default FooterMenuItem;

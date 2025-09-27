import React from "react";

export default function HomeSection({ title, children, icon }) {

    return(
        <div className="my-4 p-4 bg-secondaryWithOp2 rounded-xl shadow">
            <div className="text-gray-700 text-lg md:text-xl font-semibold flex gap-2 items-center"><span>{icon}</span><span>{title}</span></div>
            <hr className="border-t-2 border-primary w-full"/>
            <div>{children}</div>
        </div>
    );
} 
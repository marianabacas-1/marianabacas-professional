import React from "react";

export default function DetailCard({ title, children, icon }) {

    return(
        <div className="relative rounded-xl shadow-secondarySh p-4 md:p-6">
            <div className="absolute -top-4 left-4 bg-gradient-to-r from-secondary from-10% via-secondaryWithOp via-30% to-secondaryWithOp2 to-90% my-auto text-white p-1 rounded-lg flex items-center shadow">{icon}</div>
            <div className="text-md md:text-lg text-gray-700">{title}</div>
            <hr className="border-t border-green-100 w-full mt-1 mb-4" /> 
            <div className="px-2">{children}</div>
        </div>
    );
} 
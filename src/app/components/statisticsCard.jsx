import React from "react";

export default function StatisticsCard({icon, value, title}) {

    return(
       <div className="p-4 rounded-lg shadow-secondarySh flex align-center justify-between text-gray-700">
            <div className="my-auto">
                <div className="text-md font-light">{title}</div>
                <div className="text-lg font-semibold">{value}</div>
            </div>
            <div className="bg-gradient-to-r from-primary from-10% via-primaryWithOp via-30% to-primaryWithOp2 to-90% my-auto text-white p-1 rounded-lg flex items-center h-4/6 shadow">{icon}</div>
       </div>
    );
} 
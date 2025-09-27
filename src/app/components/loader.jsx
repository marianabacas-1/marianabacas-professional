import React from "react";
import { HashLoader
} from "react-spinners";

export default function Loader({ text }) {

    return(
        <div className="h-full w-full grid justify-center">
            <HashLoader
  className="mt-24 mx-auto" size={40} color="rgba(150, 29, 112, 1)" />
            <div className="text-md text-center text-primary mt-2">{text}</div>
        </div>
    );
}

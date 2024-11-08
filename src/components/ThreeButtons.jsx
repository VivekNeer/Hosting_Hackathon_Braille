// import React from 'react';
import {Link} from "react-router-dom";

const ThreeButtons = () => {
    return (
        <div className="flex flex-col items-center gap-12 justify-center">
            <div className=" flex gap-12">
                <button className="btn bg-neutral text-white w-64 h-24 text-lg">Export As PDF</button>
                <button className="btn bg-neutral text-white w-64 h-24 text-lg">Export As BRF</button>
            </div>
            <div className="flex gap-12 mb-10">
                <Link to="/texttobraille">
                    <button className={"btn bg-red-600 w-64 h-24 text-lg bottom-16 "}>Text to
                        Braille
                    </button>
                </Link>
                <Link to="/imagetobraille">
                    <button className={"btn bg-red-600 w-64 h-24 text-lg bottom-16 "}>Image to
                        Braille
                    </button>
                </Link>
                <Link to="/pdftobraille">
                    <button className={"btn bg-red-600 w-64 h-24 text-lg bottom-16"}>PDF to
                        Braille
                    </button>
                </Link>
            </div>
        </div>
    )
}
export default ThreeButtons

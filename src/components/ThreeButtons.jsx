// import React from 'react';
import {Link} from "react-router-dom";

const ThreeButtons = () => {
    return (
        <div className="flex flex-row items-center gap-12 justify-center">
                <Link to="/texttobraille">
                    <button className="btn btn-accent w-64 h-24 text-lg bottom-16 ">Text to
                        Braille
                    </button>
                </Link>
                <Link to="/imagetobraille">
                    <button className="btn btn-accent  w-64 h-24 text-lg bottom-16 ">Image to
                        Braillea
                    </button>
                </Link>
                <Link to="/pdftobraille">
                    <button className="btn btn-accent w-64 h-24 text-lg bottom-16">PDF to
                        Braille
                    </button>
                </Link>
        </div>
    )
}
export default ThreeButtons

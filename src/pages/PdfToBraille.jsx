// import React from 'react'

import ThreeButtons from "../components/ThreeButtons.jsx";
import TwoButtons from "../components/TwoButtons.jsx";

const PdfToBraille = () => {
    return (
        <div className="flex justify-center flex-col items-center w-full gap-10">
            <div className="flex gap-16">
                <div className="text-center">
                    <article className="prose">
                        <h2>PDF</h2>
                    </article>
                    <input type="file" className="file-input file-input-bordered w-full max-w-xs mt-40"/>
                </div>
                <div className="text-center">
                    <article className="prose">
                        <h2>Braille</h2>
                    </article>
                    <textarea className="textarea textarea-bordered h-96 w-96 text-center resize-none"
                              placeholder="Output"></textarea>
                </div>
            </div>
            <TwoButtons />
            <ThreeButtons/>
        </div>
    )
}
export default PdfToBraille

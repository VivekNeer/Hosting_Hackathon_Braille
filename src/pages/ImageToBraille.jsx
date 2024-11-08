// import React from 'react'

import ThreeButtons from "../components/ThreeButtons.jsx";

const ImageToBraille = () => {
    return (
        <div className="flex justify-center flex-col items-center w-full gap-48">
            <div className="flex gap-36">
                <div className="text-center">
                    <article className="prose">
                        <h2>Image</h2>
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
            <ThreeButtons/>
        </div>
    )
}
export default ImageToBraille


// import React from 'react'

import TextToBrail from "../components/TextToBrailFunc.jsx";
import ThreeButtons from "../components/ThreeButtons.jsx";
import TwoButtons from "../components/TwoButtons.jsx";

const TextToBraille = () => {
    return (
        <div className="flex justify-center flex-col items-center w-full gap-10">
        <div className="flex gap-16 flex-col">
          <TextToBrail />
        </div>
        <ThreeButtons />
      </div>
    )
}
export default TextToBraille

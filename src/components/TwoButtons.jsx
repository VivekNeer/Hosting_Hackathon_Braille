import React from 'react'

const TwoButtons = () => {
  return (
    <div className="flex flex-row items-center gap-4 justify-center">
    <button className="btn btn-primary text-white w-64 h-24 text-lg">Export As PDF</button>
    <button className="btn btn-primary text-white w-64 h-24 text-lg">Export As BRF</button>
    </div>
)
}

export default TwoButtons
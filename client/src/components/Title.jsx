import React from 'react'


const Title = ({ title, subTitle, align, font }) => {
    return (
        <div className={`flex flex-col justify-center text-center ${align === "left" && "md:item-start md:text-left"}`}>
            <h1 className={`text-4xl md:text-[40px] ${font || "font-playfair"}`}>{title}</h1>
            <p className="text-gray-500/90 text-sm md:text-base mt-2 max-w-174">{subTitle}</p>
        </div>
    )
}

export default Title

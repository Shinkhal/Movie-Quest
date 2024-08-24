import React from 'react';

const Box = (props) => {
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    const rating = props.rating.toFixed(1); // Format the rating to one decimal point

    return (
        <div className="shadow border border-white min-h-[200px] sm:min-h-[150px] md:min-h-[200px] lg:min-h-[200px] xl:min-h-[300px] mt-3 text-white relative group">
            <img src={IMGPATH + props.image} alt={props.title} className='w-full h-full object-cover' />
            <div className='absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <span className='text-2xl'>{props.title}</span>
                <span className='text-xl text-yellow-500 font-bold'>{rating}</span>
            </div>
        </div>
    );
}

export default Box;

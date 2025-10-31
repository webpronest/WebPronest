import Basics from '@/public/HTML_CSS_JS.png';
import FD from '@/public/Fronten_development.png';
import Image, { StaticImageData } from 'next/image';

type ClassesProps = {
  title: string;     // define prop type
  price?: string; // optional prop (with ?)
  image: StaticImageData;
};

const ClassCard = ({title,price,image}:ClassesProps) => {
    return (
        <div className="shadow-md rounded-lg bg-white hover:shadow-2xl hover:shadow-blue-200 duration-300 cursor-pointer">
            <div className="w-full">
                <Image src={image} className='w-full h-[250px] object-cover object-center' alt="" />
            </div>
            <div className='p-5 text-start'>
                <p className='text-xl font-semibold my-5'>{title}</p>
                <div className="flex justify-between items-center px-5">
                    <label className='border px-3 py-1 rounded-lg inline-block text-end text-red-400 font-medium'>Hinglish</label>
                    <p className='text-xl font-bold text-center'>Rs. {price}/-</p>
                </div>
                <div className="flex flex-col gap-4 justify-center items-stretch px-5 mt-14 mb-2">
                    <button className='border border-gray-400 text-black px-5 py-2 rounded-lg font-medium cursor-pointer hover:scale-105 duration-300'>View Syllabus</button>
                    <button className='bg-cyan-400 text-white uppercase px-5 py-2 rounded-lg font-semibold cursor-pointer hover:animate-bounce duration-200'>Regsiter Course</button>
                </div>
            </div>
        </div>
    )
}

export default ClassCard;
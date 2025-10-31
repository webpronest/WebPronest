import Link from "next/link";
import Basics from '@/public/HTML_CSS_JS.png';
import FD from '@/public/Fronten_development.png';
import MernStack from '@/public/Mern_Stack.png';
import ClassCard from "@/components/ClassCard";

export default function Home() {
  const courses = [
    {
      title: "Foundation Of Web Development | HTML CSS JS",
      price: 1000,
      image: Basics,
      syllabus: ""
    },
    {
      title: "Frontend Development | HTML CSS JS REACT JS",
      price: 2000,
      image: FD,
      syllabus: ""
    },
    {
      title: "Fullstack Development | HTML CSS JS MERN STACK",
      price: 3000,
      image: MernStack,
      syllabus: ""
    }
  ]
  return (
    <section className="text-center py-16">
      <h1 className="text-4xl font-bold">
        Learn Web Development <span className="uperrcase text-cyan-400 text-5xl">[LIVE]</span> 🚀
      </h1>
      <p className="mt-4 text-gray-600 max-w-xl mx-auto">
        Join WebProNest to master Web Development through
        engaging LIVE classes and real projects.
      </p>
      <h2 className="mt-10 text-lg font-medium py-1 px-5 rounded-lg border-[2px] border-cyan-400 inline-block">Limites Seats - <span className="text-red-500 text-2xl">10</span> students per batch</h2>
      {/* <Link
        href="/register"
        className="inline-block mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
      >
        Register Now
      </Link> */}
      <div className="grid grid-cols-3 p-5 mt-10 py-14 gap-10 w-[90%] mx-auto">
        {
          courses.map((course,index) =>
            <ClassCard 
            key={index} 
            title={course.title}
            price={course.price}
            image={course.image}
          />)
        }
      </div>
    </section>
  );
}

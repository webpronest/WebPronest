import Link from "next/link";
import Logo from "@/public/WebProNest.png";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-1 px-6">
        <Link href="/" className="text-xl font-semibold text-cyan-500 flex items-center">
           <Image src={Logo} alt="Webpronest-logo" width={50}/>
           <p>WebProNest</p>
        </Link>
        <div className="space-x-6 text-gray-700 font-medium">
          {/* <Link href="/">Home</Link>
          <Link href="/classes">Classes</Link>
          <Link href="/register">Register</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link> */}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
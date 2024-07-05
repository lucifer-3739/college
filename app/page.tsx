'use client'
import toast from 'react-hot-toast';
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Hero from '@/components/hero';
import Banner from '@/components/banner';
import { ModeToggle } from '@/components/modetoggle';

export default function Home() {
  const router = useRouter();
  const logout = async () => {
    try {
      await axios.get('/api/user/logout')
      console.log("logout successfully");

      toast.success('Logout successful')
      router.push('/login')
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message)
    }
  }
  return (
    <div className="flex flex-col p-10">
      <div className='z-10' >
        <div className=' absolute top-6 right-6'>
          <ModeToggle />

        </div>
        <button
          onClick={logout}
          className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-24"
        >Logout</button>
        <Hero />
      </div>
      <Banner />
    </div>
  );
}

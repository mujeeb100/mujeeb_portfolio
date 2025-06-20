"use client";

import Head from 'next/head';

export default function Header() {

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <>

      {/* <Head>
        <title>Mujeeb Ansari | Front End Developer</title>
      </Head> */}
      <main className="bg-gradient-to-b from-white to-[#f2f4fc] text-gray-800 sticky top-0 z-50 w-full">
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
          <div className="text-xl font-bold text-blue-600">MA <span className="text-black">Mujeeb Ansari</span></div>
          <nav className="space-x-6 text-gray-600 font-medium">
            <button onClick={()=>handleScroll("home")} className="text-blue-600">Home</button>
            <button onClick={()=>handleScroll('about')}>About</button>
            <button onClick={()=>handleScroll('experience')}>Experience</button>
            <button onClick={()=>handleScroll('experience')}>Projects</button>
            <button onClick={()=>handleScroll('skills')}>Skills</button>
            <button onClick={()=>handleScroll('conatct')}>Contact</button>
          </nav>
        </header>
      </main>
    </>
  );
}

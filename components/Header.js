import { SearchIcon, XIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import { useRef } from "react";
import HeaderOptions from "./HeaderOptions";

function Header() {
  const router = useRouter();
  const searchInputRef = useRef(null);

  const search = (e) => {
    e.preventDefault();
    const term = searchInputRef.current.value;
    if (!term) return;
    router.push(`/search?term=${term}`);
  };

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex items-center w-full p-6">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png"
          width={120}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <form className="flex items-center flex-grow max-w-3xl px-6 py-3 ml-10 mr-5 border border-gray-200 rounded-full shadow-lg">
          <input
            type="text"
            ref={searchInputRef}
            className="flex-grow w-full focus:outline-none"
            defaultValue={router.query.term}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                if (e.target.value !== '') {
                  router.push(`/search?term=${e.target.value}`);
                }
              }
            }}
          />
          <XIcon
            className="text-gray-500 transition duration-100 transform cursor-pointer h-7 hover:scale-125 sm:mr-3"
            onClick={() => (searchInputRef.current.value = "")}
          />
          <button type="submit" onClick={search}>
            <SearchIcon className="hidden h-6 text-blue-500 sm:inline-flex" />
          </button>
        </form>
      </div>

      <HeaderOptions />
    </header>
  );
}

export default Header;

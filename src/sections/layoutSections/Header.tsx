import React, { useEffect, useRef, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

import axios from "axios";
import LanguageSwitcher from "../../components/uicomponents/LanguageSwitcher.tsx";

// Interfeyslar
interface CourseItem {
  icon: string;
  title: string;
  short_description: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [data, setData] = useState<CourseItem[]>([]);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const burgerRef = useRef<HTMLDivElement | null>(null);

  const fetchCourses = async (setData, setLoading) => {
    try {
      const response = await axios.get(
        "https://ustudy.201.uz/uz/api/v1/course/courses/"
      );
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("xatolik:", error);
    } finally {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  useEffect(() => {
    fetchCourses(setData, setLoading);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        burgerRef.current &&
        !burgerRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header
        className={`sm:px-[70px] px-[35px] fixed top-0 w-full z-9999 transition duration-500 ${
          isScrolled ? ` bg-[#09213c6e]` : "bg-transparent"
        }`}
      >
        <nav className="flex justify-between items-center py-[15px]">
          <a href="http://localhost:3000/" className="flex gap-5 items-center">
            <div>
              <img
                className="w-[50px] h-[35px]"
                src="/images/img/logo_1.png"
                alt="Logo"
              />
            </div>
            <span className="w-[1px] h-[50px] bg-[#FFFFFFCC]"></span>
            <div>
              <h2 className="text-[#FFFFFFCC]">
                U study <br />
                by Uzinfocom
              </h2>
            </div>
          </a>

          <div className="lg:hidden">
            <button
              aria-label="Menyu ochish"
              className="text-[#FFFFFFCC] text-2xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              <GiHamburgerMenu />
            </button>
          </div>

          <li className="hidden lg:flex flex-1 justify-center gap-[30px]">
            <ul className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]">
              <a
                href="#kurs"
                className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]"
              >
                Kurslar
              </a>
            </ul>
            <ul className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]">
              <a
                href="#kurs"
                className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]"
              >
                Biz Haqimizda
              </a>
            </ul>
            <ul className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]">
              <a
                href="#maslahat"
                className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]"
              >
                Maslahat
              </a>
            </ul>
            <ul className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]">
              <a
                href="#kontaktlar"
                className="text-[14px] group-hover:text-[#4EAE32] font-bold !text-[#FFFFFFCC] leading-[17.33px]"
              >
                Kontaktlar
              </a>
            </ul>
          </li>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <button
              aria-label="Menyu yopish"
              className="bg-[#4EAE32] flex items-center gap-2 text-[#FFFFFF] text-[14px] px-[16px] py-[11px] rounded-xl relative"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <img src="/images/img/menu_list.png" alt="All Courses" />
              Barcha kurslar
              <img
                className="w-[18px] h-[18px]"
                src="/images/img/arrow_down.png"
                alt="Arrow Down"
              />
            </button>
          </div>
        </nav>

        <div
          ref={menuRef}
          className={`fixed top-0 right-0 w-64 h-full bg-[#484747] text-white transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden`}
        >
          <div className="flex items-center justify-between p-4 border-b border-[#FFFFFFCC]">
            <div className="text-lg font-bold">Menu</div>
            <button aria-label="Menyu yopish" onClick={() => setIsOpen(false)}>
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <a href="#kurs" className="group">
              <div className="text-[14px] group-hover:text-white font-bold text-[#FFFFFFCC] leading-[17.33px]">
                Kurslar
              </div>
            </a>
            <a href="#biz_haqimizda" className="group">
              <div className="text-[14px] group-hover:text-white font-bold text-[#FFFFFFCC] leading-[17.33px]">
                Biz haqimizda
              </div>
            </a>
            <a href="#maslahat" className="group">
              <div className="text-[14px] font-bold group-hover:text-white text-[#FFFFFFCC] leading-[17.33px]">
                Maslahat
              </div>
            </a>
            <a href="#kontaktlar" className="group">
              <div className="text-[14px] font-bold group-hover:text-white text-[#FFFFFFCC] leading-[17.33px]">
                Kontaktlar
              </div>
            </a>
            <LanguageSwitcher />
            {/* <button className="bg-[#4EAE32] flex items-center gap-2 text-[#FFFFFF] text-sm px-4 py-2 rounded-xl">
              <img src="/images/img/menu_list.png" alt="All Courses" />
              Barcha kurslar
              <img
                className="w-4 h-4"
                src="/images/img/arrow_down.png"
                alt="Arrow Down"
              />
            </button> */}
          </div>
        </div>
      </header>

      <div
        ref={burgerRef}
        className={`fixed z-9999 top-0 right-0 w-[500px] h-[100vh] bg-[#484747] text-white rounded-md shadow-lg transition-transform duration-300 overflow-y-auto ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-2">
          <div className="flex items-center justify-between p-4 border-b border-[#FFFFFFCC]">
            <div className="text-lg cursor-pointer font-bold">Yopish</div>
            <button
              aria-label="Menyu yopish"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoClose className="w-6 h-6" />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="rounded-lg mt-[20px] bg-[#37344740] p-6 hover:bg-[#4EAE32] transition-colors cursor-pointer"
              >
                <div className="flex gap-[20px]">
                  <img className="w-5 h-5" src={item.icon} alt="eqw" />
                  <h1 className="font-semibold text-white text-[18px] leading-[24.3px]">
                    {item.title}
                  </h1>
                </div>
                <p className="font-normal text-start mt-[32px] text-[14px] leading-[18.9px] text-[#FFFFFFCC]">
                  {item.short_description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

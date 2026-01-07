"use client"

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { Loader, Menu, Search } from 'lucide-react';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet';

const DynamicSearchboxLoad = dynamic(() => import('./searchbox'), {
  ssr: false,
  loading: () => <><Loader size={20} className='animate-spin' /></>
})

const DynamicNavbarContentLoad = dynamic(() => import('./navbarContent'), {
  ssr: false,
  loading: () => <div className='grid grid-cols-3 w-[580px] bg-transparent'><div className='w-[190px] bg-background rounded-lg h-fit z-40 p-1 px-2'><Loader size={20} className='animate-spin' /></div></div>
})

const DynamicNavbarContentMobileLoad = dynamic(() => import('./navbarContentMobile'), {
  ssr: false,
  loading: () => <div className="bg-black w-screen h-screen flex justify-center items-center"><Loader size={20} className="animate-spin" /></div>

})

function Navbar() {

  //OTHER
  const pathname = usePathname()
  const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(false)
  const [navbarContentOpen, setnavbarContentOpen] = useState<boolean>(false)
  const [navbarContentMobileOpen, setnavbarContentMobileOpen] = useState<boolean>(false)
  const [navbarBg, setNavbarBg] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) { // Change this value based on when you want the background to change
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    handleScroll()

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return ( 
    // loading?
    //   <FullScreenLoader isVisible={loading} />
    // :
  <div className="relative transition-all duration-300 ease-in-out">
  {/* Background Image */}
  <div
    className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 ease-in-out"
    style={{
      backgroundImage: "url('/images/legacy/navbarbg.webp')",
      opacity: navbarBg || pathname === '/' ? 0 : 1,
    }}
  />

  {/* White overlay (fades in when navbarBg = true) */}
  <div
    className="absolute inset-0 bg-white transition-opacity duration-300 ease-in-out shadow-lg"
    style={{
      opacity: navbarBg ? 1 : 0,
    }}
  />
    <div className="relative z-10">
      <nav className="container mx-auto xl:px-36 lg:px-20 px-10 py-4 h-fit">
      <div className="flex items-center justify-between">
        <div className="w-3/4 flex">
          <Link
            href={'/'}
            className="flex items-center"
          >
            <Image
              src={`${navbarBg ? '/images/legacy/legacy-black.png' :'/images/legacy/logo_legacy.webp'}`}
              className='cursor-pointer max-w-[150px] h-8'
              alt="Legacy Speaker Logo"
              width={1000}
              height={1000}            
              priority
              // fill
            />
          </Link>
          {/* {isDesktop && */}
            <div className="hidden lg:flex justify-center">
              <NavigationMenu>
                <NavigationMenuList className=" flex items-center">
                  <NavigationMenuItem>
                      <div className='p-0 pl-8'>
                      <Link href={'/drivers'} passHref>
                      <NavigationMenuTrigger className={navigationMenuTriggerStyle().concat(` bg-transparent ${pathname.includes('legacy') || pathname.includes('prestige') || pathname.includes('products')?'text-foreground' :navbarBg ? 'text-black' : ''}`)} onMouseEnter={() => {
                        setnavbarContentOpen(true)
                        // setHoveredDriverMenu("");
                        // setHoveredDriverSubMenu("");
                        // setDriversSubMenu(EmptyMenu);
                        // setDriversSubSubMenu(EmptyMenu);
                      }}>
                        PRODUCTS
                      </NavigationMenuTrigger>
                      </Link>
                      </div>
                    <NavigationMenuContent className='bg-transparent pr-20'>
                      {navbarContentOpen && <DynamicNavbarContentLoad/>}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  
                  
                  <NavigationMenuItem>
                      <NavigationMenuLink href="/news" className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                        <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('news') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                          NEWS
                        </div>
                      </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <NavigationMenuLink href="/about-us" className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                        <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('about-us') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                          ABOUT US
                        </div>
                      </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                      <NavigationMenuLink href="/catalog" className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                        <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('catalog') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                          CATALOGUE
                        </div>
                      </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/distributors" className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                      <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('distributors') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                        DISTRIBUTORS
                      </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle().concat(` bg-transparent`)}>
                      <div className={`hover:text-[rgba(19,82,219,1)] ${pathname.includes('contact') ?'text-foreground' :navbarBg ? 'text-black' : ''}`}>
                        CONTACT US
                      </div>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          {/* } */}
        </div>  
        {/* {isDesktop && */}
          <div className="w-1/4 hidden lg:flex items-center justify-end">
            <div className={`flex items-center justify-end font-bold ${navbarBg ? 'text-black' : 'text-white'} hover:text-[rgba(19,82,219,1)] hover:cursor-pointer`} onMouseEnter={() => setSearchBoxOpen(false)} onClick={() => searchBoxOpen? setSearchBoxOpen(false): setSearchBoxOpen(true)}>
            <a className='xl:block hidden'>Search</a> 
              <Search size={25} className="m-2 hover:cursor-pointer" />
            </div>
          </div>
        {/* } */}


        {searchBoxOpen && <DynamicSearchboxLoad/>}


        {/* MAIN MENU TABLET & MOBILE VIEW */}
        {/* {isMobile &&  */}
        <div className='flex lg:hidden'>
          <Button variant={null} asChild className='px-2'>
            <div className={`w-full text-base hover:text-[rgba(19,82,219,1)] ${navbarBg ? 'text-black' : 'text-white'}`}
                onMouseDown={() => setSearchBoxOpen(false)}
                onClick={() => searchBoxOpen ? setSearchBoxOpen(false) : setSearchBoxOpen(true)} >
              <div 
                className='flex items-center text-base'
              >
                <Search size={25} className="ml-2 hover:cursor-pointer" />
                {/* <SearchBox mobile={true}/> */}
              </div>
            </div>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={null} className={`w-fit p-0 ${navbarBg ? 'text-black' : 'text-white'} hover:text-[rgba(19,82,219,1)] hover:cursor-pointer`} onClick={() => setnavbarContentMobileOpen(true)} id='Mobile Menu Legacy' title='Mobile Menu'>
                  <Menu size={30} className="" />
                </Button>
            </SheetTrigger>
            <SheetContent className="w-screen h-auto p-0 overflow-y-auto bg-black">
              <SheetTitle></SheetTitle>
              {navbarContentMobileOpen && <DynamicNavbarContentMobileLoad/>}
            </SheetContent>
          </Sheet>
          </div>

        {/* } */}
        </div>
      </nav>
    </div>
  </div>
  );
}

export default Navbar;
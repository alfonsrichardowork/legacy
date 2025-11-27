"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/app/admin/components/ui/navigation-menu"
import { useParams, usePathname } from "next/navigation"
import { ArrowDown01, ArrowUp, ChartColumnIncreasing, ChartColumnStacked, Diameter, FileText, Info, List, Newspaper, Package, Phone, ScrollText, Speaker, Users } from "lucide-react"
interface MainNavClientProps {
  isadmin: boolean;
}

interface Menu {
  title: string; 
  href: string; 
  description: string; 
  icon: React.ElementType;
}

type MainNavProps = React.HTMLAttributes<HTMLElement> & MainNavClientProps;

export function MainNav({
  isadmin,
  className,
  ...props
}: MainNavProps) {
  const params = useParams();
  const pathname = usePathname()
  const pathSegments = pathname.split('/');

  const Products: Menu[] = [
    {
      title: "All Products",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`,
      description: "Show All Products",
      icon: Speaker,
    },
    {
      title: "Featured Products",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/featuredproduct`,
      description: "Show All Featured Products.",
      icon: Speaker,
    },
    ...(isadmin
      ? [
        {
          title: "Size",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/size`,
          description: "Show All Sizes.",
          icon: Diameter
        },
        {
          title: "Category",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/category`,
          description: "Show All Categories.",
            icon: ChartColumnStacked
        },
        {
          title: "Sub Category",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/subcategory`,
          description: "Show All Sub Categories.",
          icon: ChartColumnStacked
        },
        {
          title: "Sub Sub Category",
          href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/subsubcategory`,
          description: "Show All Sub Sub Categories.",
          icon: ChartColumnStacked
        },
      ]
    : []),
  ]


    const Specifications: Menu[] = [
    {
      title: "Parent",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/parentspec`,
      description: "Show All Parent Specifications",
      icon: ScrollText
    },
    {
      title: "Sub Parent",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/subparentspec`,
      description: "Show All Sub Parent Specifications.",
      icon: ScrollText
    },
    {
      title: "Child",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/childspec`,
      description: "Show All Child Specifications.",
      icon: ScrollText
    },
    {
      title: "Priority",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/spec/priority`,
      description: "Show All Specifications Priorities.",
      icon: ArrowDown01
    }  
  ];



  const Others: Menu[] = [
    {
      title: "Superiority (Home Screen)",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/superior`,
      description: "Show All Superiority",
      icon: ArrowUp,
    },
    {
      title: "Catalogues",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/catalogues`,
      description: "Show All Legacy Catalogues.",
      icon: FileText,
    },
    {
      title: "Distributors",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/distributors`,
      description: "Show All Legacy Distributors.",
      icon: Users,
    },
    {
      title: "About Us",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/about-us`,
      description: "Edit About Legacy Speaker",
      icon: Info,
    },
    {
      title: "Contacts",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/contacts`,
      description: "Edit Contact for Legacy Speaker",
      icon: Phone,
    },
    {
      title: "Featured Series",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/featuredseries`,
      description: "Edit Featured Series for Legacy Speaker",
      icon: Phone,
    }
  ];

  
  const SiteSettings: Menu[] = [
    {
      title: "Brand Settings",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/settings`,
      description: "Show Brand Settings",
      icon: ArrowUp,
    },
    {
      title: "User Settings",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/usersettings`,
      description: "Show All User Permissions.",
      icon: FileText,
    },
    {
      title: "Create New User",
      href: `${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/createuser`,
      description: "Create New User.",
      icon: Users,
    },
  ];
  

  return (
    <NavigationMenu>
      <NavigationMenuList>
      <NavigationMenuItem>
        <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}`} className={`${navigationMenuTriggerStyle()} flex gap-1.5 text-xs ${pathSegments.length === 3 ? 'bg-foreground text-background hover:text-background' : ''}`}>
          <ChartColumnIncreasing size={16} /> Overview
        </NavigationMenuLink>
        </NavigationMenuItem>
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>
            Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4 md:grid-cols-1 ">
              {Products.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}>
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
        <NavigationMenuItem>
          <NavigationMenuTrigger className={`flex gap-1.5 text-xs ${pathSegments[3] === 'products' || pathSegments[3] === 'size' || pathSegments[3] === 'category' || pathSegments[3] === 'subcategory' || pathSegments[3] === 'subsubcategory' || pathSegments[3] === 'series' ? 'bg-foreground text-background hover:text-background' : ''}`}>
            <Package size={16} /> Products
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="min-w-[300px] p-4 block text-sm text-background">
              {Products.map((component) => {
                const Icon = component.icon;
                return (
                  <ListItem
                    key={component.title}
                    href={component.href}
                    className={`${pathSegments[3] === component.href.split('/')[3] ? 'bg-foreground' : 'hover:bg-transparent'}`}
                  >
                    <div className={`flex items-center gap-1.5 ${pathSegments[3] === component.href.split('/')[3] ? "text-background hover:text-background" : "text-foreground hover:text-[rgba(19,82,219,1)]"}`}>
                      <Icon size={14}/>
                      {component.title}
                    </div>
                  </ListItem>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          {/* <Link 
          href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/news`}
          legacyBehavior passHref> */}
            <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/news`} className={`${navigationMenuTriggerStyle()} flex gap-1.5 text-xs ${pathSegments[3] === 'news' ? 'bg-foreground text-background hover:text-background' : ''}`}>
              <Newspaper size={16} /> News
            </NavigationMenuLink>
          {/* </Link> */}
        </NavigationMenuItem>
      {/* <NavigationMenuItem>
        <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/news`} className={`${navigationMenuTriggerStyle()}`}>
          News
        </NavigationMenuLink>
        </NavigationMenuItem> */}



        {isadmin && 
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`flex gap-1.5 text-xs ${pathSegments[3] === 'parentspec' || pathSegments[3] === 'subparentspec' || pathSegments[3] === 'childspec' || (pathSegments[4] === 'priority' && pathSegments[3] === 'spec') ? 'bg-foreground text-background hover:text-background' : ''}`}>
                  <List size={16} /> Specification
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-[300px] p-4 block text-sm text-background">
                    {Specifications.map((component) => {
                      const Icon = component.icon;
                      return (
                        <ListItem
                          key={component.title}
                          href={component.href}
                          className={`${pathSegments[3] === component.href.split('/')[3] ? 'bg-foreground' : 'hover:bg-transparent'}`}
                        >
                          <div className={`flex items-center gap-1.5 ${pathSegments[3] === component.href.split('/')[3] ? "text-background hover:text-background" : "text-foreground hover:text-[rgba(19,82,219,1)]"}`}>
                            <Icon size={14}/>
                            {component.title}
                          </div>
                        </ListItem>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        }
         {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Specification</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[150px] gap-3 p-4">
                  <ListItem
                    key={'Parent Specification'}
                    title={'Parent'}
                    href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/parentspec`}>
                  </ListItem>
                  <ListItem
                    key={'Sub Parent Specification'}
                    title={'Sub Parent'}
                    href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/subparentspec`}>
                  </ListItem>
                  <ListItem
                    key={'Child Specification'}
                    title={'Child'}
                    href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/childspec`}>
                  </ListItem>
                  <ListItem
                    key={'Specification Priority'}
                    title={'Priority'}
                    href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/spec/priority`}>
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu> */}
        

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className={`flex gap-1.5 text-xs ${pathSegments[3] === 'superior' || pathSegments[3] === 'catalogues' || pathSegments[3] === 'distributors' || pathSegments[3] === 'about-us' || pathSegments[3] === 'contacts' || pathSegments[3] === 'featuredseries' || pathSegments[3] === '' ? 'bg-foreground text-background hover:text-background' : ''}`}>
                <List size={16} /> Others
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="min-w-[300px] p-4 block text-sm text-background">
                  {Others.map((component) => {
                    const Icon = component.icon;
                    return (
                      <ListItem
                        key={component.title}
                        href={component.href}
                        className={`${pathSegments[3] === component.href.split('/')[3] ? 'bg-foreground' : 'hover:bg-transparent'}`}
                      >
                        <div className={`flex items-center gap-1.5 ${pathSegments[3] === component.href.split('/')[3] ? "text-background hover:text-background" : "text-foreground hover:text-[rgba(19,82,219,1)]"}`}>
                          <Icon size={14}/>
                          {component.title}
                        </div>
                      </ListItem>
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>



        {isadmin && 
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={`flex gap-1.5 text-xs ${pathSegments[3] === 'settings' || pathSegments[3] === 'usersettings' || pathSegments[3] === 'createuser' ? 'bg-foreground text-background hover:text-background' : ''}`}>
                  <List size={16} /> Other Settings
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-[300px] p-4 block text-sm text-background">
                    {SiteSettings.map((component) => {
                      const Icon = component.icon;
                      return (
                        <ListItem
                          key={component.title}
                          href={component.href}
                          className={`${pathSegments[3] === component.href.split('/')[3] ? 'bg-foreground' : 'hover:bg-transparent'}`}
                        >
                          <div className={`flex items-center gap-1.5 ${pathSegments[3] === component.href.split('/')[3] ? "text-background hover:text-background" : "text-foreground hover:text-[rgba(19,82,219,1)]"}`}>
                            <Icon size={14}/>
                            {component.title}
                          </div>
                        </ListItem>
                      );
                    })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        }
        {/* {isadmin? (
          <>
          <NavigationMenuItem>
              <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/settings`} className={navigationMenuTriggerStyle()}>
                Brand Settings
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/usersettings`} className={navigationMenuTriggerStyle()}>
                User Settings
              </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <NavigationMenuLink href={`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/createuser`} className={navigationMenuTriggerStyle()}>
                Create New User
              </NavigationMenuLink>
          </NavigationMenuItem>
          </>
        ): (
          <></>
        )} */}
        
        
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-hidden transition-colors hover:bg-accent hover:text-primary focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

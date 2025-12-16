import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const superadminOnlyRoutes = ['/createuser', '/customapi', '/settings', '/usersettings']

function isAdminRoute(url: string): boolean {
  return url.startsWith('/admin');
}

function isSuperAdminOnlyRoute(url: string): boolean {
  return superadminOnlyRoutes.some(route => url.endsWith(route));
}

const redirectMapCategandId: Record<string, string> = {
  'K11-69': '/drivers',
  'K11-26': '/drivers',
  'K11-70': '/products/lg-10385-2',
  'K11-33': '/products/lg-1077-2',
  'K11-29': '/products/lg-1095-2-mk1',
  'K11-30': '/products/lg-1096-2-mk1',
  'K11-48': '/products/lg-1098-2',
  'K11-35': '/products/lg-1238-2',
  'K11-71': '/products/lg-12385-2',
  'K11-72': '/products/lg-12386-2',
  'K11-43': '/products/lg-1277-2',
  'K11-44': '/products/lg-1292-2',
  'K11-36': '/products/lg-1295-2-mk1',
  'K11-38': '/products/lg-1296-2-mk1',
  'K11-40': '/products/lg-1298-2',
  'K11-87': '/products/lg-1299-2-mk1',
  'K11-45': '/products/lg-1596-2',
  'K11-23': '/products/lg-638-2-mk1',
  'K11-22': '/products/lg-696-2',
  'K11-25': '/products/lg-838-2-mk1',
  'K11-24': '/products/lg-896-2',
  'K17-73': '/drivers',
  'K18-79': '/products/lg-6521',
  'K12-51': '/products/pg-1054-2-red',
  'K12-52': '/products/pg-1254-2-red',
  'K12-50': '/products/pg-854-2-red',
  'K13-54': '/products/w-8347-b',
  'K13-53': '/products/w-8347-k',
  'K14-77': '/products/bst-422-mk3',
  'K14-78': '/products/bst-522-mk3',
  'K14-58': '/products/bst-1614',
  'K14-76': '/products/bst-615-mk3',
  'K14-60': '/products/bst-6981-mk1',
  'K15-63': '/products/pg-298',
  'K22-85': '/products/bst-1023-dual',
  'K21-88': '/drivers',
  'K21-83': '/drivers',
  'K21-89': '/drivers',
  'K21-84': '/drivers',
}

const redirectMapCateg: Record<string, string> = {
  'K11': '/drivers/legacy/subwoofer',
  'K17': '/drivers',
  'K18': '/drivers/legacy/coaxial',
  'K19': '/drivers',
  'K12': '/drivers/prestige/subwoofer',
  'K13': '/drivers/prestige/woofer',
  'K14': '/drivers/prestige/full-range',
  'K15': '/drivers/prestige/tweeter',
  'K22': '/drivers/prestige/coaxial',
  'K8': '/drivers',
}

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone()

  //Reroute permanent
  if (url.pathname === '/comparison' || url.pathname === '/products') {
    return NextResponse.redirect(new URL('/drivers', req.url), 301);
  }

  
  if (url.pathname.includes('/productdetail.php')) {
    const categ = url.searchParams.get('categ')
    const idproduct = url.searchParams.get('idproduct')
    if (categ && idproduct) {
      const key = `${categ}-${idproduct}`
      const destination = redirectMapCategandId[key]
      if (destination) {
        return NextResponse.redirect(new URL(destination, req.url), 301)
      }
      else{
        return NextResponse.redirect(new URL('/drivers', req.url), 301)
      }
    }
    else{
      return NextResponse.redirect(new URL('/drivers', req.url), 301)
    }
  }
  if (url.pathname.includes('/products.php')) {
    const categ = url.searchParams.get('categ')
    if(categ) {
      const key = `${categ}`
      const destination = redirectMapCateg[key]
      if (destination) {
        return NextResponse.redirect(new URL(destination, req.url), 301)
      }
      else{
        return NextResponse.redirect(new URL('/drivers', req.url), 301)
      }
    }
    else{
      return NextResponse.redirect(new URL('/drivers', req.url), 301)
    }
  }
  if (url.pathname.includes('/index.php')) {
    return NextResponse.redirect(new URL('/', req.url), 301)
  }
  if (url.pathname.includes('/aboutus.php')) {
    return NextResponse.redirect(new URL('/about-us', req.url), 301)
  }
  if (url.pathname.includes('/links.php')) {
    return NextResponse.redirect(new URL('/', req.url), 301)
  }
  if (url.pathname.includes('/capabilities.php')) {
    return NextResponse.redirect(new URL('/', req.url), 301)
  }
  if (url.pathname.includes('/news.php')) {
    return NextResponse.redirect(new URL('/news', req.url), 301)
  }
  if (url.pathname.includes('/events.php')) {
    return NextResponse.redirect(new URL('/', req.url), 301)
  }
  if (url.pathname.includes('/distributors.php')) {
    return NextResponse.redirect(new URL('/distributors', req.url), 301)
  }
  if (url.pathname.includes('/contact.php')) {
    return NextResponse.redirect(new URL('/contact', req.url), 301)
  }


  if(!isAdminRoute(url.pathname)){
    return NextResponse.next()
  }

  const session = req.cookies.get("loginSession"); // ✅ Edge-compatible
  if(url.pathname === '/admin/sign-in' || url.pathname === '/admin/api/user/login'){
    if(!session){
      return NextResponse.next()
    }
    else{
      return NextResponse.redirect(new URL('/admin/', req.url));
    }
  }

  if(!session){
    return NextResponse.redirect(new URL('/admin/sign-in', req.url));
  }

  if(isSuperAdminOnlyRoute(url.pathname) ){
    if(session){
      return NextResponse.next();
    }
    else{
      return NextResponse.redirect(new URL('/admin/', req.url));
    }
  }
  
  return NextResponse.next();
}



export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/productdetail.php',
    '/products.php',
    '/index.php',
    '/aboutus.php',
    '/links.php',
    '/capabilities.php',
    '/news.php',
    '/events.php',
    '/distributors.php',
    '/contact.php'
  ],
}
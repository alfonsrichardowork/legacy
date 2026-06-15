import { MetadataRoute } from "next";
import "dotenv/config";
import { writeFile } from "fs/promises";
import path from "path";
import prismadb from "./lib/prismadb";

// Fetch your dynamic URLs (from a database, API, or local data)
async function getProductsDynamicUrls() {
  const data = await prismadb.product.findMany({
    where: {
      isArchived: false
    },
    select: {
      slug: true
    }
  })
  return data.map((product) => ({
    url: `${process.env.NEXT_PUBLIC_ROOT_URL}/products/${product.slug}`,
    lastModified: new Date().toISOString(),
  }));
}

// Fetch your dynamic URLs (from a database, API, or local data)
async function getNewsDynamicUrls() {
    const news = await prismadb.news.findMany({
      select: {
        slug: true
      }
    })
    return news.map((onenews) => ({
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/news/${onenews.slug}`,
      lastModified: new Date().toISOString(),
    }));
  }

async function getDriversDynamicUrls() {
    const connectors = await prismadb.allproductcategory.findMany({
        select: {
            productId: true,
            category: {
                select: {
                    slug: true,
                    type: true,
                },
            },
        },
    });

    const paths = Array.from(
    connectors.reduce((map, row) => {
    const existing = map.get(row.productId) ?? [];

        existing.push({
        slug: row.category.slug,
        type: row.category.type,
        });

        map.set(row.productId, existing);

        return map;
    }, new Map<string, { slug: string; type: string }[]>()).values()
    ).flatMap(categories => {
    const category = categories
        .filter(c => c.type === 'Category')
        .map(c => c.slug);

    const subCategory = categories
        .filter(c => c.type === 'Sub Category')
        .map(c => c.slug);

    const subSubCategory = categories
        .filter(c => c.type === 'Sub Sub Category')
        .map(c => c.slug);

    const result: string[] = [];

    // Category only
    if (!subCategory.length) {
        return category;
    }

    // Category + Sub Category
    for (const cat of category) {
        for (const sub of subCategory) {
        if (!subSubCategory.length) {
            result.push(`${cat}/${sub}`);
        } else {
            // Category + Sub Category + Sub Sub Category
            for (const subSub of subSubCategory) {
            result.push(`${cat}/${sub}/${subSub}`);
            }
        }
        }
    }

    return result;
    });

    const allPaths = new Set<string>();

    for (const path of paths) {
        const parts = path.split('/');

        // Original path
        allPaths.add(path);

        // Level 1 (/drivers)
        if (parts.length >= 1) {
            allPaths.add(parts[0] ?? '');
        }

        // Level 2 (/drivers/midranges)
        if (parts.length >= 2) {
            allPaths.add(parts.slice(0, 2).join('/'));
        }
    }

    const uniqueSortedPaths = [...allPaths].sort((a, b) => {
        const depthA = a.split('/').length;
        const depthB = b.split('/').length;

        if (depthA !== depthB) {
            return depthA - depthB;
        }

        return a.localeCompare(b);
    });
    
    return uniqueSortedPaths.map((path) => ({
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/${path}`,
      lastModified: new Date().toISOString(),
    }));
  }

// Generate the sitemap dynamically
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productsDynamicUrls = await getProductsDynamicUrls();
  const newsDynamicUrls = await getNewsDynamicUrls();
  const driversDynamicUrls = await getDriversDynamicUrls();

  // Static URLs
  const staticUrls = [
    {
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/about-us`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/catalog`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/contact`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/agen`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${process.env.NEXT_PUBLIC_ROOT_URL}/news`,
      lastModified: new Date().toISOString(),
    },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/legacy`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/legacy/subwoofer`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/legacy/coaxial`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/legacy/tweeter`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/prestige`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/prestige/subwoofer`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/prestige/woofer`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/prestige/full-range`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/prestige/tweeter`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/prestige/coaxial`,
    //   lastModified: new Date().toISOString()
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/energy`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/energy/subwoofer`,
    //   lastModified: new Date().toISOString()
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/sparta`,
    //   lastModified: new Date().toISOString(),
    // },
    // {
    //   url: `${process.env.NEXT_PUBLIC_ROOT_URL}/drivers/sparta/subwoofer`,
    //   lastModified: new Date().toISOString(),
    // },
  ];

  return [...staticUrls, ...productsDynamicUrls, ...newsDynamicUrls, ...driversDynamicUrls];
}



sitemap()
  .then(async (data) => {

    // Convert the sitemap array to XML format
    const xmlContent = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${data.map((url) => 
          `          <url>
            <loc>${url.url}</loc>
            <lastmod>${url.lastModified}</lastmod>
          </url>`
          )
          .join("\n")}
      </urlset>
    `.trim();

    // Define the path where to save the sitemap
    const filePath = path.join(process.cwd(), "public", "sitemap.xml");

    // Write to sitemap.xml file
    await writeFile(filePath, xmlContent, "utf8");
    console.log(`Sitemap saved to ${filePath}`);
  })
  .catch(console.error);
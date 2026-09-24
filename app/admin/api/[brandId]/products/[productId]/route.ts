import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";
import { image_catalogues, multipledatasheetproduct } from "@prisma/client";
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from "next/cache";
import { uploadsprefix } from "@/lib/uploads-prefix";

const slugify = (str: string): string => {
  const normalizedStr = str.replace(/["“”‟″‶〃״˝ʺ˶ˮײ]/g, "'");
  const strAfterQuote = normalizedStr.includes("'") ? normalizedStr.split("'")[1] : normalizedStr;
  const strBeforeSlash = strAfterQuote?.includes('/') ? strAfterQuote.split('/')[0] : strAfterQuote;
  const strWithoutSatori = strBeforeSlash?.replace(/SATORI/gi, '');
  return strWithoutSatori?.toLowerCase()
                         .replace(/[^a-z0-9]+/g, '-')
                         .replace(/(^-|-$)+/g, '') ?? '';
};

export async function GET(req: Request, props: { params: Promise<{ productId: string }> }) {
  const params = await props.params;
  try {
    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId
      },
      include: {
        allCat: true,
        images_catalogues: true,
        size: true,
      }
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function DELETE(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string }> }
) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    //DELETE
    const oldImages = await prismadb.product.findFirst({
      where: {
        id: params.productId
      },
      select: {
        cover_img_url: true,
        drawing_img_url: true,
        graph_img_url: true,
        impedance_img_url: true,
        featured_img_url: true
      }
    })

    if(oldImages){
      if(oldImages.cover_img_url.startsWith(uploadsprefix)){
        const filename = oldImages.cover_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldImages.cover_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
      if(oldImages.drawing_img_url.startsWith(uploadsprefix)){
        const filename = oldImages.drawing_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldImages.drawing_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
      if(oldImages.graph_img_url.startsWith(uploadsprefix)){
        const filename = oldImages.graph_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldImages.graph_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
      if(oldImages.impedance_img_url.startsWith(uploadsprefix)){
        const filename = oldImages.impedance_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldImages.impedance_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
      if(oldImages.featured_img_url.startsWith(uploadsprefix)){
        const filename = oldImages.featured_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldImages.featured_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
    }    

    //DELETE IMAGE CATALOGUES
    const cataloguesImages = await prismadb.image_catalogues.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of cataloguesImages) {
      if (image.url) {
        if(image.url.startsWith(uploadsprefix)){
          const filename = image.url.slice(uploadsprefix.length)
          // if (filename && path.basename(filename) === filename) {
            const imgPath = path.join(process.cwd(), 'uploads', filename);
            try {
              await fs.unlink(imgPath);
            } catch (error) {
              console.warn(`Could not delete file ${image.url}:`, error);
            } 
          // }
        }
        else{
          console.warn(`Not inside uploads folder`);
        }
      }
    }
    //Delete Image_catalogues records
    await prismadb.image_catalogues.deleteMany({
      where: {
        productId: params.productId,
      },
    });


    //DELETE MULTIPLE DATASHEET
    const multipleDatasheet = await prismadb.multipledatasheetproduct.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const pdf of multipleDatasheet) {
      if (pdf.url) {
        if(pdf.url.startsWith(uploadsprefix)){
          const filename = pdf.url.slice(uploadsprefix.length)
          // if (filename && path.basename(filename) === filename) {
            const imgPath = path.join(process.cwd(), 'uploads', filename);
            try {
              await fs.unlink(imgPath);
            } catch (error) {
              console.warn(`Could not delete file ${pdf.url}:`, error);
            } 
          // }
        }
        else{
          console.warn(`Not inside uploads folder`);
        }
      }
    }
    //Delete multipleDatasheetProduct records
    await prismadb.multipledatasheetproduct.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    //Delete specificationConnector
    await prismadb.specificationconnector.deleteMany({
      where: {
        brandId: params.brandId,
        productId: params.productId,
      },
    });

    //Delete allproductcategory
    await prismadb.allproductcategory.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    const deletedProd = await prismadb.product.findFirst({
      where: {
        id: params.productId
      },
      select: {
        slug: true
      }
    })

    if(deletedProd){
      revalidatePath(`/products/${deletedProd.slug}`)
    }

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId
      },
    });

    revalidatePath('/')
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCT_DELETE]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};


export async function PATCH(
  req: Request,
  props: { params: Promise<{ productId: string, brandId: string }> }
) {
  const params = await props.params;
  try {
    const session = await getSession();

    if(!session.isLoggedIn || !session){
      return NextResponse.json("expired_session")
    }

    if(!(await checkBearerAPI(session))){
      session.destroy();
      return NextResponse.json("invalid_token")
    }

    const body = await req.json();

    const { name, description, isFeatured, isArchived, isNewProduct, sizeId, images_catalogues, multipleDatasheetProduct, cover_img_url, drawing_img_url, graph_img_url, impedance_img_url, series } = body;

    if (!params.productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    
    if(!(await checkAuth(session.isAdmin!, params.brandId, session.userId!))){
      return NextResponse.json("unauthorized");
    }    

    const initial = await prismadb.product.findFirst({
      where:{
        id: params.productId
      },
      select:{
        name: true
      }
    })


    if(initial){
      if(initial.name ===  name){


        //IMAGE CATALOGUES
        const cataloguesImages = await prismadb.image_catalogues.findMany({
          where: {
            productId: params.productId,
          },
        });
        let finalfound : image_catalogues[] = []
        cataloguesImages.forEach((val) => {
          const found = images_catalogues.find((value: image_catalogues) => value.url === val.url);
          
          if (found && !finalfound.some((item) => item.url === found.url)) {
            finalfound.push(found);
          }
        });
        //DELETE IMAGE CATALOGUES
        //Delete physical files
        for (const image of cataloguesImages) {
          const isInFinal = finalfound.some((item) => item.url === image.url);
          if (isInFinal) continue;

          if (image.url) {
            if(image.url.startsWith(uploadsprefix)){
              const filename = image.url.slice(uploadsprefix.length)
              // if (filename && path.basename(filename) === filename) {
                const imgPath = path.join(process.cwd(), 'uploads', filename);
                try {
                  await fs.unlink(imgPath);
                } catch (error) {
                  console.warn(`Could not delete file ${image.url}:`, error);
                } 
              // }
            }
            else{
              console.warn(`Not inside uploads folder`);
            }
          }
        }
        //Delete Image_catalogues records
        await prismadb.image_catalogues.deleteMany({
          where: {
            productId: params.productId,
            url: {
              notIn: finalfound.map((val) => val.url),
            },
          },
        });
        if (images_catalogues.length !== 0) {
          const creations = images_catalogues.map(async (value: image_catalogues) => {
            if(value !== null && value !== undefined){
              const alreadyInDB = finalfound.some((val) => val.url === value.url);
              if (!alreadyInDB && value.url !== '') {
                await prismadb.image_catalogues.create({
                  data: {
                    productId: params.productId,
                    url: value.url,
                    name: value.name,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                });
              }
              else{ //UPDATE NAME
                const image_catalogues_Id = await prismadb.image_catalogues.findFirst({
                  where: {
                    url: value.url,
                    productId: params.productId
                  },
                  select: {
                    id: true
                  }
                })
                if (image_catalogues_Id) {
                  await prismadb.image_catalogues.update({
                    where: {
                      id: image_catalogues_Id.id
                    },
                    data: {
                      name: value.name,
                      updatedAt: new Date()
                    },
                  });
                }
              }
            }
          });

          await Promise.all(creations);
        }


        //DATASHEET
        const datasheetOld = await prismadb.multipledatasheetproduct.findMany({
          where: {
            productId: params.productId,
          },
        });
        let finalfoundDatasheet : multipledatasheetproduct[] = []
        datasheetOld.forEach((val) => {
          const found = multipleDatasheetProduct.find((value: multipledatasheetproduct) => value.url === val.url);
          
          if (found && !finalfoundDatasheet.some((item) => item.url === found.url)) {
            finalfoundDatasheet.push(found);
          }
        });
        //DELETE DATASHEET
        //Delete physical files
        for (const datasheet of datasheetOld) {
          const isInFinal = finalfoundDatasheet.some((item) => item.url === datasheet.url);
          if (isInFinal) continue;

          if (datasheet.url) {
            if(datasheet.url.startsWith(uploadsprefix)){
              const filename = datasheet.url.slice(uploadsprefix.length)
              // if (filename && path.basename(filename) === filename) {
                const imgPath = path.join(process.cwd(), 'uploads', filename);
                try {
                  await fs.unlink(imgPath);
                } catch (error) {
                  console.warn(`Could not delete file ${datasheet.url}:`, error);
                } 
              // }
            }
            else{
              console.warn(`Not inside uploads folder`);
            }
          }
        }
        //Delete oldDatasheet records
        await prismadb.multipledatasheetproduct.deleteMany({
          where: {
            productId: params.productId,
            url: {
              notIn: finalfoundDatasheet.map((val) => val.url),
            },
          },
        });
        if (multipleDatasheetProduct.length !== 0) {
          const creations = multipleDatasheetProduct.map(async (value: multipledatasheetproduct) => {
            if(value !== null && value !== undefined){
              const alreadyInDB = finalfoundDatasheet.some((val) => val.url === value.url);
              if (!alreadyInDB && value.url !== '') {
                await prismadb.multipledatasheetproduct.create({
                  data: {
                    productId: params.productId,
                    url: value.url,
                    name: value.name,
                  }
                });
              }
              else{ //UPDATE NAME
                const datasheet_Id = await prismadb.multipledatasheetproduct.findFirst({
                  where: {
                    url: value.url,
                    productId: params.productId
                  },
                  select: {
                    id: true
                  }
                })
                if (datasheet_Id) {
                  await prismadb.multipledatasheetproduct.update({
                    where: {
                      id: datasheet_Id.id
                    },
                    data: {
                      name: value.name,
                    },
                  });
                }
              }
            }
          });

          await Promise.all(creations);
        }


        //COVER_IMAGE , DRAWING, IMPEDANCE, GRAPH
        const oldUrl = await prismadb.product.findFirst({
          where: {
            id: params.productId
          },
          select:{
            cover_img_url: true,
            drawing_img_url: true,
            impedance_img_url: true,
            graph_img_url: true
          }
        })
        //Delete physical files
        if(oldUrl && oldUrl.cover_img_url && oldUrl.cover_img_url !== cover_img_url) {
          if(oldUrl.cover_img_url.startsWith(uploadsprefix)){
            const filename = oldUrl.cover_img_url.slice(uploadsprefix.length)
            // if (filename && path.basename(filename) === filename) {
              const imgPath = path.join(process.cwd(), 'uploads', filename);
              try {
                await fs.unlink(imgPath);
              } catch (error) {
                console.warn(`Could not delete file ${oldUrl.cover_img_url}:`, error);
              } 
            // }
          }
          else{
            console.warn(`Not inside uploads folder`);
          }
        }
        //Delete physical files
        if(oldUrl && oldUrl.drawing_img_url && oldUrl.drawing_img_url !== drawing_img_url) {
          if(oldUrl.drawing_img_url.startsWith(uploadsprefix)){
            const filename = oldUrl.drawing_img_url.slice(uploadsprefix.length)
            // if (filename && path.basename(filename) === filename) {
              const imgPath = path.join(process.cwd(), 'uploads', filename);
              try {
                await fs.unlink(imgPath);
              } catch (error) {
                console.warn(`Could not delete file ${oldUrl.drawing_img_url}:`, error);
              } 
            // }
          }
          else{
            console.warn(`Not inside uploads folder`);
          }
        }
        //Delete physical files
        if(oldUrl && oldUrl.impedance_img_url && oldUrl.impedance_img_url !== impedance_img_url) {
          if(oldUrl.impedance_img_url.startsWith(uploadsprefix)){
            const filename = oldUrl.impedance_img_url.slice(uploadsprefix.length)
            // if (filename && path.basename(filename) === filename) {
              const imgPath = path.join(process.cwd(), 'uploads', filename);
              try {
                await fs.unlink(imgPath);
              } catch (error) {
                console.warn(`Could not delete file ${oldUrl.impedance_img_url}:`, error);
              } 
            // }
          }
          else{
            console.warn(`Not inside uploads folder`);
          }
        }
        //Delete physical files
        if(oldUrl && oldUrl.graph_img_url && oldUrl.graph_img_url !== graph_img_url) {
          if(oldUrl.graph_img_url.startsWith(uploadsprefix)){
            const filename = oldUrl.graph_img_url.slice(uploadsprefix.length)
            // if (filename && path.basename(filename) === filename) {
              const imgPath = path.join(process.cwd(), 'uploads', filename);
              try {
                await fs.unlink(imgPath);
              } catch (error) {
                console.warn(`Could not delete file ${oldUrl.graph_img_url}:`, error);
              } 
            // }
          }
          else{
            console.warn(`Not inside uploads folder`);
          }
        }
        

        // PRODUCT OVERALL
        await prismadb.product.update({
          where: {
            id: params.productId
          },
          data: {
            name,
            slug: slugify(name),
            isFeatured,
            isArchived,
            isNewProduct,
            cover_img_url,
            drawing_img_url,
            impedance_img_url,
            graph_img_url,
            series,
            sizeId,
            description: description,
            updatedBy: session.name,
            updatedAt: new Date()
          },
        });
        
        revalidatePath('/')
        revalidatePath(`/products/${slugify(name)}`)
        return NextResponse.json("same")
      }
    }

    const duplicates = await prismadb.product.findFirst({
      where:{
        name,
      }
    })

    if(duplicates){
      return NextResponse.json("duplicate")
    }


    //IMAGE CATALOGUES
    const cataloguesImages = await prismadb.image_catalogues.findMany({
      where: {
        productId: params.productId,
      },
    });
    let finalfound : image_catalogues[] = []
    cataloguesImages.forEach((val) => {
      const found = images_catalogues.find((value: image_catalogues) => value.url === val.url);
      
      if (found && !finalfound.some((item) => item.url === found.url)) {
        finalfound.push(found);
      }
    });
    //DELETE IMAGE CATALOGUES
    //Delete physical files
    for (const image of cataloguesImages) {
      const isInFinal = finalfound.some((item) => item.url === image.url);
      if (isInFinal) continue;

      if (image.url) {
        if(image.url.startsWith(uploadsprefix)){
          const filename = image.url.slice(uploadsprefix.length)
          // if (filename && path.basename(filename) === filename) {
            const imgPath = path.join(process.cwd(), 'uploads', filename);
            try {
              await fs.unlink(imgPath);
            } catch (error) {
              console.warn(`Could not delete file ${image.url}:`, error);
            } 
          // }
        }
        else{
          console.warn(`Not inside uploads folder`);
        }
      }
    }
    //Delete Image_catalogues records
    await prismadb.image_catalogues.deleteMany({
      where: {
        productId: params.productId,
        url: {
          notIn: finalfound.map((val) => val.url),
        },
      },
    });
    if (images_catalogues.length !== 0) {
      const creations = images_catalogues.map(async (value: image_catalogues) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfound.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.image_catalogues.create({
              data: {
                productId: params.productId,
                url: value.url,
                name: value.name,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            });
          }
          else{ //UPDATE NAME
            const image_catalogues_Id = await prismadb.image_catalogues.findFirst({
              where: {
                url: value.url,
                productId: params.productId
              },
              select: {
                id: true
              }
            })
            if (image_catalogues_Id) {
              await prismadb.image_catalogues.update({
                where: {
                  id: image_catalogues_Id.id
                },
                data: {
                  name: value.name,
                  updatedAt: new Date()
                },
              });
            }
          }
        }
      });

      await Promise.all(creations);
    }


    //DATASHEET
    const datasheetOld = await prismadb.multipledatasheetproduct.findMany({
      where: {
        productId: params.productId,
      },
    });
    let finalfoundDatasheet : multipledatasheetproduct[] = []
    datasheetOld.forEach((val) => {
      const found = multipleDatasheetProduct.find((value: multipledatasheetproduct) => value.url === val.url);
      
      if (found && !finalfoundDatasheet.some((item) => item.url === found.url)) {
        finalfoundDatasheet.push(found);
      }
    });
    //DELETE DATASHEET
    //Delete physical files
    for (const datasheet of datasheetOld) {
      const isInFinal = finalfoundDatasheet.some((item) => item.url === datasheet.url);
      if (isInFinal) continue;

      if (datasheet.url) {
        if(datasheet.url.startsWith(uploadsprefix)){
          const filename = datasheet.url.slice(uploadsprefix.length)
          // if (filename && path.basename(filename) === filename) {
            const imgPath = path.join(process.cwd(), 'uploads', filename);
            try {
              await fs.unlink(imgPath);
            } catch (error) {
              console.warn(`Could not delete file ${datasheet.url}:`, error);
            } 
          // }
        }
        else{
          console.warn(`Not inside uploads folder`);
        }
      }
    }
    //Delete oldDatasheet records
    await prismadb.multipledatasheetproduct.deleteMany({
      where: {
        productId: params.productId,
        url: {
          notIn: finalfoundDatasheet.map((val) => val.url),
        },
      },
    });
    if (multipleDatasheetProduct.length !== 0) {
      const creations = multipleDatasheetProduct.map(async (value: multipledatasheetproduct) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfoundDatasheet.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.multipledatasheetproduct.create({
              data: {
                productId: params.productId,
                url: value.url,
                name: value.name,
              }
            });
          }
          else{ //UPDATE NAME
            const datasheet_Id = await prismadb.multipledatasheetproduct.findFirst({
              where: {
                url: value.url,
                productId: params.productId
              },
              select: {
                id: true
              }
            })
            if (datasheet_Id) {
              await prismadb.multipledatasheetproduct.update({
                where: {
                  id: datasheet_Id.id
                },
                data: {
                  name: value.name,
                },
              });
            }
          }
        }
      });

      await Promise.all(creations);
    }


    const oldUrl = await prismadb.product.findFirst({
      where: {
        id: params.productId
      },
      select:{
        cover_img_url: true,
        drawing_img_url: true,
        impedance_img_url: true,
        graph_img_url: true
      }
    })
    //Delete physical files
    if(oldUrl && oldUrl.cover_img_url && oldUrl.cover_img_url !== cover_img_url) {
      if(oldUrl.cover_img_url.startsWith(uploadsprefix)){
        const filename = oldUrl.cover_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldUrl.cover_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
    }
    //Delete physical files
    if(oldUrl && oldUrl.drawing_img_url && oldUrl.drawing_img_url !== drawing_img_url) {
      if(oldUrl.drawing_img_url.startsWith(uploadsprefix)){
        const filename = oldUrl.drawing_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldUrl.drawing_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
    }
    //Delete physical files
    if(oldUrl && oldUrl.impedance_img_url && oldUrl.impedance_img_url !== impedance_img_url) {
      if(oldUrl.impedance_img_url.startsWith(uploadsprefix)){
        const filename = oldUrl.impedance_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldUrl.impedance_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
    }
    //Delete physical files
    if(oldUrl && oldUrl.graph_img_url && oldUrl.graph_img_url !== graph_img_url) {
      if(oldUrl.graph_img_url.startsWith(uploadsprefix)){
        const filename = oldUrl.graph_img_url.slice(uploadsprefix.length)
        // if (filename && path.basename(filename) === filename) {
          const imgPath = path.join(process.cwd(), 'uploads', filename);
          try {
            await fs.unlink(imgPath);
          } catch (error) {
            console.warn(`Could not delete file ${oldUrl.graph_img_url}:`, error);
          } 
        // }
      }
      else{
        console.warn(`Not inside uploads folder`);
      }
    }


    await prismadb.product.update({
      where: {
        id: params.productId
      },
      data: {
        name,
        slug: slugify(name),
        isFeatured,
        cover_img_url,
        impedance_img_url,
        graph_img_url,
        drawing_img_url,
        isArchived,
        isNewProduct,
        series,
        sizeId,
        description: description,
        updatedBy: session.name,
        updatedAt: new Date()
      },
    });

    revalidatePath('/')
    revalidatePath(`/products/${slugify(name)}`);

    return NextResponse.json("success");
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
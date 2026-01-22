import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { checkAuth, checkBearerAPI, getSession } from "@/app/admin/actions";
import { cover_image, drawing_image, graph_image, image_catalogues, impedance_image, multipledatasheetproduct } from "@prisma/client";
import path from 'path';
import fs from 'fs/promises';
import { revalidatePath } from "next/cache";

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
        cover_img: true,
        drawing_img: true,
        graph_img: true,
        impedance_img: true,
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

    //DELETE COVER IMAGE
    const coverImages = await prismadb.cover_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of coverImages) {
      if (image.url) {
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
        }
      }
    }
    //Delete cover_Image records
    await prismadb.cover_image.deleteMany({
      where: {
        productId: params.productId,
      },
    });

    
    //DELETE DRAWING IMAGE
    const drawingImages = await prismadb.drawing_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of drawingImages) {
      if (image.url) {
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
        }
      }
    }
    //Delete drawing_Image records
    await prismadb.drawing_image.deleteMany({
      where: {
        productId: params.productId,
      },
    });


    //DELETE FEATURED IMAGE
    const featuredImages = await prismadb.featured_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of featuredImages) {
      if (image.url) {
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
        }
      }
    }
    //Delete featured_Image records
    await prismadb.featured_image.deleteMany({
      where: {
        productId: params.productId,
      },
    });
    

    //DELETE GRAPH IMAGE
    const graphImages = await prismadb.graph_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of graphImages) {
      if (image.url) {
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
        }
      }
    }
    //Delete graph_Image records
    await prismadb.graph_image.deleteMany({
      where: {
        productId: params.productId,
      },
    });


    //DELETE IMPEDANCE IMAGE
    const impedanceImages = await prismadb.impedance_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of impedanceImages) {
      if (image.url) {
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
        }
      }
    }
    //Delete impedance_Image records
    await prismadb.impedance_image.deleteMany({
      where: {
        productId: params.productId,
      },
    });
    

    //DELETE IMAGE CATALOGUES
    const cataloguesImages = await prismadb.image_catalogues.findMany({
      where: {
        productId: params.productId,
      },
    });
    //Delete physical files
    for (const image of cataloguesImages) {
      if (image.url) {
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
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
        const pdfPath = path.join(process.cwd(),  pdf.url);

        try {
          await fs.unlink(pdfPath);
        } catch (error) {
          console.warn(`Could not delete file ${pdf.url}:`, error);
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId
      },
    });

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

    const { name, description, isFeatured, isArchived, isNewProduct, sizeId, images_catalogues, multipleDatasheetProduct, cover_img, drawing_img, graph_img, impedance_img, series } = body;

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
            const imagePath = path.join(process.cwd(),  image.url);

            try {
              await fs.unlink(imagePath);
            } catch (error) {
              console.warn(`Could not delete file ${image.url}:`, error);
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
            const datasheetPath = path.join(process.cwd(),  datasheet.url);

            try {
              await fs.unlink(datasheetPath);
            } catch (error) {
              console.warn(`Could not delete file ${datasheet.url}:`, error);
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


        //COVER_IMAGE
        const coverImageOld = await prismadb.cover_image.findMany({
          where: {
            productId: params.productId,
          },
        });
        let finalfoundCoverImage : cover_image[] = []
        coverImageOld.forEach((val) => {
          const found = cover_img.find((value: cover_image) => value.url === val.url);
          
          if (found && !finalfoundCoverImage.some((item) => item.url === found.url)) {
            finalfoundCoverImage.push(found);
          }
        });
        //DELETE CoverImage
        //Delete physical files
        for (const coverImg of coverImageOld) {
          const isInFinal = finalfoundCoverImage.some((item) => item.url === coverImg.url);
          if (isInFinal) continue;

          if (coverImg.url) {
            const coverImgPath = path.join(process.cwd(),  coverImg.url);

            try {
              await fs.unlink(coverImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${coverImg.url}:`, error);
            }
          }
        }
        //Delete oldCoverImage records
        await prismadb.cover_image.deleteMany({
          where: {
            productId: params.productId,
            url: {
              notIn: finalfoundCoverImage.map((val) => val.url),
            },
          },
        });
        if (cover_img.length !== 0) {
          const creations = cover_img.map(async (value: cover_image) => {
            if(value !== null && value !== undefined){
              const alreadyInDB = finalfoundCoverImage.some((val) => val.url === value.url);
              if (!alreadyInDB && value.url !== '') {
                await prismadb.cover_image.create({
                  data: {
                    productId: params.productId,
                    url: value.url,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                });
              }
            }
          });

          await Promise.all(creations);
        }


        //DRAWING_IMAGE
        const drawingImageOld = await prismadb.drawing_image.findMany({
          where: {
            productId: params.productId,
          },
        });
        let finalfoundDrawingImage : drawing_image[] = []
        drawingImageOld.forEach((val) => {
          const found = drawing_img.find((value: drawing_image) => value.url === val.url);
          
          if (found && !finalfoundDrawingImage.some((item) => item.url === found.url)) {
            finalfoundDrawingImage.push(found);
          }
        });
        //DELETE DrawingImage
        //Delete physical files
        for (const drawingImg of drawingImageOld) {
          const isInFinal = finalfoundDrawingImage.some((item) => item.url === drawingImg.url);
          if (isInFinal) continue;

          if (drawingImg.url) {
            const drawingImgPath = path.join(process.cwd(),  drawingImg.url);

            try {
              await fs.unlink(drawingImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${drawingImg.url}:`, error);
            }
          }
        }
        //Delete oldDrawingImage records
        await prismadb.drawing_image.deleteMany({
          where: {
            productId: params.productId,
            url: {
              notIn: finalfoundDrawingImage.map((val) => val.url),
            },
          },
        });
        if (drawing_img.length !== 0) {
          const creations = drawing_img.map(async (value: drawing_image) => {
            if(value !== null && value !== undefined){
              const alreadyInDB = finalfoundDrawingImage.some((val) => val.url === value.url);
              if (!alreadyInDB && value.url !== '') {
                await prismadb.drawing_image.create({
                  data: {
                    productId: params.productId,
                    url: value.url,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                });
              }
            }
          });

          await Promise.all(creations);
        }


        //GRAPH_IMAGE | FREQ RES IMAGE
        const graphImageOld = await prismadb.graph_image.findMany({
          where: {
            productId: params.productId,
          },
        });
        let finalfoundGraphImage : graph_image[] = []
        graphImageOld.forEach((val) => {
          const found = graph_img.find((value: graph_image) => value.url === val.url);
          
          if (found && !finalfoundGraphImage.some((item) => item.url === found.url)) {
            finalfoundGraphImage.push(found);
          }
        });
        //DELETE GraphImage
        //Delete physical files
        for (const graphImg of graphImageOld) {
          const isInFinal = finalfoundGraphImage.some((item) => item.url === graphImg.url);
          if (isInFinal) continue;

          if (graphImg.url) {
            const graphImgPath = path.join(process.cwd(),  graphImg.url);

            try {
              await fs.unlink(graphImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${graphImg.url}:`, error);
            }
          }
        }
        //Delete oldGraphImage records
        await prismadb.graph_image.deleteMany({
          where: {
            productId: params.productId,
            url: {
              notIn: finalfoundGraphImage.map((val) => val.url),
            },
          },
        });
        if (graph_img.length !== 0) {
          const creations = graph_img.map(async (value: graph_image) => {
            if(value !== null && value !== undefined){
              const alreadyInDB = finalfoundGraphImage.some((val) => val.url === value.url);
              if (!alreadyInDB && value.url !== '') {
                await prismadb.graph_image.create({
                  data: {
                    productId: params.productId,
                    url: value.url,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                });
              }
            }
          });

          await Promise.all(creations);
        }



        //IMPEDANCE_IMAGE
        const impedanceImageOld = await prismadb.impedance_image.findMany({
          where: {
            productId: params.productId,
          },
        });
        let finalfoundImpedanceImage : impedance_image[] = []
        impedanceImageOld.forEach((val) => {
          const found = impedance_img.find((value: impedance_image) => value.url === val.url);
          
          if (found && !finalfoundImpedanceImage.some((item) => item.url === found.url)) {
            finalfoundImpedanceImage.push(found);
          }
        });
        //DELETE impedanceImage
        //Delete physical files
        for (const impedanceImg of impedanceImageOld) {
          const isInFinal = finalfoundImpedanceImage.some((item) => item.url === impedanceImg.url);
          if (isInFinal) continue;

          if (impedanceImg.url) {
            const impedanceImgPath = path.join(process.cwd(),  impedanceImg.url);

            try {
              await fs.unlink(impedanceImgPath);
            } catch (error) {
              console.warn(`Could not delete file ${impedanceImg.url}:`, error);
            }
          }
        }
        //Delete oldImpedanceImage records
        await prismadb.impedance_image.deleteMany({
          where: {
            productId: params.productId,
            url: {
              notIn: finalfoundImpedanceImage.map((val) => val.url),
            },
          },
        });
        if (impedance_img.length !== 0) {
          const creations = impedance_img.map(async (value: impedance_image) => {
            if(value !== null && value !== undefined){
              const alreadyInDB = finalfoundImpedanceImage.some((val) => val.url === value.url);
              if (!alreadyInDB && value.url !== '') {
                await prismadb.impedance_image.create({
                  data: {
                    productId: params.productId,
                    url: value.url,
                    createdAt: new Date(),
                    updatedAt: new Date()
                  }
                });
              }
            }
          });

          await Promise.all(creations);
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
            series,
            sizeId,
            description: description,
            updatedBy: session.name,
            updatedAt: new Date()
          },
        });
        
        
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
        const imagePath = path.join(process.cwd(),  image.url);

        try {
          await fs.unlink(imagePath);
        } catch (error) {
          console.warn(`Could not delete file ${image.url}:`, error);
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
        const datasheetPath = path.join(process.cwd(),  datasheet.url);

        try {
          await fs.unlink(datasheetPath);
        } catch (error) {
          console.warn(`Could not delete file ${datasheet.url}:`, error);
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


    //COVER_IMAGE
    const coverImageOld = await prismadb.cover_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    let finalfoundCoverImage : cover_image[] = []
    coverImageOld.forEach((val) => {
      const found = cover_img.find((value: cover_image) => value.url === val.url);
      
      if (found && !finalfoundCoverImage.some((item) => item.url === found.url)) {
        finalfoundCoverImage.push(found);
      }
    });
    //DELETE CoverImage
    //Delete physical files
    for (const coverImg of coverImageOld) {
      const isInFinal = finalfoundCoverImage.some((item) => item.url === coverImg.url);
      if (isInFinal) continue;

      if (coverImg.url) {
        const coverImgPath = path.join(process.cwd(),  coverImg.url);

        try {
          await fs.unlink(coverImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${coverImg.url}:`, error);
        }
      }
    }
    //Delete oldCoverImage records
    await prismadb.cover_image.deleteMany({
      where: {
        productId: params.productId,
        url: {
          notIn: finalfoundCoverImage.map((val) => val.url),
        },
      },
    });
    if (cover_img.length !== 0) {
      const creations = cover_img.map(async (value: cover_image) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfoundCoverImage.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.cover_image.create({
              data: {
                productId: params.productId,
                url: value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            });
          }
        }
      });

      await Promise.all(creations);
    }


    //DRAWING_IMAGE
    const drawingImageOld = await prismadb.drawing_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    let finalfoundDrawingImage : drawing_image[] = []
    drawingImageOld.forEach((val) => {
      const found = drawing_img.find((value: drawing_image) => value.url === val.url);
      
      if (found && !finalfoundDrawingImage.some((item) => item.url === found.url)) {
        finalfoundDrawingImage.push(found);
      }
    });
    //DELETE DrawingImage
    //Delete physical files
    for (const drawingImg of drawingImageOld) {
      const isInFinal = finalfoundDrawingImage.some((item) => item.url === drawingImg.url);
      if (isInFinal) continue;

      if (drawingImg.url) {
        const drawingImgPath = path.join(process.cwd(),  drawingImg.url);

        try {
          await fs.unlink(drawingImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${drawingImg.url}:`, error);
        }
      }
    }
    //Delete oldDrawingImage records
    await prismadb.drawing_image.deleteMany({
      where: {
        productId: params.productId,
        url: {
          notIn: finalfoundDrawingImage.map((val) => val.url),
        },
      },
    });
    if (drawing_img.length !== 0) {
      const creations = drawing_img.map(async (value: drawing_image) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfoundDrawingImage.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.drawing_image.create({
              data: {
                productId: params.productId,
                url: value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            });
          }
        }
      });

      await Promise.all(creations);
    }


    //GRAPH_IMAGE | FREQ RES IMAGE
    const graphImageOld = await prismadb.graph_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    let finalfoundGraphImage : graph_image[] = []
    graphImageOld.forEach((val) => {
      const found = graph_img.find((value: graph_image) => value.url === val.url);
      
      if (found && !finalfoundGraphImage.some((item) => item.url === found.url)) {
        finalfoundGraphImage.push(found);
      }
    });
    //DELETE GraphImage
    //Delete physical files
    for (const graphImg of graphImageOld) {
      const isInFinal = finalfoundGraphImage.some((item) => item.url === graphImg.url);
      if (isInFinal) continue;

      if (graphImg.url) {
        const graphImgPath = path.join(process.cwd(),  graphImg.url);

        try {
          await fs.unlink(graphImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${graphImg.url}:`, error);
        }
      }
    }
    //Delete oldGraphImage records
    await prismadb.graph_image.deleteMany({
      where: {
        productId: params.productId,
        url: {
          notIn: finalfoundGraphImage.map((val) => val.url),
        },
      },
    });
    if (graph_img.length !== 0) {
      const creations = graph_img.map(async (value: graph_image) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfoundGraphImage.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.graph_image.create({
              data: {
                productId: params.productId,
                url: value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            });
          }
        }
      });

      await Promise.all(creations);
    }



    //IMPEDANCE_IMAGE
    const impedanceImageOld = await prismadb.impedance_image.findMany({
      where: {
        productId: params.productId,
      },
    });
    let finalfoundImpedanceImage : impedance_image[] = []
    impedanceImageOld.forEach((val) => {
      const found = impedance_img.find((value: impedance_image) => value.url === val.url);
      
      if (found && !finalfoundImpedanceImage.some((item) => item.url === found.url)) {
        finalfoundImpedanceImage.push(found);
      }
    });
    //DELETE impedanceImage
    //Delete physical files
    for (const impedanceImg of impedanceImageOld) {
      const isInFinal = finalfoundImpedanceImage.some((item) => item.url === impedanceImg.url);
      if (isInFinal) continue;

      if (impedanceImg.url) {
        const impedanceImgPath = path.join(process.cwd(),  impedanceImg.url);

        try {
          await fs.unlink(impedanceImgPath);
        } catch (error) {
          console.warn(`Could not delete file ${impedanceImg.url}:`, error);
        }
      }
    }
    //Delete oldImpedanceImage records
    await prismadb.impedance_image.deleteMany({
      where: {
        productId: params.productId,
        url: {
          notIn: finalfoundImpedanceImage.map((val) => val.url),
        },
      },
    });
    if (impedance_img.length !== 0) {
      const creations = impedance_img.map(async (value: impedance_image) => {
        if(value !== null && value !== undefined){
          const alreadyInDB = finalfoundImpedanceImage.some((val) => val.url === value.url);
          if (!alreadyInDB && value.url !== '') {
            await prismadb.impedance_image.create({
              data: {
                productId: params.productId,
                url: value.url,
                createdAt: new Date(),
                updatedAt: new Date()
              }
            });
          }
        }
      });

      await Promise.all(creations);
    }


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
        series,
        sizeId,
        description: description,
        updatedBy: session.name,
        updatedAt: new Date()
      },
    });

    revalidatePath(`/products/${slugify(name)}`);

    return NextResponse.json("success");
  } catch (error) {
    console.log('[PRODUCT_PATCH]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
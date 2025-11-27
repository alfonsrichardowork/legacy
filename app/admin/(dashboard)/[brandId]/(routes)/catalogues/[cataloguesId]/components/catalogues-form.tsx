"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { catalogues, featuredseries, superior } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import Image from "next/image"
import { ChevronDownIcon, File, Trash } from "lucide-react"
import { uploadImage } from "@/app/admin/upload-image"
import { uploadDatasheet } from "@/app/admin/upload-datasheet"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/admin/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import Link from "next/link"


const formSchema = z.object({
  name: z.string().min(1),
  pdf: z.string().optional(),
  publicationDate: z.date(),
});

type CataloguesFormValues = z.infer<typeof formSchema>

interface CataloguesFormProps {
  initialData: catalogues | null;
};

export const CataloguesForm: React.FC<CataloguesFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
 
  const [cataloguesPDF, setCataloguesPDF] = useState<string>()
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(initialData?.publicationDate ?? new Date())
  const [open, setOpen] = useState(false)

  const title = initialData ? 'Edit Catalogues' : 'Add Catalogues';
  const toastMessage = initialData ? 'Catalogues updated.' : 'Catalogues added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    pdf: '',
    publicationDate: new Date(),
  }

  useEffect(() => {
  const fetchData = async () => {
    if (initialData && initialData.pdf) {
      setCataloguesPDF(initialData.pdf);
    }
    else{
      setCataloguesPDF('')
    }
  };
  
  fetchData().catch((error) => {
    console.error("Error fetching catalogues: ", error);
  });
  }, [params.cataloguesId, initialData, initialData?.pdf]);

  const deletePDF = async () => {
    setCataloguesPDF('')
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  async function handlePDFUpload (file: File): Promise<string> {
    if (file) {
      let updatedCataloguesPDF = cataloguesPDF;
      try {
        const formData = new FormData();
        formData.append('file', file);

        const url = await uploadDatasheet(formData, 'other');
        updatedCataloguesPDF = url
        return updatedCataloguesPDF;
        } catch (error) {
        console.error("Error uploading catalogues PDF:", error);
        return '';
      }
    }
    return '';
  };


  const form = useForm<CataloguesFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: CataloguesFormValues) => {
    try {
      setLoading(true);

      if (selectedFile) {
        data.pdf = await handlePDFUpload(selectedFile);
      }
      else{
        data.pdf = cataloguesPDF
      }
      data.publicationDate = date ?? new Date()

      const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_ADD_CATALOGUES}`;
      //@ts-ignore
      const API_EDITED = API.replace('{brandId}', params.brandId)
      //@ts-ignore
      const API_EDITED2 = API_EDITED.replace('{cataloguesId}', params.cataloguesId)
      const response = await axios.patch(API_EDITED2, data);
           
      if(response.data === 'duplicate'){
        toast.error("Duplicate Catalogues")
      }
      else if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/catalogues`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  return (  
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description='' />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
                <div className="text-left font-bold pb-2">PDF File</div>
                <div className="flex space-x-4 justify-between items-center">
                  {cataloguesPDF && (
                    <Link
                      target="_blank"
                      href={cataloguesPDF}
                      className="text-blue-600 font-medium hover:underline transition-colors whitespace-nowrap flex items-center gap-2"
                    >
                      <File width={20} height={20}/> View File
                    </Link>
                  )}
                  {!cataloguesPDF && (
                  <Input
                    id={`file`}
                    type="file"
                    accept=".pdf"
                    name="file"
                    onChange={(e) =>
                      e.target.files && handleFileChange(e)
                    }
                    required
                    disabled={loading}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  )}
                  {cataloguesPDF && cataloguesPDF !== '' && (
                  <Button
                    variant={"destructive"}
                    onClick={() => deletePDF()}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                )}
                </div>
            </div>


            <div className="rounded-lg p-4 gap-4 flex items-center w-full bg-background shadow-lg shadow-primary-foreground/30 border">
              <div className="w-full">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Judul" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="publicationDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Join Date
                        </FormLabel>
                        <FormControl>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-48 justify-between font-normal"
                              >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  setDate(date)
                                  setOpen(false)
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button disabled={loading} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};


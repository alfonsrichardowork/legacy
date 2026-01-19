"use client"

import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Bold, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, ImageIcon, Italic, Link, List, ListOrdered, Redo, Strikethrough, Trash, UnderlineIcon, Undo, Unlink, YoutubeIcon } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

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
import { AlertModal } from "@/app/admin/components/modals/alert-modal"
import { ApiAlert } from "@/app/admin/components/ui/api-alert"
import { useOrigin } from "@/app/admin/hooks/use-origin"
import { brand } from "@prisma/client"
import { uploadImage } from "@/app/admin/upload-image"
import Image from "next/image"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import HeadingTiptap from '@tiptap/extension-heading';
import ImageTiptap from '@tiptap/extension-image';
import LinkTiptap from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Placeholder from "@tiptap/extension-placeholder"
import Youtube from "@tiptap/extension-youtube"
import Table from "@tiptap/extension-table"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import TableHeader from "@tiptap/extension-table-header"
import Underline from "@tiptap/extension-underline"
import { Toggle } from "@/app/admin/components/ui/toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/admin/components/ui/popover"
import '@/app/css/styles.scss'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/(legacy)/components/ui/accordionmobilemenu"

const formSchema = z.object({
  img: z.string().optional(),
  title: z.string().optional(),
  desc: z.string().optional(),
  imgHomePage: z.string().optional(),
  descHomePage: z.string().optional(),
});

type AboutUsFormValues = z.infer<typeof formSchema>

interface AboutUsFormProps {
  initialData: brand;
};

export const AboutUsForm: React.FC<AboutUsFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [aboutUsImage, setAboutUsImage] = useState<string>()
  const [aboutUsHomepageImage, setAboutUsHomepageImage] = useState<string>()
  const [selectedFile, setSelectedFile] = useState<File>();
  const [selectedFileHomepage, setSelectedFileHomepage] = useState<File>();
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const [youtubeUrl2, setYoutubeUrl2] = useState("")
  const [linkUrl2, setLinkUrl2] = useState("")

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<AboutUsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  });

useEffect(() => {
  const fetchData = async () => {
    if (initialData && initialData.img) {
      setAboutUsImage(initialData.img);
    }
    else{
      setAboutUsImage('')
    }
    if (initialData && initialData.imgHomePage) {
      setAboutUsHomepageImage(initialData.imgHomePage);
    }
    else{
      setAboutUsHomepageImage('')
    }
  };
  fetchData().catch((error) => {
      console.error("Error fetching about us: ", error);
    });
    }, [params.brandId, initialData, initialData?.img]);
  
    const deleteImage = async () => {
      setAboutUsImage('')
    };

    const deleteImageHomepage = async () => {
      setAboutUsHomepageImage('')
    };
  
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setSelectedFile(file);
    };

    const handleFileChangeHomepage = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      setSelectedFileHomepage(file);
    };
  
    async function handleImageUpload (file: File): Promise<string> {
      if (file) {
        let updatedAboutUsImage = aboutUsImage;
        try {
          const formData = new FormData();
          formData.append('image', file);
  
          const url = await uploadImage(formData, 'other');
          updatedAboutUsImage = url
          return updatedAboutUsImage;
          } catch (error) {
          console.error("Error uploading about us image:", error);
          return '';
        }
      }
      return '';
    };
  

  const onSubmit = async (data: AboutUsFormValues) => {
    try {
      setLoading(true);

      if (selectedFile) {
        data.img = await handleImageUpload(selectedFile);
      }
      else{
        data.img = aboutUsImage
      }

      if (selectedFileHomepage) {
        data.imgHomePage = await handleImageUpload(selectedFileHomepage);
      }
      else{
        data.imgHomePage = aboutUsHomepageImage
      }

      if(editor && editor.getHTML() && editor.getHTML() !== '<p></p>'){
        data.desc = editor.getHTML()
      }
      else{
        data.desc = ''
      }




      
      if(editor2 && editor2.getHTML() && editor2.getHTML() !== '<p></p>'){
        data.descHomePage = editor2.getHTML()
      }
      else{
        data.descHomePage = ''
      }


  
      const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_EDIT_ABOUT_US}`;
      //@ts-ignore
      const API_EDITED = API.replace('{brandId}', params.brandId)
      const response = await axios.patch(API_EDITED, data);
      if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Session expired, please login again")
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again")
      }
      else if(response.data === 'not_admin'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/`);
        router.refresh();
        toast.error("Unauthorized!")
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}`);
        router.refresh();
        toast.success('About Us updated.');
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };



  const cleanHTML = initialData?.desc
    ?.replace(/<pre><code>/gi, '<p>')
    ?.replace(/<\/code><\/pre>/gi, '</p>')
    ?.replace(/<pre>/gi, '<p>')
    ?.replace(/<\/pre>/gi, '</p>')

    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Underline,
        HeadingTiptap.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        BulletList,
        OrderedList,
        LinkTiptap.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url: string, ctx:any) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map((p: string | { scheme: string }) => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch (error) {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch (error) {
              return false
            }
          },
  
        }),
        ImageTiptap.configure({
          HTMLAttributes: {
            class: "max-w-full rounded-md my-4",
          },
        }),
        Youtube.configure({
          width: 640,
          height: 480,
          HTMLAttributes: {
            class: "my-4 rounded overflow-hidden",
          },
        }),
        Placeholder.configure({
          placeholder: "Write something...",
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: "border-collapse table-auto w-full my-4",
          },
        }),
        TableRow,
        TableHeader,
        TableCell.configure({
          HTMLAttributes: {
            class: "border border-gray-300 p-2",
          },
        }),
      ],
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-hidden min-h-[200px] max-w-none",
        },
      },
      content: cleanHTML ? cleanHTML : '<p></p>',
    });

    
  const cleanHTML2 = initialData?.descHomePage
    ?.replace(/<pre><code>/gi, '<p>')
    ?.replace(/<\/code><\/pre>/gi, '</p>')
    ?.replace(/<pre>/gi, '<p>')
    ?.replace(/<\/pre>/gi, '</p>')

    const editor2 = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        Underline,
        HeadingTiptap.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        BulletList,
        OrderedList,
        LinkTiptap.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url: string, ctx:any) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map((p: string | { scheme: string }) => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch (error) {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch (error) {
              return false
            }
          },
  
        }),
        ImageTiptap.configure({
          HTMLAttributes: {
            class: "max-w-full rounded-md my-4",
          },
        }),
        Youtube.configure({
          width: 640,
          height: 480,
          HTMLAttributes: {
            class: "my-4 rounded overflow-hidden",
          },
        }),
        Placeholder.configure({
          placeholder: "Write something...",
        }),
        Table.configure({
          resizable: true,
          HTMLAttributes: {
            class: "border-collapse table-auto w-full my-4",
          },
        }),
        TableRow,
        TableHeader,
        TableCell.configure({
          HTMLAttributes: {
            class: "border border-gray-300 p-2",
          },
        }),
      ],
      editorProps: {
        attributes: {
          class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-hidden min-h-[200px] max-w-none",
        },
      },
      content: cleanHTML2 ? cleanHTML2 : '<p></p>',
    });


    const addLink = () => {
        if (linkUrl) {
          editor!.chain().focus().extendMarkRange("link").setLink({ href: linkUrl }).run()
          setLinkUrl("")
        } else {
          editor!.chain().focus().extendMarkRange("link").unsetLink().run()
        }
      }
      
    const addImage = useCallback((url: string) => {
      // const url = window.prompt('URL')
  
      if (url) {
        editor!.chain().focus().setImage({ src: url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${url}` : url }).run()
      }
    }, [editor])
      
    const addYoutubeVideo = () => {
      if (youtubeUrl) {
        editor!.chain().focus().setYoutubeVideo({ src: youtubeUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${youtubeUrl}` : youtubeUrl }).run()
        setYoutubeUrl("")
      }
    }
        
    async function handleImageUploadContent (file: File): Promise<string> {
      if (file) {
        try {
          const formData = new FormData();
          formData.append('image', file);
  
          const url = await uploadImage(formData, 'other');
          return url
          } catch (error) {
            return ''
        }
      }
      return '';
    };

    const handleFileChangeTiptap = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        let testUrl = await handleImageUploadContent(e.target.files?.[0]);
        addImage(testUrl)
      }
    };



    const addLink2 = () => {
        if (linkUrl2) {
          editor2!.chain().focus().extendMarkRange("link").setLink({ href: linkUrl2 }).run()
          setLinkUrl2("")
        } else {
          editor2!.chain().focus().extendMarkRange("link").unsetLink().run()
        }
      }
      
    const addImage2 = useCallback((url: string) => {
      // const url = window.prompt('URL')
  
      if (url) {
        editor2!.chain().focus().setImage({ src: url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${url}` : url }).run()
      }
    }, [editor2])
      
    const addYoutubeVideo2 = () => {
      if (youtubeUrl2) {
        editor2!.chain().focus().setYoutubeVideo({ src: youtubeUrl2.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${youtubeUrl2}` : youtubeUrl2 }).run()
        setYoutubeUrl2("")
      }
    }
        
    async function handleImageUploadContent2 (file: File): Promise<string> {
      if (file) {
        try {
          const formData = new FormData();
          formData.append('image', file);
  
          const url = await uploadImage(formData, 'other');
          return url
          } catch (error) {
            return ''
        }
      }
      return '';
    };

    const handleFileChangeTiptap2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        let testUrl = await handleImageUploadContent2(e.target.files?.[0]);
        addImage2(testUrl)
      }
    };


   
    
if (!editor || !editor2) return null

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="About Us settings" description="Manage about us" />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">


   <Accordion type="single" collapsible>
            <AccordionItem value="item-2" className="w-full rounded-xl p-2 bg-background shadow-lg shadow-primary-foreground/30 border">
              <AccordionTrigger className="flex items-center justify-center gap-2">About Us Home Page</AccordionTrigger>
              <AccordionContent>
                <div className="block gap-4">
                  <div className="border rounded-lg p-4 shadow-lg bg-background">
                      <div className="text-left font-bold pb-2">About Us Home Page</div>
                      <div className="flex space-x-4 justify-between items-center">
                        {aboutUsHomepageImage && (
                          <Image alt={'About Us Homepage Image'} src={aboutUsHomepageImage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${aboutUsHomepageImage}` : aboutUsHomepageImage} width={200} height={200} className="w-52 h-fit" priority/>
                        )}
                        {!aboutUsHomepageImage && (
                        <Input
                          id={`file`}
                          type="file"
                          accept="image/*"
                          name="file"
                          onChange={(e) =>
                            e.target.files && handleFileChangeHomepage(e) // Ensure your file upload function can handle image files
                          }
                          required
                          disabled={loading}
                          className="border border-gray-300 p-2 rounded-md"
                        />
                        )}
                        {aboutUsHomepageImage && aboutUsHomepageImage !== '' && (
                        <Button
                          variant={"destructive"}
                          onClick={() => deleteImageHomepage()}
                        >
                          <Trash width={20} height={20} />
                        </Button>
                      )}
                      </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="border rounded-lg p-4 shadow-lg gap-4 bg-background">
                    <div className="font-bold mb-2">Content Homepage</div>
                    {/* Toolbar */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <Toggle
                        pressed={editor2.isActive('bold')}
                        onClick={() => editor2.chain().focus().toggleBold().run()}
                      >
                        <Bold className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor2.isActive('italic')}
                        onClick={() => editor2.chain().focus().toggleItalic().run()}
                      >
                        <Italic className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor2.isActive('underline')}
                        onClick={() => editor2.chain().focus().toggleUnderline().run()}
                      >
                        <UnderlineIcon className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor2.isActive('strike')}
                        onClick={() => editor2.chain().focus().toggleStrike().run()}
                      >
                        <Strikethrough className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor2.isActive('bulletList')}
                        onClick={() => editor2.chain().focus().toggleBulletList().run()}
                      >
                        <List className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor2.isActive('orderedList')}
                        onClick={() => editor2.chain().focus().toggleOrderedList().run()}
                      >
                        <ListOrdered className="w-4 h-4" />
                      </Toggle>
                      {[1, 2, 3, 4, 5, 6].map((level) => (
                        <Toggle
                          key={level}
                          pressed={editor2.isActive('heading', { level })}
                          onClick={() => editor2.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                        >
                          {level === 1 && <Heading1 className="w-4 h-4" />}
                          {level === 2 && <Heading2 className="w-4 h-4" />}
                          {level === 3 && <Heading3 className="w-4 h-4" />}
                          {level === 4 && <Heading4 className="w-4 h-4" />}
                          {level === 5 && <Heading5 className="w-4 h-4" />}
                          {level === 6 && <Heading6 className="w-4 h-4" />}
                        </Toggle>
                      ))}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Toggle
                            pressed={editor2.isActive('link')}
                          >
                            <Link className="w-4 h-4" />
                          </Toggle>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="flex flex-col space-y-2">
                            <p className="text-sm text-muted-foreground">Add a link</p>
                            <div className="flex space-x-2">
                              <Input placeholder="https://example.com" value={linkUrl2} onChange={(e) => setLinkUrl2(e.target.value)} />
                              <Button onClick={addLink2}>Add</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>                
                      <Toggle
                        pressed={!editor2.isActive('link')}
                        onClick={() => editor2.chain().focus().unsetLink().run()}
                      >
                          <Unlink className="w-4 h-4" />
                      </Toggle>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="flex flex-col space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Upload from device</p>
                              <Input  
                                id={`file`}
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={(e) =>
                                  e.target.files && handleFileChangeTiptap2(e)
                                }
                                className="border border-gray-300 p-2 rounded-md"
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <YoutubeIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="flex flex-col space-y-2">
                            <p className="text-sm text-muted-foreground">Add a YouTube video</p>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                                value={youtubeUrl2}
                                onChange={(e) => setYoutubeUrl2(e.target.value)}
                              />
                              <Button onClick={addYoutubeVideo2}>Add</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className="ml-auto flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editor2.chain().focus().undo().run()}
                          disabled={!editor2.can().undo()}
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editor2.chain().focus().redo().run()}
                          disabled={!editor2.can().redo()}
                        >
                          <Redo className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <EditorContent editor={editor2} className="border p-4"/>
                  </div>      

                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>


          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="w-full rounded-xl p-2 bg-background shadow-lg shadow-primary-foreground/30 border">
              <AccordionTrigger className="flex items-center justify-center gap-2">About Us Main Page</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 shadow-lg bg-background">
                      <div className="text-left font-bold pb-2">About Us Image</div>
                      <div className="flex space-x-4 justify-between items-center">
                        {aboutUsImage && (
                          <Image alt={'About Us Image'} src={aboutUsImage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${aboutUsImage}` : aboutUsImage} width={200} height={200} className="w-52 h-fit" priority/>
                        )}
                        {!aboutUsImage && (
                        <Input
                          id={`file`}
                          type="file"
                          accept="image/*"
                          name="file"
                          onChange={(e) =>
                            e.target.files && handleFileChange(e) // Ensure your file upload function can handle image files
                          }
                          required
                          disabled={loading}
                          className="border border-gray-300 p-2 rounded-md"
                        />
                        )}
                        {aboutUsImage && aboutUsImage !== '' && (
                        <Button
                          variant={"destructive"}
                          onClick={() => deleteImage()}
                        >
                          <Trash width={20} height={20} />
                        </Button>
                      )}
                      </div>
                  </div>
                  <div className="border rounded-lg p-4 shadow-lg gap-4 flex items-center w-full bg-background">
                    <div className="w-full">
                      <div className="py-2">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="font-bold text-base flex gap-2">
                                Judul
                              </FormLabel>
                              <FormControl>
                                <Input disabled={loading} placeholder="Judul (Indo)" {...field}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-4">
                  <div className="border rounded-lg p-4 shadow-lg gap-4 bg-background">
                    <div className="font-bold mb-2">Content</div>
                    {/* Toolbar */}
                    <div className="flex gap-2 mb-4 flex-wrap">
                      <Toggle
                        pressed={editor.isActive('bold')}
                        onClick={() => editor.chain().focus().toggleBold().run()}
                      >
                        <Bold className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor.isActive('italic')}
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                      >
                        <Italic className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor.isActive('underline')}
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                      >
                        <UnderlineIcon className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor.isActive('strike')}
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                      >
                        <Strikethrough className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor.isActive('bulletList')}
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                      >
                        <List className="w-4 h-4" />
                      </Toggle>
                      <Toggle
                        pressed={editor.isActive('orderedList')}
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                      >
                        <ListOrdered className="w-4 h-4" />
                      </Toggle>
                      {[1, 2, 3, 4, 5, 6].map((level) => (
                        <Toggle
                          key={level}
                          pressed={editor.isActive('heading', { level })}
                          onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
                        >
                          {level === 1 && <Heading1 className="w-4 h-4" />}
                          {level === 2 && <Heading2 className="w-4 h-4" />}
                          {level === 3 && <Heading3 className="w-4 h-4" />}
                          {level === 4 && <Heading4 className="w-4 h-4" />}
                          {level === 5 && <Heading5 className="w-4 h-4" />}
                          {level === 6 && <Heading6 className="w-4 h-4" />}
                        </Toggle>
                      ))}
                      <Popover>
                        <PopoverTrigger asChild>
                          <Toggle
                            pressed={editor.isActive('link')}
                          >
                            <Link className="w-4 h-4" />
                          </Toggle>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="flex flex-col space-y-2">
                            <p className="text-sm text-muted-foreground">Add a link</p>
                            <div className="flex space-x-2">
                              <Input placeholder="https://example.com" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} />
                              <Button onClick={addLink}>Add</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>                
                      <Toggle
                        pressed={!editor.isActive('link')}
                        onClick={() => editor.chain().focus().unsetLink().run()}
                      >
                          <Unlink className="w-4 h-4" />
                      </Toggle>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <ImageIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="flex flex-col space-y-4">
                            <div>
                              <p className="text-sm font-medium mb-2">Upload from device</p>
                              <Input  
                                id={`file`}
                                type="file"
                                accept="image/*"
                                name="file"
                                onChange={(e) =>
                                  e.target.files && handleFileChangeTiptap(e)
                                }
                                className="border border-gray-300 p-2 rounded-md"
                              />
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <YoutubeIcon className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="flex flex-col space-y-2">
                            <p className="text-sm text-muted-foreground">Add a YouTube video</p>
                            <div className="flex space-x-2">
                              <Input
                                placeholder="https://youtube.com/watch?v=dQw4w9WgXcQ"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                              />
                              <Button onClick={addYoutubeVideo}>Add</Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>

                      <div className="ml-auto flex">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editor.chain().focus().undo().run()}
                          disabled={!editor.can().undo()}
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => editor.chain().focus().redo().run()}
                          disabled={!editor.can().redo()}
                        >
                          <Redo className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <EditorContent editor={editor} className="border p-4"/>
                  </div>      
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>


       

          <Button disabled={loading} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit" variant={'secondary'}>
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
};

import prismadb from "@/lib/prismadb";
import { ContactForm } from "./components/contact-form";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

const ContactPage = async (
  props: {
    params: Promise<{ contactId: string }>
  }
) => {
  const params = await props.params;
  const oneContact = await prismadb.contacts.findUnique({
    where: {
      id: params.contactId,
    }
  });


  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ContactForm 
          initialData={oneContact}
        />
      </div>
    </div>
  );
}

export default ContactPage;


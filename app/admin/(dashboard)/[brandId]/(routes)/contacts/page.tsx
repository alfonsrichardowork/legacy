import prismadb from "@/lib/prismadb";
import { getSession } from "@/app/admin/actions";
import { redirect } from "next/navigation";
import { ContactClient } from "./components/client";
import { ContactColumn } from "./components/columns";

const ContactsPage = async (
  props: {
    params: Promise<{ brandId: string }>
  }
) => {
  const session = await getSession();

  if(!session.isLoggedIn){
    redirect("/admin")
  }

  const allContacts = await prismadb.contacts.findMany({
    orderBy: {
      updatedAt: 'desc'
    }
  });

  const formattedContacts: ContactColumn[] = allContacts.map((item) => ({
    id: item.id,
    type: item.type,
    phoneNumber: item.phone.split('||').length > 0 ? item.phone.split('||').join(', ') : item.phone,
    city: (() => {
      try {
        const parsed = JSON.parse(item.city);
        return parsed?.name ?? '';
      } catch {
        return item.city ?? '';
      }
    })(),
  }));


  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ContactClient data={formattedContacts} userRole={session.isAdmin!}/>
      </div>
    </div>
  );
};

export default ContactsPage;

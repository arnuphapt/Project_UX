import { useRouter, usePathname } from 'next/navigation';
import { Link, Button } from "@nextui-org/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/Shared/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineDatabase } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";
import { CiFilter } from "react-icons/ci";
import { MdOutlineManageAccounts } from "react-icons/md";

export default function AdminSidebar() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    setIsClient(true);
    const session = window?.sessionStorage?.getItem('user') || null;
    setUserSession(session);
  }, []);

  useEffect(() => {
    if (isClient && !loading && !user && !userSession) {
      router.push('/admin');
    }
  }, [user, loading, userSession, router, isClient]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (window?.sessionStorage) {
        window.sessionStorage.removeItem('user');
      }
      router.push('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Function to check if menu item is active
  const isActiveMenu = (path) => {
    return pathname.endsWith(path);
  };

  // Menu item component with consistent styling
  const MenuItem = ({ href, icon: Icon, label, onClick }) => {
    const isActive = isActiveMenu(href.split('/').pop());
    
    return (
      <Link
        href={href}
        onPress={onClick}
        className={`relative flex w-full items-center gap-2 rounded-lg px-4 py-3 text-md font-medium transition-all duration-200 group
          ${isActive 
            ? 'bg-primary/10 text-primary before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-primary' 
            : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground'
          }`}
      >
        <Icon className={`h-5 w-5 transition-colors ${isActive ? 'text-primary' : 'text-gray-500 group-hover:text-gray-700'}`} />
        <span className={`transition-colors ${isActive ? 'font-semibold' : ''}`}>{label}</span>
      </Link>
    );
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-14 flex-col border-r bg-background sm:w-64 shadow-md">
      <div className="flex h-14 shrink-0 items-center justify-center p-11">
        <Link href="/" className="hidden items-center text-xl font-semibold sm:flex">
        <MdOutlineDashboard className="h-6 w-6" />
          ADMIN PAGE
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex flex-col gap-1 px-3 py-6">
          <MenuItem 
            href="/admin/dashboard"
            icon={MdOutlineDashboard}
            label="Dashboard"
          />
          <MenuItem 
            href="/admin/userlist"
            icon={FaRegUser}
            label="Users List"
          />
          <MenuItem 
            href="/admin/postlist"
            icon={AiOutlineDatabase}
            label="Posts List"
          />
          <MenuItem
          href="/admin/adminlist"
          icon={GoDatabase}
          label="Admin Posts"
          />
          <MenuItem
          href="/admin/filtermanager"
          icon={CiFilter}
          label="Filter Management"
          />
          <MenuItem
          href="/admin/adminmanager"
          icon={MdOutlineManageAccounts}
          label="Admin Management"
          />
        </nav>
      </div>

      <div className="flex shrink-0 border-t px-4 py-6">
        <Button
                  color="danger"

          variant="bordered" 
          className="w-full justify-start gap-2 " 
          onPress={handleSignOut}

        >
          <CiLogin className="h-5 w-5" />
          Logout
        </Button>
      </div>

    </aside>
  );
}
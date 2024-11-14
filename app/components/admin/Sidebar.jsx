import { useRouter } from 'next/navigation';
import { Link, Button } from "@nextui-org/react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/Shared/firebaseConfig';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { MdOutlineDashboard } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineDatabase } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { CiLogin } from "react-icons/ci";

export default function AdminSidebar() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [userSession, setUserSession] = useState(null);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
    // Safely check sessionStorage after mount
    const session = window?.sessionStorage?.getItem('user') || null;
    setUserSession(session);
  }, []);

  useEffect(() => {
    // Only run authentication check on client side
    if (isClient && !loading && !user && !userSession) {
      router.push('/adminurachat389');
    }
  }, [user, loading, userSession, router, isClient]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      if (window?.sessionStorage) {
        window.sessionStorage.removeItem('user');
      }
      router.push('/adminurachat389');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-10 flex w-14 flex-col border-r bg-background sm:w-64">
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:justify-start sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-lg">
          ADMIN PAGE
        </Link>
        <Button variant="ghost" size="icon" className="sm:hidden">
          <MdOutlineDashboard className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      
      {/* Conditional Message Display */}
      <div className="px-4 py-2 text-center">
        {loading ? (
          <p>Loading...</p>
        ) : user ? (
          <p>YOU'RE IN ADMIN PAGE</p>
        ) : (
          <p>YOU'RE NOT LOGGED IN</p>
        )}
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex flex-col items-start gap-2 px-4 py-6 sm:px-6">
          <Link
            href="/adminurachat389/Dashboard"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-md font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted-light"
          >
            <MdOutlineDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            href="/adminurachat389/UserList"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-md font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted-light"
          >
            <FaRegUser className="h-5 w-5" />
            Users
          </Link>
          <Link
            href="/adminurachat389/PostList"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-md font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <AiOutlineDatabase className="h-5 w-5" />
            Posts
          </Link>
          <Link
            href="/adminurachat389/CreatePost"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-md font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted-light"
          >
            <HiOutlinePencilSquare className="h-5 w-5" />
            Create Posts
          </Link>
        </nav>
      </div>
      <div className="flex shrink-0 border-t px-4 py-6 sm:px-6">
        <Button variant="ghost" className="w-full justify-start gap-2" onClick={handleSignOut}>
          <CiLogin className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}

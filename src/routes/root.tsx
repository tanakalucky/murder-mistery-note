import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className='w-full h-full'>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}

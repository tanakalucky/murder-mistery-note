import AddPdfDialog from '@/features/pdf/components/AddPdfDialog';
import { usePdfStore } from '@/features/pdf/store/pdf.store';
import { File } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

export function AppSidebar() {
  const { pdfList } = usePdfStore();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>資料</SidebarGroupLabel>
          <AddPdfDialog />

          <SidebarGroupContent>
            <SidebarMenu>
              {pdfList.map((item, index) => (
                <SidebarMenuItem key={`${item.name}-${item.url}`}>
                  <SidebarMenuButton asChild>
                    <Link to={`/pdf/${index}`}>
                      <File />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

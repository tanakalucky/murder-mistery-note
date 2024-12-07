import AddPdfDialog from '@/features/pdf/components/AddPdfDialog';
import { usePdfStore } from '@/features/pdf/store/pdf.store';
import { File, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

export function AppSidebar() {
  const { pdfList, deletePdf } = usePdfStore();

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

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction>
                        <MoreHorizontal />
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='right' align='start'>
                      <DropdownMenuItem onClick={() => deletePdf(index)}>
                        <span>削除</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

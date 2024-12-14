import AddPdfDialog from '@/features/pdf/components/AddPdfDialog';
import { usePdfStore } from '@/features/pdf/store/pdf.store';
import { Clock4, File, MoreHorizontal, NotebookPen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleDelete = (index: number) => {
    if (!window.confirm('本当にこのPDFを削除しますか？')) {
      return;
    }

    if (pdfList.length === 1) {
      navigate('/');
    } else {
      const isLastIdx = pdfList.length - 1 === index;
      if (isLastIdx) {
        navigate(`/pdf/${index - 1}`);
      }
    }

    deletePdf(index);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>ノート</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to='/memo'>
                    <NotebookPen />
                    <span>メモ</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to='/time-table'>
                    <Clock4 />
                    <span>タイムテーブル</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

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
                      <DropdownMenuItem onClick={() => handleDelete(index)}>
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

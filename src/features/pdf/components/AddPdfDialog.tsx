import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SidebarGroupAction } from '@/components/ui/sidebar';
import { Plus } from 'lucide-react';
import { type ChangeEvent, useState } from 'react';
import { usePdfStore } from '../store/pdf.store';

export default function AddPdfDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const { pdfList, addPdf } = usePdfStore();

  const handleClick = () => {
    setOpen(true);
  };

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    setName(value);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  };

  const handleAddPdf = () => {
    addPdf([...pdfList, { name, url }]);
    setName('');
    setUrl('');
    setOpen(false);
  };

  return (
    <>
      <SidebarGroupAction title='Add PDF' onClick={handleClick}>
        <Plus /> <span className='sr-only'>Add PDF</span>
      </SidebarGroupAction>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>PDFを追加</DialogTitle>
          </DialogHeader>

          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                ファイル名
              </Label>
              <Input id='name' className='col-span-3' value={name} onChange={handleChangeName} />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='pdf' className='text-right'>
                PDFファイル
              </Label>
              <Input id='pdf' className='col-span-3' type='file' accept='application/pdf' onChange={handleChangeFile} />
            </div>
          </div>

          <DialogFooter>
            <Button type='button' onClick={handleAddPdf}>
              追加
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

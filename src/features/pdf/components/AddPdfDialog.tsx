import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
  };

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUrl(URL.createObjectURL(file));
  };

  const handleAddPdf = () => {
    if (!name || !url) {
      alert('ファイル名とPDFファイルを選択してください。');
      return;
    }

    addPdf([...pdfList, { name, url }]);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    clearValues();
  };

  const clearValues = () => {
    setName('');
    setUrl('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarGroupAction title='Add PDF'>
          <Plus /> <span className='sr-only'>Add PDF</span>
        </SidebarGroupAction>
      </DialogTrigger>

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

        <DialogFooter className='flex gap-4'>
          <Button type='button' variant='secondary' onClick={handleClose}>
            閉じる
          </Button>
          <Button type='submit' onClick={handleAddPdf}>
            追加
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

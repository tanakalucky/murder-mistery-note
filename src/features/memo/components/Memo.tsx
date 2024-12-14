import { Textarea } from '@/components/ui/textarea';
import { debounce } from 'lodash';
import { useEffect, useRef } from 'react';

export default function Memo() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const savedData = localStorage.getItem('murder-mistery-note');
  const initialData = savedData ? savedData : '';

  const handleChange = debounce((value: string) => {
    saveData(value);
  }, 300);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.value = initialData;
    }
  }, []);

  return (
    <div className='h-[calc(100vh-28px)] w-full px-5 pb-3'>
      <Textarea
        ref={textareaRef}
        className='h-full max-h-full'
        placeholder='メモを記入しよう!'
        onChange={(e) => handleChange(e.currentTarget.value)}
      />
    </div>
  );
}

const saveData = (data: string): void => {
  localStorage.setItem('murder-mistery-note', data);
};

import './App.css';
import { ChangeEvent, useEffect, useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import { CodesPDF } from './components';

function App() {
  const [input, setInput] = useState<string>('');
  const [codes, setCodes] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState<number>(7);
  const [codesPerRow, setCodesPerRow] = useState<number>(2);
  const [codeSize, setCodeSize] = useState<number>(200);
  const [paddingX, setPaddingX] = useState<number>(50);
  const [paddingY, setPaddingY] = useState<number>(20);

  useEffect((): void => {
    const codes: string[] = input.split(' ').map((cod: string) => cod.trim());
    setCodes(codes);
  }, [input]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<number>>,
    minValue: number
  ) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) return;
    setState(value >= minValue ? value : minValue);
  };

  const handleRowsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, setRowsPerPage, 1);
  };

  const handleCodesPerRowChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, setCodesPerRow, 1);
  };

  const handleCodeSizeChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, setCodeSize, 0);
  };

  const handleCodePaddingX = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, setPaddingX, 0);
  };

  const handleCodePaddingY = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, setPaddingY, 0);
  };

  return (
    <div className='container'>
      <div className='input-container'>
        <textarea
          value={input}
          className='input-container__textarea'
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
            const cleanedNewlines = e.target.value.replace(/\n/g, ' ');
            const cleanedInput = cleanedNewlines.replace(/\s{2,}/g, ' ');
            setInput(cleanedInput);
          }}
        />

        <label htmlFor='rowsPerPage'>Filas por página:</label>
        <input
          id='rowsPerPage'
          className='input-container__input'
          type='number'
          min='1'
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
        />

        <label htmlFor='codesPerRow'>Columnas por fila:</label>
        <input
          id='codesPerRow'
          className='input-container__input'
          type='number'
          min='1'
          value={codesPerRow}
          onChange={handleCodesPerRowChange}
        />

        <label htmlFor='codeSize'>Tamaño del código:</label>
        <input
          id='codeSize'
          className='input-container__input'
          type='number'
          min='1'
          value={codeSize}
          onChange={handleCodeSizeChange}
        />

        <label htmlFor='codePadding'>Espaciado eje x:</label>
        <input
          id='codePadding'
          className='input-container__input'
          type='number'
          min='1'
          value={paddingX}
          onChange={handleCodePaddingX}
        />

        <label htmlFor='codePadding'>Espaciado eje y:</label>
        <input
          id='codePadding'
          className='input-container__input'
          type='number'
          min='1'
          value={paddingY}
          onChange={handleCodePaddingY}
        />
      </div>

      <div className='pdf-container'>
        <PDFViewer className='pdf-container__viewer'>
          <CodesPDF
            codes={codes}
            rowsPerPage={rowsPerPage}
            codesPerRow={codesPerRow}
            codeSize={codeSize}
            padding={`${paddingY}px ${paddingX}px`}
          />
        </PDFViewer>
      </div>
    </div>
  );
}

export default App;

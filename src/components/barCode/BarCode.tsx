import { View, Image } from '@react-pdf/renderer';
import JsBarcode from 'jsbarcode';
import { useEffect, useState } from 'react';

interface BarCodeProps {
  code: string;
  codeSize: number;
  padding: string;
}
function Barcode({ code, codeSize, padding }: BarCodeProps) {
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    const generateBarcode = async (): Promise<void> => {
      if (!code) return;

      try {
        console.log(code);
        const isValidInput = /^[A-Za-z0-9]+$/.test(code);
        if (!isValidInput) {
          alert(
            `Entrada inválida para el código de barras: "${code}". Sólo se permiten valores alfanuméricos`
          );
          return;
        }

        const canvas = document.createElement('canvas');
        JsBarcode(canvas, code);

        const barcodeDataURL = canvas.toDataURL();
        setBarcode(barcodeDataURL);
      } catch (error) {
        alert(`Error al generar el código de barras: ${error}`);
      }
    };

    generateBarcode();
  }, [code]);

  if (!barcode) return null;
  return (
    <View>
      <Image
        src={barcode}
        style={{
          width: codeSize || 200,
          margin: padding,
        }}
      />
    </View>
  );
}

export default Barcode;

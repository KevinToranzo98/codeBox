import { View } from '@react-pdf/renderer';
import Barcode from '../components/barCode/BarCode';

export const renderCodesForPage = (
  codes: string[],
  pageIndex: number,
  rowsPerPage: number,
  codesPerRow: number,
  codeSize: number,
  padding: string
) => {
  const startIndex = pageIndex * rowsPerPage * codesPerRow;
  const endIndex = (pageIndex + 1) * rowsPerPage * codesPerRow;
  const codesForPage = codes.slice(startIndex, endIndex);

  const rows = [];
  for (let i = 0; i < rowsPerPage; i++) {
    const rowStartIndex = i * codesPerRow;
    const rowEndIndex = (i + 1) * codesPerRow;
    const rowCodes = codesForPage.slice(rowStartIndex, rowEndIndex);

    rows.push(
      <View key={i} style={{ flexDirection: 'row' }}>
        {rowCodes.map((code: string, index: number) => (
          <Barcode
            key={index}
            code={code}
            codeSize={codeSize}
            padding={padding}
          />
        ))}
      </View>
    );
  }

  return rows;
};

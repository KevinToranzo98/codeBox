import { Document, Page, View } from '@react-pdf/renderer';
import { renderCodesForPage } from '../../utils';

interface CodesPDFProps {
  codes: string[];
  rowsPerPage: number;
  codesPerRow: number;
  codeSize: number;
  padding: string;
}

function CodesPDF({
  codes,
  rowsPerPage,
  codesPerRow,
  codeSize,
  padding,
}: CodesPDFProps) {
  const totalPages = Math.ceil(codes.length / (rowsPerPage * codesPerRow));

  return (
    <Document>
      {Array.from(Array(totalPages)).map((_: number, pageIndex: number) => (
        <Page key={pageIndex}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {renderCodesForPage(
              codes,
              pageIndex,
              rowsPerPage,
              codesPerRow,
              codeSize,
              padding
            )}
          </View>
        </Page>
      ))}
    </Document>
  );
}

export default CodesPDF;

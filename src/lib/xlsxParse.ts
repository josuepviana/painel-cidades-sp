import * as XLSX from 'xlsx';

export async function fetchXlsx(filePath: string): Promise<any[]> {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    const sheetName = "Tabela 3";
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        throw new Error(`A aba "${sheetName}" não foi encontrada no arquivo Excel.`);
    }

    return XLSX.utils.sheet_to_json(sheet);
}
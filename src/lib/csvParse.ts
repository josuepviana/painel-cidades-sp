import Papa from 'papaparse';

export async function fetchCsv(url: string) {
    const res = await fetch(url);
    const text = await res.text();
    return new Promise<any[]>((resolve, reject) => {
        Papa.parse(text, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data),
        });
    });
}
import React, { useState, useEffect } from 'react';
import { convertScale } from '../utils/gradeUtils';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export default function ScaleConverter() {
    const [params, setParams] = useState(
        () => JSON.parse(localStorage.getItem('scaleParams')) || { original: '', target: '', current: '' }
    );
    const { converted } = convertScale(params.original, params.target, params.current);

    useEffect(() => {
        localStorage.setItem('scaleParams', JSON.stringify(params));
    }, [params]);

    const update = e => {
        setParams({ ...params, [e.target.name]: e.target.value });
    };

    const exportCSV = () => {
        const csv = Papa.unparse([params, { converted }]);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'conversion.csv'; a.click();
    };

    const exportPDF = () => {
        html2canvas(document.getElementById('export-area')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
            pdf.save('conversion.pdf');
        });
    };

    return (
        <div id="export-area">
            <h3>Scale Converter</h3>
            <div className="row mb-2">
                <div className="col">
                    <input
                        type="number"
                        name="original"
                        value={params.original}
                        onChange={update}
                        placeholder="Original Scale (e.g. 10)"
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        name="target"
                        value={params.target}
                        onChange={update}
                        placeholder="New Scale (e.g. 4)"
                        className="form-control"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        name="current"
                        value={params.current}
                        onChange={update}
                        placeholder="Current GPA/CGPA"
                        className="form-control"
                    />
                </div>
            </div>

            <div className="mb-3">
                <strong>Converted:</strong> {converted ?? '—'}
            </div>

            <button className="btn btn-secondary me-2" onClick={exportCSV}>Export CSV</button>
            <button className="btn btn-secondary" onClick={exportPDF}>Export PDF/PNG</button>
        </div>
    );
}

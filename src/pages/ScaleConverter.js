import React, { useState, useEffect } from 'react';
import { convertScale } from '../utils/gradeUtils';
import Papa from 'papaparse';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default function ScaleConverter() {
    const defaultParams = { original: '', target: '', current: '' };
    const [params, setParams] = useState(
        () => JSON.parse(localStorage.getItem('scaleParams')) || defaultParams
    );
    const [manual, setManual] = useState(
        () => JSON.parse(localStorage.getItem('manualCalcConvert')) || false
    );
    const [converted, setConverted] = useState(null);

    useEffect(() => {
        localStorage.setItem('scaleParams', JSON.stringify(params));
        localStorage.setItem('manualCalcConvert', JSON.stringify(manual));
        if (!manual) calculate();
    }, [params, manual]);

    const update = e => setParams(p => ({ ...p, [e.target.name]: e.target.value }));
    const calculate = () => setConverted(convertScale(params.original, params.target, params.current).converted);
    const reset = () => {
        setParams(defaultParams);
        setConverted(null);
    };

    const exportCSV = () => {
        const csv = Papa.unparse([params, { converted }]);
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'conversion.csv'; a.click();
    };
    const exportPDF = () => {
        html2canvas(document.getElementById('export-area')).then(canvas => {
            const img = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(img, 'PNG', 10, 10, 190, 0);
            pdf.save('conversion.pdf');
        });
    };

    return (
        <div id="export-area" className="px-2">
            <h3 className="text-center mb-4">Scale Converter</h3>

            {/* Manual toggle */}
            <div className="text-center mb-3">
                <div className="form-check form-switch d-inline-block">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="manualSwitchConvert"
                        checked={manual}
                        onChange={() => setManual(m => !m)}
                    />
                    <label className="form-check-label" htmlFor="manualSwitchConvert">
                        Manual Conversion Mode
                    </label>
                </div>
            </div>

            {/* Inputs */}
            <div className="row mb-3">
                <div className="col">
                    <input
                        type="number"
                        name="original"
                        value={params.original}
                        onChange={update}
                        placeholder="Original Scale"
                        className="form-control text-center"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        name="target"
                        value={params.target}
                        onChange={update}
                        placeholder="New Scale"
                        className="form-control text-center"
                    />
                </div>
                <div className="col">
                    <input
                        type="number"
                        name="current"
                        value={params.current}
                        onChange={update}
                        placeholder="Current GPA/CGPA"
                        className="form-control text-center"
                    />
                </div>
            </div>

            {/* Controls */}
            <div className="text-center mb-4">
                <button className="btn btn-warning me-2" onClick={reset}>♻ Reset</button>
                {manual && <button className="btn btn-info" onClick={calculate}>Convert</button>}
            </div>

            {/* Result */}
            <div className="text-center mb-4">
                <div className="bg-primary text-white rounded p-3 d-inline-block" style={{ fontSize: '1.6rem' }}>
                    Converted: {converted ?? '—'}
                </div>
            </div>

            {/* Export */}
            <div className="text-center">
                <OverlayTrigger placement="top" overlay={<Tooltip>Export as CSV</Tooltip>}>
                    <button className="btn btn-secondary me-2" onClick={exportCSV}>Export CSV</button>
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={<Tooltip>Export as PDF/PNG</Tooltip>}>
                    <button className="btn btn-secondary" onClick={exportPDF}>Export PDF/PNG</button>
                </OverlayTrigger>
            </div>
        </div>
    );
}

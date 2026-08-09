import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client (Ensure NEXT_PUBLIC_GEMINI_API_KEY is defined in your .env)
const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export default function Home() {
  // Initial 20x20 raw matrix
  const initialArr = [
    [0, -0.1, 0.32, 0.38, 0, 0.14, 0.37, 0.47, 0.1, 0.31, -0.02, 0.22, 0.09, -0.23, -0.12, 0.37, 0.01, 0.05, -0.07, 0],
    [-0.1, 0, 0.05, 0.41, -0.16, 0.18, 0.25, 0.32, 0.35, 0.07, 0.05, 0.11, 0.09, -0.07, 0.29, 0.02, -0.05, 0.14, 0.03, 0.15],
    [0.32, 0.05, 0, 0.58, 0.16, -0.15, 0.41, 0.4, 0.06, 0.16, -0.06, 0.27, 0.29, 0.29, 0.25, 0.3, 0.21, 0.21, 0.32, 0.05],
    [0.38, 0.41, 0.58, 0, 0.09, 0.01, 0.58, 0.7, 0.29, 0.3, 0.02, 0.49, 0.04, 0.09, 0.06, 0.42, 0.23, 0.3, 0.27, -0.02],
    [0, -0.16, 0.16, 0.09, 0, 0.02, -0.2, -0.04, 0.04, -0.3, -0.09, 0.25, 0.3, 0.25, 0.05, -0.06, 0.2, 0.22, 0.46, 0.1],
    [0.14, 0.18, -0.15, 0.01, 0.02, 0, -0.02, 0, -0.11, 0.16, 0.08, -0.07, 0.09, -0.19, 0.13, -0.12, -0.1, 0.46, -0.21, -0.14],
    [0.37, 0.25, 0.41, 0.58, -0.2, -0.02, 0, 0.76, 0.12, 0.47, -0.19, 0.34, 0.04, 0.06, 0.06, 0.71, -0.07, 0.15, 0.2, -0.15],
    [0.47, 0.32, 0.4, 0.7, -0.04, 0, 0.76, 0, 0.26, 0.47, -0.08, 0.55, -0.05, -0.05, -0.09, 0.7, 0.21, 0.32, 0.32, 0.1],
    [0.1, 0.35, 0.06, 0.29, 0.04, -0.11, 0.12, 0.26, 0, 0.08, -0.14, 0.17, 0.04, -0.23, 0.03, 0.15, 0.31, 0.12, 0.11, 0.14],
    [0.31, 0.07, 0.16, 0.3, -0.3, 0.16, 0.47, 0.47, 0.08, 0, 0.16, 0.08, 0.02, 0.02, -0.18, 0.4, -0.19, 0, 0.1, -0.08],
    [-0.02, 0.05, -0.06, 0.02, -0.09, 0.08, -0.19, -0.08, -0.14, 0.16, 0, 0, -0.07, 0.32, 0.04, -0.23, -0.1, -0.09, 0.18, -0.12],
    [0.22, 0.11, 0.27, 0.49, 0.25, -0.07, 0.34, 0.55, 0.17, 0.08, 0, 0, -0.14, 0.2, -0.23, 0.27, 0.15, 0.17, 0.21, -0.03],
    [0.09, 0.09, 0.29, 0.04, 0.3, 0.09, 0.04, -0.05, 0.04, 0.02, -0.07, -0.14, 0, 0.29, 0.12, 0.02, -0.03, -0.01, 0.1, 0.1],
    [-0.23, -0.07, 0.29, 0.09, 0.25, -0.19, 0.06, -0.05, -0.23, 0.02, 0.32, 0.2, 0.29, 0, 0.22, -0.02, 0.03, -0.19, 0.42, 0.2],
    [-0.12, 0.29, 0.25, 0.06, 0.05, 0.13, 0.06, -0.09, 0.03, -0.18, 0.04, -0.23, 0.12, 0.22, 0, 0.05, -0.02, 0.12, 0.31, 0.25],
    [0.37, 0.02, 0.3, 0.42, -0.06, -0.12, 0.71, 0.7, 0.15, 0.4, -0.23, 0.27, 0.02, -0.02, 0.05, 0, 0.01, 0.24, 0.32, -0.01],
    [0.01, -0.05, 0.21, 0.23, 0.2, -0.1, -0.07, 0.21, 0.31, -0.19, -0.1, 0.15, -0.03, 0.03, -0.02, 0.01, 0, 0.09, 0.16, 0.29],
    [0.05, 0.14, 0.21, 0.3, 0.22, 0.46, 0.15, 0.32, 0.12, 0, -0.09, 0.17, -0.01, -0.19, 0.12, 0.24, 0.09, 0, 0.31, -0.04],
    [-0.07, 0.03, 0.32, 0.27, 0.46, -0.21, 0.2, 0.32, 0.11, 0.1, 0.18, 0.21, 0.1, 0.42, 0.31, 0.32, 0.16, 0.31, 0, 0.24],
    [0, 0.15, 0.05, -0.02, 0.1, -0.14, -0.15, 0.1, 0.14, -0.08, -0.12, -0.03, 0.1, 0.2, 0.25, -0.01, 0.29, -0.04, 0.24, 0]
  ];

  const initialLabels = Array.from({ length: 20 }, (_, i) => `${i + 1}`);

  // React State
  const [matrixState, setMatrixState] = useState(initialArr);
  const [labelsState, setLabelsState] = useState(initialLabels);
  const [iteration, setIteration] = useState(1);

  const [m1matrix, setM1matrix] = useState([]);
  const [m1Labels, setM1Labels] = useState([]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Process Matrix Calculations
    let arr = matrixState.map((row) => [...row]);
    let currentLabels = [...labelsState];

    var maxes = [];
    var maxindexes = [];

    for (var i = 0; i < arr.length; i += 1) {
      var tempmax = arr[i][0];
      var holda = i;
      var holdb = 0;
      for (var j = 0; j < arr[i].length; j += 1) {
        var currentelement = arr[i][j];
        if (currentelement > tempmax) {
          tempmax = currentelement;
          holda = i;
          holdb = j;
        }
      }
      maxes.push(tempmax);
      maxindexes.push(holda, holdb);
    }

    var newlink = [];
    for (var i = 0; i < maxindexes.length; i += 2) {
      var strA = maxindexes[i].toString().padStart(2, '0');
      var strB = maxindexes[i + 1].toString().padStart(2, '0');
      newlink.push(strA + strB);
    }

    var newlink1 = [...newlink];
    const resultseen = [];

    for (var i = 0; i < newlink1.length; i += 1) {
      var num1 = newlink1[i];
      var rev1 = num1.match(/.{1,2}/g).reverse().join('');

      if (newlink1.includes(rev1)) {
        resultseen.push(newlink1[i]);
        var revIndex = newlink1.indexOf(rev1);

        if (revIndex > i) {
          newlink1.splice(revIndex, 1);
          newlink1.splice(i, 1);
        } else if (revIndex !== i) {
          newlink1.splice(i, 1);
          newlink1.splice(revIndex, 1);
        }
        i -= 1;
      }
    }

    const unique2 = [];
    for (var i = 0; i < resultseen.length; i += 1) {
      var pair = resultseen[i];
      var indexA = parseInt(pair.substring(0, 2), 10);
      var indexB = parseInt(pair.substring(2, 4), 10);
      unique2.push(indexA, indexB);
    }

    var recipextra = [];
    var newLabelName = '';

    for (var i = 0; i < unique2.length; i += 2) {
      var reciptempa = unique2[i];
      var reciptempb = unique2[i + 1];

      var labelA = currentLabels[reciptempa];
      var labelB = currentLabels[reciptempb];
      newLabelName = `${labelA}/${labelB}`;

      for (var j = 0; j < arr.length; j += 1) {
        var recipfinala = arr[j][reciptempa];
        var recipfinalb = arr[j][reciptempb];
        recipextra.push((recipfinala + recipfinalb) / 2);
      }
    }

    for (var i = 0; i < arr.length; i += 1) {
      var add1 = recipextra[i];
      arr[i].splice(arr[i].length, 0, add1);
    }

    var newrow = [];
    for (var i = 0; i < recipextra.length; i += 1) {
      var ele1 = recipextra[i];
      newrow.push(ele1);
    }
    newrow.push(0);
    arr.splice(arr.length, 0, newrow);

    if (newLabelName) {
      currentLabels.push(newLabelName);
    }

    var criticalr = 0.35;

    for (var i = 0; i < maxindexes.length; i += 2) {
      let tempa = maxindexes[i];
      let tempb = maxindexes[i + 1];
      let save = arr[tempa][tempb];

      if (save < criticalr) {
        for (let col = 0; col < arr[tempa].length; col++) arr[tempa][col] = 111;
        for (let row = 0; row < arr.length; row++) arr[row][tempb] = 111;
      }
    }

    for (var i = 0; i < unique2.length; i += 2) {
      let reciptempa = unique2[i];
      let reciptempb = unique2[i + 1];
      for (let col = 0; col < arr[reciptempa].length; col++) arr[reciptempa][col] = 222;
      for (let row = 0; row < arr.length; row++) arr[row][reciptempb] = 222;
    }

    for (var i = 0; i < unique2.length; i += 2) {
      let sourceColA = unique2[i];
      let sourceColB = unique2[i + 1];
      for (let col = 0; col < arr[sourceColA].length; col++) arr[sourceColA][col] = 333;
      for (let row = 0; row < arr.length; row++) arr[row][sourceColA] = 333;
      for (let col = 0; col < arr[sourceColB].length; col++) arr[sourceColB][col] = 333;
      for (let row = 0; row < arr.length; row++) arr[row][sourceColB] = 333;
    }

    const isSentinel = (val) => val === 111 || val === 222 || val === 333;
    const removeIndices = new Set();

    arr.forEach((row, rowIndex) => {
      if (row.every(isSentinel)) removeIndices.add(rowIndex);
    });

    const calculatedLabels = currentLabels.filter((_, idx) => !removeIndices.has(idx));
    const calculatedMatrix = arr
      .filter((_, rowIndex) => !removeIndices.has(rowIndex))
      .map((row) => row.filter((_, colIndex) => !removeIndices.has(colIndex)));

    for (let i = 0; i < calculatedMatrix.length; i++) {
      if (calculatedMatrix[i]) calculatedMatrix[i][i] = 0;
    }

    setM1matrix(calculatedMatrix);
    setM1Labels(calculatedLabels);

    // 2. Request Image Generation for Reciprocal Peak Correlations
    async function generateReciprocalImage(uniqueIndices, labels, matrix) {
      setLoading(true);
      setError(null);
      setGeneratedImage(null);

      try {
        // Extract reciprocal peak correlation pairs by looping through unique2
        const reciprocalPairs = [];
        for (let i = 0; i < uniqueIndices.length; i += 2) {
          const reciptempa = uniqueIndices[i];
          const reciptempb = uniqueIndices[i + 1];

          const labelA = labels[reciptempa];
          const labelB = labels[reciptempb];
          const correlationValue = matrix[reciptempa]?.[reciptempb] ?? 0;

          reciprocalPairs.push({
            nodeA: labelA,
            nodeB: labelB,
            correlation: correlationValue,
          });
        }

        const pairsDescription = reciprocalPairs
          .map((pair) => `Node ${pair.nodeA} <-> Node ${pair.nodeB} (Value: ${pair.correlation.toFixed(2)})`)
          .join('; ');

        const prompt = `A clean, professional network graph visualization illustrating reciprocal peak correlations between nodes. Graph pairs: [${pairsDescription}]. Connected nodes should display glowing lines with color intensity proportional to their reciprocal correlation values, styled on a dark high-tech background.`;

        const response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1',
          },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          const base64ImageBytes = response.generatedImages[0].image.imageBytes;
          setGeneratedImage(`data:image/jpeg;base64,${base64ImageBytes}`);
        }
      } catch (err) {
        console.error('Image generation error:', err);
        setError('Failed to generate graph image.');
      } finally {
        setLoading(false);
      }
    }

    generateReciprocalImage(unique2, labelsState, matrixState);
  }, [matrixState, labelsState]);

  const handleIterate = () => {
    setMatrixState(m1matrix);
    setLabelsState(m1Labels);
    setIteration((prev) => prev + 1);
  };

  const handleReset = () => {
    setMatrixState(initialArr);
    setLabelsState(initialLabels);
    setIteration(1);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Generated Image Section */}
      <div style={{ marginBottom: '20px', minHeight: '320px' }}>
        <h3>M{iteration} Reciprocal Peak Correlations Graph</h3>
        {loading && <p>Generating visual representation via Gemini Imagen...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {generatedImage && (
          <img
            src={generatedImage}
            alt={`M${iteration} Reciprocal Correlations Graph`}
            style={{
              maxWidth: '400px',
              maxHeight: '400px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
        )}
      </div>

      {/* M1 Matrix Table Output */}
      <div style={{ marginBottom: '20px' }}>
        <h3>M{iteration} Matrix</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '6px', background: '#f5f5f5' }}></th>
                {m1Labels.map((lbl, idx) => (
                  <th key={idx} style={{ border: '1px solid #ccc', padding: '6px', background: '#f5f5f5' }}>
                    {lbl}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {m1matrix.map((row, rIdx) => (
                <tr key={rIdx}>
                  <th style={{ border: '1px solid #ccc', padding: '6px', background: '#f5f5f5' }}>
                    {m1Labels[rIdx]}
                  </th>
                  {row.map((val, cIdx) => (
                    <td key={cIdx} style={{ border: '1px solid #ccc', padding: '6px' }}>
                      {typeof val === 'number' ? val.toFixed(2) : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleIterate}
          disabled={loading}
          style={{
            padding: '10px 18px',
            backgroundColor: loading ? '#94a3b8' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          Iterate with M{iteration} Matrix
        </button>
        <button
          onClick={handleReset}
          disabled={loading}
          style={{
            padding: '10px 18px',
            backgroundColor: '#e5e7eb',
            color: '#333',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
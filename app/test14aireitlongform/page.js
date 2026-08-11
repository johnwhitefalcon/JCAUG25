import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini Client
var ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

// Initial 20x20 raw matrix
var INITIAL_MATRIX = [
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

// Initialize initial labels explicitly using a loop
var INITIAL_LABELS = [];
for (var i = 0; i < 20; i = i + 1) {
  INITIAL_LABELS.push((i + 1).toString());
}

/**
 * Pure function to calculate reciprocal peak correlation matrix transformations
 */
function processMatrixIteration(inputMatrix, inputLabels) {
  // Deep copy input matrix using standard loops
  var arr = [];
  for (var r = 0; r < inputMatrix.length; r = r + 1) {
    var rowCopy = [];
    for (var c = 0; c < inputMatrix[r].length; c = c + 1) {
      rowCopy.push(inputMatrix[r][c]);
    }
    arr.push(rowCopy);
  }

  // Copy input labels array using standard loop
  var currentLabels = [];
  for (var l = 0; l < inputLabels.length; l = l + 1) {
    currentLabels.push(inputLabels[l]);
  }

  var maxes = [];
  var maxindexes = [];

  for (var i = 0; i < arr.length; i = i + 1) {
    var tempmax = arr[i][0];
    var holda = i;
    var holdb = 0;
    for (var j = 0; j < arr[i].length; j = j + 1) {
      var currentelement = arr[i][j];
      if (currentelement > tempmax) {
        tempmax = currentelement;
        holda = i;
        holdb = j;
      }
    }
    maxes.push(tempmax);
    maxindexes.push(holda);
    maxindexes.push(holdb);
  }

  var newlink = [];
  for (var i = 0; i < maxindexes.length; i = i + 2) {
    var strA = maxindexes[i].toString().padStart(2, '0');
    var strB = maxindexes[i + 1].toString().padStart(2, '0');
    newlink.push(strA + strB);
  }

  var newlink1 = [];
  for (var i = 0; i < newlink.length; i = i + 1) {
    newlink1.push(newlink[i]);
  }

  var resultseen = [];

  for (var i = 0; i < newlink1.length; i = i + 1) {
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
      i = i - 1;
    }
  }

  var unique2 = [];
  for (var i = 0; i < resultseen.length; i = i + 1) {
    var pair = resultseen[i];
    var indexA = parseInt(pair.substring(0, 2), 10);
    var indexB = parseInt(pair.substring(2, 4), 10);
    unique2.push(indexA);
    unique2.push(indexB);
  }

  var recipextra = [];
  var newLabelName = '';

  for (var i = 0; i < unique2.length; i = i + 2) {
    var reciptempa = unique2[i];
    var reciptempb = unique2[i + 1];

    var labelA = currentLabels[reciptempa];
    var labelB = currentLabels[reciptempb];
    newLabelName = labelA + '/' + labelB;

    for (var j = 0; j < arr.length; j = j + 1) {
      var recipfinala = arr[j][reciptempa];
      var recipfinalb = arr[j][reciptempb];
      recipextra.push((recipfinala + recipfinalb) / 2);
    }
  }

  for (var i = 0; i < arr.length; i = i + 1) {
    var add1 = recipextra[i];
    arr[i].splice(arr[i].length, 0, add1);
  }

  var newrow = [];
  for (var i = 0; i < recipextra.length; i = i + 1) {
    var ele1 = recipextra[i];
    newrow.push(ele1);
  }
  newrow.push(0);
  arr.splice(arr.length, 0, newrow);

  if (newLabelName !== '') {
    currentLabels.push(newLabelName);
  }

  var criticalr = 0.35;

  for (var i = 0; i < maxindexes.length; i = i + 2) {
    var tempa = maxindexes[i];
    var tempb = maxindexes[i + 1];
    var save = arr[tempa][tempb];

    if (save < criticalr) {
      for (var col = 0; col < arr[tempa].length; col = col + 1) {
        arr[tempa][col] = 111;
      }
      for (var row = 0; row < arr.length; row = row + 1) {
        arr[row][tempb] = 111;
      }
    }
  }

  for (var i = 0; i < unique2.length; i = i + 2) {
    var reciptempa = unique2[i];
    var reciptempb = unique2[i + 1];
    for (var col = 0; col < arr[reciptempa].length; col = col + 1) {
      arr[reciptempa][col] = 222;
    }
    for (var row = 0; row < arr.length; row = row + 1) {
      arr[row][reciptempb] = 222;
    }
  }

  for (var i = 0; i < unique2.length; i = i + 2) {
    var sourceColA = unique2[i];
    var sourceColB = unique2[i + 1];
    for (var col = 0; col < arr[sourceColA].length; col = col + 1) {
      arr[sourceColA][col] = 333;
    }
    for (var row = 0; row < arr.length; row = row + 1) {
      arr[row][sourceColA] = 333;
    }
    for (var col = 0; col < arr[sourceColB].length; col = col + 1) {
      arr[sourceColB][col] = 333;
    }
    for (var row = 0; row < arr.length; row = row + 1) {
      arr[row][sourceColB] = 333;
    }
  }

  function checkIsSentinel(val) {
    if (val === 111 || val === 222 || val === 333) {
      return true;
    }
    return false;
  }

  var removeIndices = [];
  for (var rowIndex = 0; rowIndex < arr.length; rowIndex = rowIndex + 1) {
    var currentRow = arr[rowIndex];
    var allElementsAreSentinels = true;
    for (var colIndex = 0; colIndex < currentRow.length; colIndex = colIndex + 1) {
      if (checkIsSentinel(currentRow[colIndex]) === false) {
        allElementsAreSentinels = false;
        break;
      }
    }
    if (allElementsAreSentinels === true) {
      removeIndices.push(rowIndex);
    }
  }

  var calculatedLabels = [];
  for (var labelIndex = 0; labelIndex < currentLabels.length; labelIndex = labelIndex + 1) {
    var shouldRemoveLabel = false;
    for (var k = 0; k < removeIndices.length; k = k + 1) {
      if (removeIndices[k] === labelIndex) {
        shouldRemoveLabel = true;
        break;
      }
    }
    if (shouldRemoveLabel === false) {
      calculatedLabels.push(currentLabels[labelIndex]);
    }
  }

  var calculatedMatrix = [];
  for (var rIdx = 0; rIdx < arr.length; rIdx = rIdx + 1) {
    var shouldRemoveRow = false;
    for (var k = 0; k < removeIndices.length; k = k + 1) {
      if (removeIndices[k] === rIdx) {
        shouldRemoveRow = true;
        break;
      }
    }

    if (shouldRemoveRow === false) {
      var filteredRow = [];
      var originalRow = arr[rIdx];
      for (var cIdx = 0; cIdx < originalRow.length; cIdx = cIdx + 1) {
        var shouldRemoveCol = false;
        for (var m = 0; m < removeIndices.length; m = m + 1) {
          if (removeIndices[m] === cIdx) {
            shouldRemoveCol = true;
            break;
          }
        }
        if (shouldRemoveCol === false) {
          filteredRow.push(originalRow[cIdx]);
        }
      }
      calculatedMatrix.push(filteredRow);
    }
  }

  for (var i = 0; i < calculatedMatrix.length; i = i + 1) {
    if (calculatedMatrix[i]) {
      calculatedMatrix[i][i] = 0;
    }
  }

  return {
    calculatedMatrix: calculatedMatrix,
    calculatedLabels: calculatedLabels,
    unique2: unique2
  };
}

export default function Home() {
  var activeMatrixState = useState(INITIAL_MATRIX);
  var activeMatrix = activeMatrixState[0];
  var setActiveMatrix = activeMatrixState[1];

  var activeLabelsState = useState(INITIAL_LABELS);
  var activeLabels = activeLabelsState[0];
  var setActiveLabels = activeLabelsState[1];

  var iterationState = useState(1);
  var iteration = iterationState[0];
  var setIteration = iterationState[1];

  var outputMatrixState = useState([]);
  var outputMatrix = outputMatrixState[0];
  var setOutputMatrix = outputMatrixState[1];

  var outputLabelsState = useState([]);
  var outputLabels = outputLabelsState[0];
  var setOutputLabels = outputLabelsState[1];

  var generatedImageState = useState(null);
  var generatedImage = generatedImageState[0];
  var setGeneratedImage = generatedImageState[1];

  var loadingState = useState(false);
  var loading = loadingState[0];
  var setLoading = loadingState[1];

  var errorState = useState(null);
  var error = errorState[0];
  var setError = errorState[1];

  // Gemini API visualizer written in standard function style
  var generateReciprocalGraphImage = useCallback(
    async function(uniqueIndices, labels, matrix, currentIteration) {
      setLoading(true);
      setError(null);
      setGeneratedImage(null);

      try {
        var reciprocalPairs = [];
        for (var i = 0; i < uniqueIndices.length; i = i + 2) {
          var reciptempa = uniqueIndices[i];
          var reciptempb = uniqueIndices[i + 1];

          var labelA = 'Node' + reciptempa;
          if (labels[reciptempa] !== undefined && labels[reciptempa] !== null) {
            labelA = labels[reciptempa];
          }

          var labelB = 'Node' + reciptempb;
          if (labels[reciptempb] !== undefined && labels[reciptempb] !== null) {
            labelB = labels[reciptempb];
          }

          var correlationValue = 0;
          if (matrix[reciptempa] !== undefined && matrix[reciptempa][reciptempb] !== undefined) {
            correlationValue = matrix[reciptempa][reciptempb];
          }

          reciprocalPairs.push({
            nodeA: labelA,
            nodeB: labelB,
            correlation: correlationValue
          });
        }

        var pairsDescription = '';
        if (reciprocalPairs.length > 0) {
          var descriptionsList = [];
          for (var p = 0; p < reciprocalPairs.length; p = p + 1) {
            var pairItem = reciprocalPairs[p];
            var pairString = 'Node ' + pairItem.nodeA + ' <-> Node ' + pairItem.nodeB + ' (Value: ' + pairItem.correlation.toFixed(2) + ')';
            descriptionsList.push(pairString);
          }
          pairsDescription = descriptionsList.join('; ');
        } else {
          pairsDescription = 'No reciprocal peak pairs found in this iteration.';
        }

        var prompt = 'A clean, professional network graph visualization for iteration M' + currentIteration + ' showing reciprocal peak correlations between nodes. Active correlation pairs: [' + pairsDescription + ']. Connected nodes should display glowing lines with color intensity proportional to their reciprocal correlation values on a dark futuristic theme.';

        var response = await ai.models.generateImages({
          model: 'imagen-3.0-generate-002',
          prompt: prompt,
          config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '1:1'
          }
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
          var base64ImageBytes = response.generatedImages[0].image.imageBytes;
          setGeneratedImage('data:image/jpeg;base64,' + base64ImageBytes);
        }
      } catch (err) {
        console.error('Image generation error:', err);
        setError('Failed to generate graph image.');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Run calculation and request image on matrix state update
  useEffect(
    function() {
      if (!activeMatrix || activeMatrix.length === 0) {
        return;
      }

      var result = processMatrixIteration(activeMatrix, activeLabels);
      var calculatedMatrix = result.calculatedMatrix;
      var calculatedLabels = result.calculatedLabels;
      var unique2 = result.unique2;

      setOutputMatrix(calculatedMatrix);
      setOutputLabels(calculatedLabels);

      generateReciprocalGraphImage(unique2, activeLabels, activeMatrix, iteration);
    },
    [activeMatrix, activeLabels, iteration, generateReciprocalGraphImage]
  );

  // Control handlers
  function handleIterate() {
    if (outputMatrix.length === 0) {
      return;
    }
    setActiveMatrix(outputMatrix);
    setActiveLabels(outputLabels);
    setIteration(function(previousIteration) {
      return previousIteration + 1;
    });
  }

  function handleReset() {
    setActiveMatrix(INITIAL_MATRIX);
    setActiveLabels(INITIAL_LABELS);
    setIteration(1);
  }

  // Pre-build Table Header Elements explicitly
  var headerCells = [];
  headerCells.push(
    <th key="empty-corner" style={{ border: '1px solid #ccc', padding: '6px', background: '#f5f5f5' }}></th>
  );
  for (var h = 0; h < outputLabels.length; h = h + 1) {
    var labelText = outputLabels[h];
    headerCells.push(
      <th key={h} style={{ border: '1px solid #ccc', padding: '6px', background: '#f5f5f5' }}>
        {labelText}
      </th>
    );
  }

  // Pre-build Table Row Elements explicitly
  var tableRows = [];
  for (var r = 0; r < outputMatrix.length; r = r + 1) {
    var rowData = outputMatrix[r];
    var rowLabel = outputLabels[r];
    var rowCells = [];

    rowCells.push(
      <th key={'row-label-' + r} style={{ border: '1px solid #ccc', padding: '6px', background: '#f5f5f5' }}>
        {rowLabel}
      </th>
    );

    for (var c = 0; c < rowData.length; c = c + 1) {
      var cellValue = rowData[c];
      var displayValue = cellValue;
      if (typeof cellValue === 'number') {
        displayValue = cellValue.toFixed(2);
      }

      rowCells.push(
        <td key={c} style={{ border: '1px solid #ccc', padding: '6px' }}>
          {displayValue}
        </td>
      );
    }

    tableRows.push(<tr key={r}>{rowCells}</tr>);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      {/* Generated Image Section */}
      <div style={{ marginBottom: '20px', minHeight: '320px' }}>
        <h3>{'M' + iteration + ' Reciprocal Peak Correlations Graph Visualization'}</h3>
        {loading && <p>{'Generating visual representation via Gemini Imagen for M' + iteration + '...'}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {generatedImage && (
          <img
            src={generatedImage}
            alt={'M' + iteration + ' Graph Visualization'}
            style={{
              maxWidth: '400px',
              maxHeight: '400px',
              borderRadius: '8px',
              border: '1px solid #ccc'
            }}
          />
        )}
      </div>

      {/* Output Matrix Table */}
      <div style={{ marginBottom: '20px' }}>
        <h3>{'M' + iteration + ' Output Matrix'}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', textAlign: 'center' }}>
            <thead>
              <tr>{headerCells}</tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>

      {/* Control Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleIterate}
          disabled={loading || outputMatrix.length === 0}
          style={{
            padding: '10px 18px',
            backgroundColor: loading ? '#94a3b8' : '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          {'Iterate to M' + (iteration + 1) + ' Matrix'}
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
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          Reset to M1
        </button>
      </div>
    </div>
  );
}
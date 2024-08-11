import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const CnpsList: React.FC = () => {
  const [data, setData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch('data.csv')
      .then(response => response.text())
      .then(csv => {
        const parsedData = Papa.parse<string[]>(csv, { header: false }).data;
        setData(parsedData);
      });
  }, []);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div>
      <h1>法人リスト</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            {data[0] && data[0].map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        <Button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={handleNextPage} disabled={endIndex >= data.length}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default CnpsList;
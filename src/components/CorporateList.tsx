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
        const parsedData = Papa.parse<string[]>(csv, { header: false }).data.slice(1);
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
            <th>法人番号</th>
            <th>法人名</th>
            <th>郵便番号</th>
            <th>都道府県</th>
            <th>市区町村</th>
            <th>街区丁目番地</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{row[1]}</td>
              <td>{row[6]}</td>
              <td>{row[15]}</td>
              <td>{row[9]}</td>
              <td>{row[10]}</td>
              <td>{row[11].length > 30 ? row[11].slice(0, 30) + "..." : row[11]}</td>
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
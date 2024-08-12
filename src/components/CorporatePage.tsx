import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useLocation } from 'react-router-dom';
import { Card, Button, Table, Breadcrumb } from 'react-bootstrap';

function CorporatePage() {
  const [data, setData] = useState<string[][]>([]);
  const [filtered, setFilteredData] = useState<string[][]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCorporate, setSelectedCorporate] = useState<string[][] | null>(null);
  const location = useLocation();
  const rowsPerPage = 10;

  useEffect(() => {
    fetch('data.csv')
      .then(response => response.text())
      .then(csv => {
        const parsedData = Papa.parse<string[]>(csv, { header: false }).data.slice(1);
        setData(parsedData);
      });
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const corporateNumber = queryParams.get('id');
    if (corporateNumber) {
      const filtered = data.filter(row => row[1] === corporateNumber);
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [location.search, data]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRowClick = (row: string[]) => {
    setSelectedCorporate([row]);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      {selectedCorporate ? (
        selectedCorporate.map((row, rowIndex) => (
          <div key={rowIndex}>
          <Breadcrumb>
              <Breadcrumb.Item href="./corporate">法人リスト</Breadcrumb.Item>
              <Breadcrumb.Item active>法人詳細</Breadcrumb.Item>
          </Breadcrumb>
          <h1>{row[6]}</h1>
          <hr/>
          <div className='secondRow'>
          <Card className='card-margin-right'>
            <Card.Body>
              <Card.Title>法人概要</Card.Title>
              <Card.Text as="div">
                  <ul>
                      <li><strong>法人番号</strong>: {row[1]}</li>
                      <li><strong>法人名（カナ）</strong>: {row[28]}</li>
                      <li><strong>法人名（英）</strong>: {row[24]}</li>
                      <li><strong>登記日</strong>: {row[5]}</li>
                      <li><strong>最終更新日</strong>: {row[4]}</li>
                  </ul>
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className='card-margin-left'>
            <Card.Body>
              <Card.Title>所在地情報</Card.Title>
              <Card.Text as="div">
                  <ul>
                      <li><strong>郵便番号</strong>: {formatPostalCode(row[15])}</li>
                      <li><strong>住所</strong>: {formatAddress(row[9], row[10], row[11])}</li>
                      <li><strong>住所（アルファベット）</strong>: {formatAddress(row[26], ", ", row[25])}</li>
                  </ul>
              </Card.Text>
            </Card.Body>
          </Card>
          </div>
      </div>
        ))
      ) : (
        <div>
          <h1>法人リスト</h1>
          <hr/>
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
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} onClick={() => handleRowClick(row)}>
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
          <div className="pagination">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1}>前へ</Button>
            <Button onClick={handleNextPage} disabled={startIndex + rowsPerPage >= data.length}>次へ</Button>
          </div>
        </div>
      )}
    </div>
  );

  function formatPostalCode(corporateNumber: string): string {
    const formattedNumber = corporateNumber.replace(/(\d{3})(\d{4})/, '$1-$2');
    return formattedNumber;
  }

  function formatAddress(address1: string, address2: string, address3: string): string {
      const formattedAddress = address1.trim() !== "" && address3.trim() !== "" ? address1.concat(address2, address3).trim() : "";
      return formattedAddress;
  }
}

export default CorporatePage;
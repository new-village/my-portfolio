import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Breadcrumb } from 'react-bootstrap';

function CorporateDetail() {
    const { corporateNumber } = useParams<{ corporateNumber: string }>();
    const navigate = useNavigate();
    const [data, setData] = useState<string[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('../data.csv')
            .then(response => response.text())
            .then(csv => {
                const parsedData = Papa.parse<string[]>(csv, { header: false }).data.slice(1);
                const filteredData = parsedData.filter((row) => row[1] === corporateNumber);
                setData(filteredData);
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, [corporateNumber]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {/* // <h1>法人番号: {corporateNumber}</h1>
             <hr></hr>
             {data} */}
            {data.map((row, rowIndex) => (
            <div key={rowIndex}>
                <Breadcrumb>
                    <Breadcrumb.Item onClick={() => navigate(-1)}>法人リスト</Breadcrumb.Item>
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
            ))}
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

export default CorporateDetail;
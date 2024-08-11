import React from 'react'
import { Card, Button } from 'react-bootstrap'

function HomePage() {
  return (
    <div>
      <Card>
        <Card.Header as="h5">このサイトについて</Card.Header>
        <Card.Body>
          <Card.Text>
            本ページでは、New VillageがGithubで公開している各種レポジトリの実行結果しています。
          </Card.Text>
          <a href='https://github.com/new-village'><Button variant="primary">New Village レポジトリ</Button></a>
        </Card.Body>
      </Card>

      <div className='secondRow'>
        <Card>
          <Card.Body>
            <Card.Title>法人データ収集</Card.Title>
            <Card.Text>
              国税庁の法人番号公表サイトから法人データを収集して、データをエンリッチするPyhonライブラリです。
            </Card.Text>
            <a href='https://github.com/new-village/cnparser'><Button variant="primary">cnparser</Button></a>
          </Card.Body>
        </Card>

        <Card className='CenterCard'>
          <Card.Body>
            <Card.Title>競馬データ収集</Card.Title>
            <Card.Text>
              ネット競馬から過去の出走データを収集するPythonライブラリです。
            </Card.Text>
            <a href='https://github.com/new-village/nkparser'><Button variant="primary">nkparser</Button></a>
          </Card.Body>
        </Card>

        <Card>
          <Card.Body>
            <Card.Title>食べログ百名店収集</Card.Title>
            <Card.Text>
              食べログから百名店のデータを収集してCSV出力するPythonライブラリです。
            </Card.Text>
            <a href='https://github.com/new-village/tabeloader'><Button variant="primary">tabeloader</Button></a>
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}

export default HomePage
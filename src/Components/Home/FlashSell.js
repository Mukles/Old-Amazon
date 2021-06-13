import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const FlashSell = () =>{
  return(
    <section id='flash-sell text-dark '>
      <div className='container'>
        <h3 className='header-text'>Flash Sale</h3>
        <div className='flash-timer d-flex justify-content-between align-items-center'>
          <div className='timer d-flex'>
            <h6 className='mr-5'>On Sale Now</h6>
            <h6 className=''>
              <strong className='mr-3'>Ending in</strong>
              <span>days</span>
              <span className='mx-2'>hour</span>
              <span>sec</span>
            </h6>
          </div>
          <button className='btn text-dark'>Shop More</button>
        </div>
        <Row>
          <Col xs={2}>
            <Card>
              <Card.Img variant="top" src="https://static-01.daraz.com.bd/p/b747e8c0d3873f9533ce60d717f6af6a.jpg" />
              <Card.Body className='p-0 px-1 mt-2'>
                <Card.Text style={{fontSize: '13px'}}>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Title>$50</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2}>
            <Card>
              <Card.Img variant="top" src="https://static-01.daraz.com.bd/p/b747e8c0d3873f9533ce60d717f6af6a.jpg" />
              <Card.Body className='p-0 px-1 mt-2'>
                <Card.Text style={{fontSize: '13px'}}>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Title>$50</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2}>
            <Card>
              <Card.Img variant="top" src="https://static-01.daraz.com.bd/p/b747e8c0d3873f9533ce60d717f6af6a.jpg" />
              <Card.Body className='p-0 px-1 mt-2'>
                <Card.Text style={{fontSize: '13px'}}>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Title>$50</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2}>
            <Card>
              <Card.Img variant="top" src="https://static-01.daraz.com.bd/p/b747e8c0d3873f9533ce60d717f6af6a.jpg" />
              <Card.Body className='p-0 px-1 mt-2'>
                <Card.Text style={{fontSize: '13px'}}>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Title>$50</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2}>
            <Card>
              <Card.Img variant="top" src="https://static-01.daraz.com.bd/p/b747e8c0d3873f9533ce60d717f6af6a.jpg" />
              <Card.Body className='p-0 px-1 mt-2'>
                <Card.Text style={{fontSize: '13px'}}>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Title>$50</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={2}>
            <Card>
              <Card.Img variant="top" src="https://static-01.daraz.com.bd/p/b747e8c0d3873f9533ce60d717f6af6a.jpg" />
              <Card.Body className='p-0 px-1 mt-2'>
                <Card.Text style={{fontSize: '13px'}}>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Card.Title>$50</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  )
}

export default FlashSell;
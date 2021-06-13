import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';

const Accordian = ({ OnChange, OnClick}) =>{
  const { catagories, parentCatagory, catagoryName} = useSelector(state => state.product);

  return (
    <Accordion className='w-100'>
      <Card className='rounded-0'>
        <Card.Header className='bg-white p-0 border-0'>
          <Accordion.Toggle as={Button} variant="link" eventKey="0">
            <AddIcon fontSize='small' />Add a new catagory
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
           <div name='add-catagory'>
            <div className='mb-3'>
                <input 
                  type='text'
                  value={catagoryName}  
                  name='catagoryName' 
                  className='form-control' 
                  onChange={OnChange}
                  onKeyDown={e => {
                    if(e.keyCode === 13 && e.key ==='Enter'){
                      e.preventDefault();
                    }
                  }}
                />
              </div>
              <div className=''>
                <select name='parentCatagory' value={parentCatagory} className='form-control' onChange={OnChange}>
                  <option value=''>Parent's catagory</option>
                  {
                    catagories.length > 0 ? 
                    catagories.map((item, i) => <option key={i} value={item.catagoryName}>{item.catagoryName}</option>):
                    null
                  }
                </select>
              </div>
              <button onClick={OnClick} type='button' className='btn btn-primary mt-3 ml-auto d-block'>Send</button>
           </div>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default Accordian;


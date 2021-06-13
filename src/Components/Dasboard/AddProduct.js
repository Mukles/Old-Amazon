import React from 'react';
import { setValues, addCatagories, getCatagory, customeCatagory, addCatagory } from '../Redux/Store/Product/ProductSlice';
import Accordian from './Catagory/Accordian';
import CKEditor from 'ckeditor4-react';
import ProductTab  from './Tabs/Product_Tab';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PublishIcon from '@material-ui/icons/Publish';
import StarsIcon from '@material-ui/icons/Stars';
import axios from 'axios';
import {
    Typography,
    Grid,
    Paper,
    IconButton,
    Button,
    TextField,
    Box, Card,
    CardHeader,
    CardContent,
    CardActions,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AddProduct extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            preview: '',
            productImages: [],
            photos: [],
            galleryPreview: []
        }
        this.catagoryContoller = this.catagoryContoller.bind(this);
    }

    handleChange = (event) => {
    const { name, value } = event.target;
        this.props.setValues({ [name]: value })
    }

     catagoryContoller = function(e){
      const { parentElement, dataset, name, value, checked, id } = e.target;
      const container = parentElement;
    //   if(this.props.product.loading){
    //       document.querySelector('.loader').style = 'display: inline-block'
    //   }

      //uncheking there
      let checkedList = [...document.querySelectorAll('.catagory-list input[type="checkbox"]:checked')].filter(element => element.name !== name);
      checkedList.forEach(element =>{
          element.previousElementSibling.style = 'display: none';
      });

     const siblings = container.querySelectorAll('input[type="checkbox"]');
     const images = container.querySelectorAll('.loader');

     images.forEach((element, index) =>{
          element.style= 'display: inline-block';
          siblings[index].style = 'display: none'
      });

      let payload = {values: [], name: '', dataset: []}
      siblings.forEach(element =>{
          payload = {...payload, value, name, checked, dataset: dataset.catagory, id }
      });
      this.props.customeCatagory(payload);

    //   if(siblings.length === 1 && siblings[0].getAttribute('data-catagory') === 'child'){

    //     // let bool = [...container.parentElement.parentElement.querySelectorAll('input[type="checkbox"')].filter((item, index) => index !== 0).every(element => element.checked === true);
    //     // let d = container.parentElement.parentElement.querySelector('input[type="checkbox"]');
    //     // d.checked = bool;
    //     // d.intermidate = !bool;
    //   }
    }

    OnAddCatagory = async () => {
        const { product: { catagories, parentCatagory, catagoryName } } = this.props;
        const catagory = catagories.find(item => item.catagoryName.toLowerCase()=== catagoryName.toLowerCase());
        const subCatagoryParent = catagories.find(item => item.catagoryName.toLowerCase() === parentCatagory.toLowerCase());
        let subCatagory = subCatagoryParent ? subCatagoryParent.subCatagories.find(sub => sub.subCatgoriesName.toLowerCase() === catagoryName.toLowerCase()): {};

        if((parentCatagory === null || parentCatagory === '')  && (catagoryName !== '' && !catagory)){
            this.props.addCatagory(this.props.product);
        }
        else if((parentCatagory !== null || parentCatagory !== '')  && (catagoryName !== '' && !subCatagory)){
            this.props.addCatagory(this.props.product);
        }
        else{
            let message = catagoryName === '' ? 'This Field is Required !' : (parentCatagory === null || parentCatagory === '')  && (catagoryName !== '' && catagory) ? "This Catagory Already Added" : `This Catagory already added under ${subCatagoryParent.catagoryName} catagory`;
            alert(message);
        }
        
    }

    OnChange = (evt) => {
        this.props.setValues({[evt.editor.name]: evt.editor.getData()})
    }

    OnClick = async (event) =>{
        event.preventDefault();
        const { product }  = this.props;
        const { productImages, photos } = this.state;
       
        var formdata = new FormData();
        Object.keys(product).forEach(key =>{
            formdata.append(`${key}`, product[key]);
        });

        formdata.append('catagory[catagoryName]', product.catagory.catagoryName);
        
        product.catagory.subCatagories.forEach((item, index) =>{
            Object.keys(item).forEach(key =>{
                formdata.append(`catagory[subCatagories][${index}][${key}]`, item[key])
            })
        })

        formdata.append("productImage", productImages[0]);
        photos.forEach(image => formdata.append("photos", image));

         await axios({
            baseURL: 'https://localhost:44380',
            url: 'api/Products/Add',
            method: 'POST',
            headers: {
                "Content-Type": "multipart/form-data"
            },
            data: formdata,
            processData: false
         }).then(res => console.log(res.data));
        
    }

    fileHolder = e => {
      const { name, files } = e.target;
      if(name !== 'productImages'){
          this.setState(prev =>({galleryPreview: []}))
      }
       let file;
       files.forEach(element => {
       const reader = new FileReader();
       file = element;
        reader.onload = x => {
            this.setState(prev =>({
             ...prev,
             preview: (name === 'productImages' ? x.target.result : prev.preview),
             galleryPreview: (name !== 'productImages' ? [...prev.galleryPreview, x.target.result]: prev.galleryPreview),
             [name]: [...files],
            }))
        }
        reader.readAsDataURL(file);
       });
    }

    async componentDidMount(prevProps) {
        const { product, getCatagory } = this.props;
        if(!product.catagories.length && !JSON.parse(localStorage.getItem("catagories"))){
            getCatagory();
        }
        else{
            getCatagory(JSON.parse(localStorage.getItem("catagories")))
        }
    }

    componentDidUpdate(prevProps){
        if(prevProps.product.catagories.length !== this.props.product.catagories){
            return true;
        }
        return true;
    }

    render() {
        const { catagories } = this.props.product;
        const { preview, galleryPreview } = this.state;
        const width = (galleryPreview.length >=3 ? {display: 'grid', gridTemplateColumns: 'auto auto auto', width: `${100/3}%`} : (galleryPreview.length === 2 ? {display: 'grid', gridTemplateColumns: 'auto auto', width: '50%'} : {display: 'grid', gridTemplateColumns: 'auto'}));

        return (
            <section id='add-product' className='bg-light p-3' >
                <form name='add-product'>
                    <div>
                        <Paper className='px-3 bg-light shadow-none'>
                            <Typography variant="h5">Add Product</Typography>
                            <Typography variant='subtitle1' className='mb-3 bg-white p-3'>Please enter Mail Champ API Key in here</Typography>
                        </Paper>
                        <Grid container spacing={3}>
                            <Grid item md={8}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper className='shadow-none'>
                                            <TextField
                                                onChange={this.handleChange}
                                                id="product-name"
                                                label="Product Name"
                                                name='productName'
                                                helperText=""
                                                variant="outlined"
                                                required
                                                fullWidth
                                            />
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Box>
                                            <Paper className='shadow-none'>
                                                <CKEditor
                                                    name='discription'
                                                    onChange={this.OnChange}
                                                />
                                            </Paper>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper className='shadow-none'>
                                            <ProductTab OnChange={this.handleChange} />
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item md={4}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Card>
                                                <CardHeader
                                                    className="border-bottom px-2 py-0 text-dark "
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <ArrowDropUpIcon />
                                                        </IconButton>
                                                    }
                                                    subheader={
                                                        <Typography className='font-weight-bold'>Publish</Typography>
                                                    }
                                                />
                                                <CardContent>
                                                    <Box display="flex" width='100%' justifyContent="space-between">
                                                        <Button size='small' variant="contained">Save Draft</Button>
                                                        <Button size='small' variant="contained">Preview</Button>
                                                    </Box>
                                                    <List >
                                                        <ListItem className='p-0'>
                                                            <ListItemIcon>
                                                                <EditIcon fontSize='small' />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    <>
                                                                        Status:
                                                                        <strong> Published</strong>
                                                                        <button className='text-primary ml-2'>Edit</button>
                                                                    </>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <ListItem className='p-0'>
                                                            <ListItemIcon>
                                                                <VisibilityIcon fontSize='small' />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    <React.Fragment>
                                                                        Visisblilty:
                                                                        <strong> public</strong>
                                                                        <Link to="/" className='text-primary ml-2'>Edit</Link>
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                        <ListItem className='p-0'>
                                                            <ListItemIcon>
                                                                <PublishIcon fontSize='small' />
                                                            </ListItemIcon>
                                                            <ListItemText
                                                                primary={
                                                                    <React.Fragment>
                                                                        Published:
                                                                        <strong> Immediately</strong>
                                                                        <Link to="/" className='text-primary ml-2'>Edit</Link>
                                                                    </React.Fragment>
                                                                }
                                                            />
                                                        </ListItem>
                                                    </List>
                                                    <Typography>
                                                        Catagory visibilty: <em>Shop and search reuslt</em>
                                                        <Link to='/'>Edit</Link>
                                                    </Typography>
                                                </CardContent>
                                                <CardActions className='bg-light'>
                                                    <Box display='flex' width='100%' alignItems='center' justifyContent='space-between'>
                                                        <button className='text-danger'>Move to trash</button>
                                                        <Box display='flex' justifyContent='space-between'>
                                                            <IconButton>
                                                                <StarsIcon />
                                                            </IconButton>
                                                            <Button color='primary' type='submit' onClick={this.OnClick}>Publish</Button>
                                                        </Box>
                                                    </Box>
                                                </CardActions>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Card variant='outlined'>
                                                <CardHeader
                                                    className="border-bottom px-2 py-0 text-dark "
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <ArrowDropUpIcon />
                                                        </IconButton>
                                                    }
                                                    subheader={
                                                        <Typography className='font-weight-bold'>Product Catagories</Typography>
                                                    }
                                                />
                                                <CardContent style={{maxHeight: '246px', overflow: 'hidden scroll'}}>
                                                    <ul style={{listStyle: 'none'}} className='catagory-list'>
                                                        {
                                                            catagories.map(item => (
                                                                <React.Fragment key={item.id}>
                                                                    <li>
                                                                        <img className='loader' src='../download.gif' alt='loader' />
                                                                        <input 
                                                                            type='checkbox' 
                                                                            data-catagory="parent" 
                                                                            id={item.catagoryName} 
                                                                            name={item.catagoryName} 
                                                                            checked = {item.isChecked} 
                                                                            value={item.catagoryName}
                                                                            className='mr-1' 
                                                                            onChange={this.catagoryContoller} 
                                                                        />
                                                                        <label htmlFor={item.catagoryName}>{item.catagoryName}</label>
                                                                        {
                                                                        item.subCatagories.length > 0 ?
                                                                            <ul key={item.id} style={{listStyle: 'none', marginLeft: '1rem'}}>
                                                                                {
                                                                                    item.subCatagories.map(sub => (
                                                                                        <li key={sub.id}>
                                                                                            <img className='loader' src='../download.gif' alt='loader' />
                                                                                            <input
                                                                                                type='checkbox' 
                                                                                                id={sub.subCatgoriesName + sub.id} 
                                                                                                data-catagory="child" 
                                                                                                name={item.catagoryName} 
                                                                                                value={sub.subCatgoriesName} 
                                                                                                className='mr-1' 
                                                                                                onChange={this.catagoryContoller}
                                                                                                checked={sub.isChecked}
                                                                                            />
                                                                                            <label htmlFor={sub.subCatgoriesName + sub.id}>{sub.subCatgoriesName}</label>
                                                                                        </li>
                                                                                    ))
                                                                                }
                                                                            </ul>
                                                                            : null
                                                                    }
                                                                    </li>
                                                                    
                                                                </React.Fragment>
                                                            ))
                                                        }
                                                    </ul>
                                                </CardContent>
                                                <CardActions className='bg-light p-0 d-block'>
                                                    <Accordian
                                                        OnChange={this.handleChange}
                                                        OnClick={this.OnAddCatagory}
                                                    />
                                                </CardActions>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Card>
                                                <CardHeader
                                                    className="border-bottom px-2 py-0 text-dark "
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <ArrowDropUpIcon />
                                                        </IconButton>
                                                    }
                                                    subheader={
                                                        <Typography className='font-weight-bold'>Product Catagories</Typography>
                                                    }
                                                />
                                                <CardContent className=''>
                                                    <img src={`${this.state.preview}`} alt={`${this.state.preview}`} className='img-fluid img-thumbnail' />
                                                </CardContent>
                                                <CardActions>
                                                    <input
                                                        style={{ display: "none" }}
                                                        id="contained-button-file"
                                                        type="file"
                                                        accept='image/*'
                                                        name='productImages'
                                                        onChange={this.fileHolder}
                                                    />
                                                    <label htmlFor="contained-button-file">
                                                        {preview ? 'Remove product image' : 'Set product image'}
                                                    </label>
                                                </CardActions>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Card>
                                                <CardHeader
                                                    className="border-bottom px-2 py-0 text-dark "
                                                    action={
                                                        <IconButton aria-label="settings">
                                                            <ArrowDropUpIcon />
                                                        </IconButton>
                                                    }
                                                    subheader={
                                                        <Typography className='font-weight-bold'>Product gallery</Typography>
                                                    }
                                                />
                                                <CardContent style={{display: width.display, gridTemplateColumns: width.gridTemplateColumns, gridGap: '1rem'}}>
                                                    {galleryPreview.map((item, index) =>(<img style={{width: `${width}%`}} src={item} key={index} className='img-fluid' alt={item+index} />))}
                                                </CardContent>
                                                <CardActions className='p-2'>
                                                    <input type='file' multiple accept='image/*' name='photos' id='multipule-file' onChange={this.fileHolder} style={{ display: 'none' }} />
                                                    <label htmlFor='multipule-file'>Add product gallery images</label>
                                                </CardActions>
                                            </Card>
                                        </Paper>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </form>
            </section>
        )
    }

}


const mapStateToProps = state => state;
const mapDispatchToProps = { setValues, getCatagory, addCatagories, customeCatagory, addCatagory }




export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
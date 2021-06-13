import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const post = async (url, data) =>{
    return await axios.post(url, data).then(res => res.data)
}

const get = async (url) =>{
    return await axios.get(url).then(res => res.data);
}

export const addCatagory = createAsyncThunk('product/addCatagory', async (catagory, { dispatch, getState }) =>{
    const data = await post('https://localhost:44380/api/Catagory/Add', catagory);
    return data;    
});

export const getCatagory = createAsyncThunk('product/getCatagory', async (catagories) =>{
    const data = catagories ? catagories : await get('https://localhost:44380/api/Catagory');
    return data;
})

const ProductSlice = createSlice({
    name: 'product',
    initialState: {
        productName: '',
        regularPrice: 0,
        salePrice: 9,
        discription: '',
        rating: '',
        catagoryName: '',
        parentCatagory: '',
        catagories: [],
        productCatagory: { parentCatagory: '', childCatagory: []},
        catagory: { catagoryName: 'Mobile', subCatagories: [{subCatgoriesName: "fdlkjflkds"}]},
        loading: true,
        status: null
    },
    reducers: {
        setValues: (state, action) => {
            return { ...state, ...action.payload }
        },
        GET: () => {

        },

        POST: (state, action) => {
            
        },

        customeCatagory: (state, { payload }) => {
            const { value, name , dataset, checked, id} = payload;
            let catagories =[];
            state.catagories.forEach(item => {
                if(item.catagoryName !== name){
                    return catagories = [...catagories, item]
                }
            })

            catagories.forEach(item =>{
                item.isChecked = false;
                item.subCatagories.forEach(sub => sub.isChecked = false);
            })

            let catagory = state.catagories.find(ele => ele.catagoryName === name);
            
            if (dataset === 'parent') {
                catagory.isChecked = checked;
                catagory.subCatagories.forEach(sub => {
                    sub.isChecked = checked;
                });

                const d = document.querySelectorAll('input[name ="' + name + '"]');
                setTimeout(() => {
                    d.forEach(item => {
                        item.style = 'display: inline-block';
                        item.previousElementSibling.style = 'display: none';
                    })
                }, 1500);
                
            }

            else if(dataset === 'child'){
                catagory.subCatagories.find(sub => sub.subCatgoriesName === value).isChecked = checked;
                let bool = catagory.subCatagories.every(sub => sub.isChecked === true);
                document.querySelector('input[name="' + name + '"]').indeterminate = !bool;
                catagory.isChecked = bool;
                let input = document.getElementById(id);
                setTimeout(() => {
                    input.previousElementSibling.style = 'display: none';
                    input.style = 'display: inline-block';
                }, 1000);
            }
        },

    },
    extraReducers:{
        [addCatagory.pending]: (state) => {
            state.status = 'pending';
        },

        [addCatagory.fulfilled]: (state, { payload }) => {
            debugger;
            if(!payload.subCatagories.length){
                localStorage.setItem('catagories', JSON.stringify([...state.catagories, {...payload, isChecked: false, subCatagories: []}]));
                return { ...state, catagories: [...state.catagories, {...payload, isChecked: true, subCatagories: []}]}
            }
            else{
                const element = state.catagories.find(item => item.catagoryName === payload.catagoryName);
                element.subCatagories.push({...payload.subCatagories[0], isChecked: false});
                localStorage.setItem('catagories', JSON.stringify(state.catagories));
                element.subCatagories[element.subCatagories.length - 1].isChecked = true;
                element.subCatagories.find(item => item.subCatgoriesName === payload.subCatagories[0].subCatgoriesName).isChecked = true;
                const bool = element.subCatagories.every(item => item.isChecked === true);
                element.isChecked = bool;
                state.status = true;
                document.querySelector('input[name="' + element.catagoryName + '"]').indeterminate = !bool;
            }
        },

        [addCatagory.rejected]: (state) =>{
            state.status = 'failed'
        },

        [getCatagory.pending]: (state) =>{
            state.status = 'pending'
        },
        
        [getCatagory.fulfilled]: (state, { payload }) =>{
            let temp = [];
            payload.forEach(element => {
                let sub = [];
                element.subCatagories.forEach(item => {
                    return sub = [...sub, { ...item, isChecked: false }]
                })

                return temp = [...temp, { ...element, isChecked: false, subCatagories: sub }]
            });
            
            localStorage.setItem('catagories', JSON.stringify(temp))
            return {...state, catagories: temp}
        },

        [getCatagory.rejected]: (state) =>{
            state.status = 'faild'
        }
    },
});

export const { setValues, GET, POST, addCatagories, customeCatagory } = ProductSlice.actions;
export default ProductSlice.reducer;

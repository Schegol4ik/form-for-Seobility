import React from 'react';
import './App.scss'
import Form from './components/Form';





const App = () => {


    const reName: any = /^\b[A-Z]{3,30}\b\s\b[A-Z]{3,30}\b$/mg
    const reEmail: any = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

    return (
        <div className='wrapper__app'>
            <Form/>
        </div>
    );
};

export default App;
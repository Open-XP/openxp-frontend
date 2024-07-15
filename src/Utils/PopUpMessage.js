import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PopUpNotification = () => {
    return <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />;
};

export const showSuccessPopUp = (message) => {
    toast.success(message);
};

export const showErrorPopUp = (message) => {
    toast.error(message);
};

export default PopUpNotification;

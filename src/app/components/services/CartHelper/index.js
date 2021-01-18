const emptyCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cartItems')) {
            localStorage.removeItem('cartItems')
            window.location.href="/order/success";
        }
    }
    return [];
};



export default {
    emptyCart
};
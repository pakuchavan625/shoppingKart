import { useState } from "react";
import { createContext } from "react";
import {  getProductData } from "./product";

export const CartContext = createContext({
  item: [],
  userdata :{},
  signupData:{},
  language : 'en',
  changeLanguage :()=>{},
  translate :()=>{},
  login :()=>{},
  logout:()=>{},
  singUp:()=>{},
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});


export const CartProvider = ({ children }) => {
  const [cartProduct, setCardProduct] = useState([]);
  const [user, setUser] = useState(null)
  const [signupUserData, setSignUserData]= useState({})
  const [language, setChangeLaguage] = useState("en")



  const getProductQuantity = (id) => {
    const quantity = cartProduct.find((product) => product.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCardProduct([
        ...cartProduct,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCardProduct(
        cartProduct.map((product) => {
          return product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product;
        })
      );
    }
  };

  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCardProduct(
        cartProduct.map((product) => {
          return product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product;
        })
      );
    }
  };

  const deleteFromCart = (id) => {
    setCardProduct(
      cartProduct.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  };

 const getTotalCost = ()=>{
    let totalCost = 0;
    cartProduct.map((cartItem)=>{
        const productData = getProductData(cartItem.id)
        totalCost += (productData.price * cartItem.quantity)
    })
    return totalCost;
 }

 const login =(userInfor)=>{
  setUser(userInfor)
 }

 const logout =()=>{
  setUser('')
 }

 const singUp =(signupUserInfo)=>{
setSignUserData(signupUserInfo)
 }

//  tranlastion implemention

const translations = {
  en: {
    wellComeMessage :'Hello wellcome!',
    title: ['Coffe', 'Sunglasses', 'Camera','Mobile', 'Cycle','Washing Machine','Tv', 'Sofa'],
    addToCart: "Add to Cart",
    removeFromCart: "Remove from cart",
    inCart :"In Cart",
    priceLowToHigh:'Price Low to High',
    priceHighToLow:'Price High to Low',
    searchForProduct :'search for products',
    follow:'Follow',
    address:'Address',
    openingHours:'Opening Hours',
    getInTouch:'Get in touch',
    firstName:"First Name",
    lastName:'Last Name',
    emial:'Email',
    phone:'Phone',
    message:'Message',
    send:'Send',
    paymentSuccess :'Congratulations! Payment Successful',
    pageNotFound:'Page not Found',
    login:'Login',
    registerdOrNot:'Doesnt have account yet',
    register:'Register',
    emailAddres : 'Email address',
    emailWeDontSHare :`We'll never share your email with anyone else.`,
    password:'Password',
    agree:'Agree',
    loginButton:'Login',
    ifYouHaveAccount:'If you have an account'
  },
  de: {
    wellComeMessage :'Hallo, willkommen!',
    title: ['Kaffee', 'Sonnenbrille','Kamera','Mobil','Fahrrad','Waschmaschine','Fernseher','Sofa'],
    addToCart: "in den Warenkorb legen",
    removeFromCart: "Aus dem Warenkorb entfernen",
    inCart :"Im Wagen",
    priceLowToHigh:'Preis niedrig bis hoch',
    priceHighToLow:'Preis hoch bis niedrig',
    searchForProduct :'Suche nach Produkten',
    follow:'Folgen',
    address:'Adresse',
    openingHours:'Öffnungszeiten',
    getInTouch:'Nehmen Sie Kontakt auf',
    firstName:"Vorname",
    lastName:'Nachname',
    emial:'E-Mail',
    phone:'Telefon',
    message:'Nachricht',
    send:'schicken',
    paymentSuccess :'Glückwunsch! Bezahlung erfolgreich',
    pageNotFound:'Seite nicht gefunden',
    login:'Anmeldung',
    registerdOrNot:`Hat noch kein Konto`,
    register:'Registrieren',
    emailAddres : ` E-Mail-Adresse`,
    emailWeDontSHare :`Wir geben Ihre E-Mail-Adresse niemals an Dritte weiter.`,
    password:'Passwort',
    agree:'Zustimmen',
    loginButton:'Anmeldung',
    ifYouHaveAccount:'Wenn Sie ein Konto haben'
  }
};

const changeLanguage=(newLanguage)=>{
  setChangeLaguage(newLanguage)
}

const translate=(key)=>{
  return translations[language][key] || key;
}

  const contextValue = {
    item: cartProduct,
    userdata:user,
    registerData:signupUserData,
    language,
    changeLanguage,
    translate,
    login,
    logout,
    singUp,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };
  return (
    <CartContext.Provider value={contextValue}>
        {children}
    </CartContext.Provider>
  );
};


export  default CartProvider;




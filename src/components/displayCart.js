import {useState}  from "react";

function DisplayCart(currentCart) {

    const [cartData, displaycartData] = useState([]);
    displaycartData(currentCart);

    return (
        <>
            <div>
                {cartData.map((item) => (
                    <>
                    <table>
                        <thead>
                            <td>image</td>
                            <td>title</td>
                            <td>price</td>
                            <td>quantity</td>
                            <td>Remove</td>
                            <td>subtotal</td>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{item.image}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity}</td>
                            <td><button>Remove</button></td>
                            <td>{item.subTotal}</td>
                            </tr>
                        </tbody>
                    </table>
                    </>
                ))}

            </div>
        </>
    );
}
export default DisplayCart;
import axios from "axios"
async function RazorPayCheckOut() {
    const tokenId = localStorage.getItem("TokenID")
    console.log(tokenId)
    const response = await axios.get(
        "http://localhost:4000/purchase/premiummembership",
        { headers: { "Authorization": tokenId } }
    )
    console.log("going to forword>>>>>")
    var options = {
        "key": response.data.key_id,
        "order_id": response.data.order.id,
        "handler": async function (response) {
            try {
                axios.post(
                    "http://localhost:4000/purchase/updatetransactionstatus",
                    {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id
                    },
                    { headers: { "Authorization": tokenId } }
                )
                alert("Your Are Premium Member Now")
            } catch (err) {
                console.log(err, "Error")
            }

        }

    }
    const rzp1 = window.Razorpay(options)

    rzp1.open()

    rzp1.on("payment.failed", async (response) => {

        const order_id = response.error.metadata.order_id

        const payment_id = response.error.metadata.payment_id

        await axios.post(
            "http://localhost:4000/purchase/failedpayment",

            { order_id: order_id, payment_id: payment_id },
            { headers: { "Authorization": tokenId } }
        )

        alert("PAYMENT FAILED ..!!!")
    })
}

export default RazorPayCheckOut;
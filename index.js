var IMP = window.IMP; // 생략가능
IMP.init('imp13458872'); // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

let isProcessing = false;

const payform = document.getElementById("payform");
const uniqueID = document.getElementById("uniqueID");
const storeReceipt = document.getElementById("storeReceipt");
const cost = document.getElementById("cost");
const cardNumber = document.getElementById("cardNumber");
const payError = document.getElementById("payError");

payform.onsubmit = (e) => {
    e.preventDefault();
    isProcessing != isProcessing;

    if (isProcessing) {
        const formData = new FormData(payform);
        // console.log('e', formData);
        payForm = {};
        
        for (const formElement of formData) {
            // console.log(formElement);
            let [key, value] = formElement;
            payForm[key] = value;
          }
    
        console.log('payForm', payForm);
    
        importPay(payForm)
        .then(rsp => {
            uniqueID.textContent = rsp.imp_uid;
            storeReceipt.textContent = rsp.merchant_uid;
            cost.textContent = rsp.paid_amount;
            cardNumber.textContent = rsp.apply_num;
    
            isProcessing != isProcessing;
        })
        .catch(rsp_err => {
            payError.textContent = rsp_err.error_msg;
            isProcessing != isProcessing;
        })
    } else {
        alert("다른 결제 건이 진행 중 입니다.");
    }
}

function importPay(form) {
    return new Promise((resolve, reject) => {
        IMP.request_pay({
            pg : 'inicis', // version 1.1.0부터 지원.
            pay_method : 'card',
            merchant_uid : 'merchant_' + new Date().getTime(),
            name : form.product_name,
            amount : form.buyer_cost,
            buyer_email : form.buyer_email,
            buyer_name : form.buyer_name,
            buyer_tel : form.buyer_tel,
            buyer_addr : form.buyer_addr,
            buyer_postcode : form.buyer_postcode,
            m_redirect_url : 'https://www.yourdomain.com/payments/complete'
        }, function(rsp) {
            if ( rsp.success ) {
                resolve(rsp);
            } else {
                reject(rsp);
            }
            // alert(msg);
        });
    })
}
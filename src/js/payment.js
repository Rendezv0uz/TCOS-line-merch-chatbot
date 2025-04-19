import { dotenv } from 'dotenv';
dotenv.config();

function goHome() {
  window.location.href = 'cart.html';
}

// const form = document.querySelector('.formlol');
// form.addEventListener("submit", function(e){

//   const formData ={
//     name : form.name.value,
//     tel : form.tel.value,
//     time: form.time.value,
//     date: form.date.value,
//     price: form.pricePay.value,
//     contact: form.contact.value,
//     email: form.mail.value,
//     housenumber: form.home.value,
//     mooh: form.mooh.value,
//     soi: form.soi.value,
//     kwang: form.kwang.value,
//     territory: form.territory.value,
//     province: form.province.value,
//     zipcode: form.zipcode.value,
//   }

//   fetch("https://script.google.com/macros/s/AKfycbyE51R1PoBqTgiqRo-myc-ONPhCwcGsXBm4M5lsDZ7CmL0TwDGWBm10hdJeLfL0q72Q/exec" , {
//     method : "POST",
//     body : JSON.stringify(formData),
//     headers: {
//       "Content-Type": "application./json", // important!
//     },
//   })
//   .then(res => res.text())
//   .then(data => {
//     form.reset()
//   })
//   .catch(err => console.error("Error",err))
//   alert("ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
// })

function getPurchasedMerchText() {
  const cart = JSON.parse(localStorage.getItem('cart'));
  if (!cart) return 'ไม่มีรายการสินค้า';

  const lines = [];

  for (const [product, value] of Object.entries(cart)) {
    if (product === 'tshirt') {
      let shirtLines = [];
      for (const [size, quantity] of Object.entries(value)) {
        if (quantity > 0) {
          shirtLines.push(`เสื้อไซส์ ${size}: ${quantity} ตัว`);
        }
      }
      if (shirtLines.length > 0) {
        lines.push(...shirtLines);
      }
    } else {
      if (value > 0) {
        const nameMap = {
          umbrella: 'ร่ม',
          blanket: 'ผ้าห่ม',
          cardholder: 'ที่ใส่บัตร',
          keychains: 'ถุงสุ่ม',
          bandanas: 'ผ้าโพกหัว',
        };
        lines.push(`${nameMap[product] || product}: ${value} ชิ้น`);
      }
    }
  }

  return lines.length > 0 ? lines.join('\n') : 'ไม่มีรายการสินค้า';
}
const LIFF_ID = process.env.LIFF_ID;
const form = document.forms['sheet'];
window.onload = async () => {
  const autoText = getPurchasedMerchText();
  try {
    await liff.init({ liffId: LIFF_ID });
    const profile = await liff.getProfile();
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      try {
        await fetch(
          'https://script.google.com/macros/s/AKfycbxC38n5fcGlFU1vG_meZQumwM9rNdBavTU8-xxN7QM-9mNaKsQwQCCD3z30FvKv_Rs/exec',
          {
            method: 'POST',
            body: new FormData(form),
          }
        );

        if (liff.isInClient()) {
          await liff.sendMessages([
            {
              type: 'text',
              text: `สรุปรายการสั่งซื้อ Pre-Order Merchandise ของ ${
                profile.displayName
              } 
                      :\n${autoText}
                      📝 ชื่อ-นามสกุล: ${form.name.value}
                      📞 เบอร์โทรศัพท์: ${form.tel.value}
                      🗓 วันที่: ${form.date.value}
                      💰 จำนวนเงิน ${form.pricePay.value} บาท
                      🚚 รูปเเบบการจัดส่ง: ${
                        form.shippingMethod.value === '1' ? EMS : พนักงาน
                      }
                      ข้อความนี้เป็นข้อความอัตโนมัติ
                      โปรดรอการตอบกลับจากทีมงานเพื่อยืนยันรายการสั่งซื้อเเละดำเนินการชำระเงินต่อไป`,
            },
          ]);
        }

        localStorage.clear();
        form.reset();
        liff.closeWindow();
      } catch (err) {
        liff.closeWindow();
      }
    });
  } catch (err) {
    console.error('LIFF FAIL:', err);
  }
};
// form.addEventListener('submit', (e) => {
//   e.preventDefault();

//   // const formData = new FormData(form);

//   fetch(
//     'https://script.google.com/macros/s/AKfycbxC38n5fcGlFU1vG_meZQumwM9rNdBavTU8-xxN7QM-9mNaKsQwQCCD3z30FvKv_Rs/exec',
//     {
//       method: 'POST',
//       body: new FormData(form),
//     }
//   )
//     .then((data) => {
//       alert('ส่งข้อมูลเรียบร้อยแล้ว!');
//       localStorage.clear();
//       form.reset();
//     })
//     .catch((err) => {
//       console.error('Error:', err);
//       alert('ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่');
//     });
// });

document.querySelector('.btn-back').addEventListener('click', goHome);

// const LIFF_ID = 'YOUR_LIFF_ID'; // Replace with your actual LIFF ID

// async function initLiff() {
//   try {
//     await liff.init({ liffId: LIFF_ID });

//     // Setup button listener after LIFF is ready
//     document
//       .getElementById('confirmBtn')
//       .addEventListener('click', async () => {
//         const price = 199;

//         if (liff.isInClient()) {
//           await liff.sendMessages([
//             {
//               type: 'text',
//               text: `Order confirmed ✅\nTotal: ฿${price}`,
//             },
//           ]);
//         }

//         liff.closeWindow();
//       });
//   } catch (err) {
//     console.error('LIFF init failed', err);
//   }
// }

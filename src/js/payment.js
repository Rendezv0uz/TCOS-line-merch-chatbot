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

const form = document.forms['sheet'];

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // const formData = new FormData(form);

  fetch(
    'https://script.google.com/macros/s/AKfycbxC38n5fcGlFU1vG_meZQumwM9rNdBavTU8-xxN7QM-9mNaKsQwQCCD3z30FvKv_Rs/exec',
    {
      method: 'POST',
      body: new FormData(form),
    }
  )
    .then((data) => {
      alert('ส่งข้อมูลเรียบร้อยแล้ว!');
      localStorage.clear();
      form.reset();
    })
    .catch((err) => {
      console.error('Error:', err);
      alert('ส่งข้อมูลไม่สำเร็จ กรุณาลองใหม่');
    });
});

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

          // function loadPhone(){
          //      fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
          //      .then(res => res.json())
          //      .then(data => console.log(data))
          // }
          // loadPhone()



          const loadPhone = async (searchPhone, isShowAll) => {
               const rest = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
               const data = await rest.json();
               const phones = data.data;
               displayPhones(phones, isShowAll)
          }

          const displayPhones = (phones,isShowAll) => {
               const phonesContinner = document.getElementById('phones-continner');
               phonesContinner.textContent = '';

               // show all button
               const showAllButton = document.getElementById('show-all-button');

               if(phones.length > 12 && !isShowAll){
                    showAllButton.classList.remove('hidden')
               }else{
                    showAllButton.classList.add('hidden')
               }

               if(!isShowAll){
                    phones = phones.splice(0,12)
               }

               // console.log(phones)
               phones.forEach(phone => {
                      console.log(phone)  
                    const phonesDiv = document.createElement('div');
                    phonesDiv.innerHTML = `
               
               <div class="card w-96 bg-gray-300 shadow-xl text-center mt-5">
               <figure><img class="mt-10"src="${phone.image}" alt="Shoes" /></figure>
               <div class="card-body text-center"> 
               <h2 class=" text-center font-bold text-lg ">${phone.brand}</h2>
               <p class="font-normal text-sm">${phone.slug}</p>
               <h2 class="font-extrabold text-lg">$900</h2>
               
                    <div>
                         <button onClick="handelShowDetails('${phone.slug}')"  class="btn btn-primary w-3/6  ">Show Details</button>
                    </div>
          
               
               </div>
          </div>
               `;
               phonesContinner.appendChild(phonesDiv)

               });
               loadingSpinner(false)
              
          }
          
     const handelSearch =(isShowAll)=>{
          loadingSpinner(true)
         
          const searchFiled= document.getElementById('search-filed');
          const searchText = searchFiled.value;

          loadPhone(searchText,isShowAll)

     }

     // const handelSearch2 = () =>{
     //      loadingSpinner(true)
          
     //      const searchFiled2 = document.getElementById('search-filed2');
     //      const searchText = searchFiled2.value;
     //      loadPhone(searchText);
          
          
     // }
   const loadingSpinner = (isLoading)=>{
     const loadingSpinner = document.getElementById('loading-spinner');
     if(isLoading){
          loadingSpinner.classList.remove('hidden')
     }else{
          loadingSpinner.classList.add('hidden')
     }
   }
   const handelShowAll = ()=>{
     handelSearch(true)
   }

   const handelShowDetails =  async(id) => {
     // console.log('Details', id);
     const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
     const data = await res.json();
    const phones =  data.data;
     showDetailsModal(phones);
   }

   const showDetailsModal = (phones) =>{
     console.log(phones);
     // const img = document.getElementById('show-Details-modal-img');
     // img.innerHTML = `${phones.image}`
     // const name = document.getElementById('show-Details-modal-name');
     // name.innerText = phones.name;
    const showDetailsModalAll = document.getElementById('show-Details-modal-all');

    showDetailsModalAll.innerHTML = `
      
    <img class="mx-32" src="${phones.image}" alt="">
    
    <h2 class="font-bold text-2xl">Name : ${phones.name}</h2>
    <p id="show-Details-modal-para" class="py-4 font-normal">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h2>Storage : ${phones.mainFeatures.storage}</h2>
    <h3> Display Size : ${phones.mainFeatures.displaySize}</h3>
    <h3>Chipset : ${phones.mainFeatures.chipSet}</h3>
    <h3> Memory : ${phones.mainFeatures.memory}</h3>
    <h3>Slug : ${phones.slug}</h3>
    <h3>Release data : ${phones.releaseDate}</h3>
    <h3>Brand : ${phones.brand}</h3>
    <h3>GPS: ${phones.others.GPS}</h3>
    
    
    `



     show_Details_modal.showModal();
    
   }

 
     // loadPhone();

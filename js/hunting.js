const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById('phone-container');

        phoneContainer.textContent = '';

        const showAllContainer = document.getElementById('show-all-conatiner')
        if(phones.length > 12 && !isShowAll){
            showAllContainer.classList.remove('hidden');
        }
        else{
            showAllContainer.classList.add('hidden');
        }

        if(!isShowAll){
            phones = phones.slice(0, 12);
        }

    phones.forEach(phone => {

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 shadow-xl`;
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
            <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>There are many variations of passages of available, but the majority have suffered</p>
            <div class="card-actions">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary normal-case">Show Details</button>
            </div>
        </div>
        `;
        phoneContainer.appendChild(phoneCard);
        console.log(phone.slug);
    });
    // hide loading ring
    toggleLoadingRing(false)
}

const handleShowDetails = async (id) => {
    // console.log('clicked',id);
    // load phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) => {
    console.log(phone);

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src= "${phone.image}" class = "mb-2" />
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize
    }</p>
    <p><span class="font-bold">Chip Set: </span>${phone?.mainFeatures?.chipSet
    }</p>
    <p><span class="font-bold">Release Date: </span>${phone.releaseDate
    }</p>
    `;

    // show modal
    show_details_modal.showModal();
}


// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingRing(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll);
}

const toggleLoadingRing = (isLoading) => {
    const loadingRing = document.getElementById('loading-ring');
    
    if(isLoading ){
        loadingRing.classList.remove('hidden')
    }
    else{
        loadingRing.classList.add('hidden')
    }
}

// handle show all
const handleShowAll = () => {
    handleSearch(true);
}


loadPhone();
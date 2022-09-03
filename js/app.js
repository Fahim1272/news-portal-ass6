const loadnewsData = async () => {
    try{
        const url = `https://openapi.programming-hero.com/api/news/categories`
        const res = await fetch(url);
        const data = await res.json();
        showNewsData(data.data.news_category)
    }
    catch(errorMessage){
        console.log(errorMessage);
    }

}
const showNews = async idCategory =>{
    // Spinner start
    const LoadSpinner = document.getElementById('LoadSpinners');
    LoadSpinner.classList.remove('d-none');
    try{
        const url = `https://openapi.programming-hero.com/api/news/category/${idCategory}`;
        const res = await fetch(url);
        const data = await res.json();
        newsShow(data.data);
    }
    catch(errorMessage){
        console.log(errorMessage);
    }
    
}
const newsShow = data =>{
   
    const errorMessageNews = document.getElementById('errorMessage');
    const newsItem = document.getElementById('news');

    if(data.length == 0){
        document.getElementById('newCount').classList.add('d-none');
        errorMessageNews.classList.remove('d-none')
        newsItem.textContent = "";
        const LoadSpinner = document.getElementById('LoadSpinners');
        LoadSpinner.classList.add('d-none');
    }
    else{
        console.log(data.length)
        document.getElementById('counter').innerText = data.length;
        document.getElementById('newCount').classList.remove('d-none');
        errorMessageNews.classList.add('d-none')
        newsItem.textContent = "";
        data.forEach(newsElements => {
        
        
        const details = newsElements.details;
        const detailsShort = details.substring(0,350) + '...';
        const newsCard = document.createElement('div')
        newsCard.innerHTML = `
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2 d-flex justify-content-lg-start  justify-content-md-start justify-content-center">
                        <img src="${newsElements.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-10 d-flex flex-column justify-content-center p-2" >
                        <div class="card-body">
                            <h5 class="card-title">${newsElements.title}</h5>
                            <p class="card-text">${detailsShort}</p>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column flex-sm-row flex-lg-row align-items-center me-1">
                                <img class="writerProfilePIc ms-4" src="${newsElements.author.img}" alt="" />
                                <div class="ms-2">
                                    <h5>${newsElements.author.name ? newsElements.author.name : "No data"}</h5>
                                    <p>${newsElements.author.published_date}</p>
                                </div>
                            </div>
                            <div class="d-flex flex-column flex-sm-row flex-lg-row align-items-center me-1">
                                <i class="fa-solid fa-eye"></i>
                                <h4 class="ms-2">${newsElements.total_view ? newsElements.total_view : "no data"}</h4>
                            </div>
                            <div>
                                <button onclick="showDetails('${newsElements._id}');" style="font-size: 24px; color: blue" class="btn btn-primary text-light p-1" data-bs-toggle="modal" data-bs-target="#newsModal">Read...</button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        

        ` // Spinner end
        const LoadSpinner = document.getElementById('LoadSpinners');
        LoadSpinner.classList.add('d-none');
        newsItem.appendChild(newsCard)
    })
    }   
}
const showDetails = async data => {
    // console.log(data);
    try{
        const url = `https://openapi.programming-hero.com/api/news/${data}`;
        const res =  await fetch(url);
        const det = await res.json();
        showNewsDetails(det.data[0]);
    }
    catch(errorMessage){
        console.log(errorMessage);
    }
    

}
const showNewsDetails = (data) =>{
    console.log(data);
    const modaltitle = document.getElementById('newsModalLabel');
    modaltitle.innerText = data.title;
    const modalShow = document.getElementById('detailsModal');
    modalShow.innerHTML = `
        <div>
            <img class="img-fluid" src="${data.image_url}" alt="" />
            <br />
            <p>${data.details}</p>
            <p> Author : ${data.author.name ? data.author.name : "No data"}</p>
        </div>
        
    `
}
const showNewsData = (data) => {
    console.log(data)
    const catagories = document.getElementById('category');
    data.forEach(category => {
        const catagoryContent = document.createElement('button');
        catagoryContent.classList.add('categoryItem')
        catagoryContent.setAttribute("onclick", `showNews('${category.category_id}');`)
        catagoryContent.innerText = category.category_name;
        // console.log(catagoryContent);
        catagories.appendChild(catagoryContent);
    })
    
}
loadnewsData();
showNews('03')
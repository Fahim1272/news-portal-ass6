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
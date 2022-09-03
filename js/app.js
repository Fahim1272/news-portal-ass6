const loadCategories = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json()
    displayCategories(data.data.news_category)
    return data;
}
loadCategories();

const displayCategories = async (newsCategories) =>{
   
    const categoryContainer =document.getElementById('category-container')
    newsCategories.forEach(category =>{
        const categoryDiv = document.createElement('div')
        categoryDiv.classList.add('news','text-primary');
        categoryDiv.innerHTML = `
        <a onclick ="">${category.category_name} </a>
    `;
    categoryContainer.appendChild(categoryDiv);
    })
}
// Display 


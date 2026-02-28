
async function load_posts() {

    const posts = await fetch("posts/_posts-index.json").then(response => response.json());
    console.log("posts", posts)

    const postContainer = document.getElementById("main");

    for (post of posts) {
        const request = await fetch("posts/" + post.date + ".txt");
        if (request.status != 200) continue;
        const content = await request.text();

        const article = document.createElement("article");
        article.innerHTML = `
            <h2>${post.title}</h2>
            <time>${post.date}</time>
            <p>${format_text(content)}</p>
        `
        article.classList = "post"
        postContainer.appendChild(article);
    }
}

/**
 * @param {string} strMarkdown
 */
function format_text(strMarkdown) {
    let result = strMarkdown.replace(/(?:\r\n|\r|\n){2}/g, '<br><br>');
    console.log(result)
    return result;
}

load_posts();
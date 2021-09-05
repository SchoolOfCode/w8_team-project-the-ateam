let guardianApiKey = `ccf9a5bd-5549-4c8f-ae0c-62bfd3938f71`;

async function fetchTechNews(){ // Technology news
    let apiLink = `http://content.guardianapis.com/search?section=technology&api-key=${guardianApiKey}`;
    response = await fetch(apiLink)
    let technologyArticles = await response.json();
    return technologyArticles;
}

async function fetchFilmNews(){ // Film news
    let apiLink = `http://content.guardianapis.com/search?section=film&api-key=${guardianApiKey}`;
    response = await fetch(apiLink)
    let filmArticles = await response.json();
    return filmArticles;
}

async function fetchHeadlineNews(){ // Headline news
    let apiLink = `http://content.guardianapis.com/search?&api-key=${guardianApiKey}`;
    response = await fetch(apiLink)
    let headlineArticles = await response.json();
    return headlineArticles;
}


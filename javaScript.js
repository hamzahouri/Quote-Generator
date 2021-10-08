const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const twiteerBtn = document.getElementById("twiteer");
const btnnQuote = document.getElementById("new-quote");
const loader = document.getElementById("loader");


let apiQuotes = [];

// show loading

function loading () {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}


// show new Quote
function newQuote() {
    loading();
    // pick a random nquite from apiQuote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length  )];
   // check if author is not exist
   if(!quote.author) {
    quoteAuthor.textContent="unknown";
   }else {
    quoteAuthor.textContent=quote.author;
   }

   // check the quote length to determine the styling
   if(quote.text.length >10) {
       quoteText.classList.add("long-quote");
   } else {
    quoteText.classList.remove("long-quote");
   }
    // set quote, hide loader

    quoteText.textContent=quote.text;
    complete();

}
// Get Quote from API

async function getQuote () {
    loading();

    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
        
    } catch (error) {
        // catch Error here 
        
    }
}

// tweet quote
function tweetQuote () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl,'_blank');
}

// add event listner
btnnQuote.addEventListener('click',newQuote);
twiteerBtn.addEventListener('click',tweetQuote);

// on load
getQuote();
// THE METHOD NEW QUOTE CALLED IF I WANT TO CALL LOCAL ARRAY FROM (localQuote.js). i need to change the new Quote methode by adding the name of the array in the local file
//newQuote();

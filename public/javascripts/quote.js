// This file contains code for Quotes, greetings, date  
let quote = [];

function fetch_quotes() {
    let ajax = new GlobalAjax();
    let action = 'fetch_quotes';
    ajax.performRequest(action, null)
        .then(data => {
            quote = data;
            set_Quote_greet_date(quote[0]);
        })
        .catch(error => {
            console.error('Error fetching the quotes:', error);
        });
}

function set_Quote_greet_date(data) {
    const quotelabel = document.getElementById('app-mainTab__quote');
    let setQuote = (randomQuote) => {
        if (randomQuote) {
            quotelabel.textContent = randomQuote.quotes_text;
        }
        else {
            quotelabel.textContent = data.quotes_text;
        }
    }
    let setdate_and_greet = () => {
        const datelabel = document.getElementById('app-mainTab__date');
        const greetlabel = document.getElementById('app-mainTab__greet');

        const date = new Date();
        datelabel.textContent = moment(date).format("ll");

        //set greetings
        let hours = date.getHours();
        hours < 12 ? greetlabel.textContent = "Good Morning" : hours < 18 ?
            greetlabel.textContent = "Good Afternoon" :
            greetlabel.textContent = "Good Evening";
    }
    let updateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quote.length);
        const randomQuote = quote[randomIndex];
        setQuote(randomQuote);
    }
    setQuote(null);
    setdate_and_greet();
    setInterval(updateQuote, 20 * 1000);
}



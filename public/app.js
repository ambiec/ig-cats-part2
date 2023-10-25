window.addEventListener('load', () => { //dont forget to link js to html lol
    let feed = document.getElementById('feed');

    fetch('/submissions')
    .then(response => response.json())
    .then(data => {
        let submissions = data.data;
        // console.log(submissions);

        for(let i=0; i<submissions.length; i++){
            console.log(submissions[i]);

            let submitContent = submissions[i].input;
            let newSubmit = document.createElement('p');
            newSubmit.innerHTML = submitContent;

            feed.appendChild(newSubmit); //show in feed
        }
    })

    let submitCat = document.getElementById('cat-input');
    let submitButton = document.getElementById('cat-submit');

    submitButton.addEventListener('click', () => {
        let submitValue = submitCat.value; //reading submission value
        // console.log(submitValue); 

        //create cat ig object
        let submitObj = {
            input: submitValue
        }

        //stringify data
        let submitObjJSON = JSON.stringify(submitObj);

        //fetch (to use post on server)
        fetch('/new-submission', {
            method: "POST", //method key
            headers: { "Content-Type": "application/json" }, //headers key
            body: submitObjJSON //use stringified version of input to travel from client to server
          }) 

        //post on server
        .then(response => response.json())
        .then(data => {
            // console.log("received from server"); 
            let submissionContent = data.input;

            let newSubmit = document.createElement('p');
            newSubmit.innerHTML = submissionContent;
            
            feed.insertBefore(newSubmit, feed.first)
        })
    })
    
})
const get = function (url, cb) {
    let req = new XMLHttpRequest();
    req.open("GET", url, true);

    req.onreadystatechange = function () {
        if (req.readyState != req.DONE) return;

        let status = req.status;
        let headers = req.getAllResponseHeaders();
        let text = req.responseText;
        cb(status, headers, text);
    }

    req.send();
}

const appendImage = function (url) {
    let imgEl = document.createElement('img');
    imgEl.src = url;
    imgEl.onerror = function (e) {
        imgEl.remove();
    }
    document.getElementById('images').appendChild(imgEl);
}


const getImages = function (params) {
    let url = 'https://www.reddit.com/r/pics/search.json?q=';
    url += params.category;
    url += '&limit=' + params.limit;

    get(url, function (status, headers, body) {
        var response = JSON.parse(body);

        _.each(response.data.children, function (child) {
            var url = child.data.url;

            appendImage(url);

        });

    });
}
let btn = document.getElementById('click');
btn.addEventListener('click', function () {
    let limitsInput = document.querySelector('.limits');
    let nameInput = document.querySelector('.name');
    if (limitsInput.value === '') {
        limitsInput.value = 5;
    } else if (nameInput.value === '') {
        nameInput.value = 'cat';
    } else if (limitsInput.value === '' && nameInput.value === '') {
        nameInput.value = 'cat';
        limitsInput.value = 5;
    }
    getImages({
        limit: limitsInput.value,
        category: nameInput.value.toString()
    });
});
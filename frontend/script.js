const formEl = document.querySelector('form');
const url = document.querySelector('#url');
const duration = document.querySelector('#time');
const shortenedUrl = document.querySelector('#shortenedUrl');
const shortContainerEl = document.querySelector('#shortenedUrlContainer');
const shortContainer = document.querySelector('#msg');

formEl.addEventListener('submit', (evnt)=>{
    evnt.preventDefault();
    let obj = {};
    obj.hrs = duration.value;
    obj.url = url.value;
    sendingData(obj);
})

const sendingData = async(obj)=>{
    try{
        let res = await fetch('https://hungry-tuxedo-duck.cyclic.app/url',{
            body: JSON.stringify(obj),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST'
        })
        let result = res.ok;
        res = await res.json();
        if(result){
            shortContainerEl.style.display = 'block'
            shortenedUrl.innerText = res.url;
            shortContainer.innerText = res.msg;
        }else{
            alert('Something went wrong');
        }
    }catch(err){
        console.log(err);
    }
}
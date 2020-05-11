const weatherForm  = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit',(e) => {
  const location = search.value
  // console.log(location);
  messageOne.textContent = 'Searching....'
  messageTwo.textContent = ' '
  fetch(`/weather?address=${location}`)
  .then((respond) => {
    respond.json()
    .then((data)=>{
      if(data.error){
        console.log(data.error);
        messageOne.textContent = data.error
      }
      else{
        console.log(data);
        
        messageOne.textContent = data.Location
        messageTwo.textContent = data.Forecast

      }
    })
  })
  e.preventDefault();
})


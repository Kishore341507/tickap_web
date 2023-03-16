
// getting buses  for BUS CODE

var search_list = document.getElementById('search-list');
var bus_json = { }
fetch('https://tickap.com/database/names')
    .then(response => response.json())
    .then(data => {
      bus_json = data
      for (let key in data){
        var option = document.createElement('option');
        option.value = key;
        search_list.appendChild(option);  }
    })
    .catch(error => console.error(error));

//getting From for FROM 
var search_element = document.getElementById('search');
var origin_list = document.getElementById('origin');
var destination_list = document.getElementById('destination');

console.log(origin_list)

search_element.addEventListener('input' , e => {
  const text = e.currentTarget.value // or inputEl.value
  console.log(text)
  fetch('https://tickap.com/database/names')
    .then(response => response.json())
    .then(data => { 
        if ( text in data ) {
        origin_list.disabled  = false
        destination_list.disabled  = false
        fetch(`https://tickap.com/database/${data[text]['route']}`) 
            .then(response => response.json())
            .then(data => {
            origin_list.innerHTML = '<option value="" disabled selected hidden>Select your origin </option>'
            destination_list.innerHTML = '<option value="" disabled selected hidden>Select your destination </option>'
            console.log(data)
            for(let key in data){
            var option = document.createElement('option');
            option.text = `${key}. ${data[key]['stand']}`;
            option.value = data[key]['stand'];
            destination_list.appendChild(option) ;
            // option.value = `${key}. ${key.stand}` ;
            
            var option = document.createElement('option');
            option.text = `${key}. ${data[key]['stand']}`;
            option.value = data[key]['stand'];
            origin_list.appendChild(option) ;
        }
      })
    } 
        else {
            origin_list.innerHTML = '<option value="" disabled selected>Type Correct Bus Code</option>'
            destination_list.innerHTML = '<option value="" disabled selected>Type Correct Bus Code</option>'
            // origin_list.disabled  = true
    }
    })
  }
);

origin_list.addEventListener('change' , function() {
  var selectedOption = origin_list.options[origin_list.selectedIndex];
  console.log("Selected option: " + selectedOption.value);
})
 
destination_list.addEventListener('change' , function() {
  var selectedOption = destination_list.options[destination_list.selectedIndex];
  console.log("Selected option: " + selectedOption.value);
})
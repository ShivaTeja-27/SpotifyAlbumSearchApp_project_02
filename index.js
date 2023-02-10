
const searchbtn = document.querySelector('#SearchIcon')
searchbtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('searchbtn');

    const textbox = document.getElementById('textinput').value
    // console.log(textbox);

    const xhr = new XMLHttpRequest()
    const url = `https://api.spotify.com/v1/search?query=${textbox}&type=album&market=IN&limit=20&offset=5`
    xhr.open('GET', url)

    xhr.setRequestHeader('Authorization', 'Bearer BQA_6Rf9SR8R4fYB2Fb7cVXNEPqBn0H8jxMmrfa8UWYjf_cPF2c-_QLfpOuu-jpJnzrDWlLpnmy76tUiDSjsinzjb1qBx4od7TiKR_xcSZyCrRmqaW1z')
    xhr.setRequestHeader('Accept', 'application/json')
    xhr.setRequestHeader('Content-Type', 'application/json')


    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText)
            console.log(response);
            var output = '';

            response.albums.items.forEach((album, index) => {
                output +=
                    `
            <div id = "backsideCard" style= " border: none; " >

            <a style="text-decoration: none" href ="${response.albums.items[index].href}">
                <div id ="image" class="card-body p-3 ">
                 <img src=" ${response.albums.items[index].images[0].url}" class="card-img" >
                 </div>
                 <div id = "AlbumDetails" class="card-text text-black p-2">
                 <p><b>Song Name:</b> ${response.albums.items[index].name}</p>
                 <p><b>Artist Name:</b> ${response.albums.items[index].artists[0].name}</p>
                 <p><b> Release date:</b> ${response.albums.items[index].release_date}
                 </div>
                 </a>
             
            
            </div>


            `

                document.querySelector('#grid-container').innerHTML = output
            })


            console.dir(document.links)
            for (let i = 0; i < document.links.length; i++) {
                document.links.item(i).addEventListener('click', e => {
                    e.preventDefault()
                    document.querySelector('#song-details').style.display = 'none'
                    document.querySelector('#SearchIcon').style.display = 'none'
                    document.querySelector('#textinput').style.display = 'none'


                    var newurl = `${document.links.item(i).href}`
                    const newxhr = new XMLHttpRequest()
                    newxhr.open('GET', newurl, true)

                    newxhr.setRequestHeader('Authorization', 'Bearer BQCV7holgz19AeVLFnc0E0rtdcT_u3xu626UUAyKvEYHS6j4kLoX6_HrkWp6cS8Hlm6yzY2bF5MQOIImDzE')
                    newxhr.setRequestHeader('Accept', 'application/json')
                    newxhr.setRequestHeader('Content-Type', 'application/json')

                    newxhr.onreadystatechange = (index) => {
                        var albumoutput = " ";
                        if (newxhr.readyState === 4 && newxhr.status === 200) {
                            console.log(e)
                            const newresponse = JSON.parse(newxhr.responseText)
                            console.log(newresponse);
                            var albnav = document.createElement('nav')
                            albnav.setAttribute('class', 'bg-success h1 text-white')
                            albnav.setAttribute('id', 'alb-nav')
                            document.querySelector('#alb-content').appendChild(albnav)



                            newresponse.tracks.items.forEach((name, index) => {
                                albumoutput +=
                                    `
                        <div class=" card mb-3 bg-white text-dark " style= "width: 15rem " >
                            <a style="text-decoration: none" href ="${newresponse.tracks.items[index].name}">

                            <div class="card-body text-white">
                            <img src="${newresponse.images[0].url}">
                            <br/>
                            </div>
                            <div>
                            <p> Title: ${newresponse.tracks.items[index].name}</p>
                            <p> Artist: ${newresponse.tracks.items[index].artists[index].name}</p>
                            </div>

                        </div>
                        `
                                document.querySelector('#alb-content').innerHTML = albumoutput
                            })


                            console.dir(document.links)
                        }
                    }
                    newxhr.send()


                })
            }

        }

    }
    xhr.send()

})


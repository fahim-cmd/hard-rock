document.getElementById("search-btn").addEventListener("click", function(){
    const loadSong = document.getElementById("load-songName").value;
    const load = parseInt(loadSong);
    fetch(`https://api.lyrics.ovh/suggest/${loadSong}`)
    .then( res => res.json())
    .then( data => {              

            fetchData = data;

            const songsList = document.getElementById("songs-list");
            songsList.innerHTML = "";
            for (let i = 0; i < data.data.length; i++) {
                const title = data.data[i].title;
                const artist = data.data[i].artist.name;              
                const p = document.createElement("p");           
                p.innerHTML = ` 
                  <div class="d-flex justify-content-between bg-secondary p-4 rounded ">
                    <div class="h-auto w-100">
                    <span class="title-text">${title}</span> <br> Album By <span class="artist-text">${artist}</span>
                    </div>
                    <a href=#song-lyrics class="d-flex align-items-center text-decoration-none">
                  <button onclick="getLyrics(${i})" id="get-lyrics" class="btn-text rounded bg-success">Get Lyrics</button> 
                  </a>
                  </div>`
                
                songsList.appendChild(p);  
                if( i == 9){
                    break;
                }          
         }        
    })

})

function getLyrics (index){
    const titleN = fetchData.data[index].title;
    const artistN = fetchData.data[index].artist.name;

    fetch(`https://api.lyrics.ovh/v1/${artistN}/${titleN}`)
    .then( res => res.json())
    .then( data => {
        const lyrics = data.lyrics;
         if( lyrics === undefined){
             alert("lyrics not found");
         }
    document.getElementById("song-lyrics").innerHTML = `<pre class="lyrics-style">${lyrics}</pre>`;
    })
}












// function getLyrics (artistName, titleName){
//     fetch(`https://api.lyrics.ovh/v1/${artistName}/${titleName}`)
//     .then( res => res.json())
//     .then( data => {
//         const songLyric = document.getElementById("song-lyrics");
//         songLyric.innerHTML = `
//                             <pre> ${data.lyrics}</pre>  
//                             `
//                             console.log(songLyric);
//     })
// }
// getLyrics();
 
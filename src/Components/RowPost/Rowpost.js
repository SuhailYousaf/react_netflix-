import React, { useEffect,useState } from 'react'
import Youtube from 'react-youtube'
import './Rowpost.css'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from '../../axios'

function Rowpost(props) {
    const [movies, setMovies] = useState([]);
    // const [urlId,setUrlld]=useState('')
    const [trailer, setTrailer] = useState('');
    const [ShowVideoPlayer, setShowVideoPlayer] = useState(true)
    useEffect(()=>{
      axios.get(props.url).then(response=>{
        console.log(response.data)
        setMovies(response.data.results)

      }).catch(err=>{
        alert('Network Error')
      })
    },[])
    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          autoplay: 0,
        },
      };
 const handleMovie=(id)=>{
    console.log(id)
    axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response)=>{
      if (response.data.results.length > 0) {
        response.data.results.forEach(result => {
          if (result.type === 'Trailer') {
            setShowVideoPlayer(true);
            setTrailer(result);
            return; 
          }
        });
      } else {
        console.log("Empty response");
      }
    })
 }
 const handleCloseVideo = () => {
  setShowVideoPlayer(false);
}
  return (
    <div className='row'>
          <h2>{props.title}</h2>
          <div className='posters' >
               {movies.map((obj)=>

                    <img onClick={()=>{
                    handleMovie(obj.id)
                    }} className={props.isSmall ? "smallPoster" : "poster"} src={`${imageUrl+obj.backdrop_path}`}/>
   
               )}
               
                </div>
                {trailer && ShowVideoPlayer && (
                  <div>
                      <Youtube videoId={trailer.key} opts={opts} />
                      <button className='close-button' onClick={handleCloseVideo}> Close Video</button>
                  </div>
              )}  
    </div>
  )
}

export default Rowpost

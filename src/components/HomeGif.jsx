
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useCallback, useEffect, useState } from 'react';
import { FiGift } from 'react-icons/fi'

const giphy = new GiphyFetch('aOCPbzhoWMRrUKTq0rY3yXeF0sIkJGAE')

function HomeGif() {

    //   manage the data with state

    const [text, setText] = useState('')
    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [curPage, setCurPage] = useState(1);
    const [success, setSuccess] = useState(false)

    const handleInput = (e) => {
        setText(e.target.value)
    }

    const apiCall = async () => {
        const res = await giphy.animate(text, { limit: 10, offset: curPage })
        console.log(res.data)
        setResults(res.data)
        setTotalPages(Math.ceil(res.pagination.total_count / 10))
        // ! when response is come it will be true
        setSuccess(true)
    }

    const handlePageChnage = (page) => {
        setCurPage(page)
    }

    const pagination = useCallback(() => {
        setTimeout(() => {
            apiCall()
        }, 300);
    }, [curPage, text, success])

    //  here the dependencies curPage page and text as per checking the api

    useEffect(() => {
        pagination();
    }, [curPage, text, success])


    return (
        <div className="App">
            <div className='header-title'> <FiGift /> Search Gifs <FiGift /></div>
            <div className='parent-input'>
                <input className='input-field' value={text} onChange={handleInput} />
            </div>

            {/* here map the all gif response  */}

            <div className='parent-one'>
                <div className='main-gif-layout'>
                    {
                        results?.map((gifs) => {
                            return (
                                <div className='parent-gif'>
                                    <div className='gif-new'>
                                        <img src={gifs?.url} width={'200px'} height={'100px'} alt='new img' />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* custom - pagination for gif : */}

            <div className='pagination-parent'>
                {
                    Array.from({ length: totalPages }, (_, index) => index + 1).map((data, ind) => {
                        return <span className={` ${curPage == ind + 1 ? 'paginate-page' : 'disabled-page'}`} onClick={() => handlePageChnage(data)}>{data}</span>
                    })
                }
            </div>

        </div>
    );
}
export default HomeGif;

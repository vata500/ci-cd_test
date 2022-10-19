import { useState } from 'react'
import useSWR from "swr"
const fetcher = () => fetch(`${process.env.REACT_APP_ENDPOINT}/api/restaurants`).then(res => res.json())

function OrderHere({ orders, onSelectMenu, currentRestaurant, onSelectRestaurant, onClickOrder }) {
  const { data: restaurants, error } = useSWR('get/restaurants', fetcher)

  const [menuPageIdx, setMenuPageIdx] = useState(0)

  if (!restaurants) return <div>로딩 중</div>
  if (error || restaurants.error) return <div>요청을 받아올 수 없습니다. 서버 문제같은데요?</div>

  const handleSelectRestaurant = (r) => {
    if(r === null) {
      onSelectRestaurant(null)
      setMenuPageIdx(0)
    }
    else {
      onSelectRestaurant(r)
      setMenuPageIdx(1)
    }
  }

  const hasBeenAdded = (m) => {
    return orders.find(o => o._id === m._id)
  }

  return <>
    <div className={`page-depth-2 page-idx-${menuPageIdx}`}>
      <div className="page">
        <header>
          <div className="nav-back"></div>
          <h3>배달의 종족</h3>
          <div className="nav-commit"></div>
        </header>
        <div className="card-view">
          <ul>
            {restaurants.map(r => <li className='card-item' key={r._id} onClick={() => handleSelectRestaurant(r)}>
              <h4>{r.name}</h4>
              <div>{r.address}</div>
              <div>{r.rating}</div>
            </li>)}
          </ul>
        </div>
      </div>
      <div className="page">
        <header className="header-transparent">
          <div className="nav-back">
            <a onClick={() => handleSelectRestaurant(null)}>
              <img src="images/back-svgrepo-com.svg" />
              뒤로
            </a>
          </div>
          <h3></h3>
          <div className="nav-commit"></div>
        </header>
        <div className="hero">
          <div className="hero-image"></div>
          <div className="hero-contents">{currentRestaurant?.name || '\u00A0'}</div>
        </div>
        {currentRestaurant ? <div className='card-view'>
          <ul>
          {
            currentRestaurant.menu.map(m =>
            <li className={hasBeenAdded(m) ? 'card-item card-checked' : 'card-item'}
                key={m._id} onClick={onSelectMenu(m)}>
              <h4>
                {hasBeenAdded(m) ?
                  <img src="images/checkbox-checked-svgrepo-com.svg" className="checked" /> :
                  <img src="images/checkbox-unchecked-svgrepo-com.svg" className="unchecked" />}
                {m.name}
              </h4>
              <div>₩{m.price}</div>
            </li>)
          }
          </ul>
          <div className='action-btns'>
            <button className='btn-primary' onClick={() => {
              onClickOrder(() => {
                setMenuPageIdx(0)
              })
            }}>주문 전송</button>
          </div>
        </div>: ''}
      </div>
    </div>
  </>
}

export default OrderHere
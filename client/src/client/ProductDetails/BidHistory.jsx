import React from 'react'

const BidHistory = ({bids}) => {

var bidTime = new Date(bids.time);
      
  return (
   <>
   <tr>
                    <td>{bids.bidder.name}</td>
                    <td>{bids.bidder.email}</td>
                    <td>{bids.bid}</td>
                    <td>{ ` ${bidTime.getDate()}-${bidTime.getMonth()}-${bidTime.getFullYear()}  ${bidTime.getHours()}:${bidTime.getMinutes()}  `}</td>
                  </tr>    
   
   </>
  )
}

export default BidHistory
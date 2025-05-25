import React from 'react'

function SellerDesk () {
    const handleClick = () => {
        // When the button is clicked display an console! 
        console.log("Seller Desk")
    }
  return (
    <button onClick={handleClick}>
        Seller Desk
    </button>
  )
}

export default SellerDesk
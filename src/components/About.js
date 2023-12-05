import React from 'react'
import Rainbow from './../hoc/Rainbow';
import tal from './img/me.png'


const About = () => {
  return (
<>
    <h1 className="center" style={{fontSize: '48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '20px', borderBottom: '2px solid white' }}>MY Details</h1>
    <div className="row center">
      <div className="col s12 m8 offset-m2 l6 offset-l3">
        <table className="highlight responsive-table">
          <tbody>
            <tr>
              <th>Name:</th>
              <td>Tal Abutbul</td>
            </tr>
            <tr>
              <th>Date of Birth:</th>
              <td>20/07/1997</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>Tal6203@gmail.com</td>
            </tr>
            <tr>
              <th>Phone:</th>
              <td>052-6812203</td>
            </tr>
            <tr>
              <th>Address:</th>
              <td>Givat Hatchmoshet 12/2 Holon</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="center">
          <img src={tal} style={{ maxWidth: '100%', height: 'auto',border:'4px solid black' }} alt="Avatar" className="circle responsive-img" />
        </div>
      </div>
    </div>
    </>

  )
}




export default Rainbow(About)
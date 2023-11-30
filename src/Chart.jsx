import './App.css'
import Tooltip from './Tooltip'

const Chart = ({weight, light_absorption, lifespan, bandgap}) => {
    return (
        <>
            <div className='chart'>
                <h2 style={{fontVariant: 'small-caps'}}>Molecule Properties</h2>
                <table>
                    <tr>
                        <td className='name'>Weight:</td>
                        <td>
                            <div className='bar' style={{width: weight * 150 + "%"}}></div>
                        </td>
                        <td className='stat'>{Math.round(weight * 100) / 100}/10</td>
                    </tr>
                    <tr>
                        <td className='name'>Light Absorption:</td>
                        <td>
                            <div className='bar' style={{width: light_absorption * 150 + "%"}}></div>
                        </td>
                        <td className='stat'>{Math.round(light_absorption * 100) / 100}/10</td>
                    </tr>
                    <tr>
                        <td className='name'>Lifespan:</td>
                        <td>
                            <div className='bar' style={{width: lifespan * 150 + "%"}}></div>
                        </td>
                        <td className='stat'>{Math.round(lifespan * 100) / 100}/10</td>
                    </tr>
                    <tr>
                        <td className='name'>Bandgap:</td>
                        <td>
                            <div className='bar' style={{width: bandgap * 150 + "%"}}></div>
                        </td>
                        <td className='stat'>{Math.round(bandgap * 100) / 100}/10</td>
                    </tr>
                </table>
            </div>
        </>
    )
}

export default Chart;